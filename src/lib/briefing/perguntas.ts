import type { Horarios, Respostas, Servico, Valor } from "./tipos";

/*
 * Todas as perguntas do briefing num lugar só. O formulário, a revisão,
 * a validação do servidor e o painel leem daqui, então mudar uma pergunta
 * aqui muda em todos eles.
 */

export type Opcao = { valor: string; rotulo: string; descricao?: string };

type Dinamico<T> = T | ((r: Respostas) => T);

type CampoBase = {
  id: string;
  rotulo: string;
  ajuda?: Dinamico<string>;
  obrigatorio?: Dinamico<boolean>;
  mostrar?: (r: Respostas) => boolean;
  /** Ocupa meia largura a partir do tablet. */
  meia?: boolean;
};

export type CampoTexto = CampoBase & {
  tipo: "texto" | "email" | "telefone";
  placeholder?: string;
  autoComplete?: string;
  max?: number;
  /** Começa preenchido com a resposta de outro campo (ex.: o mesmo WhatsApp). */
  copiaDe?: string;
};

export type CampoParagrafo = CampoBase & {
  tipo: "paragrafo";
  placeholder?: string;
  max?: number;
  linhas?: number;
};

export type CampoEscolha = CampoBase & {
  tipo: "escolha";
  opcoes: Opcao[];
  /** 3 = opções lado a lado no computador. */
  colunas?: 1 | 3;
};

export type CampoMultipla = CampoBase & {
  tipo: "multipla";
  opcoes: Opcao[];
  maximo?: number;
  /** Se definido, mostra um campo "Outro" (salvo em `${id}Outro`) com este placeholder. */
  outro?: string;
};

export type CampoLista = CampoBase & { tipo: "servicos" | "faq" };
export type CampoHorarios = CampoBase & { tipo: "horarios" };
export type CampoArquivos = CampoBase & { tipo: "arquivos" };

export type Campo =
  | CampoTexto
  | CampoParagrafo
  | CampoEscolha
  | CampoMultipla
  | CampoLista
  | CampoHorarios
  | CampoArquivos;

export type Subtitulo = {
  tipo: "subtitulo";
  id: string;
  rotulo: string;
  ajuda?: string;
  mostrar?: (r: Respostas) => boolean;
};

export type Item = Campo | Subtitulo;

export type Etapa = {
  id: string;
  titulo: string;
  descricao: string;
  servicos: Servico[];
  itens: Item[];
};

const TODOS: Servico[] = ["site", "google", "ambos"];
const COM_SITE: Servico[] = ["site", "ambos"];
const COM_GOOGLE: Servico[] = ["google", "ambos"];

export const DIAS = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

export function horariosPadrao(): Horarios {
  return {
    modo: "",
    dias: DIAS.map((dia, i) => ({
      dia,
      aberto: i < 6,
      abre: "08:00",
      fecha: i === 5 ? "12:00" : "18:00",
    })),
  };
}

const texto = (r: Respostas, id: string) => (typeof r[id] === "string" ? (r[id] as string) : "");

export const OPCOES_SERVICO: Opcao[] = [
  { valor: "site", rotulo: "Site", descricao: "O site da sua empresa, feito do zero ou refeito." },
  {
    valor: "google",
    rotulo: "Google Meu Negócio",
    descricao: "Sua empresa no Google Maps e na busca, com fotos, horário e telefone.",
  },
  { valor: "ambos", rotulo: "Os dois", descricao: "Site e perfil no Google, com as mesmas informações." },
];

