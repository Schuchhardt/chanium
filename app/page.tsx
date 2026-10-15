import { home } from "@/content/home";
import { ButtonLink, Container, Eyebrow, H1 } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ ...home.seo, path: "/", absoluteTitle: true });

export default function HomePage() {
  return (
    <section className="hero-glow">
      <Container className="py-20 sm:py-28">
        <Eyebrow>{home.hero.eyebrow}</Eyebrow>
        <H1 className="mt-5 max-w-4xl">{home.hero.h1}</H1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{home.hero.subline}</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={home.hero.primary.href}>{home.hero.primary.label}</ButtonLink>
          <ButtonLink href={home.hero.secondary.href} variant="secondary">
            {home.hero.secondary.label}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
