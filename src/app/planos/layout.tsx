import type { Metadata } from "next";
import { planosUrl } from "@/lib/planos";

export const metadata: Metadata = {
  title: "Planos de criação, hospedagem e manutenção de sites",
  description:
    "Landing page por R$ 497, site institucional por R$ 997, hospedagem a partir de R$ 31,90/mês e manutenção a partir de R$ 99,90/mês. Parcele em até 12x.",
  alternates: { canonical: planosUrl },
  openGraph: {
    url: planosUrl,
    title: "Planos | Koinonia Dev",
    description:
      "Criação de sites, hospedagem e manutenção. Parcele em até 12x no cartão.",
  },
};

/**
 * Layout de /planos (servido em planos.koinoniadev.com.br).
 * Esconde a Navbar e o Footer do site principal, porque os links deles
 * apontam para âncoras da home. A página tem cabeçalho e rodapé próprios.
 */
export default function PlanosLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `body > header, body > footer { display: none !important; }`,
        }}
      />
      {children}
    </>
  );
}
