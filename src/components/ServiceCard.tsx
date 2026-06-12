import type { Service } from "@/lib/services";

type ServiceCardProps = {
  service: Service;
  /** Mostra a lista de bullets (usado na página de serviços). */
  detailed?: boolean;
};

export default function ServiceCard({ service, detailed = false }: ServiceCardProps) {
  const { icon: Icon, title, short, description, bullets } = service;

  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-lg">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-6 w-6" aria-hidden />
      </div>
      <h3 className="mt-4 text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-fg">
        {detailed ? description : short}
      </p>

      {detailed && (
        <ul className="mt-4 space-y-2 text-sm text-muted-fg">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              {b}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
