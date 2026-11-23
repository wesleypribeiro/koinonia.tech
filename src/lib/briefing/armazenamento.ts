import {
  BlobNotFoundError,
  BlobPreconditionFailedError,
  del,
  get,
  head,
  list,
  put,
  type ListBlobResultBlob,
} from "@vercel/blob";
import type { Briefing } from "./tipos";

/*
 * Só roda no servidor. Cada briefing vira uma pasta no Vercel Blob privado:
 *   <prefixo><id>/dados.json      respostas, status e lista de arquivos
 *   <prefixo><id>/arquivos/...    fotos, vídeos e logo que o cliente mandou
 */

/** Produção usa briefings/. Testes no computador e no preview ficam em pastas separadas. */
export function prefixo(): string {
  const ambiente = process.env.VERCEL_ENV;
  return ambiente === "production" ? "briefings/" : `teste-${ambiente || "local"}/briefings/`;
}

export function armazenamentoConfigurado(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

const caminhoDados = (id: string) => `${prefixo()}${id}/dados.json`;
export const pastaArquivos = (id: string) => `${prefixo()}${id}/arquivos/`;

async function listarTudo(prefix: string): Promise<ListBlobResultBlob[]> {
  const blobs: ListBlobResultBlob[] = [];
  let cursor: string | undefined;
  do {
    const r = await list({ prefix, cursor, limit: 1000 });
    blobs.push(...r.blobs);
    cursor = r.hasMore ? r.cursor : undefined;
  } while (cursor);
  return blobs;
}

async function lerJson(pathname: string): Promise<{ dados: Briefing; etag: string } | null> {
  const r = await get(pathname, { access: "private", useCache: false });
  if (!r || r.statusCode !== 200) return null;
  const conteudo = await new Response(r.stream).text();
  // A leitura devolve a ETag fraca (W/"..."); a gravação condicional (ifMatch) quer a forte ("...").
  return { dados: JSON.parse(conteudo) as Briefing, etag: r.blob.etag.replace(/^W\//, "") };
}

export async function lerBriefing(id: string): Promise<Briefing | null> {
  return (await lerJson(caminhoDados(id)))?.dados ?? null;
}

export async function briefingExiste(id: string): Promise<boolean> {
  try {
    await head(caminhoDados(id));
    return true;
  } catch (erro) {
    if (erro instanceof BlobNotFoundError) return false;
    throw erro;
  }
}

const opcoesJson = {
  access: "private" as const,
  contentType: "application/json",
  addRandomSuffix: false,
  cacheControlMaxAge: 60,
};

export async function salvarNovoBriefing(b: Briefing): Promise<void> {
  await put(caminhoDados(b.id), JSON.stringify(b, null, 2), { ...opcoesJson, allowOverwrite: false });
}

/** Lê, muda e grava. Se outra aba gravou no meio, lê de novo (até 3 vezes). */
export async function atualizarBriefing(id: string, mudar: (b: Briefing) => Briefing): Promise<Briefing | null> {
  for (let tentativa = 0; tentativa < 3; tentativa++) {
    const atual = await lerJson(caminhoDados(id));
    if (!atual) return null;
    const novo: Briefing = { ...mudar(atual.dados), atualizadoEm: new Date().toISOString() };
    try {
      await put(caminhoDados(id), JSON.stringify(novo, null, 2), {
        ...opcoesJson,
        allowOverwrite: true,
        ifMatch: atual.etag,
      });
      return novo;
    } catch (erro) {
      if (erro instanceof BlobPreconditionFailedError) continue;
      throw erro;
    }
  }
  throw new Error("Não deu para salvar a mudança. Tente de novo.");
}

export function listarArquivos(id: string): Promise<ListBlobResultBlob[]> {
  return listarTudo(pastaArquivos(id));
}

export async function apagar(urls: string[]): Promise<void> {
  if (urls.length > 0) await del(urls);
}

export async function excluirBriefing(id: string): Promise<void> {
  const blobs = await listarTudo(`${prefixo()}${id}/`);
  await apagar(blobs.map((b) => b.url));
}

export type ResumoBriefing = Pick<Briefing, "id" | "criadoEm" | "status" | "servico"> & {
  empresa: string;
  nome: string;
  ramo: string;
  qtdArquivos: number;
};

/** Pasta que tem arquivos mas nenhum formulário enviado: o cliente começou e não terminou. */
export type EnvioIncompleto = { id: string; qtdArquivos: number; tamanho: number; ultimoEnvio: string };

const texto = (v: unknown) => (typeof v === "string" ? v : "");

export async function listarBriefings(): Promise<{ briefings: ResumoBriefing[]; incompletos: EnvioIncompleto[] }> {
  const base = prefixo();
  const blobs = await listarTudo(base);

  const comDados = new Set<string>();
  const soArquivos = new Map<string, EnvioIncompleto>();
  for (const b of blobs) {
    const [id, parte] = b.pathname.slice(base.length).split("/");
    if (!id) continue;
    if (parte === "dados.json") {
      comDados.add(id);
    } else if (parte === "arquivos") {
      const atual = soArquivos.get(id) ?? { id, qtdArquivos: 0, tamanho: 0, ultimoEnvio: "" };
      const quando = new Date(b.uploadedAt).toISOString();
      soArquivos.set(id, {
        id,
        qtdArquivos: atual.qtdArquivos + 1,
        tamanho: atual.tamanho + b.size,
        ultimoEnvio: quando > atual.ultimoEnvio ? quando : atual.ultimoEnvio,
      });
    }
  }

  const lidos = await Promise.all(
    [...comDados].map((id) => lerJson(caminhoDados(id)).catch(() => null)),
  );

  const briefings = lidos
    .filter((l): l is { dados: Briefing; etag: string } => l !== null)
    .map(({ dados }) => ({
      id: dados.id,
      criadoEm: dados.criadoEm,
      status: dados.status,
      servico: dados.servico,
      empresa: texto(dados.respostas.empresa),
      nome: texto(dados.respostas.nome),
      ramo: texto(dados.respostas.ramo),
      qtdArquivos: dados.arquivos.length,
    }))
    .sort((a, b) => b.criadoEm.localeCompare(a.criadoEm));

  const incompletos = [...soArquivos.values()]
    .filter((e) => !comDados.has(e.id))
    .sort((a, b) => b.ultimoEnvio.localeCompare(a.ultimoEnvio));

  return { briefings, incompletos };
}

export function abrirArquivo(pathname: string) {
  return get(pathname, { access: "private" });
}
