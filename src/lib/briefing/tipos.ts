/** O que o cliente contratou. Define quais etapas do briefing aparecem. */
export type Servico = "site" | "google" | "ambos";

/** Andamento do briefing no painel. */
export type Status = "novo" | "andamento" | "concluido";

export type ItemServico = { nome: string; descricao: string };
export type ItemFaq = { pergunta: string; resposta: string };

export type DiaHorario = { dia: string; aberto: boolean; abre: string; fecha: string };
export type ModoHorario = "" | "fixo" | "24h" | "marcado";
export type Horarios = { modo: ModoHorario; dias: DiaHorario[] };

export type Valor = string | string[] | ItemServico[] | ItemFaq[] | Horarios;

/** Respostas indexadas pelo id do campo (ver perguntas.ts). */
export type Respostas = Record<string, Valor>;

/** Arquivo que o cliente mandou e já está no armazenamento. */
export type ArquivoEnviado = {
  /** Caminho no Vercel Blob (privado). */
  pathname: string;
  /** Nome original do arquivo no aparelho do cliente. */
  nome: string;
  tipo: string;
  tamanho: number;
};

export type Briefing = {
  versao: 1;
  id: string;
  criadoEm: string;
  atualizadoEm: string;
  status: Status;
  servico: Servico;
  respostas: Respostas;
  arquivos: ArquivoEnviado[];
};

export const SERVICOS: Servico[] = ["site", "google", "ambos"];
export const STATUS: Status[] = ["novo", "andamento", "concluido"];

export const ROTULO_SERVICO: Record<Servico, string> = {
  site: "Site",
  google: "Google Meu Negócio",
  ambos: "Site e Google Meu Negócio",
};

export const ROTULO_STATUS: Record<Status, string> = {
  novo: "Novo",
  andamento: "Em andamento",
  concluido: "Concluído",
};

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

export function ehIdValido(id: unknown): id is string {
  return typeof id === "string" && UUID.test(id);
}

export function ehServico(valor: unknown): valor is Servico {
  return typeof valor === "string" && (SERVICOS as string[]).includes(valor);
}

export function ehStatus(valor: unknown): valor is Status {
  return typeof valor === "string" && (STATUS as string[]).includes(valor);
}
