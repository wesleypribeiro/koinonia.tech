"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { atualizarBriefing, briefingExiste, excluirBriefing } from "@/lib/briefing/armazenamento";
import { ehIdValido, ehStatus, type Status } from "@/lib/briefing/tipos";
import { criarSessao, encerrarSessao, estaLogado, painelConfigurado, senhaConfere } from "@/lib/painel/sessao";

export type EstadoLogin = { erro: string };

/** Só volta para páginas do próprio painel (nada de redirecionar para fora). */
function destinoSeguro(valor: FormDataEntryValue | null): string {
  const texto = typeof valor === "string" ? valor : "";
  return /^\/painel(\/[0-9a-f-]{36})?$/.test(texto) ? texto : "/painel";
}

export async function entrar(_anterior: EstadoLogin, dados: FormData): Promise<EstadoLogin> {
  if (!painelConfigurado()) {
    return { erro: "O painel ainda não tem senha. Crie a variável PAINEL_SENHA na Vercel." };
  }
  if (!senhaConfere(String(dados.get("senha") ?? ""))) {
    // Atraso de propósito: deixa lento quem tenta adivinhar a senha.
    await new Promise((r) => setTimeout(r, 1200));
    return { erro: "Senha errada. Confira e tente de novo." };
  }
  await criarSessao();
  redirect(destinoSeguro(dados.get("voltar")));
}

export async function sair() {
  await encerrarSessao();
  redirect("/painel");
}

async function exigirLogin() {
  if (!(await estaLogado())) throw new Error("Sessão expirada. Entre de novo.");
}

export async function mudarStatus(id: string, status: Status) {
  await exigirLogin();
  if (!ehIdValido(id) || !ehStatus(status)) throw new Error("Pedido inválido.");
  await atualizarBriefing(id, (b) => ({ ...b, status }));
  revalidatePath("/painel");
  revalidatePath(`/painel/${id}`);
}

export async function excluir(id: string) {
  await exigirLogin();
  if (!ehIdValido(id)) throw new Error("Pedido inválido.");
  await excluirBriefing(id);
  revalidatePath("/painel");
  redirect("/painel");
}

/** Apaga pastas de arquivos de quem começou e não enviou o formulário. */
export async function limparIncompletos(ids: string[]) {
  await exigirLogin();
  for (const id of ids.filter(ehIdValido)) {
    if (!(await briefingExiste(id))) await excluirBriefing(id);
  }
  revalidatePath("/painel");
}
