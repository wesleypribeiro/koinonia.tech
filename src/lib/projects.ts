export type Project = {
  title: string;
  category: string;
  description: string;
  image?: string; // PLACEHOLDER: caminho em /public (ex.: "/projetos/exemplo.png")
  url?: string; // PLACEHOLDER: link do projeto, se houver
};

// PLACEHOLDER: substitua pelos projetos reais da Koinonia Tech.
export const projects: Project[] = [
  {
    title: "Cultura Americana School",
    category: "Plataforma Educacional & Lead Capture",
    description:
      "Plataforma educacional moderna com teste interativo de nivelamento em inglês (com áudio e vídeo), modais glassmórficos de captura e qualificação de leads e integração com WhatsApp.",
    image: "/projetos/cultura-americana-school.png",
    url: "https://culturaamericanaschool.com.br/",
  },
  {
    title: "Plataforma de Gestão",
    category: "Sistema sob medida",
    description:
      "Sistema web para automação de processos internos, com painel administrativo e relatórios em tempo real.",
  },
  {
    title: "Site Institucional Corporativo",
    category: "Site institucional",
    description:
      "Presença digital responsiva e otimizada para SEO, com foco em credibilidade e geração de contatos.",
  },
  {
    title: "Loja Virtual",
    category: "E-commerce",
    description:
      "E-commerce completo com integração de pagamentos, gestão de estoque e checkout otimizado.",
  },
];
