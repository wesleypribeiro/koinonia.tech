import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download, ExternalLink, FileText, Film, Mail } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import Login from "@/components/painel/Login";
import { BaixarTudo, BotaoCopiar, ExcluirBriefing, SeletorStatus } from "@/components/painel/Controles";
import { CabecalhoPainel, PainelSemSenha } from "@/components/painel/Estrutura";
import { lerBriefing } from "@/lib/briefing/armazenamento";
import { ehImagemVisivel, ehVideo } from "@/lib/briefing/arquivos";
import { etapasDo } from "@/lib/briefing/perguntas";
import { briefingEmTexto, formatarTamanho, linhasDaEtapa } from "@/lib/briefing/texto";
import { ROTULO_SERVICO, ehIdValido, type ArquivoEnviado } from "@/lib/briefing/tipos";
import { digitos } from "@/lib/briefing/validar";
import { estaLogado, painelConfigurado } from "@/lib/painel/sessao";

export const dynamic = "force-dynamic";

function urlDoArquivo(a: ArquivoEnviado, baixar = false) {
  return `/api/painel/arquivo?${baixar ? "baixar=1&" : ""}p=${encodeURIComponent(a.pathname)}&nome=${encodeURIComponent(a.nome)}`;
}

function slug(texto: string) {
  return (
    texto
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "briefing"
  );
}

