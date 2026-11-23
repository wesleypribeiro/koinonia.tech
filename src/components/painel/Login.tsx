"use client";

import { useActionState } from "react";
import Image from "next/image";
import { LogIn } from "lucide-react";
import { entrar, type EstadoLogin } from "@/app/painel/acoes";
import { Botao, Erro, estiloCampo } from "@/components/briefing/ui";

export default function Login({ voltar }: { voltar: string }) {
  const [estado, acao, pendente] = useActionState<EstadoLogin, FormData>(entrar, { erro: "" });

  return (
    <main className="mx-auto flex min-h-dvh max-w-sm flex-col justify-center px-4 py-12">
      <Image
        src="/branding/logo_principal_horizontal_color.svg"
        alt="Koinonia Dev"
        width={190}
        height={60}
        priority
        className="h-auto w-[150px] dark:hidden"
      />
      <Image
        src="/branding/logo_horizontal_branco.svg"
        alt="Koinonia Dev"
        width={190}
        height={60}
        priority
        className="hidden h-auto w-[150px] dark:block"
      />
      <h1 className="mt-10 font-display text-[2rem] font-bold uppercase leading-none tracking-[-0.02em]">Painel</h1>
      <p className="mt-3 text-[0.9375rem] text-muted-fg">Briefings que os clientes enviaram pelo site.</p>

      <form action={acao} className="mt-8">
        <input type="hidden" name="voltar" value={voltar} />
        <label htmlFor="senha" className="block text-base font-semibold text-foreground">
          Senha
        </label>
        <input
          id="senha"
          name="senha"
          type="password"
          required
          autoComplete="current-password"
          autoFocus
          aria-invalid={estado.erro ? true : undefined}
          aria-describedby={estado.erro ? "senha-erro" : undefined}
          className={`mt-2 ${estiloCampo}`}
        />
        {estado.erro && <Erro id="senha-erro">{estado.erro}</Erro>}
        <Botao type="submit" disabled={pendente} className="mt-6 w-full">
          <LogIn className="h-4 w-4" aria-hidden />
          {pendente ? "Entrando…" : "Entrar"}
        </Botao>
      </form>
    </main>
  );
}
