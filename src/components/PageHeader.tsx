import Container from "./Container";
import Reveal from "./Reveal";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
};

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="border-b border-border bg-muted">
      <Container className="py-14 sm:py-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h1 className="text-foreground">{title}</h1>
          {subtitle && <p className="mt-4 text-lg text-muted-fg">{subtitle}</p>}
        </Reveal>
      </Container>
    </section>
  );
}