export default async function BriefingDetalhe({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!painelConfigurado()) return <PainelSemSenha />;
  if (!(await estaLogado())) return <Login voltar={ehIdValido(id) ? `/painel/${id}` : "/painel"} />;
  if (!ehIdValido(id)) notFound();

  const b = await lerBriefing(id);
  if (!b) notFound();

  const r = b.respostas;
  const empresa = typeof r.empresa === "string" && r.empresa ? r.empresa : "Sem nome";
  const nome = typeof r.nome === "string" ? r.nome : "";
  const email = typeof r.email === "string" ? r.email : "";
  const zap = typeof r.whatsapp === "string" ? digitos(r.whatsapp) : "";
  const linkPasta = typeof r.linkArquivos === "string" ? r.linkArquivos : "";
  const enviadoEm = new Date(b.criadoEm).toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    dateStyle: "long",
    timeStyle: "short",
  });

  const imagens = b.arquivos.filter((a) => ehImagemVisivel(a.nome, a.tipo));
  const outros = b.arquivos.filter((a) => !ehImagemVisivel(a.nome, a.tipo));
  const total = b.arquivos.reduce((s, a) => s + a.tamanho, 0);
  const primeiroNome = nome.split(/\s+/)[0];

  return (
    <>
      <CabecalhoPainel />
      <main className="mx-auto max-w-6xl px-4 pb-20 pt-6 sm:px-6">
        <Link
          href="/painel"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted-fg transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Todos os briefings
        </Link>

        <div className="mt-4 flex flex-col gap-6 border-b border-border pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <h1 className="break-words font-display text-[2rem] font-bold uppercase leading-[0.95] tracking-[-0.02em] sm:text-[2.75rem]">
              {empresa}
            </h1>
            <p className="mt-3 text-[0.9375rem] text-muted-fg">
              {[nome, ROTULO_SERVICO[b.servico], `enviado em ${enviadoEm}`].filter(Boolean).join(" · ")}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {zap && (
                <a
                  href={`https://wa.me/55${zap}?text=${encodeURIComponent(`Oi${primeiroNome ? `, ${primeiroNome}` : ""}! Recebi o seu briefing.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 border border-border px-4 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  {typeof r.whatsapp === "string" ? r.whatsapp : "WhatsApp"}
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="inline-flex min-h-11 max-w-full items-center gap-2 border border-border px-4 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden />
                  <span className="truncate">{email}</span>
                </a>
              )}
              <BotaoCopiar texto={briefingEmTexto(b)} rotulo="Copiar respostas" />
            </div>
          </div>
          <SeletorStatus id={b.id} status={b.status} />
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="space-y-6">
            {etapasDo(b.servico).map((etapa) => {
              const linhas = linhasDaEtapa(etapa, r).filter((l) => l.id !== "arquivos");
              if (linhas.length === 0) return null;
              return (
                <section key={etapa.id} aria-labelledby={`sec-${etapa.id}`} className="border border-border bg-card">
                  <h2
                    id={`sec-${etapa.id}`}
                    className="border-b border-border px-5 py-3 text-sm font-bold uppercase tracking-[0.04em] text-foreground"
                  >
                    {etapa.titulo}
                  </h2>
                  <dl className="divide-y divide-border">
                    {linhas.map((l) => (
                      <div key={l.id} className="grid gap-1 px-5 py-3.5 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-6">
                        <dt className="text-sm text-muted-fg">{l.rotulo}</dt>
                        <dd className="whitespace-pre-line break-words text-[0.9375rem] leading-relaxed text-foreground">
                          {l.valor}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              );
            })}
          </div>

          <aside aria-labelledby="arquivos" className="lg:sticky lg:top-6 lg:self-start">
            <div className="border border-border bg-card">
              <div className="flex items-baseline justify-between gap-3 border-b border-border px-5 py-3">
                <h2 id="arquivos" className="text-sm font-bold uppercase tracking-[0.04em] text-foreground">
                  Arquivos
                </h2>
                <span className="font-mono text-xs text-muted-fg">
                  {b.arquivos.length} · {formatarTamanho(total)}
                </span>
              </div>

              {b.arquivos.length === 0 ? (
                <p className="px-5 py-6 text-sm text-muted-fg">O cliente não mandou arquivos pelo formulário.</p>
              ) : (
                <div className="space-y-4 p-4">
                  {imagens.length > 0 && (
                    <ul className="grid grid-cols-3 gap-2">
                      {imagens.map((a) => (
                        <li key={a.pathname}>
                          <a
                            href={urlDoArquivo(a)}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={a.nome}
                            className="block aspect-square overflow-hidden border border-border bg-muted transition-opacity hover:opacity-85"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element -- arquivo privado servido pela rota com login */}
                            <img src={urlDoArquivo(a)} alt={a.nome} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                  {outros.length > 0 && (
                    <ul className="divide-y divide-border border border-border">
                      {outros.map((a) => (
                        <li key={a.pathname} className="flex items-center gap-3 px-3 py-2">
                          {ehVideo(a.nome, a.tipo) ? (
                            <Film className="h-4 w-4 shrink-0 text-muted-fg" aria-hidden />
                          ) : (
                            <FileText className="h-4 w-4 shrink-0 text-muted-fg" aria-hidden />
                          )}
                          <span className="min-w-0 flex-1 truncate text-sm text-foreground" title={a.nome}>
                            {a.nome}
                          </span>
                          <a
                            href={urlDoArquivo(a, true)}
                            aria-label={`Baixar ${a.nome} (${formatarTamanho(a.tamanho)})`}
                            className="inline-flex h-11 w-11 shrink-0 items-center justify-center text-muted-fg transition-colors hover:text-primary"
                          >
                            <Download className="h-4 w-4" aria-hidden />
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                  <BaixarTudo arquivos={b.arquivos} nomeZip={`${slug(empresa)}-arquivos.zip`} />
                </div>
              )}

              {linkPasta && (
                <div className="border-t border-border px-5 py-4">
                  <p className="text-sm text-muted-fg">Pasta que o cliente mandou</p>
                  <a
                    href={linkPasta.startsWith("http") ? linkPasta : `https://${linkPasta}`}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="mt-1 inline-flex max-w-full items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    <span className="truncate">{linkPasta}</span>
                    <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  </a>
                </div>
              )}
            </div>
          </aside>
        </div>

        <div className="mt-16 border-t border-border pt-6">
          <ExcluirBriefing id={b.id} empresa={empresa === "Sem nome" ? "" : empresa} />
        </div>
      </main>
    </>
  );
}
