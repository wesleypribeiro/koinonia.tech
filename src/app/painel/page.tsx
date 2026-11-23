import Link from "next/link";
import { ArrowRight, Paperclip } from "lucide-react";
import Login from "@/components/painel/Login";
import { LimparIncompletos, LinksParaCliente } from "@/components/painel/Controles";
import { CabecalhoPainel, EtiquetaStatus, PainelSemSenha } from "@/components/painel/Estrutura";
import { listarBriefings } from "@/lib/briefing/armazenamento";
import { formatarTamanho } from "@/lib/briefing/texto";
import { ROTULO_SERVICO, ROTULO_STATUS, STATUS, ehStatus } from "@/lib/briefing/tipos";
import { estaLogado, painelConfigurado } from "@/lib/painel/sessao";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

function quando(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function PainelPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  if (!painelConfigurado()) return <PainelSemSenha />;
  if (!(await estaLogado())) return <Login voltar="/painel" />;

  const { status } = await searchParams;
  const filtro = ehStatus(status) ? status : null;
  const { briefings, incompletos } = await listarBriefings();
  const lista = filtro ? briefings.filter((b) => b.status === filtro) : briefings;
  const contagem = (s: string) => briefings.filter((b) => b.status === s).length;

  const abas = [
    { href: "/painel", rotulo: "Todos", qtd: briefings.length, ativa: filtro === null },
    ...STATUS.map((s) => ({
      href: `/painel?status=${s}`,
      rotulo: ROTULO_STATUS[s],
      qtd: contagem(s),
      ativa: filtro === s,
    })),
  ];

  // Só mostra como "incompleto" o que está parado há mais de 3 dias (o cliente pode estar preenchendo).
  const limite = Date.now() - 3 * 24 * 60 * 60 * 1000;
  const parados = incompletos.filter((e) => new Date(e.ultimoEnvio).getTime() < limite);

  return (
    <>
      <CabecalhoPainel />
      <main className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <h1 className="font-display text-[2rem] font-bold uppercase leading-none tracking-[-0.02em] sm:text-[2.5rem]">
            Briefings
          </h1>
          <p className="font-mono text-sm text-muted-fg">
            {briefings.length} {briefings.length === 1 ? "recebido" : "recebidos"} · {contagem("novo")}{" "}
            {contagem("novo") === 1 ? "novo" : "novos"}
          </p>
        </div>

        <div className="mt-8">
          <LinksParaCliente base={siteConfig.url} />
        </div>

        <nav
          aria-label="Filtrar por status"
          className="mt-10 flex gap-1 overflow-x-auto overflow-y-hidden shadow-[inset_0_-1px_0_var(--border)]"
        >
          {abas.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              aria-current={a.ativa ? "page" : undefined}
              className={`inline-flex min-h-11 shrink-0 items-center gap-2 border-b-2 px-3 text-sm font-semibold transition-colors ${
                a.ativa ? "border-primary text-foreground" : "border-transparent text-muted-fg hover:text-foreground"
              }`}
            >
              {a.rotulo}
              <span className="font-mono text-xs text-muted-fg">{a.qtd}</span>
            </Link>
          ))}
        </nav>

        {lista.length === 0 ? (
          <div className="border border-t-0 border-border bg-card px-5 py-12 text-center">
            <p className="font-semibold text-foreground">
              {filtro ? `Nenhum briefing com status "${ROTULO_STATUS[filtro]}".` : "Nenhum briefing ainda."}
            </p>
            {!filtro && (
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-fg">
                Copie um dos links acima e mande para o cliente pelo WhatsApp. Quando ele enviar, o briefing aparece
                aqui e chega um aviso no seu e-mail.
              </p>
            )}
          </div>
        ) : (
          <ul className="border border-t-0 border-border bg-card">
            {lista.map((b) => (
              <li key={b.id} className="border-b border-border last:border-b-0">
                <Link
                  href={`/painel/${b.id}`}
                  className="group grid gap-x-6 gap-y-2 px-4 py-4 transition-colors hover:bg-muted/40 sm:grid-cols-[1fr_auto] sm:items-center sm:px-5"
                >
                  <div className="min-w-0">
                    <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="truncate text-lg font-bold text-foreground">{b.empresa || "Sem nome"}</span>
                      <EtiquetaStatus status={b.status} />
                    </p>
                    <p className="mt-1 truncate text-sm text-muted-fg">
                      {[b.nome, b.ramo].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                  <div className="flex items-center gap-5 text-sm text-muted-fg">
                    <span>{ROTULO_SERVICO[b.servico]}</span>
                    {b.qtdArquivos > 0 && (
                      <span className="inline-flex items-center gap-1 font-mono">
                        <Paperclip className="h-3.5 w-3.5" aria-hidden />
                        {b.qtdArquivos}
                        <span className="sr-only">arquivos</span>
                      </span>
                    )}
                    <span className="font-mono tabular-nums">{quando(b.criadoEm)}</span>
                    <ArrowRight
                      className="hidden h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5 sm:block"
                      aria-hidden
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {parados.length > 0 && (
          <section className="mt-12 border border-border p-5" aria-labelledby="incompletos">
            <h2 id="incompletos" className="text-sm font-bold uppercase tracking-[0.04em] text-foreground">
              Arquivos sem formulário
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-fg">
              {parados.length === 1 ? "Um cliente começou" : `${parados.length} clientes começaram`}, mandou fotos e
              não terminou o formulário. São{" "}
              {formatarTamanho(parados.reduce((s, e) => s + e.tamanho, 0))} ocupando o armazenamento.
            </p>
            <div className="mt-4">
              <LimparIncompletos ids={parados.map((e) => e.id)} />
            </div>
          </section>
        )}
      </main>
    </>
  );
}
