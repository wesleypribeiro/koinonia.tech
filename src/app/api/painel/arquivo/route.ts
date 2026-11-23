import { abrirArquivo, prefixo } from "@/lib/briefing/armazenamento";
import { ehImagemVisivel, ehVideo } from "@/lib/briefing/arquivos";
import { estaLogado } from "@/lib/painel/sessao";

/*
 * Entrega um arquivo privado para o painel (só com login).
 * Foto e vídeo abrem no navegador; o resto sempre baixa, e a política
 * "sandbox" impede que um arquivo enviado rode script neste domínio.
 */

function nomeParaCabecalho(nome: string): string {
  const ascii = nome.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^\w.\- ]+/g, "_");
  return `filename="${ascii || "arquivo"}"; filename*=UTF-8''${encodeURIComponent(nome)}`;
}

export async function GET(request: Request) {
  if (!(await estaLogado())) {
    return new Response("Entre no painel para ver este arquivo.", { status: 401 });
  }

  const url = new URL(request.url);
  const pathname = url.searchParams.get("p") ?? "";
  const nome = (url.searchParams.get("nome") ?? pathname.split("/").pop() ?? "arquivo").slice(0, 200);
  const baixar = url.searchParams.has("baixar");

  if (!pathname.startsWith(prefixo()) || pathname.includes("..") || !pathname.includes("/arquivos/")) {
    return new Response("Arquivo inválido.", { status: 400 });
  }

  const resultado = await abrirArquivo(pathname).catch(() => null);
  if (!resultado || resultado.statusCode !== 200) {
    return new Response("Arquivo não encontrado.", { status: 404 });
  }

  const tipo = resultado.blob.contentType || "application/octet-stream";
  const mostra = !baixar && (ehImagemVisivel(pathname, tipo) || ehVideo(pathname, tipo));

  return new Response(resultado.stream, {
    headers: {
      "Content-Type": mostra ? tipo : "application/octet-stream",
      "Content-Length": String(resultado.blob.size),
      "Content-Disposition": `${mostra ? "inline" : "attachment"}; ${nomeParaCabecalho(nome)}`,
      "Content-Security-Policy": "default-src 'none'; img-src 'self'; media-src 'self'; sandbox",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, max-age=3600",
    },
  });
}
