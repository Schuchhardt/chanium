import { notFound } from "next/navigation";
import { segments, getSegmentByPath } from "@/content/segments";
import { getEmployee } from "@/content/employees";
import { getPackage } from "@/content/packages";
import { getCase } from "@/content/cases";
import { home } from "@/content/home";
import { ButtonLink, Container, Eyebrow, H1, Section, SectionHeading } from "@/components/ui";
import {
  CaseStudyCard,
  EmployeeGrid,
  FinalCta,
  GuaranteePanel,
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
      <section className="hero-glow">
        <Container className="pt-16 pb-14 sm:pt-28 sm:pb-20">
          <Eyebrow>{segment.name}</Eyebrow>
          <H1 className="mt-5 max-w-4xl">{segment.hero.h1}</H1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{segment.hero.subline}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={quoteHref}>{home.hero.primary.label}</ButtonLink>
            <ButtonLink href="/ai-employees" variant="secondary">
              {home.hero.secondary.label}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <Section>
        <SectionHeading title={segment.painsHeading} />
        <PainList pains={segment.pains} />
      </Section>

      <Section>
        <SectionHeading title={segment.employeesHeading} />
        <EmployeeGrid employees={employees} />
      </Section>

      <Section>
        <SectionHeading title={segment.packagesHeading} />
        <PackageGrid packages={packages} />
      </Section>

      {study && (
        <Section>
          <SectionHeading title={home.cases.h2} />
          <div className="max-w-2xl">
            <CaseStudyCard study={study} />
          </div>
        </Section>
      )}

      <Section>
        <SectionHeading title={home.process.h2} />
        <ProcessSteps steps={home.process.steps} />
        <div className="mt-6">
          <GuaranteePanel heading={home.guarantee.h2} points={home.guarantee.points} />
        </div>
      </Section>

      <Section>
        <FinalCta heading={home.finalCta.h2} body={home.finalCta.body} cta={{ ...home.finalCta.primary, href: quoteHref }} />
      </Section>
    </>
  );
}
