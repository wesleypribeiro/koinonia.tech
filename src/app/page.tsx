import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import ServiceCard from "@/components/ServiceCard";
import Wordmark from "@/components/Wordmark";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Decorativo: visível só em telas grandes e no tema claro */}
        <Image
          src={`${process.env.PAGES_BASE_PATH || ''}/bg.png`}
          alt=""
          aria-hidden
          width={1184}
          height={1652}
          priority
          className="pointer-events-none absolute -right-24 -top-24 hidden w-[600px] opacity-10 dark:hidden lg:block"
        />

        <Container className="relative grid items-center gap-10 py-16 md:grid-cols-2 lg:gap-16 lg:py-24">
          <div className="order-2 md:order-1">
            <Wordmark className="mb-5 block text-3xl sm:text-4xl" />
            <h1 className="text-balance text-foreground">{siteConfig.slogan}</h1>
            <p className="mt-5 max-w-prose text-lg text-muted-fg sm:text-xl">
              Desenvolvimento de soluções, sistemas, sites institucionais e e-commerces.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/servicos"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-fg transition-colors hover:bg-primary-hover"
              >
                Nossos serviços
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/contato"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 font-medium text-foreground transition-colors hover:bg-muted"
              >
                Fale conosco
              </Link>
            </div>
          </div>

          <div className="order-1 flex justify-center md:order-2 md:justify-end">
            <Image
              src={`${process.env.PAGES_BASE_PATH || ''}/logo_only.svg`}
              alt=""
              aria-hidden
              width={420}
              height={420}
              priority
              className="h-auto w-48 sm:w-64 lg:w-[420px]"
            />
          </div>
        </Container>
      </section>

      {/* Teaser de serviços */}
      <section className="py-16 sm:py-20">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-foreground">O que fazemos</h2>
            <p className="mt-4 text-muted-fg">
              Transformamos ideias em produtos digitais sólidos, do conceito à entrega.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={i * 80} className="h-full">
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/servicos"
              className="inline-flex items-center gap-2 font-medium text-primary transition-colors hover:text-primary-hover"
            >
              Ver todos os serviços
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </Container>
      </section>

      {/* CTA final */}
      <section className="py-16">
        <Container>
          <Reveal className="rounded-2xl bg-primary px-6 py-12 text-center text-primary-fg sm:px-12 sm:py-16">
            <h2 className="text-balance text-primary-fg">Vamos construir algo juntos?</h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-fg/80">
              Conte sua ideia e descubra como podemos ajudar o seu negócio a crescer.
            </p>
            <Link
              href="/contato"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-medium text-accent-fg transition-colors hover:bg-accent-hover"
            >
              Iniciar conversa
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
