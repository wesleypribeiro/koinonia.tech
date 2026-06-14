import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Code, Cpu, ShieldCheck, Target, Eye, Sparkles, Handshake, Gauge, Mail, Clock } from "lucide-react";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import ServiceCard from "@/components/ServiceCard";
import ProjectCard from "@/components/ProjectCard";
import ContactForm from "@/components/ContactForm";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { services } from "@/lib/services";
import { projects } from "@/lib/projects";
import { siteConfig } from "@/lib/site";

// Dados da seção "Sobre"
const differentials = [
  { icon: Sparkles, title: "Código sob medida", text: "Soluções desenhadas para o seu contexto, sem amarras de templates." },
  { icon: Gauge, title: "Performance e SEO", text: "Sites e sistemas rápidos, acessíveis e bem posicionados nas buscas." },
  { icon: Target, title: "Foco no resultado", text: "Tecnologia a serviço dos objetivos do seu negócio." },
];

export default function Home() {
  return (
    <>
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-28 lg:pb-32">
        <div className="glow-bg" />

        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            {/* Texto principal */}
            <div className="max-w-3xl">
              <Reveal delay={0}>
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-mono tracking-wider uppercase">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  [ status: ready_to_build ]
                </div>

                <h1 className="text-foreground tracking-tight text-balance">
                  {siteConfig.slogan}
                </h1>

                <p className="mt-6 max-w-2xl text-lg text-muted-fg sm:text-xl leading-relaxed text-pretty">
                  Desenvolvimento sob medida para empresas que precisam de sistemas sólidos,
                  automações inteligentes e presença digital de alto nível.
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Link
                    href="#contato"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-8 py-4 font-semibold text-accent-fg transition-all hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Iniciar Projeto
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </Link>
                  <Link
                    href="#servicos"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-8 py-4 font-medium text-foreground transition-colors hover:bg-muted focus-visible:ring-2"
                  >
                    Explorar Serviços
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Imagem / Logo abstrata */}
            <div className="flex justify-center lg:justify-end">
              <Reveal delay={200}>
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[400px] lg:h-[400px]">
                  <div className="absolute inset-0 rounded-full border border-border opacity-50 border-dashed animate-spin" style={{ animationDuration: '30s' }}></div>
                  <div className="absolute inset-8 rounded-full border border-primary/30 backdrop-blur-md bg-card/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src="/logo_only.svg"
                      alt="Logo Koinonia Tech"
                      width={200}
                      height={200}
                      priority
                      className="w-32 h-32 sm:w-40 sm:h-40 drop-shadow-2xl"
                    />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>

        {/* Divider / Tech Stack Marquee */}
        <div className="mt-24 border-y border-border bg-muted/30 py-6">
          <Container>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-muted-fg font-mono text-sm uppercase tracking-widest opacity-80">
              <div className="flex items-center gap-2"><Code className="w-5 h-5" /> Modern Stack</div>
              <div className="flex items-center gap-2"><Cpu className="w-5 h-5" /> High Performance</div>
              <div className="flex items-center gap-2"><ShieldCheck className="w-5 h-5" /> Secure by Design</div>
            </div>
          </Container>
        </div>
      </section>

      {/* 2. Serviços (Bento Grid) */}
      <section id="servicos" className="py-20 sm:py-28 relative scroll-mt-20">
        <Container>
          <Reveal className="max-w-3xl">
            <div className="tech-tag inline-block mb-4">Nossos Serviços</div>
            <h2 className="text-foreground tracking-tight">Expertise em software</h2>
            <p className="mt-5 text-lg text-muted-fg leading-relaxed text-pretty">
              Transformamos ideias complexas em produtos digitais elegantes, escaláveis e focados em resultados.
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              let spanClass = "";
              if (i === 0) spanClass = "md:col-span-2 lg:col-span-2";
              else if (i === 3) spanClass = "md:col-span-2 lg:col-span-1";

              return (
                <Reveal key={service.slug} delay={i * 80} className={`h-full ${spanClass}`}>
                  <ServiceCard service={service} detailed={true} />
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 3. Portfólio */}
      <section id="portfolio" className="py-20 sm:py-28 bg-muted/30 border-y border-border scroll-mt-20">
        <Container>
          <Reveal className="max-w-3xl mx-auto text-center">
            <div className="tech-tag inline-block mb-4">Projetos em Destaque</div>
            <h2 className="text-foreground tracking-tight">Portfólio</h2>
            <p className="mt-5 text-lg text-muted-fg leading-relaxed">
              Alguns dos trabalhos de excelência que já desenvolvemos.
            </p>
          </Reveal>

          <div className="mt-16">
            {projects.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, i) => (
                  <Reveal key={project.title} delay={i * 80} className="h-full">
                    <ProjectCard project={project} />
                  </Reveal>
                ))}
              </div>
            ) : (
              <Reveal className="mx-auto max-w-md rounded-xl border border-dashed border-border bg-card p-12 text-center">
                <p className="text-muted-fg">Em breve, nossos projetos aqui.</p>
              </Reveal>
            )}
          </div>
        </Container>
      </section>

      {/* 4. Sobre & Diferenciais */}
      <section id="sobre" className="py-20 sm:py-28 scroll-mt-20">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <Reveal>
              <div className="tech-tag inline-block mb-4">Sobre Nós</div>
              <h2 className="text-foreground tracking-tight">Por que a {siteConfig.name}?</h2>
              <p className="mt-5 text-lg text-muted-fg leading-relaxed text-pretty">
                Nossa missão é entregar soluções de software que geram valor real para nossos clientes,
                unindo tecnologia, propósito e extrema atenção aos detalhes. Não entregamos apenas código,
                entregamos parceira e resultados reais.
              </p>

              <div className="mt-8 flex flex-col gap-6">
                {differentials.map((d) => (
                  <div key={d.title} className="flex gap-4 items-start">
                    <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <d.icon className="h-5 w-5" aria-hidden />
                    </div>
                    <div>
                      <h3 className="text-foreground text-lg font-semibold">{d.title}</h3>
                      <p className="mt-1 text-muted-fg text-sm">{d.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={200} className="h-full">
              <div className="relative rounded-2xl bg-card border border-border p-8 h-full flex flex-col justify-center overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>

                <h3 className="text-xl font-semibold mb-6">Nossos Valores Fundamentais</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    <span><strong>Qualidade:</strong> Código limpo, testado e construído para durar.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Eye className="w-5 h-5 text-primary" />
                    <span><strong>Transparência:</strong> Comunicação clara e honesta em cada etapa.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Handshake className="w-5 h-5 text-primary" />
                    <span><strong>Parceria:</strong> Trabalhamos lado a lado com o seu time.</span>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 5. Contato */}
      <section id="contato" className="py-20 sm:py-28 bg-muted/30 border-t border-border scroll-mt-20">
        <Container>
          <Reveal className="max-w-3xl mb-12">
            <div className="tech-tag inline-block mb-4">Contato</div>
            <h2 className="text-foreground tracking-tight">Vamos construir algo incrível.</h2>
            <p className="mt-5 text-lg text-muted-fg leading-relaxed">
              Conte sobre o seu projeto e descubra como podemos ajudar o seu negócio a decolar.
            </p>
          </Reveal>

          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal delay={100}>
              <div className="bento-card p-6 sm:p-8 h-full">
                <h3 className="text-2xl text-foreground font-semibold">Envie uma mensagem</h3>
                <p className="mt-2 text-sm text-muted-fg mb-6">
                  Preencha o formulário e abriremos o seu e-mail com tudo pronto para enviar.
                </p>
                <ContactForm />
              </div>
            </Reveal>

            <Reveal delay={200} className="flex flex-col gap-8">
              <div className="bento-card p-6 sm:p-8 bg-primary text-primary-fg border-none">
                <h3 className="text-xl font-semibold mb-2">Contato Rápido</h3>
                <p className="text-primary-fg/80 mb-6">
                  Prefere falar agora? O WhatsApp é o caminho mais rápido para alinhar ideias.
                </p>
                <a
                  href={siteConfig.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 font-medium text-white transition-opacity hover:opacity-90 shadow-lg"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Falar no WhatsApp
                </a>
              </div>

              <div className="bento-card p-6 sm:p-8">
                <ul className="space-y-6">
                  <li className="flex items-center gap-4">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Mail className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">E-mail Direto</p>
                      <a href={`mailto:${siteConfig.email}`} className="text-muted-fg transition-colors hover:text-primary">
                        {siteConfig.email}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Clock className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Horário de Atendimento</p>
                      <p className="text-muted-fg">Segunda a sexta, das 9h às 18h</p>
                    </div>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
