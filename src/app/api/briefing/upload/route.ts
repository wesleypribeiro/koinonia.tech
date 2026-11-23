import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { prefixo } from "@/lib/briefing/armazenamento";
import { TIPOS_PERMITIDOS, limiteDoArquivo } from "@/lib/briefing/arquivos";

/*
 * Dá ao navegador do cliente uma permissão curta para subir UM arquivo
 * direto para o armazenamento (sem passar o arquivo pelo servidor).
 * A permissão só vale para a pasta de arquivos de um briefing, com tipo
 * e tamanho limitados.
 */

const UUID = "[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}";

function escaparRegex(texto: string) {
  return texto.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function POST(request: Request) {
  let body: HandleUploadBody;
  try {
    body = (await request.json()) as HandleUploadBody;
  } catch {
    return NextResponse.json({ error: "Pedido inválido." }, { status: 400 });
  }

  try {
    const resposta = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        const permitido = new RegExp(`^${escaparRegex(prefixo())}${UUID}/arquivos/[a-z0-9][a-z0-9._-]{0,119}$`);
        if (!permitido.test(pathname)) {
          throw new Error("Caminho de arquivo inválido.");
        }
        return {
          allowedContentTypes: TIPOS_PERMITIDOS,
          maximumSizeInBytes: limiteDoArquivo(pathname),
          addRandomSuffix: true,
          allowOverwrite: false,
          validUntil: Date.now() + 60 * 60 * 1000,
        };
      },
    });
    return NextResponse.json(resposta);
  } catch (erro) {
    return NextResponse.json({ error: (erro as Error).message }, { status: 400 });
  }
}
