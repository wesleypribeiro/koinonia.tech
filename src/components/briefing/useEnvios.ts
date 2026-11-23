"use client";

import { upload } from "@vercel/blob/client";
import { useCallback, useEffect, useRef, useState } from "react";
import { MAX_ARQUIVOS, MAX_TOTAL, ehImagemVisivel, limiteDoArquivo, nomeSeguro } from "@/lib/briefing/arquivos";
import { formatarTamanho } from "@/lib/briefing/texto";
import type { ArquivoEnviado } from "@/lib/briefing/tipos";

/** Arquivo escolhido que ainda não terminou de subir (ou deu erro). */
export type Envio = {
  chave: string;
  arquivo: File;
  nome: string;
  tamanho: number;
  tipo: string;
  progresso: number;
  estado: "fila" | "enviando" | "erro";
  erro?: string;
  /** false quando o arquivo foi recusado antes de subir (tamanho, limite). */
  podeTentar: boolean;
  previa?: string;
};

/** Deixa no máximo `max` envios rodando ao mesmo tempo (internet de celular agradece). */
function criarLimitador(max: number) {
  let ativos = 0;
  const espera: (() => void)[] = [];
  return async function <T>(tarefa: () => Promise<T>): Promise<T> {
    if (ativos >= max) await new Promise<void>((liberar) => espera.push(liberar));
    ativos++;
    try {
      return await tarefa();
    } finally {
      ativos--;
      espera.shift()?.();
    }
  };
}

export function useEnvios({
  id,
  prefixo,
  enviados,
  aoConcluir,
}: {
  id: string;
  prefixo: string;
  enviados: ArquivoEnviado[];
  aoConcluir: (arquivo: ArquivoEnviado) => void;
}) {
  const [envios, setEnvios] = useState<Envio[]>([]);
  const limitador = useRef(criarLimitador(3));
  const controles = useRef(new Map<string, AbortController>());
  /** Miniatura das fotos já enviadas nesta visita (some se recarregar a página). */
  const previas = useRef(new Map<string, string>());

  const atualizar = (chave: string, mudanca: Partial<Envio>) =>
    setEnvios((lista) => lista.map((e) => (e.chave === chave ? { ...e, ...mudanca } : e)));

  const enviar = useCallback(
    async (envio: Envio) => {
      const controle = new AbortController();
      controles.current.set(envio.chave, controle);
      try {
        await limitador.current(async () => {
          if (controle.signal.aborted) return;
          atualizar(envio.chave, { estado: "enviando", progresso: 0, erro: undefined });
          const blob = await upload(`${prefixo}${id}/arquivos/${nomeSeguro(envio.nome)}`, envio.arquivo, {
            access: "private",
            handleUploadUrl: "/api/briefing/upload",
            contentType: envio.tipo || undefined,
            multipart: envio.tamanho > 20 * 1024 * 1024,
            abortSignal: controle.signal,
            onUploadProgress: ({ percentage }) => atualizar(envio.chave, { progresso: percentage }),
          });
          if (envio.previa) previas.current.set(blob.pathname, envio.previa);
          setEnvios((lista) => lista.filter((e) => e.chave !== envio.chave));
          aoConcluir({
            pathname: blob.pathname,
            nome: envio.nome,
            tipo: envio.tipo || blob.contentType,
            tamanho: envio.tamanho,
          });
        });
      } catch {
        if (controle.signal.aborted) return;
        atualizar(envio.chave, {
          estado: "erro",
          erro: "Não deu para enviar. Confira a internet e tente de novo.",
        });
      } finally {
        controles.current.delete(envio.chave);
      }
    },
    [id, prefixo, aoConcluir],
  );

  const adicionar = (lista: FileList | File[]) => {
    const validos = envios.filter((e) => e.podeTentar);
    let vagas = MAX_ARQUIVOS - enviados.length - validos.length;
    let total =
      enviados.reduce((soma, a) => soma + a.tamanho, 0) + validos.reduce((soma, e) => soma + e.tamanho, 0);

    const novos: Envio[] = Array.from(lista).map((arquivo) => {
      const base = {
        chave: crypto.randomUUID(),
        arquivo,
        nome: arquivo.name,
        tamanho: arquivo.size,
        tipo: arquivo.type,
        progresso: 0,
      };
      const limite = limiteDoArquivo(arquivo.name, arquivo.type);
      let erro = "";
      if (arquivo.size === 0) erro = "Este arquivo está vazio.";
      else if (vagas <= 0) erro = `Passou de ${MAX_ARQUIVOS} arquivos. Mande o resto pelo link da pasta.`;
      else if (arquivo.size > limite)
        erro = `Passa de ${formatarTamanho(limite)}. Mande pelo link da pasta ou pelo WhatsApp.`;
      else if (total + arquivo.size > MAX_TOTAL)
        erro = `Passou de ${formatarTamanho(MAX_TOTAL)} no total. Mande o resto pelo link da pasta.`;

      if (erro) return { ...base, estado: "erro" as const, erro, podeTentar: false };

      vagas--;
      total += arquivo.size;
      const previa = ehImagemVisivel(arquivo.name, arquivo.type) ? URL.createObjectURL(arquivo) : undefined;
      return { ...base, estado: "fila" as const, podeTentar: true, previa };
    });

    setEnvios((atual) => [...atual, ...novos]);
    for (const envio of novos) if (envio.estado === "fila") void enviar(envio);
  };

  const tentarDeNovo = (chave: string) => {
    const envio = envios.find((e) => e.chave === chave);
    if (envio?.podeTentar) void enviar({ ...envio, estado: "fila", erro: undefined });
  };

  const cancelar = (chave: string) => {
    controles.current.get(chave)?.abort();
    setEnvios((lista) => {
      const envio = lista.find((e) => e.chave === chave);
      if (envio?.previa) URL.revokeObjectURL(envio.previa);
      return lista.filter((e) => e.chave !== chave);
    });
  };

  // Ao sair da página, libera as miniaturas da memória.
  useEffect(() => {
    const mapa = previas.current;
    return () => mapa.forEach((url) => URL.revokeObjectURL(url));
  }, []);

  return {
    envios,
    adicionar,
    tentarDeNovo,
    cancelar,
    previaDe: (pathname: string) => previas.current.get(pathname),
    ocupado: envios.some((e) => e.estado === "fila" || e.estado === "enviando"),
    comErro: envios.some((e) => e.estado === "erro"),
  };
}
