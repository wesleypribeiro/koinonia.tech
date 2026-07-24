import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { projects } from "@/lib/projects";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";

/* ──────────────────────────────── Data ──────────────────────────────── */

const links = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    description:
      "Solicite um orçamento ou tire dúvidas sobre nossos serviços.",
    cta: "Enviar mensagem",
    href: siteConfig.whatsapp.href,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-7 h-7"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    accent: "whatsapp",
  },
  {
    id: "site",
    label: "Nosso Site",
    description:
      "Conheça nossos serviços, diferenciais e como trabalhamos.",
    cta: "Acessar site",
    href: siteConfig.url,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-7 h-7"
        aria-hidden="true"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    accent: "primary",
  },
  {
    id: "portfolio",
    label: "Portfólio",
    description: "Veja nossos projetos em destaque e resultados reais.",
    cta: "Ver projetos",
    href: `${siteConfig.url}/#portfolio`,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-7 h-7"
        aria-hidden="true"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    accent: "gold",
  },
];

const socials = [
  {
    label: "Instagram",
    href: siteConfig.socials.instagram,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: siteConfig.socials.linkedin,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

/* ──────────────────────────────── Page ──────────────────────────────── */

export default function BioPage() {
  return (
    <main className="min-h-[100dvh] bg-background text-foreground py-16 px-6 overflow-x-hidden flex flex-col items-center">
      
      {/* Decorative background layers */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-lg flex flex-col gap-12 relative z-10">
        
        {/* Header */}
        <header className="flex flex-col items-center text-center gap-4">
          <Reveal>
            <Magnetic className="inline-block">
              <Link href="/" className="relative flex items-center justify-center w-28 h-28 rounded-full border border-primary/20 bg-card/50 backdrop-blur-md overflow-hidden hover:scale-105 transition-transform duration-500 shadow-xl shadow-primary/10">
                <Image
                  src="/logo_only.svg"
                  alt="Logo Koinonia Tech"
                  width={80}
                  height={80}
                  priority
                  className="drop-shadow-lg"
                />
              </Link>
            </Magnetic>
          </Reveal>

          <Reveal delay={150}>
            <Link href="/">
              <h1 className="text-3xl font-bold tracking-tighter uppercase text-foreground">
                {siteConfig.name}
              </h1>
            </Link>
          </Reveal>

          <Reveal delay={250}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-mono tracking-widest uppercase border border-primary/20">
              {siteConfig.slogan}
            </div>
          </Reveal>

          <Reveal delay={350}>
            <div className="flex gap-4 mt-2">
              {socials.map((s) => (
                <Magnetic key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-card border border-border text-muted-fg hover:text-primary hover:border-primary transition-all shadow-sm hover:-translate-y-1"
                  >
                    <div className="w-5 h-5">{s.icon}</div>
                  </a>
                </Magnetic>
              ))}
            </div>
          </Reveal>
        </header>

        {/* Links Cards */}
        <section className="flex flex-col gap-4">
          {links.map((link, i) => (
            <Reveal key={link.id} delay={450 + (i * 100)} direction="up">
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-6 p-5 rounded-2xl bg-card border border-border overflow-hidden transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary border border-primary/20 group-hover:scale-110 transition-transform duration-500">
                  {link.icon}
                </div>

                <div className="relative z-10 flex-1 flex flex-col">
                  <h2 className="text-lg font-bold">{link.label}</h2>
                  <p className="text-sm text-muted-fg mt-1 line-clamp-2">{link.description}</p>
                </div>

                <div className="relative z-10 text-primary transition-transform duration-300 group-hover:translate-x-1">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            </Reveal>
          ))}
        </section>

        {/* Portfólio Preview */}
        {projects.length > 0 && (
          <section className="flex flex-col gap-6 mt-4">
            <Reveal delay={700}>
              <h2 className="text-sm font-bold uppercase tracking-widest text-muted-fg text-center">
                Portfólio em Destaque
              </h2>
            </Reveal>

            <div className="grid grid-cols-2 gap-4">
              {projects.slice(0, 6).map((project, i) => (
                <Reveal key={project.title} delay={800 + (i * 100)} scale>
                  <a
                    href={project.url || `${siteConfig.url}/#portfolio`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block aspect-[4/3] rounded-xl overflow-hidden border border-border bg-card"
                  >
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-primary/5 text-primary text-xs uppercase font-bold text-center p-2">
                        {project.category}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute inset-x-0 bottom-0 p-3">
                      <p className="text-xs font-bold text-foreground truncate">{project.title}</p>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <Reveal delay={1200} direction="up">
          <Magnetic className="block">
            <a
              href={siteConfig.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-5 rounded-2xl bg-primary text-primary-fg font-bold text-lg shadow-lg shadow-primary/20 hover:-translate-y-1 hover:shadow-primary/40 transition-all"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              Quero um projeto incrível
            </a>
          </Magnetic>
        </Reveal>

        {/* Footer */}
        <footer className="mt-8 flex flex-col items-center text-center gap-4">
          <Reveal delay={1300}>
            <div className="flex items-center gap-2 text-foreground font-bold text-sm">
              <Image src="/logo_only.svg" alt="" width={20} height={20} />
              {siteConfig.name}
            </div>
            <p className="text-xs text-muted-fg mt-2">
              © {new Date().getFullYear()} · Todos os direitos reservados
            </p>
          </Reveal>
        </footer>
      </div>
    </main>
  );
}
