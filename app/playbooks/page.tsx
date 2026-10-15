import { Suspense } from "react";
import { playbooksPage } from "@/content/playbooksPage";
import { segments } from "@/content/segments";
import { Container, H1, Section } from "@/components/ui";
import { PlaybookCard } from "@/components/playbooks/PlaybookCard";
import { PlaybookIndex, PlaybookList } from "@/components/playbooks/PlaybookIndex";
import { getPlaybooks } from "@/lib/playbooks";
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({ ...playbooksPage.seo, path: "/playbooks" }),
  alternates: {
    canonical: pageMetadata({ ...playbooksPage.seo, path: "/playbooks" }).alternates?.canonical,
    types: { "application/rss+xml": "/playbooks/rss.xml" },
  },
};

export default function PlaybooksPage() {
  const playbooks = getPlaybooks().map(({ body: _body, ...fm }) => fm);
  const cards = Object.fromEntries(playbooks.map((p) => [p.slug, <PlaybookCard key={p.slug} playbook={p} headingLevel="h2" />]));
  const segs = segments.map((s) => ({ slug: s.slug, name: s.name }));
  return (
    <>
      <section className="hero-glow">
        <Container className="pt-16 pb-10 sm:pt-28 sm:pb-14">
          <H1>{playbooksPage.h1}</H1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{playbooksPage.subline}</p>
        </Container>
      </section>
      <Section className="pt-4! sm:pt-6!">
        <Suspense fallback={<PlaybookList slugs={playbooks.map((p) => p.slug)} cards={cards} />}>
          <PlaybookIndex playbooks={playbooks} segments={segs} cards={cards} />
        </Suspense>
      </Section>
    </>
  );
}
