import Image from "next/image";
import { ArrowRight, Check, CreditCard, Globe, Server, Wrench } from "lucide-react";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { siteConfig } from "@/lib/site";
import {
  parcelamento,
  planosCriacao,
  planosHospedagem,
  planosManutencao,
  waPlano,
  type Plano,
} from "@/lib/planos";

const secoes = [
  { href: "#criacao", label: "Criação" },
  { href: "#hospedagem", label: "Hospedagem" },
  { href: "#manutencao", label: "Manutenção" },
];

function CardPlano({ plano, cols }: { plano: Plano; cols: string }) {
  const sobOrcamento = plano.preco === null;
  return (
    <article
      className={`bento-card relative flex h-full flex-col p-6 lg:p-8 ${
        plano.destaque ? "border-primary! shadow-[-4px_4px_0_0_var(--primary)]" : ""
      } ${cols}`}
    >
      {plano.destaque && (
        <span className="absolute right-0 top-0 bg-primary px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-primary-fg">
          Mais escolhido
        </span>
      )}

      <h3 className="text-foreground">{plano.nome}</h3>
      {plano.detalhe && <p className="mt-2 text-sm leading-relaxed text-muted-fg">{plano.detalhe}</p>}

      <div className="mt-6 border-t border-border pt-6">
        {sobOrcamento ? (
          <p className="font-display text-3xl font-bold uppercase tracking-tight text-foreground">
            Sob orçamento
          </p>
        ) : (
          <p className="flex flex-wrap items-baseline gap-x-1.5">
            <span className="whitespace-nowrap font-display text-4xl font-bold tracking-tight text-foreground">
              {plano.preco}
            </span>
            {plano.periodo && <span className="font-mono text-sm text-muted-fg">{plano.periodo}</span>}
          </p>
        )}
        {plano.nota && (
          <p className="mt-2 flex items-center gap-2 text-sm font-medium text-foreground">
            <CreditCard className="h-4 w-4 shrink-0 text-primary" aria-hidden />
            {plano.nota}
          </p>
        )}
      </div>

      <ul className="mt-6 flex-1 space-y-3 text-sm text-muted-fg">
        {plano.itens.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <a
        href={waPlano(plano.mensagem)}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-8 inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap px-5 py-3 text-sm font-bold uppercase tracking-wider transition-[background-color,color,transform] active:scale-[0.98] ${
          plano.destaque || sobOrcamento
            ? "bg-primary text-primary-fg hover:bg-primary-hover"
            : "border border-primary text-primary hover:bg-primary hover:text-primary-fg"
        }`}
      >
        {sobOrcamento ? <WhatsAppIcon className="h-4 w-4" /> : null}
        {plano.cta}
        {!sobOrcamento && <ArrowRight className="h-4 w-4" aria-hidden />}
      </a>
    </article>
  );
}

function Parcelamento() {
  return (
    <p className="mt-10 flex items-center gap-3 border-l-2 border-primary pl-4 font-mono text-sm text-muted-fg">
      <CreditCard className="h-5 w-5 shrink-0 text-primary" aria-hidden />
      {parcelamento}
    </p>
  );
}

function CabecalhoSecao({
  id,
  tag,
  titulo,
  texto,
  Icone,
}: {
  id: string;
  tag: string;
  titulo: string;
  texto: string;
  Icone: typeof Globe;
}) {
  return (
    <Reveal className="max-w-3xl">
      <div className="tech-tag mb-4 inline-flex items-center gap-2">
        <Icone className="h-3.5 w-3.5" aria-hidden />
        {tag}
      </div>
      <h2 id={id} className="scroll-mt-24 text-foreground tracking-tight">
        {titulo}
      </h2>
      <p className="mt-5 text-lg leading-relaxed text-muted-fg text-pretty">{texto}</p>
    </Reveal>
  );
}

export default function PlanosPage() {
  return (
    <>
      {/* Cabeçalho próprio da página de planos */}
      <div className="sticky top-0 z-50 border-b border-border glass-nav">
        <Container className="flex items-center justify-between gap-4 py-3">
          <a href={siteConfig.url} aria-label={`${siteConfig.name}: ir para o site`} className="flex items-center">
            <Image
              src="/branding/logo_principal_horizontal_color.svg"
              alt="Koinonia Dev"
              width={190}
              height={60}
              className="h-auto w-[clamp(130px,16vw,170px)] dark:hidden"
            />
            <Image
              src="/branding/logo_horizontal_branco.svg"
              alt="Koinonia Dev"
              width={190}
              height={60}
              className="hidden h-auto w-[clamp(130px,16vw,170px)] dark:block"
            />
          </a>
          <nav aria-label="Planos" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {secoes.map((s) => (
                <li key={s.href}>
                  <a href={s.href} className="text-base font-medium text-foreground transition-colors hover:text-primary">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href={siteConfig.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 bg-primary px-4 text-sm font-bold uppercase tracking-wider text-primary-fg transition-[background-color,transform] hover:bg-primary-hover active:scale-[0.97]"
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Fale conosco</span>
            <span className="sm:hidden">Contato</span>
          </a>
        </Container>
      </div>

      {/* Abertura */}
      <section className="relative overflow-hidden pb-16 pt-16 lg:pb-20 lg:pt-24">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="absolute left-1/2 top-0 h-[50vw] w-[50vw] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
        </div>
        <Container className="relative">
          <Reveal>
            <div className="tech-tag mb-6 inline-block">Planos {siteConfig.name}</div>
            <h1 className="max-w-4xl">
              Seu site no ar, <span className="text-primary">rápido e cuidado</span>
            </h1>
            <p className="mt-8 max-w-2xl border-l border-primary pl-6 font-mono text-lg leading-relaxed text-muted-fg">
              Criação, hospedagem e manutenção em um lugar só. Você escolhe o plano e fala direto com quem
              faz o seu site.
            </p>
          </Reveal>

          {/* Atalhos para as seções (no celular substitui o menu) */}
          <Reveal delay={150}>
            <ul className="mt-10 flex flex-wrap gap-3">
              {secoes.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    className="inline-flex min-h-11 items-center border border-border px-5 font-mono text-sm uppercase tracking-widest text-foreground transition-[border-color,color] hover:border-primary hover:text-primary"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* Criação */}
      <section className="border-t border-border py-20 sm:py-28">
        <Container>
          <CabecalhoSecao
            id="criacao"
            tag="Criação de sites"
            titulo="Planos de criação"
            texto="Pagamento único pela criação do site. Depois de pronto, você escolhe a hospedagem e, se quiser, a manutenção."
            Icone={Globe}
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {planosCriacao.map((p, i) => (
              <Reveal key={p.nome} delay={i * 80} className="h-full">
                <CardPlano plano={p} cols="" />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Hospedagem */}
      <section className="border-t border-border bg-muted/30 py-20 sm:py-28">
        <Container>
          <CabecalhoSecao
            id="hospedagem"
            tag="Hospedagem"
            titulo="Planos de hospedagem"
            texto="O mesmo serviço em todos os planos. Quanto maior o período, menor o valor por mês."
            Icone={Server}
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {planosHospedagem.map((p, i) => (
              <Reveal key={p.nome} delay={i * 80} className="h-full">
                <CardPlano plano={p} cols="" />
              </Reveal>
            ))}
          </div>
          <Parcelamento />
        </Container>
      </section>

      {/* Manutenção */}
      <section className="border-t border-border py-20 sm:py-28">
        <Container>
          <CabecalhoSecao
            id="manutencao"
            tag="Manutenção"
            titulo="Planos de manutenção"
            texto="Cobrança mensal. Cuidamos das atualizações, da segurança e das pequenas mudanças do dia a dia, para o site não ficar parado no tempo."
            Icone={Wrench}
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {planosManutencao.map((p, i) => (
              <Reveal key={p.nome} delay={i * 80} className="h-full">
                <CardPlano plano={p} cols="" />
              </Reveal>
            ))}
          </div>
          <Parcelamento />
        </Container>
      </section>

      {/* Fecho */}
      <section className="border-t border-border bg-muted/30 py-20 sm:py-24">
        <Container className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-foreground tracking-tight">Ficou com alguma dúvida?</h2>
            <p className="mt-4 text-lg text-muted-fg">
              Chame no WhatsApp e a gente te ajuda a escolher o plano certo para o seu negócio.
            </p>
          </div>
          <a
            href={siteConfig.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-14 items-center gap-3 bg-primary px-8 text-sm font-bold uppercase tracking-widest text-primary-fg transition-[background-color,transform] hover:bg-primary-hover active:scale-[0.97]"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Fale conosco
          </a>
        </Container>
      </section>

      {/* Rodapé próprio */}
      <footer className="border-t border-border px-4 py-8 text-center text-sm text-muted-fg">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}.{" "}
          <a href={siteConfig.url} className="inline-flex min-h-11 items-center underline-offset-4 hover:text-primary hover:underline">
            Voltar para o site
          </a>
        </p>
      </footer>
    </>
  );
}
