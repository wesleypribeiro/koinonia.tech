import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { projects } from "@/lib/projects";
import "./bio.css";

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
        className="bio-card-svg"
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
        className="bio-card-svg"
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
        className="bio-card-svg"
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
    <div className="bio-page">
      {/* Decorative background layers */}
      <div className="bio-bg-grid" aria-hidden="true" />
      <div className="bio-bg-glow bio-bg-glow--1" aria-hidden="true" />
      <div className="bio-bg-glow bio-bg-glow--2" aria-hidden="true" />
      <div className="bio-bg-glow bio-bg-glow--3" aria-hidden="true" />

      {/* Floating light particles */}
      <div className="bio-particles" aria-hidden="true">
        <span className="bio-particle" style={{ left: "12%", top: "18%", animationDelay: "0s" }} />
        <span className="bio-particle" style={{ left: "85%", top: "12%", animationDelay: "2s" }} />
        <span className="bio-particle" style={{ left: "45%", top: "65%", animationDelay: "4s" }} />
        <span className="bio-particle" style={{ left: "72%", top: "78%", animationDelay: "1s" }} />
        <span className="bio-particle" style={{ left: "28%", top: "88%", animationDelay: "3s" }} />
        <span className="bio-particle" style={{ left: "60%", top: "35%", animationDelay: "5s" }} />
      </div>

      <div className="bio-container">
        {/* ── Header ── */}
        <header className="bio-header">
          <Link href="/" aria-label="Voltar para a página inicial do site" className="bio-header-logo-link">
            <div className="bio-avatar-ring">
              <div className="bio-avatar-ring-glow" />
              <div className="bio-avatar-ring-border" />
              <div className="bio-avatar">
                <Image
                  src="/logo_only.svg"
                  alt="Logo Koinonia Tech"
                  width={96}
                  height={96}
                  priority
                  className="bio-avatar-img"
                />
              </div>
            </div>
          </Link>

          <Link href="/" className="bio-header-title-link">
            <h1 className="bio-name">{siteConfig.name}</h1>
          </Link>
          <p className="bio-tagline">{siteConfig.slogan}</p>

          {/* Social icons inline */}
          <div className="bio-socials-inline">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="bio-social-btn"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </header>

        {/* ── Link Cards ── */}
        <nav className="bio-cards" aria-label="Links úteis">
          {links.map((link, i) => (
            <a
              key={link.id}
              id={`bio-link-${link.id}`}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`bio-card bio-card--${link.accent}`}
              style={{ animationDelay: `${i * 120 + 300}ms` }}
            >
              {/* Glow icon */}
              <div className="bio-card-icon-area">
                <div className="bio-card-icon-glow" />
                <div className="bio-card-icon">{link.icon}</div>
              </div>

              {/* Content */}
              <div className="bio-card-content">
                <h2 className="bio-card-title">{link.label}</h2>
                <p className="bio-card-desc">{link.description}</p>
                <span className="bio-card-cta">
                  {link.cta}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="bio-card-cta-arrow"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </nav>

        {/* ── Portfolio Preview ── */}
        {projects.length > 0 && (
          <section className="bio-portfolio">
            <h2 className="bio-portfolio-title">Portfólio</h2>
            <div className="bio-portfolio-grid">
              {projects.slice(0, 6).map((project) => (
                <a
                  key={project.title}
                  href={project.url || `${siteConfig.url}/#portfolio`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bio-portfolio-card"
                  aria-label={`Projeto: ${project.title}`}
                >
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={400}
                      height={240}
                      className="bio-portfolio-img"
                    />
                  ) : (
                    <div className="bio-portfolio-placeholder">
                      <div className="bio-portfolio-placeholder-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                        </svg>
                      </div>
                      <span className="bio-portfolio-placeholder-badge">{project.category}</span>
                    </div>
                  )}
                  <div className="bio-portfolio-overlay">
                    <span className="bio-portfolio-name">{project.title}</span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* ── CTA Button ── */}
        <div className="bio-cta-wrap">
          <a
            href={siteConfig.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="bio-cta"
          >
            <span className="bio-cta-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
            Quero um site que gere resultados
          </a>
        </div>

        {/* ── Footer ── */}
        <footer className="bio-footer">
          <div className="bio-footer-brand">
            <Image
              src="/logo_only.svg"
              alt=""
              aria-hidden="true"
              width={28}
              height={28}
              className="bio-footer-logo"
            />
            <span className="bio-footer-name">{siteConfig.name}</span>
          </div>

          <div className="bio-footer-contacts">
            <a href={siteConfig.whatsapp.href} target="_blank" rel="noopener noreferrer" className="bio-footer-link">
              <svg viewBox="0 0 24 24" fill="currentColor" className="bio-footer-icon" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {siteConfig.whatsapp.display}
            </a>
            <a href={siteConfig.socials.instagram} target="_blank" rel="noopener noreferrer" className="bio-footer-link">
              <svg viewBox="0 0 24 24" fill="currentColor" className="bio-footer-icon" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              @koinonia.tech
            </a>
          </div>

          <p className="bio-footer-copy">
            {siteConfig.name} © {new Date().getFullYear()} · Todos os direitos reservados
          </p>
        </footer>
      </div>
    </div>
  );
}
