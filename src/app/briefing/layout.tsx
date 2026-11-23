import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Briefing do seu projeto",
  description: "Conte sobre a sua empresa para a Koinonia Dev montar o seu site e o seu perfil no Google.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/briefing" },
};

/**
 * Layout de /briefing. Esconde a Navbar, o Footer e o botão flutuante do site:
 * o cliente chega pelo link do WhatsApp e só precisa do formulário.
 */
export default function BriefingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `body > header, body > footer, body > [data-whatsapp-float] { display: none !important; }`,
        }}
      />
      {children}
    </>
  );
}
