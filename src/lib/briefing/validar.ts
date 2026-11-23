import {
  DIAS,
  campoObrigatorio,
  camposDaEtapa,
  etapasDo,
  itemVisivel,
  valorInicial,
  type Campo,
  type Etapa,
} from "./perguntas";
import type {
  DiaHorario,
  Horarios,
  ItemFaq,
  ItemServico,
  ModoHorario,
  Respostas,
  Servico,
  Valor,
} from "./tipos";

/* ───────────── Telefone e e-mail ───────────── */

export function digitos(valor: string): string {
  return valor.replace(/\D/g, "");
}

/** Só os dígitos do número nacional (tira o +55 se vier). */
function numeroNacional(valor: string): string {
  const d = digitos(valor);
  return (d.length === 12 || d.length === 13) && d.startsWith("55") ? d.slice(2) : d;
}

export function telefoneValido(valor: string): boolean {
  const d = numeroNacional(valor);
  return /^[1-9][1-9]\d{8,9}$/.test(d);
}

/** Máscara (12) 99999-9999 enquanto a pessoa digita. */
export function formatarTelefone(valor: string): string {
  const d = numeroNacional(valor).slice(0, 11);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  const ddd = d.slice(0, 2);
  const resto = d.slice(2);
  if (resto.length <= 4) return `(${ddd}) ${resto}`;
  const corte = resto.length > 8 ? 5 : 4;
  return `(${ddd}) ${resto.slice(0, corte)}-${resto.slice(corte)}`;
}

export function emailValido(valor: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor.trim());
}

/* ───────────── Validação ───────────── */

function texto(valor: Valor | undefined): string {
  return typeof valor === "string" ? valor.trim() : "";
}

function lista<T>(valor: Valor | undefined): T[] {
  return Array.isArray(valor) ? (valor as T[]) : [];
}

const HORA = /^([01]\d|2[0-3]):[0-5]\d$/;

/** Mensagem de erro do campo, ou null quando está certo. */
export function erroDoCampo(campo: Campo, r: Respostas): string | null {
  const valor = r[campo.id] ?? valorInicial(campo);
  const obrigatorio = campoObrigatorio(campo, r);

  switch (campo.tipo) {
    case "texto":
    case "paragrafo":
      return obrigatorio && !texto(valor) ? "Preencha este campo." : null;
    case "email": {
      const v = texto(valor);
      if (!v) return obrigatorio ? "Preencha este campo." : null;
      return emailValido(v) ? null : "Confira o e-mail. Ex.: voce@email.com";
    }
    case "telefone": {
      const v = texto(valor);
      if (!v) return obrigatorio ? "Preencha este campo." : null;
      return telefoneValido(v) ? null : "Confira o número com DDD. Ex.: (12) 99999-9999";
    }
    case "escolha":
      return obrigatorio && !texto(valor) ? "Escolha uma opção." : null;
    case "multipla": {
      const marcadas = lista<string>(valor);
      const outro = campo.outro ? texto(r[`${campo.id}Outro`]) : "";
      if (obrigatorio && marcadas.length === 0 && !outro) return "Marque pelo menos uma opção.";
      if (campo.maximo && marcadas.length > campo.maximo) return `Escolha no máximo ${campo.maximo}.`;
      return null;
    }
    case "servicos": {
      const itens = lista<ItemServico>(valor).filter((i) => i.nome?.trim());
      return obrigatorio && itens.length === 0 ? "Coloque pelo menos um serviço ou produto." : null;
    }
    case "horarios": {
      const h = valor as Horarios;
      if (!h?.modo) return obrigatorio ? "Escolha como é o seu horário." : null;
      if (h.modo !== "fixo") return null;
      const abertos = h.dias.filter((d) => d.aberto);
      if (abertos.length === 0) return "Marque pelo menos um dia aberto.";
      const errado = abertos.find((d) => !HORA.test(d.abre) || !HORA.test(d.fecha));
      return errado ? `Confira o horário de ${errado.dia.toLowerCase()}.` : null;
    }
    default:
      return null;
  }
}

