import { notFound } from "next/navigation";
import { segments, getSegmentByPath } from "@/content/segments";
import { getEmployee } from "@/content/employees";
import { getPackage } from "@/content/packages";
import { getCase } from "@/content/cases";
import { home } from "@/content/home";
import type { CSSProperties } from "react";
import { ArrowIcon, ButtonLink, Section, SectionHeading } from "@/components/ui";
import { SplitText } from "@/components/motion";
import {
  CaseStudyCard,
  EmployeeGrid,
  FinalCta,
  GuaranteePanel,
  IntegrationRail,
  MediaHero,
  PackageGrid,
  PainList,
  ProcessSteps,
} from "@/components/sections/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, absoluteUrl } from "@/lib/seo";

// Only the four segment paths exist at the root; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return segments.map((s) => ({ segment: s.path }));
}

export async function generateMetadata({ params }: PageProps<"/[segment]">) {
  const segment = getSegmentByPath((await params).segment);
  if (!segment) return {};
  return pageMetadata({ ...segment.seo, path: `/${segment.path}`, absoluteTitle: true });
}

export default async function SegmentPage({ params }: PageProps<"/[segment]">) {
  const segment = getSegmentByPath((await params).segment);
  if (!segment) notFound();

  const employees = segment.employees.map((slug) => getEmployee(slug)!).filter(Boolean);
  const packages = segment.packages.map(({ slug, variant }) => ({ pkg: getPackage(slug)!, variant }));
  const study = segment.caseStudy ? getCase(segment.caseStudy) : undefined;
  const quoteHref = `/quote?segment=${segment.slug}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `AI operations for ${segment.name.toLowerCase()}`,
          serviceType: segment.seo.keywords[0],
          description: segment.seo.description,
          provider: { "@type": "Organization", name: "Chanium", url: absoluteUrl("/") },
          areaServed: "US",
          url: absoluteUrl(`/${segment.path}`),
        }}
      />
      <MediaHero still={segment.media.still} film={segment.media.film} tall={false}>
        <p className="fade-up flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-white/75" style={{ "--d": "300ms" } as CSSProperties}>
          <span aria-hidden="true" className="h-px w-8 bg-accent" />
          {segment.name}
        </p>
        <SplitText
          as="h1"
          text={segment.hero.h1}
          immediate
          delay={350}
          className="mt-6 max-w-5xl font-display text-[2.8rem] leading-[0.98] tracking-[-0.02em] text-balance sm:text-7xl lg:text-[6.5rem]"
        />
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <p className="fade-up max-w-xl text-lg leading-relaxed text-white/80" style={{ "--d": "800ms" } as CSSProperties}>
            {segment.hero.subline}
          </p>
          <div className="fade-up flex flex-col gap-3 sm:flex-row" style={{ "--d": "950ms" } as CSSProperties}>
            <ButtonLink href={quoteHref}>
              {home.hero.primary.label}
              <ArrowIcon className="transition-transform duration-300 group-hover/btn:translate-x-1" />
            </ButtonLink>
            <ButtonLink href="/ai-employees" variant="light">
              {home.hero.secondary.label}
            </ButtonLink>
          </div>
        </div>
      </MediaHero>

      <Section>
        <SectionHeading eyebrow="What breaks at scale" title={segment.painsHeading} />
        <PainList pains={segment.pains} />
      </Section>

      <Section>
        <SectionHeading eyebrow="AI Employees" title={segment.employeesHeading} />
        <EmployeeGrid employees={employees} />
      </Section>

      <Section>
        <SectionHeading eyebrow="Fixed price" title={segment.packagesHeading} />
        <PackageGrid packages={packages} />
      </Section>

      {study && (
        <Section>
          <SectionHeading eyebrow={home.cases.eyebrow} title={home.cases.h2} accent={home.cases.accent} />
          <div className="max-w-3xl">
            <CaseStudyCard study={study} />
          </div>
        </Section>
      )}

      <Section>
        <SectionHeading eyebrow={home.process.eyebrow} title={home.process.h2} />
        <ProcessSteps steps={home.process.steps} />
        <div className="mt-16 sm:mt-24">
          <GuaranteePanel heading={home.guarantee.h2} points={home.guarantee.points} />
        </div>
      </Section>

      <section className="pb-8" aria-label="Integrations">
        <IntegrationRail label={home.integrations.label} />
      </section>

      <Section>
        <FinalCta heading={home.finalCta.h2} body={home.finalCta.body} cta={{ ...home.finalCta.primary, href: quoteHref }} />
      </Section>
    </>
  );
}
