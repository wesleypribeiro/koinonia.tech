"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Clock, Copy, ImageUp, Pencil, Save, Send } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { siteConfig } from "@/lib/site";
import {
  OPCOES_SERVICO,
  camposDaEtapa,
  etapasDo,
  itemVisivel,
  type Etapa,
} from "@/lib/briefing/perguntas";
import { briefingEmTexto, linhasDaEtapa } from "@/lib/briefing/texto";
import {
  ROTULO_SERVICO,
  ehIdValido,
  type ArquivoEnviado,
  type Respostas,
  type Servico,
  type Valor,
} from "@/lib/briefing/tipos";
import { errosDaEtapa, errosDoBriefing } from "@/lib/briefing/validar";
import CampoDoBriefing, { CartoesDeEscolha, idDoCampo } from "./Campos";
import EnvioArquivos from "./EnvioArquivos";
import { Botao, Erro } from "./ui";
import { useEnvios } from "./useEnvios";

const CHAVE_RASCUNHO = "koinonia:briefing:v1";

type Rascunho = {
  versao: 1;
  id: string;
  servico: Servico | null;
  /** -1 = abertura; 0..n-1 = etapas; n = revisão. */
  passo: number;
  respostas: Respostas;
  arquivos: ArquivoEnviado[];
  atualizadoEm: string;
};

type Concluido = { nome: string; empresa: string; arquivos: number };

function novoRascunho(servico: Servico | null): Rascunho {
  return {
    versao: 1,
    id: crypto.randomUUID(),
    servico,
    passo: -1,
    respostas: {},
    arquivos: [],
    atualizadoEm: new Date().toISOString(),
  };
}

function lerRascunho(): Rascunho | null {
  try {
    const bruto = localStorage.getItem(CHAVE_RASCUNHO);
    if (!bruto) return null;
    const r = JSON.parse(bruto) as Rascunho;
    const temAlgo = r.passo >= 0 || Object.keys(r.respostas ?? {}).length > 0;
    return r?.versao === 1 && ehIdValido(r.id) && temAlgo ? r : null;
  } catch {
    return null;
  }
}

function apagarRascunho() {
  try {
    localStorage.removeItem(CHAVE_RASCUNHO);
  } catch {
    /* sem armazenamento local: nada a apagar */
  }
}

/** Ao entrar numa etapa, campos como "WhatsApp do site" começam com o WhatsApp já informado. */
function comCopias(etapa: Etapa | undefined, r: Respostas): Respostas {
  if (!etapa) return r;
  let mudou = false;
  const novas = { ...r };
  for (const campo of camposDaEtapa(etapa)) {
    if ("copiaDe" in campo && campo.copiaDe && !novas[campo.id] && novas[campo.copiaDe]) {
      novas[campo.id] = novas[campo.copiaDe];
      mudou = true;
    }
  }
  return mudou ? novas : r;
}

function texto(r: Respostas, id: string) {
  return typeof r[id] === "string" ? (r[id] as string).trim() : "";
}

/** Manda um e-mail de aviso pelo Formspree (o mesmo do formulário de contato). */
async function avisarPorEmail(r: Rascunho) {
  const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;
  if (!formId || !r.servico) return;
  const controle = new AbortController();
  const prazo = setTimeout(() => controle.abort(), 6000);
  try {
    await fetch(`https://formspree.io/f/${formId}`, {
      method: "POST",
      signal: controle.signal,
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        _subject: `Novo briefing: ${texto(r.respostas, "empresa")} (${ROTULO_SERVICO[r.servico]})`,
        email: texto(r.respostas, "email"),
        Cliente: texto(r.respostas, "nome"),
        WhatsApp: texto(r.respostas, "whatsapp"),
        Empresa: texto(r.respostas, "empresa"),
        Servico: ROTULO_SERVICO[r.servico],
        Arquivos: String(r.arquivos.length),
        Painel: `${siteConfig.url}/painel/${r.id}`,
        Respostas: briefingEmTexto({ servico: r.servico, respostas: r.respostas, arquivos: r.arquivos }),
      }),
    });
  } catch {
    /* O briefing já foi salvo; o e-mail é só aviso. */
  } finally {
    clearTimeout(prazo);
  }
}

