import { NextResponse } from "next/server";
import {
  apagar,
  armazenamentoConfigurado,
  briefingExiste,
  listarArquivos,
  salvarNovoBriefing,
} from "@/lib/briefing/armazenamento";
import { ehIdValido, ehServico, type ArquivoEnviado, type Briefing } from "@/lib/briefing/tipos";
import { errosDoBriefing, limparRespostas } from "@/lib/briefing/validar";

/*
 * Recebe o briefing pronto. Os arquivos já subiram antes, direto do navegador;
 * aqui o servidor confere quais existem de verdade na pasta do briefing, apaga
 * os que o cliente tirou da lista e grava o dados.json.
 */

type Corpo = {
  id?: unknown;
  servico?: unknown;
  respostas?: unknown;
  arquivos?: unknown;
  /** Campo escondido: só robô preenche. */
  website?: unknown;
};

function infoDosArquivos(bruto: unknown): Map<string, { nome: string; tipo: string }> {
  const mapa = new Map<string, { nome: string; tipo: string }>();
  if (!Array.isArray(bruto)) return mapa;
  for (const a of bruto.slice(0, 100)) {
    if (a && typeof a.pathname === "string") {
      mapa.set(a.pathname, {
        nome: typeof a.nome === "string" ? a.nome.slice(0, 200) : "",
        tipo: typeof a.tipo === "string" ? a.tipo.slice(0, 120) : "",
      });
    }
  }
  return mapa;
}

export async function POST(request: Request) {
  if (!armazenamentoConfigurado()) {
    return NextResponse.json({ erro: "O armazenamento ainda não foi configurado." }, { status: 503 });
  }

  let corpo: Corpo;
  try {
    corpo = (await request.json()) as Corpo;
  } catch {
    return NextResponse.json({ erro: "Pedido inválido." }, { status: 400 });
  }

  const { id, servico } = corpo;

  // Robô: finge que deu certo e não grava nada.
  if (typeof corpo.website === "string" && corpo.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (!ehIdValido(id) || !ehServico(servico)) {
    return NextResponse.json({ erro: "Pedido inválido." }, { status: 400 });
  }

  const respostas = limparRespostas(servico, corpo.respostas);
  const erros = errosDoBriefing(servico, respostas);
  if (Object.keys(erros).length > 0) {
    return NextResponse.json(
      { erro: "Faltam respostas obrigatórias.", campos: Object.keys(erros) },
      { status: 422 },
    );
  }

  try {
    // Clique duplo ou nova tentativa depois de uma falha de rede.
    if (await briefingExiste(id)) {
      return NextResponse.json({ ok: true, id });
    }

    const informados = infoDosArquivos(corpo.arquivos);
    const naPasta = await listarArquivos(id);
    const ficam = naPasta.filter((b) => informados.has(b.pathname));
    const saem = naPasta.filter((b) => !informados.has(b.pathname));

    const arquivos: ArquivoEnviado[] = ficam.map((b) => {
      const info = informados.get(b.pathname)!;
      return {
        pathname: b.pathname,
        nome: info.nome || b.pathname.split("/").pop() || "arquivo",
        tipo: info.tipo,
        tamanho: b.size,
      };
    });

    const agora = new Date().toISOString();
    const briefing: Briefing = {
      versao: 1,
      id,
      criadoEm: agora,
      atualizadoEm: agora,
      status: "novo",
      servico,
      respostas,
      arquivos,
    };

    await salvarNovoBriefing(briefing);
    await apagar(saem.map((b) => b.url)).catch(() => {});

    return NextResponse.json({ ok: true, id });
  } catch (erro) {
    console.error("Falha ao salvar briefing", erro);
    return NextResponse.json({ erro: "Não foi possível salvar agora." }, { status: 500 });
  }
}
