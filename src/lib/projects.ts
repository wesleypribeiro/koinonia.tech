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
];
