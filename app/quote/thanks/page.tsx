import { quoteCopy } from "@/content/quote";
import { ButtonLink, CheckIcon, Container, H1 } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: quoteCopy.thanks.seo.title,
  description: quoteCopy.thanks.body,
  path: "/quote/thanks",
  noindex: true,
});

export default function ThanksPage() {
  const t = quoteCopy.thanks;
  return (
    <section className="hero-glow">
      <Container className="max-w-3xl! py-20 sm:py-28">
        <H1>{t.h1}</H1>
        <p className="mt-6 text-lg leading-relaxed text-muted">{t.body}</p>
        <ol className="mt-10 space-y-4">
          {t.next.map((line) => (
            <li key={line} className="flex gap-3 text-fg">
              <CheckIcon className="mt-0.5 text-accent-soft" />
              {line}
            </li>
          ))}
        </ol>
        <ButtonLink href={t.secondary.href} variant="secondary" className="mt-10">
          {t.secondary.label}
        </ButtonLink>
      </Container>
    </section>
  );
}
