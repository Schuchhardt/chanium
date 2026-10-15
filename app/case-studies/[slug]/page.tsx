import { notFound } from "next/navigation";
import { cases, getCase } from "@/content/cases";
import { getSegment } from "@/content/segments";
import { home } from "@/content/home";
import { ButtonLink, Chip, Container, Eyebrow, H1, Section } from "@/components/ui";
import { FinalCta } from "@/components/sections/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, absoluteUrl } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/case-studies/[slug]">) {
  const study = getCase((await params).slug);
  if (!study) return {};
  return pageMetadata({ ...study.seo, path: `/case-studies/${study.slug}`, type: "article" });
}

export default async function CaseStudyPage({ params }: PageProps<"/case-studies/[slug]">) {
  const study = getCase((await params).slug);
  if (!study) notFound();
  const segment = getSegment(study.segment);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: study.title,
          description: study.seo.description,
          author: { "@type": "Organization", name: "Chanium" },
          publisher: { "@type": "Organization", name: "Chanium" },
          mainEntityOfPage: absoluteUrl(`/case-studies/${study.slug}`),
        }}
      />
      <section className="hero-glow">
        <Container className="pt-16 pb-12 sm:pt-28 sm:pb-16">
          <Eyebrow>
            Case study · {study.client}
          </Eyebrow>
          <H1 className="mt-5 max-w-4xl">{study.title}</H1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{study.summary}</p>
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Stack">
            {study.stack.map((tool) => (
              <li key={tool}>
                <Chip>{tool}</Chip>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <Section className="pt-4! sm:pt-8!">
        <h2 className="sr-only">Before and after</h2>
        <div className="overflow-hidden rounded-xl border border-line">
          <div className="hidden grid-cols-[1fr_1.4fr_1.4fr] border-b border-line bg-bg-elevated px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-subtle md:grid">
            <span>Area</span>
            <span>Before</span>
            <span>After</span>
          </div>
          <ul className="divide-y divide-line">
            {study.rows.map((row) => (
              <li key={row.area} className="grid gap-2 bg-card px-6 py-5 md:grid-cols-[1fr_1.4fr_1.4fr] md:gap-6">
                <p className="font-semibold text-title">{row.area}</p>
                <p className="text-muted">
                  <span className="mr-2 text-xs font-semibold uppercase tracking-wider text-subtle md:hidden">Before</span>
                  {row.before}
                </p>
                <p className="text-fg">
                  <span className="mr-2 text-xs font-semibold uppercase tracking-wider text-accent-soft md:hidden">After</span>
                  {row.after}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={`/${segment.path}`} variant="secondary">
            More on {segment.name.toLowerCase()}
          </ButtonLink>
          {study.link && (
            <ButtonLink href={study.link.href} variant="ghost">
              {study.link.label} ↗
            </ButtonLink>
          )}
        </div>
      </Section>
      <Section>
        <FinalCta heading={home.finalCta.h2} body={home.finalCta.body} cta={{ ...home.finalCta.primary, href: `/quote?segment=${study.segment}` }} />
      </Section>
    </>
  );
}