function Cabecalho() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href={siteConfig.url} aria-label={`${siteConfig.name}: ir para o site`} className="flex items-center">
          <Image
            src="/branding/logo_principal_horizontal_color.svg"
            alt="Koinonia Dev"
            width={190}
            height={60}
            priority
            className="h-auto w-[138px] dark:hidden"
          />
          <Image
            src="/branding/logo_horizontal_branco.svg"
            alt="Koinonia Dev"
            width={190}
            height={60}
            priority
            className="hidden h-auto w-[138px] dark:block"
          />
        </a>
        <div className="flex items-center gap-1">
          <a
            href={siteConfig.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 px-3 text-sm font-semibold text-foreground transition-colors hover:text-primary"
          >
            <WhatsAppIcon className="h-4 w-4 text-[#1DA851] dark:text-[#25D366]" />
            <span>Dúvidas?</span>
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

const estiloTitulo = "font-display text-[1.75rem] font-bold uppercase leading-none tracking-[-0.02em] sm:text-[2.25rem]";

export default function FormularioBriefing({
  servicoInicial,
  prefixo,
  armazenamentoOk,
}: {
  servicoInicial: Servico | null;
  prefixo: string;
  armazenamentoOk: boolean;
}) {
  const [rascunho, setRascunho] = useState<Rascunho>(() => novoRascunho(servicoInicial));
  const [salvo, setSalvo] = useState<Rascunho | null>(null);
  const [carregou, setCarregou] = useState(false);
  const [erros, setErros] = useState<Record<string, string>>({});
  const [aviso, setAviso] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [erroEnvio, setErroEnvio] = useState("");
  const [copiado, setCopiado] = useState(false);
  const [concluido, setConcluido] = useState<Concluido | null>(null);
  const titulo = useRef<HTMLHeadingElement>(null);
  const armadilha = useRef<HTMLInputElement>(null);
  const concluidoRef = useRef(false);
  const primeiraVez = useRef(true);

  const { servico, passo, respostas } = rascunho;
  const etapas = servico ? etapasDo(servico) : [];
  const naRevisao = servico !== null && passo === etapas.length;
  const etapa = passo >= 0 && passo < etapas.length ? etapas[passo] : undefined;

  /* Rascunho salvo neste aparelho */
  useEffect(() => {
    setSalvo(lerRascunho());
    setCarregou(true);
  }, []);

  useEffect(() => {
    if (!carregou || passo < 0 || concluido) return;
    const t = setTimeout(() => {
      try {
        localStorage.setItem(CHAVE_RASCUNHO, JSON.stringify({ ...rascunho, atualizadoEm: new Date().toISOString() }));
      } catch {
        /* navegador sem armazenamento: segue sem rascunho */
      }
    }, 400);
    return () => clearTimeout(t);
  }, [rascunho, carregou, passo, concluido]);

  /* Botão voltar do celular volta uma etapa, em vez de sair da página */
  useEffect(() => {
    window.history.replaceState({ ...window.history.state, briefingPasso: -1 }, "");
    const aoVoltar = (e: PopStateEvent) => {
      const p = e.state?.briefingPasso;
      if (typeof p !== "number" || concluidoRef.current) return;
      setRascunho((r) => ({ ...r, passo: p }));
      setErros({});
    };
    window.addEventListener("popstate", aoVoltar);
    return () => window.removeEventListener("popstate", aoVoltar);
  }, []);

  /* A cada troca de etapa: topo da página e foco no título (leitor de tela anuncia) */
  useEffect(() => {
    if (primeiraVez.current) {
      primeiraVez.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    titulo.current?.focus({ preventScroll: true });
  }, [passo, concluido]);

  const irPara = useCallback((novo: number) => {
    setRascunho((r) => {
      const lista = r.servico ? etapasDo(r.servico) : [];
      return { ...r, passo: novo, respostas: comCopias(lista[novo], r.respostas) };
    });
    setErros({});
    setAviso("");
    window.history.pushState({ ...window.history.state, briefingPasso: novo }, "");
  }, []);

  const definir = useCallback((id: string, valor: Valor) => {
    setRascunho((r) => ({ ...r, respostas: { ...r.respostas, [id]: valor } }));
  }, []);

  /* Erro some assim que a pessoa corrige o campo */
  useEffect(() => {
    if (!etapa || Object.keys(erros).length === 0) return;
    const agora = errosDaEtapa(etapa, respostas);
    const restantes: Record<string, string> = {};
    for (const id of Object.keys(erros)) if (agora[id]) restantes[id] = agora[id];
    if (JSON.stringify(restantes) !== JSON.stringify(erros)) setErros(restantes);
  }, [respostas, etapa, erros]);

  const aoConcluirEnvio = useCallback(
    (a: ArquivoEnviado) => setRascunho((r) => ({ ...r, arquivos: [...r.arquivos, a] })),
    [],
  );
  const envios = useEnvios({ id: rascunho.id, prefixo, enviados: rascunho.arquivos, aoConcluir: aoConcluirEnvio });

  const focarPrimeiroErro = (lista: Record<string, string>, alvo: Etapa) => {
    const primeiro = camposDaEtapa(alvo).find((c) => lista[c.id]);
    const total = Object.keys(lista).length;
    setAviso(total === 1 ? "Falta uma resposta nesta etapa." : `Faltam ${total} respostas nesta etapa.`);
    if (!primeiro) return;
    requestAnimationFrame(() => {
      const el = document.getElementById(idDoCampo(primeiro.id));
      el?.scrollIntoView({ block: "center", behavior: "smooth" });
      el?.focus({ preventScroll: true });
    });
  };

  /* Abertura */
  const comecar = () => {
    if (!servico) {
      setErros({ servico: "Escolha o que vamos criar." });
      document.getElementById(idDoCampo("servico"))?.focus();
      return;
    }
    if (salvo) {
      apagarRascunho();
      setSalvo(null);
    }
    irPara(0);
  };

  const continuarSalvo = () => {
    if (!salvo?.servico) return;
    const limite = etapasDo(salvo.servico).length;
    const destino = Math.min(Math.max(salvo.passo, 0), limite);
    setRascunho({ ...salvo, passo: destino });
    setSalvo(null);
    setErros({});
    window.history.pushState({ ...window.history.state, briefingPasso: destino }, "");
  };

  const descartarSalvo = () => {
    apagarRascunho();
    setSalvo(null);
  };

  /* Etapas */
  const continuar = (e?: FormEvent) => {
    e?.preventDefault();
    if (!etapa) return;
    const encontrados = errosDaEtapa(etapa, respostas);
    if (Object.keys(encontrados).length > 0) {
      setErros(encontrados);
      focarPrimeiroErro(encontrados, etapa);
      return;
    }
    irPara(passo + 1);
  };

  /* Envio final */
  const enviarBriefing = async () => {
    if (!servico || enviando) return;
    const pendentes = errosDoBriefing(servico, respostas);
    const comErro = etapas.findIndex((et) => camposDaEtapa(et).some((c) => pendentes[c.id]));
    if (comErro >= 0) {
      irPara(comErro);
      const daEtapa = errosDaEtapa(etapas[comErro], respostas);
      setErros(daEtapa);
      focarPrimeiroErro(daEtapa, etapas[comErro]);
      return;
    }
    if (envios.ocupado) {
      setErroEnvio("Espere os arquivos terminarem de subir. Falta pouco.");
      return;
    }

    setEnviando(true);
    setErroEnvio("");
    try {
      const resposta = await fetch("/api/briefing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: rascunho.id,
          servico,
          respostas,
          arquivos: rascunho.arquivos,
          website: armadilha.current?.value ?? "",
        }),
      });
      const dados = (await resposta.json().catch(() => ({}))) as { erro?: string };
      if (!resposta.ok) throw new Error(dados.erro || "Não foi possível enviar agora.");

      await avisarPorEmail(rascunho);
      apagarRascunho();
      concluidoRef.current = true;
      setConcluido({
        nome: texto(respostas, "nome").split(/\s+/)[0] ?? "",
        empresa: texto(respostas, "empresa"),
        arquivos: rascunho.arquivos.length,
      });
    } catch (erro) {
      setErroEnvio(
        `${(erro as Error).message} Suas respostas continuam salvas neste aparelho. Tente de novo em instantes ou mande pelo WhatsApp.`,
      );
    } finally {
      setEnviando(false);
    }
  };

  const copiarRespostas = async () => {
    if (!servico) return;
    try {
      await navigator.clipboard.writeText(briefingEmTexto({ servico, respostas, arquivos: rascunho.arquivos }));
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      /* sem acesso à área de transferência */
    }
  };

  /* ───────────── Telas ───────────── */

  if (concluido) {
    const msg = `Oi! Acabei de enviar o briefing${concluido.empresa ? ` da empresa ${concluido.empresa}` : ""}.`;
    return (
      <div className="area-form">
        <Cabecalho />
        <section className="etapa-entra mx-auto max-w-2xl px-4 pb-24 pt-14 sm:px-6 sm:pt-20">
          <svg
            viewBox="0 0 24 24"
            className="check-desenha h-16 w-16 border-2 border-primary p-3 text-primary"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="square"
            aria-hidden
          >
            <path d="M4 12.5l5 5L20 6.5" />
          </svg>
          <h1 ref={titulo} tabIndex={-1} className={`mt-8 outline-none ${estiloTitulo}`}>
            Recebemos tudo{concluido.nome ? `, ${concluido.nome}` : ""}!
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-fg">
            A gente vai ler com calma e te chama no WhatsApp para combinar os próximos passos.
            {concluido.arquivos > 0 &&
              ` ${concluido.arquivos} ${concluido.arquivos === 1 ? "arquivo chegou" : "arquivos chegaram"} junto.`}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href={`https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(msg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 border border-border px-6 text-sm font-bold uppercase tracking-wider text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Avisar no WhatsApp
            </a>
            <a
              href={siteConfig.url}
              className="inline-flex min-h-12 items-center justify-center px-6 text-sm font-semibold text-muted-fg underline-offset-4 hover:text-primary hover:underline"
            >
              Voltar para o site
            </a>
          </div>
        </section>
      </div>
    );
  }

  const barraDeAcao = (conteudo: ReactNode) => (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 sm:static sm:z-auto sm:mt-12 sm:border-t sm:bg-transparent sm:px-0 sm:pb-0 sm:pt-8">
      <div className="mx-auto flex max-w-2xl items-center gap-3">{conteudo}</div>
    </div>
  );

  const progresso = servico && passo >= 0 && (
    <div>
      <p className="font-mono text-sm text-muted-fg">
        <span className="text-foreground">{passo + 1}</span> de {etapas.length + 1}
        <span className="mx-2" aria-hidden>
          ·
        </span>
        {naRevisao ? "Revisão" : etapa?.titulo}
      </p>
      <div className="mt-2 flex gap-1" aria-hidden>
        {[...etapas, null].map((_, i) => (
          <span
            key={i}
            className={`h-1.5 flex-1 transition-colors duration-300 ${i <= passo ? "bg-primary" : "bg-border"}`}
          />
        ))}
      </div>
    </div>
  );

  /* Abertura */
  if (passo < 0 || !servico) {
    const temRespostas = Object.keys(respostas).length > 0;
    return (
      <div className="area-form">
        <Cabecalho />
        <section className="mx-auto max-w-3xl px-4 pb-16 pt-10 sm:px-6 sm:pb-24 sm:pt-16">
          <h1 ref={titulo} tabIndex={-1} className="font-display text-[2.5rem] font-bold uppercase leading-[0.95] tracking-[-0.03em] outline-none sm:text-[3.5rem]">
            Conte sobre a sua empresa
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-fg">
            Com estas respostas a gente monta o seu projeto sem precisar te perguntar tudo de novo pelo WhatsApp.
          </p>
          <ul className="mt-6 flex flex-col gap-2.5 text-[0.9375rem] text-foreground sm:flex-row sm:flex-wrap sm:gap-x-7">
            <li className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" aria-hidden /> Uns 10 minutos
            </li>
            <li className="flex items-center gap-2">
              <Save className="h-4 w-4 text-primary" aria-hidden /> Salva sozinho neste aparelho
            </li>
            <li className="flex items-center gap-2">
              <ImageUp className="h-4 w-4 text-primary" aria-hidden /> Fotos e vídeos direto daqui
            </li>
          </ul>

          {salvo && (
            <div className="mt-10 flex flex-col gap-4 border border-primary bg-primary/5 p-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[0.9375rem] leading-relaxed text-foreground">
                Você já começou a preencher em{" "}
                <strong>
                  {new Date(salvo.atualizadoEm).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}
                </strong>
                {texto(salvo.respostas, "empresa") && <> ({texto(salvo.respostas, "empresa")})</>}.
              </p>
              <div className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-2">
                <Botao onClick={continuarSalvo}>
                  Continuar de onde parei
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Botao>
                <Botao variante="texto" onClick={descartarSalvo}>
                  Começar do zero
                </Botao>
              </div>
            </div>
          )}

          <fieldset className="mt-12" aria-describedby={erros.servico ? `${idDoCampo("servico")}-erro` : undefined}>
            <legend className="font-display text-xl font-bold uppercase tracking-[-0.01em] text-foreground">
              O que vamos criar?
            </legend>
            <CartoesDeEscolha
              nome={idDoCampo("servico")}
              opcoes={OPCOES_SERVICO}
              valor={servico ?? ""}
              colunas={3}
              aoEscolher={(v) => {
                setRascunho((r) => ({ ...r, servico: v as Servico }));
                setErros({});
              }}
            />
            {erros.servico && <Erro id={`${idDoCampo("servico")}-erro`}>{erros.servico}</Erro>}
          </fieldset>

          {armazenamentoOk ? (
            <Botao onClick={comecar} className="mt-8 w-full sm:w-auto sm:px-10">
              {temRespostas ? "Continuar" : "Começar"}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Botao>
          ) : (
            <p className="mt-8 border border-border bg-card p-5 text-[0.9375rem] text-foreground">
              O formulário está em manutenção. Fale com a gente pelo WhatsApp que a gente resolve por lá.
            </p>
          )}
        </section>
      </div>
    );
  }

  /* Revisão */
  if (naRevisao) {
    return (
      <div className="area-form">
        <Cabecalho />
        {/* A animação fica num bloco interno: transform no pai prenderia a barra fixa dentro dele. */}
        <section key="revisao" className="mx-auto max-w-2xl px-4 pb-36 pt-8 sm:px-6 sm:pb-24 sm:pt-12">
          <div className="etapa-entra">
          {progresso}
          <h1 ref={titulo} tabIndex={-1} className={`mt-8 outline-none ${estiloTitulo}`}>
            Confira e envie
          </h1>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-fg">
            Se algo estiver errado, toque em Editar. Nada é enviado antes do botão no fim da página.
          </p>

          <div className="mt-8 space-y-5">
            {etapas.map((et, i) => {
              const linhas = linhasDaEtapa(et, respostas, rascunho.arquivos);
              return (
                <section key={et.id} className="border border-border bg-card" aria-labelledby={`rev-${et.id}`}>
                  <div className="flex items-center justify-between gap-3 border-b border-border py-2 pl-4 pr-2">
                    <h2 id={`rev-${et.id}`} className="text-base font-bold uppercase tracking-[0.02em] text-foreground">
                      {et.titulo}
                    </h2>
                    <Botao variante="texto" onClick={() => irPara(i)} className="px-2" aria-label={`Editar ${et.titulo}`}>
                      <Pencil className="h-4 w-4" aria-hidden />
                      Editar
                    </Botao>
                  </div>
                  {linhas.length === 0 ? (
                    <p className="p-4 text-sm text-muted-fg">Nada preenchido.</p>
                  ) : (
                    <dl className="divide-y divide-border">
                      {linhas.map((l) => (
                        <div key={l.id} className="grid gap-1 px-4 py-3 sm:grid-cols-[11rem_1fr] sm:gap-4">
                          <dt className="text-sm text-muted-fg">{l.rotulo}</dt>
                          <dd className="whitespace-pre-line break-words text-[0.9375rem] text-foreground">{l.valor}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </section>
              );
            })}
          </div>

          {(envios.ocupado || envios.comErro) && (
            <p className="mt-6 border border-border bg-card p-4 text-sm text-foreground" aria-live="polite">
              {envios.ocupado
                ? "Ainda tem arquivo subindo. O botão de enviar libera quando terminar."
                : "Um arquivo ficou de fora. Volte em Fotos e logo para ver o motivo."}
            </p>
          )}

          <p className="mt-6 text-sm leading-relaxed text-muted-fg">
            Ao enviar, você autoriza a {siteConfig.name} a usar estas informações e arquivos para criar o seu projeto.
          </p>

          {erroEnvio && (
            <div role="alert" className="mt-6 border border-red-600/40 bg-red-600/5 p-4 dark:border-red-400/40">
              <Erro>{erroEnvio}</Erro>
              <Botao variante="texto" onClick={copiarRespostas} className="mt-1">
                <Copy className="h-4 w-4" aria-hidden />
                {copiado ? "Copiado! Cole no WhatsApp" : "Copiar minhas respostas"}
              </Botao>
            </div>
          )}

          </div>

          {/* Armadilha para robôs: gente de verdade não vê nem preenche. */}
          <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor="website">Não preencha</label>
            <input ref={armadilha} id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          {barraDeAcao(
            <>
              <Botao variante="secundario" onClick={() => irPara(passo - 1)} aria-label="Voltar para a etapa anterior">
                <ArrowLeft className="h-4 w-4" aria-hidden />
                <span className="hidden sm:inline">Voltar</span>
              </Botao>
              <Botao onClick={enviarBriefing} disabled={enviando || envios.ocupado} className="flex-1 sm:flex-none sm:px-10">
                {enviando ? "Enviando…" : "Enviar respostas"}
                {!enviando && <Send className="h-4 w-4" aria-hidden />}
              </Botao>
            </>,
          )}
        </section>
      </div>
    );
  }

  /* Etapa */
  return (
    <div className="area-form">
      <Cabecalho />
      <form
        key={etapa?.id}
        noValidate
        onSubmit={continuar}
        className="mx-auto max-w-2xl px-4 pb-36 pt-8 sm:px-6 sm:pb-24 sm:pt-12"
      >
        <div className="etapa-entra">
        {progresso}
        <h1 ref={titulo} tabIndex={-1} className={`mt-8 outline-none ${estiloTitulo}`}>
          {etapa?.titulo}
        </h1>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-fg">{etapa?.descricao}</p>

        <p className="sr-only" role="status" aria-live="polite">
          {aviso}
        </p>

        <div className="mt-10 grid gap-x-5 gap-y-9 sm:grid-cols-2">
          {etapa?.itens.map((item) => {
            if (!itemVisivel(item, respostas)) return null;
            if (item.tipo === "subtitulo") {
              return (
                <div key={item.id} className="border-t border-border pt-8 sm:col-span-2">
                  <h2 className="text-base font-bold uppercase tracking-[0.02em] text-foreground">{item.rotulo}</h2>
                  {item.ajuda && <p className="mt-1 text-sm text-muted-fg">{item.ajuda}</p>}
                </div>
              );
            }
            const largura = "meia" in item && item.meia ? "" : "sm:col-span-2";
            if (item.tipo === "arquivos") {
              return (
                <div key={item.id} className={largura}>
                  <EnvioArquivos
                    campo={item}
                    respostas={respostas}
                    enviados={rascunho.arquivos}
                    envios={envios.envios}
                    adicionar={envios.adicionar}
                    tentarDeNovo={envios.tentarDeNovo}
                    cancelar={envios.cancelar}
                    previaDe={envios.previaDe}
                    remover={(p) =>
                      setRascunho((r) => ({ ...r, arquivos: r.arquivos.filter((a) => a.pathname !== p) }))
                    }
                  />
                </div>
              );
            }
            return (
              <div key={item.id} className={largura}>
                <CampoDoBriefing campo={item} respostas={respostas} erro={erros[item.id]} definir={definir} />
              </div>
            );
          })}
        </div>
        </div>

        {barraDeAcao(
          <>
            <Botao variante="secundario" onClick={() => irPara(passo - 1)} aria-label="Voltar para a etapa anterior">
              <ArrowLeft className="h-4 w-4" aria-hidden />
              <span className="hidden sm:inline">Voltar</span>
            </Botao>
            <Botao type="submit" className="flex-1 sm:flex-none sm:px-10">
              {passo === etapas.length - 1 ? "Revisar respostas" : "Continuar"}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Botao>
          </>,
        )}
      </form>
    </div>
  );
}
