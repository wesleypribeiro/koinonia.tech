import Link from "next/link";
import { Mail } from "lucide-react";
import { navItems, siteConfig } from "@/lib/site";
import WhatsAppIcon from "./icons/WhatsAppIcon";
import { LinkedinIcon, InstagramIcon, GithubIcon } from "./icons/SocialIcons";
import Brand from "./Brand";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border bg-muted text-muted-fg">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        {/* Marca */}
        <div>
          <Brand />
          <p className="mt-4 max-w-xs text-sm leading-relaxed">{siteConfig.description}</p>
        </div>

        {/* Navegação */}
        <nav aria-label="Rodapé">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">Navegação</h2>
          <ul className="mt-4 space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm transition-colors hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contato + redes */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">Contato</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-primary"
              >
                <Mail className="h-4 w-4" aria-hidden />
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-primary"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </a>
            </li>
          </ul>

          <div className="mt-5 flex items-center gap-3">
            <a
              href={siteConfig.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-fg transition-colors hover:border-primary hover:text-primary"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-fg transition-colors hover:border-primary hover:text-primary"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-fg transition-colors hover:border-primary hover:text-primary"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border px-4 py-6 text-center text-sm sm:px-6 lg:px-8">
        © {year} {siteConfig.name}. Todos os direitos reservados.
      </div>
    </footer>
  );
}
