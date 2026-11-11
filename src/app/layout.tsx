import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { Analytics } from "@vercel/analytics/next";
import { siteConfig } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Tecnologia com propósito`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Tecnologia com propósito`,
    description: siteConfig.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name}: sites, sistemas, e-commerces e automação com IA`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Tecnologia com propósito`,
    description: siteConfig.description,
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/branding/favicon_32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "KnrXdl1SMr35WJeehSvFCZ6w4e-FS7HZ0gWRYQHjAP8",
  },
};

export const viewport: Viewport = {
  themeColor: "#1F2933",
};

// Dados estruturados para o Google (só com informação que já está no site).
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.name,
  slogan: siteConfig.slogan,
  description: siteConfig.description,
  url: siteConfig.url,
  logo: `${siteConfig.url}/branding/logo_principal_horizontal_color.png`,
  image: `${siteConfig.url}/og-image.png`,
  email: siteConfig.email,
  telephone: `+${siteConfig.whatsapp.number}`,
  areaServed: "BR",
  sameAs: [siteConfig.socials.instagram],
};

// Roda antes do primeiro paint para evitar flash do tema (FOUC).
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    // Default to dark unless 'light' is explicitly chosen
    if (stored !== 'light') {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // As variáveis das fontes ficam no <html> para o tema (:root) conseguir usá-las.
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="flex min-h-dvh flex-col antialiased bg-background text-foreground">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-primary focus:px-4 focus:py-3 focus:font-semibold focus:text-primary-fg"
        >
          Pular para o conteúdo
        </a>
        <Navbar />
        <main id="conteudo" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
        <Analytics />
      </body>
    </html>
  );
}
