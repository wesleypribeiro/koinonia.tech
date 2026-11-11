import { siteConfig } from "@/lib/site";
import WhatsAppIcon from "./icons/WhatsAppIcon";

/** Botão flutuante de WhatsApp, fixo no canto inferior direito em todas as páginas. */
export default function WhatsAppFloat() {
  return (
    <a
      href={siteConfig.whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Conversar no WhatsApp: ${siteConfig.whatsapp.display}`}
      data-whatsapp-float
      className="group fixed right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/25 transition-transform duration-200 ease-out hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366] motion-reduce:transition-none sm:right-6 bottom-[calc(1rem+env(safe-area-inset-bottom))] sm:bottom-6"
    >
      <WhatsAppIcon className="h-7 w-7" />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-md bg-foreground px-3 py-1.5 text-sm font-medium text-background opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 md:block">
        Fale com a gente
      </span>
    </a>
  );
}
