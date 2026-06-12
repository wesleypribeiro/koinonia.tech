import type { Metadata } from "next";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import PageHeader from "@/components/PageHeader";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Sistemas sob medida, sites institucionais, e-commerces e consultoria — soluções de software completas para o seu negócio.",
};

export default function ServicosPage() {
  return (
    <>
      <PageHeader
        title="Nossos serviços"
        subtitle="Soluções de software completas, do conceito à entrega, pensadas para o seu negócio."
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={i * 80} className="h-full">
                <ServiceCard service={service} detailed />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title="Tem um projeto em mente?"
        description="Conte o que você precisa e vamos desenhar a melhor solução juntos."
      />
    </>
  );
}
