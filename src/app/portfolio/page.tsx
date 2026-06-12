import type { Metadata } from "next";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import PageHeader from "@/components/PageHeader";
import ProjectCard from "@/components/ProjectCard";
import CTASection from "@/components/CTASection";
import { projects } from "@/lib/projects";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Portfólio",
  description: `Conheça alguns dos projetos desenvolvidos pela ${siteConfig.name}.`,
};

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        title="Portfólio"
        subtitle="Alguns dos projetos que já desenvolvemos."
      />

      <section className="py-16 sm:py-20">
        <Container>
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
        </Container>
      </section>

      <CTASection
        title="Quer ver o seu projeto aqui?"
        description="Vamos transformar a sua ideia no próximo case de sucesso."
      />
    </>
  );
}
