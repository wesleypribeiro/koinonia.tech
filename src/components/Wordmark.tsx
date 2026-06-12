import { siteConfig } from "@/lib/site";

/**
 * Nome da marca em texto, com a última palavra destacada na cor primária.
 * Funciona nos dois temas (não depende de imagem).
 */
export default function Wordmark({ className = "" }: { className?: string }) {
  const parts = siteConfig.name.trim().split(" ");
  const last = parts.length > 1 ? parts.pop() : "";
  const first = parts.join(" ");

  return (
    <span className={`font-semibold tracking-tight text-foreground ${className}`}>
      {first}
      {last && <span className="text-primary"> {last}</span>}
    </span>
  );
}
