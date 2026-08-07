import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Code, Cpu, ShieldCheck, Target, Eye, Sparkles, Handshake, Gauge, Clock, ChevronDown } from "lucide-react";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import ServiceCard from "@/components/ServiceCard";
import ProjectCarousel from "@/components/ProjectCarousel";
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
      {/* 1. Hero Section - Massive Typographic Layout & Logo */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-28 lg:pb-32">
        {/* Ambient Mouse Spotlight */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-primary/10 blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
        </div>

        <Container className="relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            {/* Texto principal */}
            <div className="max-w-3xl">
              <Reveal delay={0} direction="up">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 bg-transparent border border-primary text-primary text-xs font-mono tracking-[0.2em] uppercase">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 bg-primary"></span>
                  </span>
                  {siteConfig.name}
                </div>
              </Reveal>

              {/* Split Text Reveal logic */}
              <div className="flex flex-col gap-2">
                <Reveal delay={150} direction="up" fade>
                  <h1 className="text-foreground tracking-tighter uppercase leading-[0.9] w-full">
                    TECNOLOGIA
                  </h1>
                </Reveal>
                <Reveal delay={300} direction="up" fade>
                  <h1 className="text-foreground tracking-tighter uppercase leading-[0.9] text-muted-fg flex items-center gap-4 w-full">
                    COM
                    <span className="h-[2px] bg-primary flex-1 hidden md:block opacity-50"></span>
                  </h1>
                </Reveal>
                <Reveal delay={450} direction="up" fade>
                  <h1 className="text-primary tracking-tighter uppercase leading-[0.9] w-full">
                    PROPÓSITO
                  </h1>
                </Reveal>
              </div>

              <Reveal delay={600} direction="up">
                <p className="mt-8 max-w-2xl text-lg text-muted-fg sm:text-xl font-mono leading-relaxed text-pretty border-l border-primary pl-6">
                  Desenvolvimento sob medida para empresas que precisam de sistemas sólidos,
                  automações inteligentes e presença digital de alto nível.
                </p>
              </Reveal>

              <Reveal delay={750} direction="up">
                <div className="mt-12 flex flex-wrap items-center gap-4">
                  <Magnetic>
                    <Link
                      href="#contato"
                      className="inline-flex items-center justify-center gap-3 bg-primary px-8 py-4 font-bold text-primary-fg uppercase tracking-widest text-sm transition-all hover:bg-primary-hover shadow-[0_0_20px_rgba(var(--primary),0.2)]"
                    >
                      Iniciar Projeto
                      <ArrowRight className="h-5 w-5" aria-hidden="true" />
                    </Link>
                  </Magnetic>
                  <Magnetic>
                    <Link
                      href="#servicos"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 font-mono text-sm uppercase tracking-widest text-foreground transition-colors hover:text-primary"
                    >
                      Explorar Serviços
                      <ChevronDown className="h-4 w-4" />
                    </Link>
                  </Magnetic>
                </div>
              </Reveal>
            </div>

            {/* Imagem / Logo abstrata */}
            <div className="flex justify-center lg:justify-end">
              <Reveal delay={600} direction="left">
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[400px] lg:h-[400px]">
                  <div className="absolute inset-0 rounded-full border border-border opacity-50 border-dashed animate-spin" style={{ animationDuration: '30s' }}></div>
                  <div className="absolute inset-8 rounded-full border border-primary/30 backdrop-blur-md bg-card/20"></div>
                  <Magnetic className="absolute inset-0 flex items-center justify-center cursor-pointer">
                    <Image
                      src="/branding/simbolo_color.svg"
                      alt=""
                      width={400}
                      height={400}
                      priority
                      className="w-[clamp(220px,32vw,480px)] h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                    />
                  </Magnetic>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>

        {/* Divider / Tech Stack Marquee */}
        <div className="mt-24 border-y border-border bg-card/50 py-4 overflow-hidden whitespace-nowrap z-10 flex backdrop-blur-sm">
          <div className="flex gap-16 font-mono text-xs uppercase tracking-[0.2em] text-muted-fg animate-marquee opacity-80 min-w-max pr-16">
            <span className="flex items-center gap-2"><Code className="w-4 h-4 text-primary" /> Engenharia de Software</span>
            <span className="flex items-center gap-2"><Cpu className="w-4 h-4 text-primary" /> Alta Performance</span>
            <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> Segurança</span>
            <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-primary" /> UI/UX Design</span>
            <span className="flex items-center gap-2"><Code className="w-4 h-4 text-primary" /> Engenharia de Software</span>
            <span className="flex items-center gap-2"><Cpu className="w-4 h-4 text-primary" /> Alta Performance</span>
            <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> Segurança</span>
          </div>
          <div className="flex gap-16 font-mono text-xs uppercase tracking-[0.2em] text-muted-fg animate-marquee opacity-80 min-w-max pr-16" aria-hidden="true">
            <span className="flex items-center gap-2"><Code className="w-4 h-4 text-primary" /> Engenharia de Software</span>
            <span className="flex items-center gap-2"><Cpu className="w-4 h-4 text-primary" /> Alta Performance</span>
            <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> Segurança</span>
            <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-primary" /> UI/UX Design</span>
            <span className="flex items-center gap-2"><Code className="w-4 h-4 text-primary" /> Engenharia de Software</span>
            <span className="flex items-center gap-2"><Cpu className="w-4 h-4 text-primary" /> Alta Performance</span>
            <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> Segurança</span>
          </div>
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
            <div className="tech-tag inline-block mb-4">Projeto em Destaque</div>
            <h2 className="text-foreground tracking-tight">Portfólio</h2>
            <p className="mt-5 text-lg text-muted-fg leading-relaxed">
              Alguns dos trabalhos de excelência que já desenvolvemos.
            </p>
          </Reveal>

          <div className="mt-16">
            <ProjectCarousel projects={projects} />
          </div>
        </Container>
      </section>

      {/* 3.5 Soluções que podemos desenvolver */}
      <section className="py-20 sm:py-28 border-b border-border">
        <Container>
          <Reveal className="max-w-3xl mx-auto text-center mb-16">
            <div className="tech-tag inline-block mb-4">Soluções que podemos desenvolver</div>
            <h2 className="text-foreground tracking-tight text-3xl sm:text-4xl">Exemplos de Soluções</h2>
            <p className="mt-5 text-lg text-muted-fg leading-relaxed">
              Desenvolvemos diversos tipos de sistemas para acelerar o seu negócio.
            </p>
          </Reveal>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Reveal delay={0} className="h-full">
              <div className="bento-card p-6 sm:p-8 h-full flex flex-col justify-center text-center">
                <h3 className="text-xl font-bold mb-3 text-foreground">Plataformas de gestão</h3>
                <p className="text-muted-fg">Automação de processos internos, painéis administrativos e relatórios em tempo real.</p>
              </div>
            </Reveal>
            <Reveal delay={80} className="h-full">
              <div className="bento-card p-6 sm:p-8 h-full flex flex-col justify-center text-center">
                <h3 className="text-xl font-bold mb-3 text-foreground">Sites institucionais & Landing pages</h3>
                <p className="text-muted-fg">Presença digital responsiva, otimizada para SEO e voltada à geração de contatos.</p>
              </div>
            </Reveal>
            <Reveal delay={160} className="h-full sm:col-span-2 lg:col-span-1">
              <div className="bento-card p-6 sm:p-8 h-full flex flex-col justify-center text-center">
                <h3 className="text-xl font-bold mb-3 text-foreground">Lojas virtuais</h3>
                <p className="text-muted-fg">E-commerces completos, integrados e otimizados para maximizar as vendas.</p>
              </div>
            </Reveal>
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
                unindo tecnologia, propósito e extrema atenção aos detalhes. Não entregamos apenas código.
                Entregamos parceria e resultados reais.
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
                <div className="absolute -bottom-8 -right-8 opacity-[0.03] text-foreground pointer-events-none">
                  <Target className="w-64 h-64" />
                </div>

                <h3 className="text-2xl font-bold mb-8 relative z-10">Nossos Valores Fundamentais</h3>
                <ul className="space-y-6 text-lg relative z-10">
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
                  Preencha o formulário e conte um pouco sobre o seu projeto. Entraremos em contato para entender como podemos ajudar.
                </p>
                <ContactForm />
              </div>
            </Reveal>

            <Reveal delay={200} className="flex flex-col gap-8">
              <div className="rounded-2xl p-6 sm:p-8 bg-primary text-primary-fg shadow-lg shadow-primary/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                <h3 className="text-xl font-semibold mb-2 relative z-10">Contato Rápido</h3>
                <p className="text-primary-fg/90 mb-6 relative z-10">
                  Prefere falar agora? O WhatsApp é o caminho mais rápido para alinhar ideias.
                </p>
                <Magnetic>
                  <a
                    href={siteConfig.whatsapp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 font-medium text-white transition-all hover:scale-105 hover:opacity-90 shadow-lg"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    Falar no WhatsApp
                  </a>
                </Magnetic>
              </div>

              <div className="bento-card p-6 sm:p-8">
                <ul className="space-y-6">

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
