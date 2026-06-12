import Image from "next/image";
import { ArrowUpRight, ImageIcon } from "lucide-react";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const { title, category, description, image, url } = project;

  const content = (
    <>
      <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-muted">
        {image ? (
          <Image src={image} alt={title} fill className="object-cover" />
        ) : (
          <ImageIcon className="h-10 w-10 text-muted-fg/40" aria-hidden />
        )}
      </div>
      <div className="p-5">
        <span className="text-xs font-semibold uppercase tracking-wide text-accent-hover">
          {category}
        </span>
        <h3 className="mt-1 flex items-center gap-1 text-foreground">
          {title}
          {url && <ArrowUpRight className="h-4 w-4 text-muted-fg" aria-hidden />}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-fg">{description}</p>
      </div>
    </>
  );

  const className =
    "group block h-full overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg";

  return url ? (
    <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
}
