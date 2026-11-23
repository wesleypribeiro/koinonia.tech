"use client";

import { useState, useTransition } from "react";
import { downloadZip } from "client-zip";
import { Check, Copy, Download, Link2, Trash2 } from "lucide-react";
import { excluir, limparIncompletos, mudarStatus } from "@/app/painel/acoes";
import { Botao } from "@/components/briefing/ui";
import { ROTULO_STATUS, STATUS, type ArquivoEnviado, type Status } from "@/lib/briefing/tipos";

/* ───────────── Status do briefing ───────────── */

export function SeletorStatus({ id, status }: { id: string; status: Status }) {
  const [atual, setAtual] = useState(status);
  const [pendente, iniciar] = useTransition();
  const [erro, setErro] = useState("");

  const escolher = (novo: Status) => {
    if (novo === atual) return;
    const anterior = atual;
    setAtual(novo);
    setErro("");
    iniciar(async () => {
      try {
        await mudarStatus(id, novo);
      } catch {
        setAtual(anterior);
        setErro("Não salvou. Tente de novo.");
      }
    });
  };

  return (
    <div>
      <div role="radiogroup" aria-label="Status do briefing" className="inline-flex border border-border">
        {STATUS.map((s) => (
          <button
            key={s}
            type="button"
            role="radio"
            aria-checked={atual === s}
            onClick={() => escolher(s)}
            disabled={pendente}
            className={`min-h-11 border-r border-border px-3.5 text-sm font-semibold transition-colors last:border-r-0 disabled:cursor-wait ${
              atual === s ? "bg-primary text-primary-fg" : "bg-card text-foreground hover:text-primary"
            }`}
          >
            {ROTULO_STATUS[s]}
          </button>
        ))}
      </div>
      {erro && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{erro}</p>}
    </div>
  );
}

/* ───────────── Copiar ───────────── */

export function BotaoCopiar({ texto, rotulo }: { texto: string; rotulo: string }) {
  const [copiado, setCopiado] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(texto);
          setCopiado(true);
          setTimeout(() => setCopiado(false), 2000);
        } catch {
          /* sem área de transferência */
        }
      }}
      className="inline-flex min-h-11 items-center gap-2 border border-border px-4 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
    >
      {copiado ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
      <span aria-live="polite">{copiado ? "Copiado" : rotulo}</span>
    </button>
  );
}

/* ───────────── Links para mandar ao cliente ───────────── */

export function LinksParaCliente({ base }: { base: string }) {
  const links = [
    { rotulo: "Site", url: `${base}/briefing?servico=site` },
    { rotulo: "Google Meu Negócio", url: `${base}/briefing?servico=google` },
    { rotulo: "Os dois", url: `${base}/briefing?servico=ambos` },
  ];
  const [copiado, setCopiado] = useState("");

  return (
    <section aria-labelledby="links-cliente" className="border border-border bg-card">
      <h2 id="links-cliente" className="flex items-center gap-2 border-b border-border px-4 py-3 text-sm font-bold uppercase tracking-[0.04em]">
        <Link2 className="h-4 w-4 text-primary" aria-hidden />
        Link para mandar ao cliente
      </h2>
      <ul className="divide-y divide-border">
        {links.map((l) => (
          <li key={l.url} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-2">
            <span className="w-44 shrink-0 text-sm font-semibold text-foreground">{l.rotulo}</span>
            <code className="min-w-0 flex-1 truncate font-mono text-sm text-muted-fg">{l.url.replace("https://", "")}</code>
            <button
              type="button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(l.url);
                  setCopiado(l.url);
                  setTimeout(() => setCopiado(""), 2000);
                } catch {
                  /* sem área de transferência */
                }
              }}
              className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              {copiado === l.url ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
              {copiado === l.url ? "Copiado" : "Copiar"}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ───────────── Baixar tudo em .zip ───────────── */

function nomesUnicos(arquivos: ArquivoEnviado[]): string[] {
  const usados = new Map<string, number>();
  return arquivos.map((a) => {
    const vezes = usados.get(a.nome) ?? 0;
    usados.set(a.nome, vezes + 1);
    if (vezes === 0) return a.nome;
    const ponto = a.nome.lastIndexOf(".");
    return ponto > 0 ? `${a.nome.slice(0, ponto)} (${vezes + 1})${a.nome.slice(ponto)}` : `${a.nome} (${vezes + 1})`;
  });
}

export function BaixarTudo({ arquivos, nomeZip }: { arquivos: ArquivoEnviado[]; nomeZip: string }) {
  const [estado, setEstado] = useState<"" | "baixando" | "erro">("");
  const [feitos, setFeitos] = useState(0);

  const baixar = async () => {
    setEstado("baixando");
    setFeitos(0);
    const nomes = nomesUnicos(arquivos);
    try {
      async function* gerar() {
        for (let i = 0; i < arquivos.length; i++) {
          const a = arquivos[i];
          const resposta = await fetch(
            `/api/painel/arquivo?baixar=1&p=${encodeURIComponent(a.pathname)}&nome=${encodeURIComponent(a.nome)}`,
          );
          if (!resposta.ok) throw new Error(`Falhou em ${a.nome}`);
          yield { name: nomes[i], input: resposta };
          setFeitos(i + 1);
        }
      }
      const blob = await downloadZip(gerar()).blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = nomeZip;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 30_000);
      setEstado("");
    } catch {
      setEstado("erro");
    }
  };

  return (
    <div>
      <Botao onClick={baixar} disabled={estado === "baixando"} className="w-full">
        <Download className="h-4 w-4" aria-hidden />
        {estado === "baixando" ? `Juntando ${feitos} de ${arquivos.length}…` : "Baixar tudo (.zip)"}
      </Botao>
      {estado === "erro" && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          Não deu para juntar tudo. Baixe os arquivos um por um.
        </p>
      )}
    </div>
  );
}

/* ───────────── Excluir (com confirmação no lugar) ───────────── */

export function ExcluirBriefing({ id, empresa }: { id: string; empresa: string }) {
  const [confirmando, setConfirmando] = useState(false);
  const [pendente, iniciar] = useTransition();

  if (!confirmando) {
    return (
      <Botao variante="perigoTexto" onClick={() => setConfirmando(true)}>
        <Trash2 className="h-4 w-4" aria-hidden />
        Excluir este briefing
      </Botao>
    );
  }

  return (
    <div role="alert" className="border border-red-600/40 bg-red-600/5 p-4 dark:border-red-400/40">
      <p className="text-[0.9375rem] text-foreground">
        Excluir o briefing{empresa ? ` "${empresa}"` : ""} e todos os arquivos? Não dá para desfazer.
      </p>
      <div className="mt-3 flex flex-wrap gap-3">
        <Botao variante="perigo" disabled={pendente} onClick={() => iniciar(() => excluir(id))}>
          {pendente ? "Excluindo…" : "Sim, excluir"}
        </Botao>
        <Botao variante="secundario" onClick={() => setConfirmando(false)} disabled={pendente}>
          Cancelar
        </Botao>
      </div>
    </div>
  );
}

export function LimparIncompletos({ ids }: { ids: string[] }) {
  const [pendente, iniciar] = useTransition();
  return (
    <Botao variante="secundario" disabled={pendente} onClick={() => iniciar(() => limparIncompletos(ids))}>
      <Trash2 className="h-4 w-4" aria-hidden />
      {pendente ? "Apagando…" : "Apagar esses arquivos"}
    </Botao>
  );
}
