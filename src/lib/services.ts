import { Code2, Globe, ShoppingCart, Lightbulb, Bot, type LucideIcon } from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: LucideIcon;
  bullets: string[];
};

export const services: Service[] = [
  {
    slug: "sistemas",
    title: "Sistemas sob medida",
    short: "Aplicações e plataformas para automatizar os seus processos.",
    description:
      "Desenvolvemos sistemas web sob medida — de painéis administrativos a plataformas completas — para automatizar processos, integrar dados e dar escala ao seu negócio.",
    icon: Code2,
    bullets: [
      "Painéis e dashboards administrativos",
      "Integrações com APIs e serviços externos",
      "Automação de fluxos e relatórios",
    ],
  },
  {
    slug: "sites-institucionais",
    title: "Sites institucionais & Landing pages",
    short: "Presença digital profissional, rápida e otimizada para conversão.",
    description:
      "Criamos sites institucionais e landing pages modernos, responsivos e otimizados para mecanismos de busca, que transmitem credibilidade e convertem visitantes em clientes.",
    icon: Globe,
    bullets: [
      "Design responsivo e focado em conversão",
      "Performance e otimização para SEO",
      "Fácil de atualizar e evoluir",
    ],
  },
  {
    slug: "e-commerces",
    title: "E-commerces",
    short: "Lojas virtuais completas, integradas a pagamentos e gestão.",
    description:
      "Construímos lojas virtuais completas, integradas a meios de pagamento, controle de estoque e gestão de pedidos, prontas para vender com segurança.",
    icon: ShoppingCart,
    bullets: [
      "Integração com gateways de pagamento",
      "Gestão de produtos, estoque e pedidos",
      "Checkout rápido e seguro",
    ],
  },
  {
    slug: "automacao",
    title: "Automação & IA",
    short: "Fluxos inteligentes com IA, WhatsApp e n8n para automatizar o seu dia a dia.",
    description:
      "Conectamos seus sistemas e canais com automações inteligentes: agentes e assistentes de IA, atendimento e disparos no WhatsApp e orquestração de fluxos com n8n — reduzindo trabalho manual e acelerando respostas.",
    icon: Bot,
    bullets: [
      "Agentes e assistentes com IA",
      "Atendimento e automações no WhatsApp",
      "Orquestração de fluxos com n8n",
    ],
  },
];
