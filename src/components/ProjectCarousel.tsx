"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/lib/projects";

export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!projects || projects.length === 0) {
    return (
      <div className="mx-auto max-w-md rounded-xl border border-dashed border-border bg-card p-12 text-center">
        <p className="text-muted-fg">Em breve, nossos projetos aqui.</p>
      </div>
    );
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  return (
    <div className="relative mx-auto w-full max-w-3xl px-1 sm:px-12">
      <div className="overflow-hidden rounded-xl">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {projects.map((project) => (
            <div key={project.title} className="w-full shrink-0">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>

      {projects.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-background/80 p-2 text-foreground shadow-md backdrop-blur-md transition-colors hover:bg-muted focus:outline-none sm:-left-4"
            aria-label="Projeto anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-background/80 p-2 text-foreground shadow-md backdrop-blur-md transition-colors hover:bg-muted focus:outline-none sm:-right-4"
            aria-label="Próximo projeto"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {projects.length > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2.5 rounded-full transition-all ${
                currentIndex === i ? "w-8 bg-primary" : "w-2.5 bg-muted-fg/30 hover:bg-muted-fg/50"
              }`}
              aria-label={`Ir para projeto ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
