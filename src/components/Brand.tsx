import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import Wordmark from "./Wordmark";

/** Marca clicável: símbolo (logo_only.svg, neutro) + wordmark em texto. */
export default function Brand({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — Início`}
      className={`flex items-center gap-2.5 ${className}`}
    >
      <Image src="/logo_only.svg" alt="" aria-hidden width={40} height={40} className="h-9 w-9" />
      <Wordmark className="text-lg sm:text-xl" />
    </Link>
  );
}
