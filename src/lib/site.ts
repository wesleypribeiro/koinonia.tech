// Configuração central do site — troque os PLACEHOLDERs pelos dados reais.

const whatsappNumber = "5512988993144"; // PLACEHOLDER: DDI+DDD+número, só dígitos (ex.: 5511999998888)
const whatsappMessage = "Olá! Vim pelo site e gostaria de conversar sobre um projeto.";

export const siteConfig = {
  name: "Koinonia Tech",
  slogan: "Tecnologia com propósito",
  description:
    "Agência de desenvolvimento de software: sistemas sob medida, sites institucionais, e-commerces, automação com IA e consultoria.",
  url: "https://koinoniatech.com.br", // PLACEHOLDER: domínio real
  email: "contato@koinoniatech.com.br", // PLACEHOLDER
  whatsapp: {
    number: whatsappNumber,
    display: "(12) 98899-3144", // PLACEHOLDER
    href: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
  },
  socials: {
    linkedin: "https://linkedin.com/company/koinonia-tech", // PLACEHOLDER
    instagram: "https://instagram.com/koinonia.tech", // PLACEHOLDER
    github: "https://github.com/koinonia-tech", // PLACEHOLDER
  },
} as const;

export type NavItem = { href: string; label: string };

export const navItems: NavItem[] = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
  { href: "/servicos", label: "Serviços" },
  { href: "/portfolio", label: "Portfólio" },
  { href: "/contato", label: "Contato" },
];
