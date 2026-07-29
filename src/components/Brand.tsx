import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site";

/** Marca clicável: logo completo. Alterna versão colorida e branca no dark mode. */
export default function Brand({ className = "" }: { className?: string }) {
  const basePath = process.env.PAGES_BASE_PATH || '';
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — Início`}
      className={`flex items-center gap-2.5 ${className}`}
    >
      <Image 
        src={`${basePath}/branding/logo_principal_horizontal_color.svg`} 
        alt="Koinonia Tech" 
        width={190} 
        height={60} 
        className="w-[clamp(145px,16vw,190px)] h-auto object-contain dark:hidden" 
      />
      <Image 
        src={`${basePath}/branding/logo_horizontal_branco.svg`} 
        alt="Koinonia Tech" 
        width={190} 
        height={60} 
        className="w-[clamp(145px,16vw,190px)] h-auto object-contain hidden dark:block" 
      />
    </Link>
  );
}
