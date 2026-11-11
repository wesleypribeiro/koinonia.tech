// Configuração central do site — troque os PLACEHOLDERs pelos dados reais.

const whatsappNumber = "5512997152029"; // DDI+DDD+número, só dígitos
const whatsappMessage = "Olá! Vim pelo site e gostaria de conversar sobre um projeto.";

export const siteConfig = {
  name: "Koinonia Dev",
  slogan: "Tecnologia com propósito",
  description:
    "Agência de desenvolvimento de software: sistemas sob medida, sites institucionais, e-commerces, automação com IA e consultoria.",
  // Endereço oficial. A Vercel redireciona koinoniadev.com.br para o www,
  // então canonical, sitemap e Open Graph precisam usar o www.
  url: "https://www.koinoniadev.com.br",
  email: "contato@koinoniadev.com.br", // PLACEHOLDER
  whatsapp: {
    number: whatsappNumber,
    display: "(12) 99715-2029",
    href: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
  },
  socials: {
    linkedin: "https://linkedin.com/company/koinonia-dev", // PLACEHOLDER
    instagram: "https://www.instagram.com/koinoniadev/",
    github: "https://github.com/koinonia-dev", // PLACEHOLDER
  },
} as const;

export type NavItem = { href: string; label: string };

export const navItems: NavItem[] = [
  { href: "/", label: "Início" },
  { href: "/#servicos", label: "Serviços" },
  { href: "/#portfolio", label: "Portfólio" },
  { href: "/#sobre", label: "Sobre Nós" },
  { href: "/#contato", label: "Contato" },
];
