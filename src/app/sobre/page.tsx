import type { Metadata } from "next";
import { Target, Eye, ShieldCheck, Sparkles, Handshake, Gauge } from "lucide-react";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre",
  description: `Conheça a ${siteConfig.name}: nossa missão, visão, valores e os diferenciais que entregamos em cada projeto.`,
};

const values = [
  { icon: ShieldCheck, title: "Qualidade", text: "Código limpo, testado e construído para durar." },
  { icon: Eye, title: "Transparência", text: "Comunicação clara e honesta em cada etapa." },
  { icon: Handshake, title: "Parceria", text: "Trabalhamos lado a lado com o seu time." },
  { icon: Sparkles, title: "Inovação", text: "Tecnologias modernas para resolver problemas reais." },
];

const differentials = [
  { icon: Sparkles, title: "Código sob medida", text: "Soluções desenhadas para o seu contexto, sem amarras de templates." },
  { icon: Gauge, title: "Performance e SEO", text: "Sites e sistemas rápidos, acessíveis e bem posicionados nas buscas." },
  { icon: Target, title: "Foco no resultado", text: "Tecnologia a serviço dos objetivos do seu negócio." },
];

export default function SobrePage() {
  return (
    <>
      <PageHeader
        title={`Sobre a ${siteConfig.name}`}
        subtitle="Somos uma agência de desenvolvimento de software focada em transformar ideias em produtos digitais sólidos."
      />

      {/* Missão e Visão */}
      <section className="py-16 sm:py-20">
        <Container className="grid gap-8 md:grid-cols-2">
          <Reveal className="rounded-xl border border-border bg-card p-8">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Target className="h-6 w-6" aria-hidden />
            </div>
            <h2 className="mt-4 text-2xl text-foreground">Missão</h2>
            <p className="mt-3 text-muted-fg">
              Entregar soluções de software que geram valor real para nossos clientes, unindo
              tecnologia, propósito e atenção aos detalhes.
            </p>
          </Reveal>
          <Reveal delay={100} className="rounded-xl border border-border bg-card p-8">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Eye className="h-6 w-6" aria-hidden />
            </div>
            <h2 className="mt-4 text-2xl text-foreground">Visão</h2>
            <p className="mt-3 text-muted-fg">
              Ser referência em desenvolvimento de software sob medida, reconhecida pela qualidade
              das entregas e pela proximidade com cada cliente.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Valores */}
      <section className="bg-muted py-16 sm:py-20">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-foreground">Nossos valores</h2>
            <p className="mt-4 text-muted-fg">Os princípios que guiam o nosso trabalho.</p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div className="h-full rounded-xl border border-border bg-card p-6">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent/15 text-accent-hover">
                    <v.icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="mt-4 text-foreground">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted-fg">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Diferenciais */}
      <section className="py-16 sm:py-20">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-foreground">Por que a {siteConfig.name}</h2>
            <p className="mt-4 text-muted-fg">O que nos diferencia na hora de construir o seu projeto.</p>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {differentials.map((d, i) => (
              <Reveal key={d.title} delay={i * 80}>
                <div className="flex h-full gap-4 rounded-xl border border-border bg-card p-6">
                  <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <d.icon className="h-5 w-5" aria-hidden />
                  </div>
                  <div>
                    <h3 className="text-foreground">{d.title}</h3>
                    <p className="mt-2 text-sm text-muted-fg">{d.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
