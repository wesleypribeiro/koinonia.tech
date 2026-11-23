"use client";

import { Check, Copy, Plus, Trash2 } from "lucide-react";
import {
  campoObrigatorio,
  horariosPadrao,
  resolver,
  valorInicial,
  type Campo,
  type CampoEscolha,
  type CampoLista,
  type CampoMultipla,
  type CampoParagrafo,
  type CampoTexto,
  type Opcao,
} from "@/lib/briefing/perguntas";
import type { Horarios, ItemFaq, ItemServico, ModoHorario, Respostas, Valor } from "@/lib/briefing/tipos";
import { formatarTelefone } from "@/lib/briefing/validar";
import { Botao, Erro, Opcional, estiloCampo } from "./ui";

export type PropsCampo = {
  respostas: Respostas;
  erro?: string;
  definir: (id: string, valor: Valor) => void;
};

/** id do elemento que recebe o foco quando o campo tem erro. */
export const idDoCampo = (id: string) => `campo-${id}`;

const estiloRotulo = "block text-base font-semibold text-foreground";
const estiloAjuda = "mt-1 text-sm leading-relaxed text-muted-fg";

function descricoes(id: string, ajuda: string, erro?: string) {
  return [ajuda && `${id}-ajuda`, erro && `${id}-erro`].filter(Boolean).join(" ") || undefined;
}

/* ───────────── Texto, e-mail e telefone ───────────── */

function CampoDeTexto({ campo, respostas, erro, definir }: PropsCampo & { campo: CampoTexto }) {
  const id = idDoCampo(campo.id);
  const ajuda = resolver(campo.ajuda, respostas, "");
  const obrigatorio = campoObrigatorio(campo, respostas);
  const valor = typeof respostas[campo.id] === "string" ? (respostas[campo.id] as string) : "";
  const telefone = campo.tipo === "telefone";

  return (
    <div>
      <label htmlFor={id} className={estiloRotulo}>
        {campo.rotulo}
        {!obrigatorio && <Opcional />}
      </label>
      {ajuda && (
        <p id={`${id}-ajuda`} className={estiloAjuda}>
          {ajuda}
        </p>
      )}
      <input
        id={id}
        name={campo.id}
        type={campo.tipo === "email" ? "email" : telefone ? "tel" : "text"}
        inputMode={telefone ? "tel" : campo.tipo === "email" ? "email" : undefined}
        autoComplete={campo.autoComplete ?? "off"}
        autoCapitalize={campo.tipo === "email" ? "none" : undefined}
        spellCheck={campo.tipo === "email" ? false : undefined}
        placeholder={campo.placeholder}
        maxLength={telefone ? 20 : campo.max}
        value={valor}
        onChange={(e) => definir(campo.id, telefone ? formatarTelefone(e.target.value) : e.target.value)}
        aria-invalid={erro ? true : undefined}
        aria-required={obrigatorio || undefined}
        aria-describedby={descricoes(id, ajuda, erro)}
        className={`mt-2 ${estiloCampo}`}
      />
      {erro && <Erro id={`${id}-erro`}>{erro}</Erro>}
    </div>
  );
}

function CampoDeParagrafo({ campo, respostas, erro, definir }: PropsCampo & { campo: CampoParagrafo }) {
  const id = idDoCampo(campo.id);
  const ajuda = resolver(campo.ajuda, respostas, "");
  const obrigatorio = campoObrigatorio(campo, respostas);
  const valor = typeof respostas[campo.id] === "string" ? (respostas[campo.id] as string) : "";
  const max = campo.max ?? 4000;
  const perto = valor.length > max * 0.85;

  return (
    <div>
      <label htmlFor={id} className={estiloRotulo}>
        {campo.rotulo}
        {!obrigatorio && <Opcional />}
      </label>
      {ajuda && (
        <p id={`${id}-ajuda`} className={estiloAjuda}>
          {ajuda}
        </p>
      )}
      <textarea
        id={id}
        name={campo.id}
        rows={campo.linhas ?? 4}
        maxLength={max}
        placeholder={campo.placeholder}
        value={valor}
        onChange={(e) => definir(campo.id, e.target.value)}
        aria-invalid={erro ? true : undefined}
        aria-required={obrigatorio || undefined}
        aria-describedby={descricoes(id, ajuda, erro)}
        className={`mt-2 resize-y leading-relaxed ${estiloCampo}`}
      />
      {perto && (
        <p className="mt-1 text-right font-mono text-xs text-muted-fg" aria-live="polite">
          {valor.length} de {max} caracteres
        </p>
      )}
      {erro && <Erro id={`${id}-erro`}>{erro}</Erro>}
    </div>
  );
}

/* ───────────── Escolha única (cartões) ───────────── */