export function errosDaEtapa(etapa: Etapa, r: Respostas): Record<string, string> {
  const erros: Record<string, string> = {};
  for (const campo of camposDaEtapa(etapa)) {
    if (!itemVisivel(campo, r)) continue;
    const erro = erroDoCampo(campo, r);
    if (erro) erros[campo.id] = erro;
  }
  return erros;
}

export function errosDoBriefing(servico: Servico, r: Respostas): Record<string, string> {
  return etapasDo(servico).reduce((acc, etapa) => ({ ...acc, ...errosDaEtapa(etapa, r) }), {});
}

/* ───────────── Limpeza (servidor) ───────────── */

function corta(valor: unknown, max: number): string {
  return typeof valor === "string" ? valor.trim().slice(0, max) : "";
}

function limparHorarios(bruto: unknown): Horarios {
  const h = (bruto ?? {}) as Partial<Horarios>;
  const modos: ModoHorario[] = ["", "fixo", "24h", "marcado"];
  const modo = modos.includes(h.modo as ModoHorario) ? (h.modo as ModoHorario) : "";
  const dias: DiaHorario[] = DIAS.map((dia, i) => {
    const d = (Array.isArray(h.dias) ? h.dias[i] : undefined) as Partial<DiaHorario> | undefined;
    return {
      dia,
      aberto: d?.aberto === true,
      abre: typeof d?.abre === "string" && HORA.test(d.abre) ? d.abre : "",
      fecha: typeof d?.fecha === "string" && HORA.test(d.fecha) ? d.fecha : "",
    };
  });
  return { modo, dias };
}

function limparCampo(campo: Campo, bruto: unknown): Valor {
  switch (campo.tipo) {
    case "texto":
    case "email":
      return corta(bruto, campo.max ?? 200);
    case "telefone":
      return formatarTelefone(corta(bruto, 30));
    case "paragrafo":
      return corta(bruto, campo.max ?? 4000);
    case "escolha": {
      const v = corta(bruto, 40);
      return campo.opcoes.some((o) => o.valor === v) ? v : "";
    }
    case "multipla": {
      const validos = new Set(campo.opcoes.map((o) => o.valor));
      const marcadas = Array.isArray(bruto) ? bruto.filter((v): v is string => typeof v === "string" && validos.has(v)) : [];
      return [...new Set(marcadas)].slice(0, campo.maximo ?? campo.opcoes.length);
    }
    case "servicos":
      return (Array.isArray(bruto) ? bruto : [])
        .slice(0, 40)
        .map((i) => ({ nome: corta(i?.nome, 120), descricao: corta(i?.descricao, 600) }))
        .filter((i) => i.nome || i.descricao) as ItemServico[];
    case "faq":
      return (Array.isArray(bruto) ? bruto : [])
        .slice(0, 15)
        .map((i) => ({ pergunta: corta(i?.pergunta, 300), resposta: corta(i?.resposta, 1500) }))
        .filter((i) => i.pergunta || i.resposta) as ItemFaq[];
    case "horarios":
      return limparHorarios(bruto);
    default:
      return "";
  }
}

/**
 * Fica só com as perguntas das etapas do serviço escolhido, no formato certo
 * e com tamanho limitado. Campos escondidos (ex.: "Qual é o domínio?" quando
 * a pessoa disse que não tem) saem da resposta.
 */
export function limparRespostas(servico: Servico, bruto: unknown): Respostas {
  const origem = (bruto && typeof bruto === "object" ? bruto : {}) as Record<string, unknown>;
  const limpas: Respostas = {};
  const etapas = etapasDo(servico);

  for (const etapa of etapas) {
    for (const campo of camposDaEtapa(etapa)) {
      if (campo.tipo === "arquivos") continue;
      limpas[campo.id] = limparCampo(campo, origem[campo.id]);
      if (campo.tipo === "multipla" && campo.outro) {
        limpas[`${campo.id}Outro`] = corta(origem[`${campo.id}Outro`], 200);
      }
    }
  }

  // Segunda passada: a visibilidade depende das respostas já limpas.
  for (const etapa of etapas) {
    for (const campo of camposDaEtapa(etapa)) {
      if (!itemVisivel(campo, limpas)) {
        delete limpas[campo.id];
        delete limpas[`${campo.id}Outro`];
      }
    }
  }

  return limpas;
}
