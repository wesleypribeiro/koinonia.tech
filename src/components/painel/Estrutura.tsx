import Image from "next/image";
import Link from "next/link";
import { LogOut } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { sair } from "@/app/painel/acoes";
import { ROTULO_STATUS, type Status } from "@/lib/briefing/tipos";

/* Partes do painel que rodam no servidor. */

export function CabecalhoPainel() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/painel" className="flex items-center gap-3" aria-label="Painel: todos os briefings">
          <Image
            src="/branding/logo_principal_horizontal_color.svg"
            alt=""
            width={190}
            height={60}
            className="h-auto w-[128px] dark:hidden"
          />
          <Image
            src="/branding/logo_horizontal_branco.svg"
            alt=""
            width={190}
            height={60}
            className="hidden h-auto w-[128px] dark:block"
          />
          <span className="border-l border-border pl-3 text-sm font-bold uppercase tracking-[0.06em] text-foreground">
            Painel
          </span>
        </Link>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <form action={sair}>
            <button
              type="submit"
              className="inline-flex min-h-11 items-center gap-2 px-3 text-sm font-semibold text-foreground transition-colors hover:text-primary"
            >
              <LogOut className="h-4 w-4" aria-hidden />
              Sair
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}

const coresStatus: Record<Status, string> = {
  novo: "border-primary bg-primary text-primary-fg",
  andamento: "border-accent bg-accent text-accent-fg",
  concluido: "border-border bg-transparent text-muted-fg",
};

export function EtiquetaStatus({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center border px-2.5 py-0.5 text-xs font-bold uppercase tracking-[0.06em] ${coresStatus[status]}`}
    >
      {ROTULO_STATUS[status]}
    </span>
  );
}

export function PainelSemSenha() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col justify-center px-4 py-12">
      <h1 className="font-display text-[2rem] font-bold uppercase leading-none tracking-[-0.02em]">
        Falta a senha do painel
      </h1>
      <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted-fg">
        Na Vercel, abra o projeto <strong className="text-foreground">koinonia-tech</strong>, vá em Settings,
        Environment Variables, e crie a variável <code className="font-mono text-foreground">PAINEL_SENHA</code> com
        uma senha de pelo menos 8 caracteres. Depois publique o site de novo para a senha valer.
      </p>
    </main>
  );
}
