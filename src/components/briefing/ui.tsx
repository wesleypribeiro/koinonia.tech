import type { ButtonHTMLAttributes, ReactNode } from "react";
import { AlertCircle } from "lucide-react";

/* Peças visuais repetidas no briefing e no painel. */

export const estiloCampo =
  "block w-full min-h-12 border border-border bg-card px-4 py-3 text-base text-foreground placeholder:text-muted-fg " +
  "transition-[border-color,box-shadow] duration-150 hover:border-foreground/40 " +
  "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25 " +
  "aria-[invalid=true]:border-red-600 dark:aria-[invalid=true]:border-red-400 " +
  "disabled:cursor-not-allowed disabled:opacity-60";

type Variante = "primario" | "secundario" | "texto" | "perigo" | "perigoTexto";

const estilosBotao: Record<Variante, string> = {
  primario:
    "bg-primary text-primary-fg hover:bg-primary-hover disabled:hover:bg-primary",
  secundario:
    "border border-border text-foreground hover:border-primary hover:text-primary",
  texto: "text-foreground underline-offset-4 hover:text-primary hover:underline",
  perigo: "bg-red-700 text-white hover:bg-red-800 disabled:hover:bg-red-700",
  perigoTexto: "text-red-700 underline-offset-4 hover:underline dark:text-red-400",
};

export function Botao({
  variante = "primario",
  className = "",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variante?: Variante }) {
  const base =
    variante === "texto" || variante === "perigoTexto"
      ? "inline-flex min-h-11 items-center gap-2 text-left text-sm font-semibold"
      : "inline-flex min-h-12 items-center justify-center gap-2 px-6 text-sm font-bold uppercase tracking-wider";
  return (
    <button
      type="button"
      {...props}
      className={`${base} transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100 ${estilosBotao[variante]} ${className}`}
    >
      {children}
    </button>
  );
}

export function Erro({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-sm font-medium text-red-600 dark:text-red-400">
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      <span>{children}</span>
    </p>
  );
}

export function Opcional() {
  return <span className="ml-2 text-sm font-normal text-muted-fg">opcional</span>;
}
