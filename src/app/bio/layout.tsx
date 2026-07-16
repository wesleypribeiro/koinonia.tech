import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Koinonia Tech — Links",
  description:
    "Todos os links da Koinonia Tech em um só lugar. Sites, sistemas, automações e consultoria em tecnologia.",
  robots: { index: false, follow: false },
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
            body > footer { display: none !important; }
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
