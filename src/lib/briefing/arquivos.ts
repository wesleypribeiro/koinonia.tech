/*
 * Regras dos arquivos que o cliente manda. Valem no navegador (para avisar
 * antes de subir) e no servidor (o limite vai dentro da permissão de envio).
 */

const MB = 1024 * 1024;

export const MAX_ARQUIVOS = 40;
export const MAX_TOTAL = 500 * MB;
export const MAX_VIDEO = 100 * MB;
export const MAX_OUTROS = 25 * MB;

const EXT_VIDEO = ["mp4", "mov", "m4v", "webm", "3gp", "avi", "mkv"];
const EXT_IMAGEM_VISIVEL = ["jpg", "jpeg", "png", "webp", "gif", "avif"];

/** O que o seletor de arquivos mostra no celular e no computador. */
export const ACEITOS =
  "image/*,video/*,.pdf,.ai,.eps,.cdr,.svg,.psd,.zip,.heic,.heif,.jpg,.jpeg,.png,.webp,.mp4,.mov";

/**
 * Tipos aceitos na permissão de envio. Arquivos de logo (.cdr, .ai) costumam
 * chegar sem tipo definido, por isso o octet-stream entra na lista. Eles ficam
 * privados e só baixam pelo painel, nunca abrem como página.
 */
export const TIPOS_PERMITIDOS = [
  "image/*",
  "video/*",
  "application/pdf",
  "application/postscript",
  "application/illustrator",
  "application/vnd.adobe.illustrator",
  "application/vnd.adobe.photoshop",
  "application/x-photoshop",
  "application/cdr",
  "application/x-cdr",
  "application/coreldraw",
  "application/zip",
  "application/x-zip-compressed",
  "application/octet-stream",
];

export function extensao(nome: string): string {
  const i = nome.lastIndexOf(".");
  return i >= 0 ? nome.slice(i + 1).toLowerCase() : "";
}

export function ehVideo(nome: string, tipo = ""): boolean {
  return tipo.startsWith("video/") || EXT_VIDEO.includes(extensao(nome));
}

/** Imagem que o navegador consegue mostrar (HEIC fica de fora no Chrome). */
export function ehImagemVisivel(nome: string, tipo = ""): boolean {
  if (tipo === "image/svg+xml") return false;
  return EXT_IMAGEM_VISIVEL.includes(extensao(nome)) || /^image\/(jpeg|png|webp|gif|avif)$/.test(tipo);
}

export function limiteDoArquivo(nome: string, tipo = ""): number {
  return ehVideo(nome, tipo) ? MAX_VIDEO : MAX_OUTROS;
}

/** Nome seguro para o caminho no armazenamento: sem acento, espaço ou símbolo. */
export function nomeSeguro(nome: string): string {
  const ext = extensao(nome).replace(/[^a-z0-9]/g, "").slice(0, 8);
  const base = (ext ? nome.slice(0, nome.length - ext.length - 1) : nome)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return `${base || "arquivo"}${ext ? `.${ext}` : ""}`;
}