export const ETAPAS: Etapa[] = [
  {
    id: "contato",
    titulo: "Seus dados",
    descricao: "Para a gente saber com quem está falando.",
    servicos: TODOS,
    itens: [
      { tipo: "texto", id: "nome", rotulo: "Seu nome completo", obrigatorio: true, autoComplete: "name", max: 120 },
      {
        tipo: "telefone",
        id: "whatsapp",
        rotulo: "WhatsApp com DDD",
        obrigatorio: true,
        placeholder: "(12) 99999-9999",
        autoComplete: "tel-national",
        meia: true,
      },
      {
        tipo: "email",
        id: "email",
        rotulo: "E-mail",
        obrigatorio: true,
        placeholder: "voce@email.com",
        autoComplete: "email",
        max: 160,
        meia: true,
      },
      {
        tipo: "multipla",
        id: "horarioContato",
        rotulo: "Melhor horário para te chamar",
        ajuda: "Pode marcar mais de um.",
        opcoes: [
          { valor: "manha", rotulo: "Manhã" },
          { valor: "tarde", rotulo: "Tarde" },
          { valor: "noite", rotulo: "Noite" },
        ],
      },
    ],
  },
  {
    id: "empresa",
    titulo: "Sua empresa",
    descricao: "O básico, que aparece em todo lugar onde a empresa estiver.",
    servicos: TODOS,
    itens: [
      {
        tipo: "texto",
        id: "empresa",
        rotulo: "Nome da empresa",
        ajuda: "Do jeito que os clientes conhecem.",
        obrigatorio: true,
        autoComplete: "organization",
        max: 120,
      },
      {
        tipo: "texto",
        id: "ramo",
        rotulo: "Ramo de atuação",
        placeholder: "Ex.: oficina mecânica, salão de beleza, advocacia",
        obrigatorio: true,
        max: 120,
        meia: true,
      },
      {
        tipo: "texto",
        id: "inicio",
        rotulo: "Desde quando a empresa existe?",
        placeholder: "Ex.: março de 2018",
        obrigatorio: true,
        max: 60,
        meia: true,
      },
      {
        tipo: "paragrafo",
        id: "historia",
        rotulo: "Conte a história da empresa",
        ajuda:
          "O que vocês fazem, para quem, e o que os clientes mais elogiam. Escreva do seu jeito, a gente arruma o texto.",
        obrigatorio: true,
        max: 4000,
        linhas: 5,
      },
      {
        tipo: "servicos",
        id: "servicos",
        rotulo: "Serviços ou produtos",
        ajuda: "Um por vez, com uma frase dizendo o que é e para quem é. Se forem muitos, coloque os principais.",
        obrigatorio: true,
      },
      {
        tipo: "subtitulo",
        id: "redes",
        rotulo: "Onde a empresa já está na internet",
        ajuda: "Preencha só o que existir.",
      },
      { tipo: "texto", id: "instagram", rotulo: "Instagram", placeholder: "@suaempresa", max: 200, meia: true },
      { tipo: "texto", id: "facebook", rotulo: "Facebook", placeholder: "Link ou nome da página", max: 200, meia: true },
      {
        tipo: "texto",
        id: "outrasRedes",
        rotulo: "Outras redes",
        placeholder: "TikTok, YouTube, LinkedIn…",
        max: 300,
        meia: true,
      },
      {
        tipo: "texto",
        id: "siteAtual",
        rotulo: "Site atual, se tiver",
        placeholder: "www.suaempresa.com.br",
        max: 200,
        meia: true,
      },
    ],
  },
  {
    id: "google",
    titulo: "Perfil no Google",
    descricao: "É o que aparece quando alguém procura a sua empresa no Google ou no Maps.",
    servicos: COM_GOOGLE,
    itens: [
      {
        tipo: "escolha",
        id: "atendimento",
        rotulo: "Como você atende os clientes?",
        obrigatorio: true,
        colunas: 3,
        opcoes: [
          { valor: "local", rotulo: "O cliente vem até mim", descricao: "Loja, consultório, oficina ou escritório." },
          { valor: "cliente", rotulo: "Eu vou até o cliente", descricao: "Atendo na casa ou na empresa dele." },
          { valor: "ambos", rotulo: "Os dois", descricao: "Tenho endereço e também atendo fora." },
        ],
      },
      {
        tipo: "paragrafo",
        id: "endereco",
        rotulo: "Endereço completo",
        ajuda: (r) =>
          texto(r, "atendimento") === "cliente"
            ? "Rua, número, bairro, cidade e CEP. O Google usa para confirmar a empresa, mas o endereço fica escondido no perfil."
            : "Rua, número, bairro, cidade e CEP.",
        obrigatorio: true,
        max: 400,
        linhas: 2,
      },
      {
        tipo: "texto",
        id: "areaAtendida",
        rotulo: "Cidades ou bairros que você atende",
        placeholder: "Ex.: São José dos Campos, Jacareí e Taubaté",
        obrigatorio: true,
        max: 300,
        mostrar: (r) => ["cliente", "ambos"].includes(texto(r, "atendimento")),
      },
      {
        tipo: "telefone",
        id: "telefonePerfil",
        rotulo: "Telefone que vai aparecer no Google",
        ajuda: "Já deixamos o seu WhatsApp. Troque se for outro número.",
        obrigatorio: true,
        placeholder: "(12) 99999-9999",
        copiaDe: "whatsapp",
      },
      { tipo: "horarios", id: "horarios", rotulo: "Horário de funcionamento", obrigatorio: true },
      {
        tipo: "texto",
        id: "obsHorario",
        rotulo: "Alguma observação sobre o horário?",
        placeholder: "Ex.: fecha para almoço das 12h às 13h",
        max: 300,
      },
    ],
  },
  {
    id: "site",
    titulo: "O site",
    descricao: "O que ele precisa fazer pela sua empresa.",
    servicos: COM_SITE,
    itens: [
      {
        tipo: "multipla",
        id: "objetivos",
        rotulo: "Para que serve o site?",
        ajuda: "Marque quantos quiser.",
        obrigatorio: true,
        outro: "Outro objetivo",
        opcoes: [
          { valor: "apresentar", rotulo: "Apresentar a empresa" },
          { valor: "orcamentos", rotulo: "Receber pedidos de orçamento" },
          { valor: "vender", rotulo: "Vender produtos" },
          { valor: "agendar", rotulo: "Receber agendamentos" },
          { valor: "portfolio", rotulo: "Mostrar trabalhos feitos" },
          { valor: "informar", rotulo: "Passar informações aos clientes" },
        ],
      },
      {
        tipo: "escolha",
        id: "acaoPrincipal",
        rotulo: "O que a pessoa deve fazer ao entrar no site?",
        ajuda: "A ação mais importante. Ela ganha o maior botão da página.",
        obrigatorio: true,
        opcoes: [
          { valor: "whatsapp", rotulo: "Chamar no WhatsApp" },
          { valor: "formulario", rotulo: "Pedir orçamento pelo formulário" },
          { valor: "ligar", rotulo: "Ligar" },
          { valor: "agendar", rotulo: "Agendar um horário" },
          { valor: "comprar", rotulo: "Comprar pelo site" },
          { valor: "visitar", rotulo: "Ir até a loja" },
        ],
      },
      {
        tipo: "telefone",
        id: "whatsappSite",
        rotulo: "WhatsApp que vai aparecer no site",
        ajuda: "Já deixamos o seu. Troque se for outro número.",
        placeholder: "(12) 99999-9999",
        copiaDe: "whatsapp",
      },
      {
        tipo: "multipla",
        id: "secoes",
        rotulo: "O que não pode faltar no site?",
        outro: "Outra coisa",
        opcoes: [
          { valor: "servicos", rotulo: "Serviços" },
          { valor: "depoimentos", rotulo: "Depoimentos de clientes" },
          { valor: "faq", rotulo: "Perguntas frequentes" },
          { valor: "pagamento", rotulo: "Formas de pagamento" },
          { valor: "trabalhos", rotulo: "Fotos de trabalhos" },
          { valor: "clientes", rotulo: "Clientes atendidos" },
          { valor: "equipe", rotulo: "Equipe" },
          { valor: "precos", rotulo: "Preços" },
          { valor: "mapa", rotulo: "Mapa e endereço" },
          { valor: "horario", rotulo: "Horário de funcionamento" },
        ],
      },
      {
        tipo: "faq",
        id: "faq",
        rotulo: "Perguntas que os clientes sempre fazem",
        ajuda: "Coloque de 3 a 5, com a resposta que você costuma dar. Elas viram a parte de dúvidas do site.",
      },
    ],
  },
  {
    id: "visual",
    titulo: "Visual e domínio",
    descricao: "Como a empresa deve parecer, e em que endereço o site vai ficar.",
    servicos: COM_SITE,
    itens: [
      {
        tipo: "multipla",
        id: "percepcao",
        rotulo: "Como a empresa deve parecer no site?",
        ajuda: "Escolha até 3.",
        obrigatorio: true,
        maximo: 3,
        opcoes: [
          { valor: "moderna", rotulo: "Moderna" },
          { valor: "profissional", rotulo: "Profissional" },
          { valor: "sofisticada", rotulo: "Sofisticada" },
          { valor: "simples", rotulo: "Simples e limpa" },
          { valor: "seria", rotulo: "Séria" },
          { valor: "criativa", rotulo: "Criativa" },
          { valor: "acolhedora", rotulo: "Acolhedora" },
          { valor: "divertida", rotulo: "Divertida" },
          { valor: "tradicional", rotulo: "Tradicional" },
          { valor: "jovem", rotulo: "Jovem" },
        ],
      },
      {
        tipo: "texto",
        id: "cores",
        rotulo: "Cores da marca",
        ajuda: "Se já tiver. Pode ser o nome das cores ou os códigos.",
        placeholder: "Ex.: verde e dourado",
        max: 200,
        meia: true,
      },
      {
        tipo: "texto",
        id: "coresEvitar",
        rotulo: "Alguma cor que você não quer?",
        placeholder: "Ex.: nada de rosa",
        max: 200,
        meia: true,
      },
      {
        tipo: "paragrafo",
        id: "referencias",
        rotulo: "Sites que você gosta",
        ajuda: "Cole os links e diga o que chamou a sua atenção. Pode ser de outro ramo.",
        max: 2000,
        linhas: 3,
      },
      {
        tipo: "subtitulo",
        id: "enderecoSite",
        rotulo: "Endereço do site",
        ajuda:
          "Domínio é o endereço que a pessoa digita para entrar no site. Ex.: o da Koinonia é koinoniadev.com.br.",
      },
      {
        tipo: "escolha",
        id: "dominio",
        rotulo: "Você já tem domínio?",
        obrigatorio: true,
        colunas: 3,
        opcoes: [
          { valor: "sim", rotulo: "Sim, já tenho" },
          { valor: "nao", rotulo: "Ainda não" },
          { valor: "naosei", rotulo: "Não sei" },
        ],
      },
      {
        tipo: "texto",
        id: "dominioNome",
        rotulo: "Qual é o domínio?",
        placeholder: "suaempresa.com.br",
        obrigatorio: true,
        max: 120,
        mostrar: (r) => texto(r, "dominio") === "sim",
      },
      {
        tipo: "texto",
        id: "dominioOpcao1",
        rotulo: "Que endereço você gostaria? 1ª opção",
        ajuda:
          "Normalmente é o nome da empresa, sem espaço nem acento, terminando em .com.br. Ex.: a Oficina do João pode ser oficinadojoao.com.br. Se esse já tiver dono, a gente tenta as outras opções.",
        placeholder: "Ex.: oficinadojoao.com.br",
        obrigatorio: (r) => texto(r, "dominio") === "nao",
        max: 80,
        mostrar: (r) => ["nao", "naosei"].includes(texto(r, "dominio")),
      },
      {
        tipo: "texto",
        id: "dominioOpcao2",
        rotulo: "2ª opção",
        placeholder: "Ex.: oficinadojoaosjc.com.br",
        max: 80,
        meia: true,
        mostrar: (r) => ["nao", "naosei"].includes(texto(r, "dominio")),
      },
      {
        tipo: "texto",
        id: "dominioOpcao3",
        rotulo: "3ª opção",
        placeholder: "Ex.: joaomecanica.com.br",
        max: 80,
        meia: true,
        mostrar: (r) => ["nao", "naosei"].includes(texto(r, "dominio")),
      },
      {
        tipo: "escolha",
        id: "hospedagem",
        rotulo: "Você já paga hospedagem de site?",
        obrigatorio: true,
        colunas: 3,
        opcoes: [
          { valor: "sim", rotulo: "Sim" },
          { valor: "nao", rotulo: "Não" },
          { valor: "naosei", rotulo: "Não sei" },
        ],
      },
      {
        tipo: "texto",
        id: "hospedagemOnde",
        rotulo: "Onde?",
        placeholder: "Ex.: Hostinger, Locaweb, HostGator",
        max: 120,
        mostrar: (r) => texto(r, "hospedagem") === "sim",
      },
    ],
  },
  {
    id: "materiais",
    titulo: "Fotos e logo",
    descricao: "Mande o que tiver: a fachada, o lado de dentro, a equipe e os trabalhos prontos.",
    servicos: TODOS,
    itens: [
      {
        tipo: "escolha",
        id: "logo",
        rotulo: "Você já tem logo?",
        obrigatorio: true,
        colunas: 3,
        opcoes: [
          { valor: "sim", rotulo: "Tenho", descricao: "Mando o arquivo aqui embaixo." },
          { valor: "melhorar", rotulo: "Tenho, mas quero melhorar" },
          { valor: "nao", rotulo: "Não tenho" },
        ],
      },
      {
        tipo: "arquivos",
        id: "arquivos",
        rotulo: "Fotos, vídeos e logo",
        ajuda: "Fotos na horizontal e com boa luz ficam melhores no site e no Google.",
      },
      {
        tipo: "texto",
        id: "linkArquivos",
        rotulo: "Tem tudo numa pasta? Cole o link",
        placeholder: "Google Drive, WeTransfer, Dropbox…",
        max: 500,
      },
      {
        tipo: "paragrafo",
        id: "observacoes",
        rotulo: "Quer contar mais alguma coisa?",
        ajuda: "Qualquer detalhe que ajude: uma promoção, um diferencial, algo que não pode aparecer.",
        max: 3000,
        linhas: 3,
      },
    ],
  },
];

export function etapasDo(servico: Servico): Etapa[] {
  return ETAPAS.filter((e) => e.servicos.includes(servico));
}

export function ehCampo(item: Item): item is Campo {
  return item.tipo !== "subtitulo";
}

export function resolver<T>(valor: Dinamico<T> | undefined, r: Respostas, padrao: T): T {
  if (valor === undefined) return padrao;
  return typeof valor === "function" ? (valor as (r: Respostas) => T)(r) : valor;
}

export function itemVisivel(item: Item, r: Respostas): boolean {
  return !item.mostrar || item.mostrar(r);
}

export function campoObrigatorio(campo: Campo, r: Respostas): boolean {
  return resolver(campo.obrigatorio, r, false);
}

/** Valor de um campo que o cliente ainda não tocou. */
export function valorInicial(campo: Campo): Valor {
  switch (campo.tipo) {
    case "multipla":
      return [];
    case "servicos":
      return [{ nome: "", descricao: "" }];
    case "faq":
      return [{ pergunta: "", resposta: "" }];
    case "horarios":
      return horariosPadrao();
    default:
      return "";
  }
}

export function camposDaEtapa(etapa: Etapa): Campo[] {
  return etapa.itens.filter(ehCampo);
}
