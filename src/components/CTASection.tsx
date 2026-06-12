import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "./Container";
import Reveal from "./Reveal";

type CTASectionProps = {
  title?: string;
  description?: string;
  buttonLabel?: string;
};

export default function CTASection({
  title = "Vamos construir algo juntos?",
  description = "Conte sua ideia e descubra como podemos ajudar o seu negócio a crescer.",
  buttonLabel = "Falar com a gente",
}: CTASectionProps) {
  return (
    <section className="py-16">
      <Container>
        <Reveal className="rounded-2xl bg-primary px-6 py-12 text-center text-primary-fg sm:px-12 sm:py-16">
          <h2 className="text-balance text-primary-fg">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-fg/80">{description}</p>
          <Link
            href="/contato"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-medium text-accent-fg transition-colors hover:bg-accent-hover"
          >
            {buttonLabel}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
