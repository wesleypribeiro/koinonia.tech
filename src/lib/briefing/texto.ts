import { camposDaEtapa, etapasDo, itemVisivel, type Campo, type Etapa } from "./perguntas";
import {
  ROTULO_SERVICO,
  type ArquivoEnviado,
  type Briefing,
  type Horarios,
  type ItemFaq,
  type ItemServico,
  type Respostas,
} from "./tipos";

export type Linha = { id: string; rotulo: string; valor: string };

function limpo(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

export function formatarTamanho(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  const mb = bytes / (1024 * 1024);
  return `${mb.toLocaleString("pt-BR", { maximumFractionDigits: mb < 10 ? 1 : 0 })} MB`;
}

export function horariosEmTexto(h: Horarios | undefined): string {
  if (!h?.modo) return "";
  if (h.modo === "24h") return "Aberto 24 horas";
  if (h.modo === "marcado") return "Sem horário fixo, só com hora marcada";
  return h.dias
    .map((d) => `${d.dia}: ${d.aberto ? `${d.abre} às ${d.fecha}` : "fechado"}`)
    .join("\n");
}

/** A resposta de um campo como texto corrido (vazio quando não respondeu). */
export function valorEmTexto(campo: Campo, r: Respostas, arquivos: Pick<ArquivoEnviado, "nome">[] = []): string {
  const valor = r[campo.id];
  switch (campo.tipo) {
    case "escolha":
      return campo.opcoes.find((o) => o.valor === valor)?.rotulo ?? "";
    case "multipla": {
      const marcadas = Array.isArray(valor) ? (valor as string[]) : [];
      const rotulos = campo.opcoes.filter((o) => marcadas.includes(o.valor)).map((o) => o.rotulo);
      const outro = campo.outro ? limpo(r[`${campo.id}Outro`]) : "";
      if (outro) rotulos.push(outro);
      return rotulos.join(", ");
    }
    case "servicos":
      return ((valor as ItemServico[] | undefined) ?? [])
        .filter((i) => limpo(i.nome) || limpo(i.descricao))
        .map((i) => (limpo(i.descricao) ? `${limpo(i.nome)}: ${limpo(i.descricao)}` : limpo(i.nome)))
        .join("\n");
    case "faq":
      return ((valor as ItemFaq[] | undefined) ?? [])
        .filter((i) => limpo(i.pergunta) || limpo(i.resposta))
        .map((i) => `P: ${limpo(i.pergunta)}\nR: ${limpo(i.resposta) || "(sem resposta)"}`)
        .join("\n\n");
    case "horarios":
      return horariosEmTexto(valor as Horarios | undefined);
    case "arquivos":
      if (arquivos.length === 0) return "";
      return `${arquivos.length} ${arquivos.length === 1 ? "arquivo" : "arquivos"}: ${arquivos.map((a) => a.nome).join(", ")}`;
    default:
      return limpo(valor);
  }
}

/** Linhas respondidas de uma etapa, na ordem das perguntas. */
export function linhasDaEtapa(
  etapa: Etapa,
  r: Respostas,
  arquivos: Pick<ArquivoEnviado, "nome">[] = [],
): Linha[] {
  return camposDaEtapa(etapa)
    .filter((c) => itemVisivel(c, r))
    .map((c) => ({ id: c.id, rotulo: c.rotulo, valor: valorEmTexto(c, r, arquivos) }))
    .filter((l) => l.valor);
}

function dataHora(iso: string): string {
  return new Date(iso).toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    dateStyle: "short",
    timeStyle: "short",
  });
}

/** O briefing inteiro em texto simples, para copiar ou mandar por e-mail. */
export function briefingEmTexto(
  b: Pick<Briefing, "servico" | "respostas" | "arquivos"> & { criadoEm?: string },
): string {
  const partes: string[] = [];
  const empresa = limpo(b.respostas.empresa) || "Empresa sem nome";
  partes.push(`BRIEFING: ${empresa}`);
  partes.push(`Serviço: ${ROTULO_SERVICO[b.servico]}`);
  if (b.criadoEm) partes.push(`Enviado em: ${dataHora(b.criadoEm)}`);

  for (const etapa of etapasDo(b.servico)) {
    const linhas = linhasDaEtapa(etapa, b.respostas, b.arquivos);
    if (linhas.length === 0) continue;
    partes.push("", `== ${etapa.titulo.toUpperCase()} ==`);
    for (const l of linhas) {
      partes.push(l.valor.includes("\n") ? `${l.rotulo}:\n${l.valor}` : `${l.rotulo}: ${l.valor}`);
    }
  }

  return partes.join("\n");
}
