import { siteConfig } from "@/lib/site";

/** Endereço público da página de planos. */
export const planosUrl = "https://planos.koinoniadev.com.br";

/** Link de WhatsApp com mensagem pronta para o plano escolhido. */
export function waPlano(plano: string) {
  const msg = `Olá! Vim pela página de planos e tenho interesse no ${plano}.`;
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(msg)}`;
}

export const parcelamento =
  "Parcele em até 12x no cartão (com o acréscimo da maquininha).";

export type Plano = {
  nome: string;
  preco: string | null; // null = sob orçamento
  periodo?: string;
  detalhe?: string;
  destaque?: boolean;
  itens: string[];
  cta: string;
  mensagem: string;
};

/* ─────────────── Criação de sites (pagamento único) ─────────────── */

export const planosCriacao: Plano[] = [
  {
    nome: "Landing page",
    preco: "R$ 497",
    periodo: "pagamento único",
    detalhe: "Uma página focada em um objetivo: vender, captar contato ou divulgar um serviço.",
    itens: [
      "Página única com as seções que o seu negócio precisa",
      "Layout responsivo, pensado primeiro para o celular",
      "Botão de WhatsApp com mensagem pronta",
      "Otimizada para o Google (SEO básico)",
      "Certificado SSL (https)",
    ],
    cta: "Quero esse plano",
    mensagem: "plano de criação de Landing page (R$ 497)",
  },
  {
    nome: "Site institucional",
    preco: "R$ 997",
    periodo: "pagamento único",
    detalhe: "O site completo da sua empresa, com as páginas para apresentar o que você faz.",
    destaque: true,
    itens: [
      "Várias páginas (início, sobre, serviços, contato)",
      "Layout responsivo, pensado primeiro para o celular",
      "Formulário de contato e botão de WhatsApp",
      "Otimizado para o Google (SEO básico)",
      "Certificado SSL (https)",
    ],
    cta: "Quero esse plano",
    mensagem: "plano de criação de Site institucional (R$ 997)",
  },
  {
    nome: "Sistema sob medida",
    preco: null,
    detalhe: "Painéis, plataformas, lojas virtuais, integrações e automações feitas para o seu processo.",
    itens: [
      "Levantamento do que o seu negócio precisa",
      "Proposta com escopo, prazo e valor",
      "Desenvolvimento sob medida",
      "Integrações com sistemas e serviços que você já usa",
    ],
    cta: "Fale conosco",
    mensagem: "um sistema sob medida e gostaria de solicitar um orçamento",
  },
];

/* ─────────────── Hospedagem ─────────────── */

const itensHospedagem = [
  "Hospede 1 site",
  "Certificado SSL (https) grátis",
  "CDN global: o site abre rápido em qualquer lugar",
  "Servidores seguros e de alta disponibilidade",
  "Seu domínio configurado, com e sem www",
  "Cópia de segurança do site a cada atualização",
  "Suporte pelo WhatsApp em horário comercial",
];

export const planosHospedagem: Plano[] = [
  {
    nome: "Mensal",
    preco: "R$ 34,90",
    periodo: "/mês",
    detalhe: "Cobrança todo mês.",
    itens: itensHospedagem,
    cta: "Quero esse plano",
    mensagem: "plano de hospedagem Mensal (R$ 34,90/mês)",
  },
  {
    nome: "Trimestral",
    preco: "R$ 33,90",
    periodo: "/mês",
    detalhe: "3 meses por R$ 101,70.",
    itens: itensHospedagem,
    cta: "Quero esse plano",
    mensagem: "plano de hospedagem Trimestral (R$ 101,70)",
  },
  {
    nome: "Semestral",
    preco: "R$ 32,90",
    periodo: "/mês",
    detalhe: "6 meses por R$ 197,40.",
    itens: itensHospedagem,
    cta: "Quero esse plano",
    mensagem: "plano de hospedagem Semestral (R$ 197,40)",
  },
  {
    nome: "Anual",
    preco: "R$ 31,90",
    periodo: "/mês",
    detalhe: "1 ano por R$ 382,80.",
    destaque: true,
    itens: itensHospedagem,
    cta: "Quero esse plano",
    mensagem: "plano de hospedagem Anual (R$ 382,80)",
  },
];

/* ─────────────── Manutenção (mensal) ─────────────── */

const itensManutencaoBase = [
  "Atualizações de segurança",
  "Correção de erros e de site fora do ar",
  "Melhorias de desempenho",
  "Instalação de Tag do Google e Pixel do Meta",
  "Dúvidas pelo WhatsApp enquanto o plano estiver ativo",
];

export const planosManutencao: Plano[] = [
  {
    nome: "Landing page",
    preco: "R$ 99,90",
    periodo: "/mês",
    detalhe: "Para manter a sua landing page no ar, atualizada e funcionando.",
    itens: [
      "Até 3 alterações simples por mês (textos, imagens, cores e espaçamentos)",
      "Verificação mensal de formulário, WhatsApp e links",
      ...itensManutencaoBase,
    ],
    cta: "Quero esse plano",
    mensagem: "plano de manutenção para Landing page (R$ 99,90/mês)",
  },
  {
    nome: "Site institucional",
    preco: "R$ 149,90",
    periodo: "/mês",
    detalhe: "Para sites com várias páginas que mudam com frequência.",
    destaque: true,
    itens: [
      "Até 7 alterações simples por mês (textos, imagens, cores e espaçamentos)",
      "Verificação a cada 15 dias de formulário, WhatsApp e links",
      ...itensManutencaoBase,
      "Prioridade no atendimento",
    ],
    cta: "Quero esse plano",
    mensagem: "plano de manutenção para Site institucional (R$ 149,90/mês)",
  },
  {
    nome: "Sistema sob medida",
    preco: null,
    detalhe: "Manutenção e evolução contínua de sistemas, combinada conforme o projeto.",
    itens: [
      "Correções e ajustes no sistema",
      "Novas funcionalidades sob demanda",
      "Monitoramento e atualizações de segurança",
      "Atendimento combinado com o seu time",
    ],
    cta: "Fale conosco",
    mensagem: "manutenção de um sistema sob medida e gostaria de solicitar um orçamento",
  },
];
