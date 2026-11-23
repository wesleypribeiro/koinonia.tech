"use client";

import { useRef, useState, type DragEvent } from "react";
import { CheckCircle2, FileText, Film, ImageUp, RotateCcw, X } from "lucide-react";
import { ACEITOS, MAX_ARQUIVOS, MAX_TOTAL, ehImagemVisivel, ehVideo } from "@/lib/briefing/arquivos";
import { resolver, type Campo } from "@/lib/briefing/perguntas";
import { formatarTamanho } from "@/lib/briefing/texto";
import type { ArquivoEnviado, Respostas } from "@/lib/briefing/tipos";
import { idDoCampo } from "./Campos";
import { Botao, Opcional } from "./ui";
import type { Envio } from "./useEnvios";

type Props = {
  campo: Campo;
  respostas: Respostas;
  enviados: ArquivoEnviado[];
  envios: Envio[];
  adicionar: (lista: FileList | File[]) => void;
  tentarDeNovo: (chave: string) => void;
  cancelar: (chave: string) => void;
  remover: (pathname: string) => void;
  previaDe: (pathname: string) => string | undefined;
};

function Miniatura({ nome, tipo, previa }: { nome: string; tipo: string; previa?: string }) {
  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden border border-border bg-muted text-muted-fg">
      {previa ? (
        // eslint-disable-next-line @next/next/no-img-element -- miniatura local (blob:), não passa pelo next/image
        <img src={previa} alt="" className="h-full w-full object-cover" />
      ) : ehVideo(nome, tipo) ? (
        <Film className="h-5 w-5" aria-hidden />
      ) : ehImagemVisivel(nome, tipo) || tipo.startsWith("image/") ? (
        <ImageUp className="h-5 w-5" aria-hidden />
      ) : (
        <FileText className="h-5 w-5" aria-hidden />
      )}
    </span>
  );
}

export default function EnvioArquivos({
  campo,
  respostas,
  enviados,
  envios,
  adicionar,
  tentarDeNovo,
  cancelar,
  remover,
  previaDe,
}: Props) {
  const id = idDoCampo(campo.id);
  const seletor = useRef<HTMLInputElement>(null);
  const [arrastando, setArrastando] = useState(false);
  const ajuda = resolver(campo.ajuda, respostas, "");
  const totalEnviado = enviados.reduce((soma, a) => soma + a.tamanho, 0);

  const soltar = (e: DragEvent) => {
    e.preventDefault();
    setArrastando(false);
    if (e.dataTransfer.files.length > 0) adicionar(e.dataTransfer.files);
  };

  return (
    <div>
      <p className="block text-base font-semibold text-foreground" id={`${id}-rotulo`}>
        {campo.rotulo}
        <Opcional />
      </p>
      {ajuda && <p className="mt-1 text-sm leading-relaxed text-muted-fg">{ajuda}</p>}

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setArrastando(true);
        }}
        onDragLeave={() => setArrastando(false)}
        onDrop={soltar}
        className={`mt-3 flex flex-col items-center gap-3 border-2 border-dashed px-4 py-7 text-center transition-colors duration-150 ${
          arrastando ? "border-primary bg-primary/5" : "border-border bg-card"
        }`}
      >
        <ImageUp className="h-8 w-8 text-primary" aria-hidden />
        <Botao id={id} onClick={() => seletor.current?.click()} aria-describedby={`${id}-regras`}>
          Escolher arquivos
        </Botao>
        <p id={`${id}-regras`} className="max-w-sm text-sm leading-relaxed text-muted-fg">
          Fotos, vídeos de até 100 MB, PDF ou o arquivo da logo.
          <span className="hidden sm:inline"> Pode arrastar para cá.</span>
        </p>
        <input
          ref={seletor}
          type="file"
          multiple
          accept={ACEITOS}
          tabIndex={-1}
          aria-hidden
          className="sr-only"
          onChange={(e) => {
            if (e.target.files?.length) adicionar(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {(envios.length > 0 || enviados.length > 0) && (
        <ul className="mt-4 divide-y divide-border border border-border bg-card" aria-live="polite">
          {envios.map((e) => (
            <li key={e.chave} className="flex items-center gap-3 p-3">
              <Miniatura nome={e.nome} tipo={e.tipo} previa={e.previa} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{e.nome}</p>
                {e.estado === "erro" ? (
                  <p className="mt-0.5 text-sm text-red-600 dark:text-red-400">{e.erro}</p>
                ) : (
                  <>
                    <p className="mt-0.5 font-mono text-xs text-muted-fg">
                      {formatarTamanho(e.tamanho)} ·{" "}
                      {e.estado === "fila" ? "esperando" : `enviando ${Math.round(e.progresso)}%`}
                    </p>
                    <div
                      className="mt-1.5 h-1 bg-border"
                      role="progressbar"
                      aria-label={`Envio de ${e.nome}`}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={Math.round(e.progresso)}
                    >
                      <div
                        className="h-full bg-primary transition-[width] duration-200"
                        style={{ width: `${e.progresso}%` }}
                      />
                    </div>
                  </>
                )}
              </div>
              {e.estado === "erro" && e.podeTentar && (
                <button
                  type="button"
                  onClick={() => tentarDeNovo(e.chave)}
                  className="inline-flex min-h-11 items-center gap-1.5 px-2 text-sm font-semibold text-primary hover:underline"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden />
                  Tentar de novo
                </button>
              )}
              <button
                type="button"
                onClick={() => cancelar(e.chave)}
                aria-label={`Tirar ${e.nome}`}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center text-muted-fg transition-colors hover:text-foreground"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </li>
          ))}
          {enviados.map((a) => (
            <li key={a.pathname} className="flex items-center gap-3 p-3">
              <Miniatura nome={a.nome} tipo={a.tipo} previa={previaDe(a.pathname)} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{a.nome}</p>
                <p className="mt-0.5 flex items-center gap-1.5 font-mono text-xs text-muted-fg">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" aria-hidden />
                  {formatarTamanho(a.tamanho)} · enviado
                </p>
              </div>
              <button
                type="button"
                onClick={() => remover(a.pathname)}
                aria-label={`Tirar ${a.nome}`}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center text-muted-fg transition-colors hover:text-foreground"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      )}

      {enviados.length > 0 && (
        <p className="mt-2 font-mono text-xs text-muted-fg">
          {enviados.length} de {MAX_ARQUIVOS} arquivos · {formatarTamanho(totalEnviado)} de {formatarTamanho(MAX_TOTAL)}
        </p>
      )}
    </div>
  );
}
