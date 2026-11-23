import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Painel",
  robots: { index: false, follow: false },
};

/** Painel interno: sem a Navbar, o Footer e o botão flutuante do site. */
export default function PainelLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `body > header, body > footer, body > [data-whatsapp-float] { display: none !important; }`,
        }}
      />
      <div className="area-form">{children}</div>
    </>
  );
}
