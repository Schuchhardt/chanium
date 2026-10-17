import { home } from "@/content/home";
import { segments } from "@/content/segments";
import { employees } from "@/content/employees";
import { cases } from "@/content/cases";
import { listedPackages } from "@/content/packages";
import { site } from "@/content/site";
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
  ProcessSteps,
  ProofStrip,
  SegmentGrid,
  StatementBand,
} from "@/components/sections/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { PlaybookCard } from "@/components/playbooks/PlaybookCard";
import { getPlaybooks } from "@/lib/playbooks";
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

      <MediaHero still="heroMansion" film="heroMansion" footer={<ProofStrip items={home.proof} tone="light" />}>
        <p className="fade-up flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-white/75" style={{ "--d": "300ms" } as CSSProperties}>
          <span aria-hidden="true" className="h-px w-8 bg-accent" />
          {home.hero.eyebrow}
        </p>
        <SplitText
          as="h1"
          text={home.hero.h1}
          accent={home.hero.accent}
          immediate
          delay={350}
          className="mt-6 max-w-5xl font-display text-[3rem] leading-[0.98] tracking-[-0.02em] text-balance sm:text-7xl lg:text-[7.5rem]"
        />
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <p className="fade-up max-w-xl text-lg leading-relaxed text-white/80" style={{ "--d": "900ms" } as CSSProperties}>
            {home.hero.subline}
          </p>
          <div className="fade-up flex flex-col gap-3 sm:flex-row" style={{ "--d": "1050ms" } as CSSProperties}>
            <ButtonLink href={home.hero.primary.href}>
              {home.hero.primary.label}
              <ArrowIcon className="transition-transform duration-300 group-hover/btn:translate-x-1" />
            </ButtonLink>
            <ButtonLink href={home.hero.secondary.href} variant="light">
              {home.hero.secondary.label}
            </ButtonLink>
          </div>
        </div>
      </MediaHero>

      <section className="py-14 sm:py-20" aria-label="Integrations">
        <IntegrationRail label={home.integrations.label} />
      </section>

      <Section>
        <SectionHeading eyebrow={home.segments.eyebrow} title={home.segments.h2} accent={home.segments.accent} />
        <SegmentGrid segments={segments} />
      </Section>

      <Section>
        <SectionHeading
          eyebrow={home.employees.eyebrow}
          title={home.employees.h2}
          accent={home.employees.accent}
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
        <SectionHeading eyebrow={home.cases.eyebrow} title={home.cases.h2} accent={home.cases.accent} />
        <ul className="grid gap-12 md:grid-cols-2 md:gap-8">
          {cases.map((c) => (
            <li key={c.slug}>
              <CaseStudyCard study={c} />
            </li>
          ))}
        </ul>
      </Section>

      <StatementBand still="living" line={home.statement.line} by={home.statement.by} />

      <Section>
        <SectionHeading
          eyebrow={home.packages.eyebrow}
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
        <SectionHeading eyebrow={home.process.eyebrow} title={home.process.h2} />
        <ProcessSteps steps={home.process.steps} />
        <div className="mt-16 sm:mt-24">
          <GuaranteePanel heading={home.guarantee.h2} points={home.guarantee.points} />
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow={home.playbooks.eyebrow}
          title={home.playbooks.h2}
          accent={home.playbooks.accent}
          action={
            <ButtonLink href={home.playbooks.cta.href} variant="ghost">
              {home.playbooks.cta.label} →
            </ButtonLink>
          }
        />
        <ul className="grid gap-4 md:grid-cols-3">
          {getPlaybooks()
            .slice(0, 3)
            .map(({ body: _body, ...p }) => (
              <li key={p.slug}>
                <PlaybookCard playbook={p} />
              </li>
            ))}
        </ul>
      </Section>

      <Section>
        <FinalCta heading={home.finalCta.h2} body={home.finalCta.body} cta={home.finalCta.primary} />
      </Section>
    </>
  );
}
