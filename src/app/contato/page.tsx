import type { Metadata } from "next";
import { Mail, MessageCircle, Clock } from "lucide-react";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato",
  description: `Fale com a ${siteConfig.name} por WhatsApp ou e-mail e conte sobre o seu projeto. Vamos construir algo juntos.`,
};

export default function ContatoPage() {
  return (
    <>
      <PageHeader
        title="Vamos conversar"
        subtitle="Conte sobre o seu projeto. Respondemos o quanto antes pelos canais abaixo."
      />

      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          {/* Canais diretos */}
          <Reveal>
            <h2 className="text-2xl text-foreground">Canais diretos</h2>
            <p className="mt-3 text-muted-fg">
              Prefere falar agora? O WhatsApp costuma ser o caminho mais rápido.
            </p>

            <a
              href={siteConfig.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Falar no WhatsApp
            </a>

            <ul className="mt-8 space-y-5">
              <li className="flex items-start gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">E-mail</p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-sm text-muted-fg transition-colors hover:text-primary"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MessageCircle className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">WhatsApp</p>
                  <p className="text-sm text-muted-fg">{siteConfig.whatsapp.display}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Clock className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">Atendimento</p>
                  <p className="text-sm text-muted-fg">Segunda a sexta, das 9h às 18h</p>
                </div>
              </li>
            </ul>
          </Reveal>

          {/* Formulário */}
          <Reveal delay={120}>
            <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
              <h2 className="text-2xl text-foreground">Envie uma mensagem</h2>
              <p className="mt-2 text-sm text-muted-fg">
                Preencha o formulário e abriremos o seu e-mail com tudo pronto para enviar.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
