import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/*
 * Login do painel: uma senha só, na variável PAINEL_SENHA da Vercel.
 * A sessão é um cookie assinado com a própria senha, então trocar a senha
 * derruba todas as sessões abertas.
 */

const COOKIE = "painel_sessao";
const DURACAO_SEGUNDOS = 30 * 24 * 60 * 60;

function senha(): string | null {
  const s = process.env.PAINEL_SENHA;
  return s && s.length >= 8 ? s : null;
}

export function painelConfigurado(): boolean {
  return senha() !== null;
}

function assinar(expira: number, chave: string): string {
  return createHmac("sha256", chave).update(`painel:${expira}`).digest("base64url");
}

function iguais(a: string, b: string): boolean {
  // Compara resumos de mesmo tamanho para não vazar nada pelo tempo de resposta.
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export function senhaConfere(tentativa: string): boolean {
  const chave = senha();
  return chave !== null && iguais(tentativa, chave);
}

export async function estaLogado(): Promise<boolean> {
  const chave = senha();
  if (!chave) return false;
  const valor = (await cookies()).get(COOKIE)?.value;
  if (!valor) return false;
  const [expiraTexto, assinatura] = valor.split(".");
  const expira = Number(expiraTexto);
  if (!Number.isFinite(expira) || expira < Date.now() || !assinatura) return false;
  return iguais(assinatura, assinar(expira, chave));
}

export async function criarSessao(): Promise<void> {
  const chave = senha();
  if (!chave) return;
  const expira = Date.now() + DURACAO_SEGUNDOS * 1000;
  (await cookies()).set(COOKIE, `${expira}.${assinar(expira, chave)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: DURACAO_SEGUNDOS,
  });
}

export async function encerrarSessao(): Promise<void> {
  (await cookies()).delete(COOKIE);
}
