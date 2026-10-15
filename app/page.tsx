import { home } from "@/content/home";
import { segments } from "@/content/segments";
import { employees } from "@/content/employees";
import { cases } from "@/content/cases";
import { listedPackages } from "@/content/packages";
import { site } from "@/content/site";
import { ButtonLink, Container, Eyebrow, H1, Section, SectionHeading } from "@/components/ui";
import {
  CaseStudyCard,
  EmployeeGrid,
  FinalCta,
  GuaranteePanel,
  IntegrationRail,
  PackageGrid,
  ProcessSteps,
  ProofStrip,
  SegmentGrid,
} from "@/components/sections/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, absoluteUrl } from "@/lib/seo";

export const metadata = pageMetadata({ ...home.seo, path: "/", absoluteTitle: true });

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: site.name,
          legalName: site.legalName,
          url: site.url,
          logo: absoluteUrl("/android-chrome-512x512.png"),
          description: site.description,
          email: site.email,
          contactPoint: { "@type": "ContactPoint", email: site.email, contactType: "sales", areaServed: "US" },
        }}
      />

      <section className="hero-glow">
        <Container className="pt-16 pb-12 sm:pt-28 sm:pb-16">
          <Eyebrow>{home.hero.eyebrow}</Eyebrow>
          <H1 className="mt-5 max-w-4xl">{home.hero.h1}</H1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{home.hero.subline}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={home.hero.primary.href}>{home.hero.primary.label}</ButtonLink>
            <ButtonLink href={home.hero.secondary.href} variant="secondary">
              {home.hero.secondary.label}
            </ButtonLink>
          </div>
          <div className="mt-14 sm:mt-20">
            <ProofStrip items={home.proof} />
          </div>
        </Container>
      </section>

      <Section className="py-10! sm:py-14!" aria-label="Integrations">
        <IntegrationRail label={home.integrations.label} />
      </Section>

      <Section>
        <SectionHeading title={home.segments.h2} />
        <SegmentGrid segments={segments} />
      </Section>

      <Section>
        <SectionHeading
          title={home.employees.h2}
          subline={home.employees.subline}
          action={
            <ButtonLink href={home.employees.cta.href} variant="ghost">
              {home.employees.cta.label} →
            </ButtonLink>
          }
        />
        <EmployeeGrid employees={employees.filter((e) => e.status === "available").slice(0, 3)} />
      </Section>

      <Section>
        <SectionHeading title={home.cases.h2} />
        <ul className="grid gap-4 md:grid-cols-2">
          {cases.map((c) => (
            <li key={c.slug}>
              <CaseStudyCard study={c} />
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHeading
          title={home.packages.h2}
          action={
            <ButtonLink href={home.packages.cta.href} variant="ghost">
              {home.packages.cta.label} →
            </ButtonLink>
          }
        />
        <PackageGrid packages={listedPackages.map((pkg) => ({ pkg }))} />
      </Section>

      <Section>
        <SectionHeading title={home.process.h2} />
        <ProcessSteps steps={home.process.steps} />
        <div className="mt-6">
          <GuaranteePanel heading={home.guarantee.h2} points={home.guarantee.points} />
        </div>
      </Section>

      <Section>
        <FinalCta heading={home.finalCta.h2} body={home.finalCta.body} cta={home.finalCta.primary} />
      </Section>
    </>
  );
}