export function CartoesDeEscolha({
  nome,
  opcoes,
  valor,
  aoEscolher,
  colunas,
}: {
  nome: string;
  opcoes: Opcao[];
  valor: string;
  aoEscolher: (valor: string) => void;
  colunas?: 1 | 3;
}) {
  return (
    <div className={`mt-3 grid gap-3 ${colunas === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
      {opcoes.map((o, i) => (
        <label
          key={o.valor}
          className="group flex cursor-pointer items-start gap-3 border border-border bg-card p-4 transition-[border-color,box-shadow,transform] duration-150 hover:border-foreground/40 has-[:checked]:-translate-y-0.5 has-[:checked]:border-primary has-[:checked]:shadow-[-4px_4px_0_0_var(--primary)] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary motion-reduce:transition-none motion-reduce:has-[:checked]:translate-y-0"
        >
          <input
            type="radio"
            id={i === 0 ? nome : undefined}
            name={nome}
            value={o.valor}
            checked={valor === o.valor}
            onChange={() => aoEscolher(o.valor)}
            className="sr-only"
          />
          <span
            aria-hidden
            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-border transition-colors group-has-[:checked]:border-primary"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-primary opacity-0 transition-opacity group-has-[:checked]:opacity-100" />
          </span>
          <span className="min-w-0">
            <span className="block font-semibold leading-snug text-foreground">{o.rotulo}</span>
            {o.descricao && <span className="mt-1 block text-sm leading-snug text-muted-fg">{o.descricao}</span>}
          </span>
        </label>
      ))}
    </div>
  );
}

function CampoDeEscolha({ campo, respostas, erro, definir }: PropsCampo & { campo: CampoEscolha }) {
  const id = idDoCampo(campo.id);
  const ajuda = resolver(campo.ajuda, respostas, "");
  const obrigatorio = campoObrigatorio(campo, respostas);
  const valor = typeof respostas[campo.id] === "string" ? (respostas[campo.id] as string) : "";

  return (
    <fieldset aria-describedby={descricoes(id, ajuda, erro)} aria-required={obrigatorio || undefined}>
      <legend className={estiloRotulo}>
        {campo.rotulo}
        {!obrigatorio && <Opcional />}
      </legend>
      {ajuda && (
        <p id={`${id}-ajuda`} className={estiloAjuda}>
          {ajuda}
        </p>
      )}
      <CartoesDeEscolha
        nome={id}
        opcoes={campo.opcoes}
        valor={valor}
        aoEscolher={(v) => definir(campo.id, v)}
        colunas={campo.colunas}
      />
      {erro && <Erro id={`${id}-erro`}>{erro}</Erro>}
    </fieldset>
  );
}

/* ───────────── Várias escolhas (etiquetas) ───────────── */

function CampoDeMultipla({ campo, respostas, erro, definir }: PropsCampo & { campo: CampoMultipla }) {
  const id = idDoCampo(campo.id);
  const ajuda = resolver(campo.ajuda, respostas, "");
  const obrigatorio = campoObrigatorio(campo, respostas);
  const marcadas = Array.isArray(respostas[campo.id]) ? (respostas[campo.id] as string[]) : [];
  const idOutro = `${campo.id}Outro`;
  const outro = typeof respostas[idOutro] === "string" ? (respostas[idOutro] as string) : "";
  const cheio = campo.maximo !== undefined && marcadas.length >= campo.maximo;

  const alternar = (valor: string) =>
    definir(campo.id, marcadas.includes(valor) ? marcadas.filter((v) => v !== valor) : [...marcadas, valor]);

  return (
    <fieldset aria-describedby={descricoes(id, ajuda, erro)} aria-required={obrigatorio || undefined}>
      <legend className={estiloRotulo}>
        {campo.rotulo}
        {!obrigatorio && <Opcional />}
      </legend>
      {ajuda && (
        <p id={`${id}-ajuda`} className={estiloAjuda}>
          {ajuda}
          {campo.maximo !== undefined && marcadas.length > 0 && (
            <span className="ml-1 font-mono">
              ({marcadas.length} de {campo.maximo})
            </span>
          )}
        </p>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        {campo.opcoes.map((o, i) => {
          const marcada = marcadas.includes(o.valor);
          const bloqueada = cheio && !marcada;
          return (
            <label
              key={o.valor}
              className={`group inline-flex min-h-11 items-center gap-2.5 border px-4 py-2 text-[0.9375rem] font-medium transition-[background-color,border-color,color] duration-150 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary ${
                marcada
                  ? "border-primary bg-primary text-primary-fg"
                  : bloqueada
                    ? "cursor-not-allowed border-border bg-card text-muted-fg opacity-60"
                    : "cursor-pointer border-border bg-card text-foreground hover:border-foreground/40"
              }`}
            >
              <input
                type="checkbox"
                id={i === 0 ? id : undefined}
                checked={marcada}
                disabled={bloqueada}
                onChange={() => alternar(o.valor)}
                className="sr-only"
              />
              <span
                aria-hidden
                className={`flex h-4 w-4 shrink-0 items-center justify-center border ${marcada ? "border-primary-fg" : "border-current"}`}
              >
                {marcada && <Check className="h-3 w-3" strokeWidth={3} />}
              </span>
              {o.rotulo}
            </label>
          );
        })}
      </div>
      {campo.outro && (
        <input
          type="text"
          value={outro}
          maxLength={200}
          placeholder={`${campo.outro} (opcional)`}
          aria-label={campo.outro}
          onChange={(e) => definir(idOutro, e.target.value)}
          className={`mt-3 ${estiloCampo}`}
        />
      )}
      {erro && <Erro id={`${id}-erro`}>{erro}</Erro>}
    </fieldset>
  );
}

/* ───────────── Listas: serviços e perguntas frequentes ───────────── */

function CampoDeLista({ campo, respostas, erro, definir }: PropsCampo & { campo: CampoLista }) {
  const id = idDoCampo(campo.id);
  const ajuda = resolver(campo.ajuda, respostas, "");
  const obrigatorio = campoObrigatorio(campo, respostas);
  const ehFaq = campo.tipo === "faq";
  const itens = (Array.isArray(respostas[campo.id]) ? respostas[campo.id] : valorInicial(campo)) as (
    | ItemServico
    | ItemFaq
  )[];
  const limite = ehFaq ? 15 : 40;

  const mudar = (i: number, chave: string, valor: string) =>
    definir(
      campo.id,
      itens.map((item, j) => (j === i ? { ...item, [chave]: valor } : item)) as ItemServico[] | ItemFaq[],
    );
  const tirar = (i: number) => definir(campo.id, itens.filter((_, j) => j !== i) as ItemServico[] | ItemFaq[]);
  const adicionar = () =>
    definir(campo.id, [...itens, ehFaq ? { pergunta: "", resposta: "" } : { nome: "", descricao: "" }] as
      | ItemServico[]
      | ItemFaq[]);

  const nomeItem = ehFaq ? "Pergunta" : "Serviço ou produto";

  return (
    <fieldset aria-describedby={descricoes(id, ajuda, erro)} aria-required={obrigatorio || undefined}>
      <legend className={estiloRotulo}>
        {campo.rotulo}
        {!obrigatorio && <Opcional />}
      </legend>
      {ajuda && (
        <p id={`${id}-ajuda`} className={estiloAjuda}>
          {ajuda}
        </p>
      )}
      <ol className="mt-3 space-y-3">
        {itens.map((item, i) => {
          const base = `${id}-${i}`;
          const primeiro = ehFaq ? (item as ItemFaq).pergunta : (item as ItemServico).nome;
          const segundo = ehFaq ? (item as ItemFaq).resposta : (item as ItemServico).descricao;
          return (
            <li key={i} className="border border-border bg-card p-4">
              <div className="flex items-center justify-between gap-3">
                <label htmlFor={i === 0 ? id : base} className="text-sm font-semibold text-foreground">
                  {nomeItem} {i + 1}
                </label>
                {itens.length > 1 && (
                  <button
                    type="button"
                    onClick={() => tirar(i)}
                    className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-muted-fg transition-colors hover:text-red-600 dark:hover:text-red-400"
                    aria-label={`Tirar ${nomeItem.toLowerCase()} ${i + 1}`}
                  >
                    <Trash2 className="h-4 w-4" aria-hidden />
                  </button>
                )}
              </div>
              <input
                id={i === 0 ? id : base}
                type="text"
                value={primeiro}
                maxLength={ehFaq ? 300 : 120}
                placeholder={ehFaq ? "Ex.: Vocês atendem aos sábados?" : "Ex.: Troca de óleo"}
                aria-invalid={erro && i === 0 ? true : undefined}
                onChange={(e) => mudar(i, ehFaq ? "pergunta" : "nome", e.target.value)}
                className={`mt-2 ${estiloCampo}`}
              />
              <label htmlFor={`${base}-b`} className="sr-only">
                {ehFaq ? `Resposta da pergunta ${i + 1}` : `Descrição do serviço ${i + 1}`}
              </label>
              <textarea
                id={`${base}-b`}
                rows={2}
                value={segundo}
                maxLength={ehFaq ? 1500 : 600}
                placeholder={ehFaq ? "A resposta que você costuma dar" : "O que é, para quem é e o que o cliente ganha"}
                onChange={(e) => mudar(i, ehFaq ? "resposta" : "descricao", e.target.value)}
                className={`mt-2 resize-y leading-relaxed ${estiloCampo}`}
              />
            </li>
          );
        })}
      </ol>
      {itens.length < limite && (
        <Botao variante="secundario" onClick={adicionar} className="mt-3 w-full sm:w-auto">
          <Plus className="h-4 w-4" aria-hidden />
          {ehFaq ? "Adicionar outra pergunta" : "Adicionar outro"}
        </Botao>
      )}
      {erro && <Erro id={`${id}-erro`}>{erro}</Erro>}
    </fieldset>
  );
}

/* ───────────── Horário de funcionamento ───────────── */

const MODOS: Opcao[] = [
  { valor: "fixo", rotulo: "Horário fixo", descricao: "Abro e fecho nos mesmos horários." },
  { valor: "24h", rotulo: "Aberto 24 horas" },
  { valor: "marcado", rotulo: "Só com hora marcada", descricao: "Não tenho horário fixo." },
];

const estiloHora =
  "min-h-11 w-[7.25rem] border border-border bg-background px-3 text-base tabular-nums text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25";

function CampoDeHorarios({ campo, respostas, erro, definir }: PropsCampo & { campo: Campo }) {
  const id = idDoCampo(campo.id);
  const h = (respostas[campo.id] as Horarios | undefined) ?? horariosPadrao();
  const obrigatorio = campoObrigatorio(campo, respostas);

  const mudarDia = (i: number, mudanca: Partial<Horarios["dias"][number]>) =>
    definir(campo.id, { ...h, dias: h.dias.map((d, j) => (j === i ? { ...d, ...mudanca } : d)) });

  const repetirSegunda = () => {
    const seg = h.dias[0];
    definir(campo.id, {
      ...h,
      dias: h.dias.map((d, j) => (j >= 1 && j <= 4 ? { ...d, aberto: seg.aberto, abre: seg.abre, fecha: seg.fecha } : d)),
    });
  };

  return (
    <fieldset aria-describedby={erro ? `${id}-erro` : undefined} aria-required={obrigatorio || undefined}>
      <legend className={estiloRotulo}>
        {campo.rotulo}
        {!obrigatorio && <Opcional />}
      </legend>
      <CartoesDeEscolha
        nome={id}
        opcoes={MODOS}
        valor={h.modo}
        colunas={3}
        aoEscolher={(modo) => definir(campo.id, { ...h, modo: modo as ModoHorario })}
      />

      {h.modo === "fixo" && (
        <div className="mt-4 border border-border bg-card">
          <p className="border-b border-border px-4 py-3 text-sm text-muted-fg">
            Desmarque os dias em que a empresa fica fechada.
          </p>
          <ul>
            {h.dias.map((d, i) => (
              <li
                key={d.dia}
                className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-border px-4 py-2 last:border-b-0"
              >
                <label className="flex min-h-11 flex-1 cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={d.aberto}
                    onChange={(e) => mudarDia(i, { aberto: e.target.checked })}
                    className="h-5 w-5 shrink-0"
                  />
                  <span className="w-20 font-semibold text-foreground">{d.dia}</span>
                  <span className="text-sm text-muted-fg">{d.aberto ? "Aberto" : "Fechado"}</span>
                </label>
                {d.aberto && (
                  <div className="flex items-center gap-2 pb-2 sm:pb-0">
                    <input
                      type="time"
                      value={d.abre}
                      onChange={(e) => mudarDia(i, { abre: e.target.value })}
                      aria-label={`${d.dia}: abre às`}
                      className={estiloHora}
                    />
                    <span className="text-sm text-muted-fg">às</span>
                    <input
                      type="time"
                      value={d.fecha}
                      onChange={(e) => mudarDia(i, { fecha: e.target.value })}
                      aria-label={`${d.dia}: fecha às`}
                      className={estiloHora}
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
          <div className="border-t border-border px-4 py-1">
            <Botao variante="texto" onClick={repetirSegunda}>
              <Copy className="h-4 w-4" aria-hidden />
              Usar o horário de segunda de terça a sexta
            </Botao>
          </div>
        </div>
      )}
      {erro && <Erro id={`${id}-erro`}>{erro}</Erro>}
    </fieldset>
  );
}

/* ───────────── Escolhe o componente pelo tipo ───────────── */

export default function CampoDoBriefing({ campo, ...props }: PropsCampo & { campo: Campo }) {
  switch (campo.tipo) {
    case "texto":
    case "email":
    case "telefone":
      return <CampoDeTexto campo={campo} {...props} />;
    case "paragrafo":
      return <CampoDeParagrafo campo={campo} {...props} />;
    case "escolha":
      return <CampoDeEscolha campo={campo} {...props} />;
    case "multipla":
      return <CampoDeMultipla campo={campo} {...props} />;
    case "servicos":
    case "faq":
      return <CampoDeLista campo={campo} {...props} />;
    case "horarios":
      return <CampoDeHorarios campo={campo} {...props} />;
    default:
      return null;
  }
}
