import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Koinonia Dev — Links",
  description:
    "Todos os links da Koinonia Dev em um só lugar. Sites, sistemas, automações e consultoria em tecnologia.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/bio" },
};

/**
 * Layout exclusivo para /bio — esconde Navbar e Footer do site principal
 * via CSS, sem alterar o root layout.
 */
export default function BioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            body > header,
            body > footer,
            body > [data-whatsapp-float] { display: none !important; }
            body > main { flex: unset !important; }
            body {
              background: #050510 !important;
              flex-direction: column !important;
            }
          `,
        }}
      />
      {children}
    </>
  );
}
