import Link from "next/link";
import { notFound } from "next/navigation";
import { employees, employeesPage, getEmployee } from "@/content/employees";
import { getPackage } from "@/content/packages";
import { getSegment } from "@/content/segments";
import { site } from "@/content/site";
import { home } from "@/content/home";
import { ButtonLink, Card, CheckIcon, Chip, Container, Eyebrow, H1, Section } from "@/components/ui";
import { EmployeeGrid } from "@/components/sections/Blocks";
import { Reveal } from "@/components/motion";
import { WaitlistForm } from "@/components/employees/WaitlistForm";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, absoluteUrl } from "@/lib/seo";
import { waitlistCount } from "@/lib/waitlist";

export const dynamicParams = false;
// The waitlist counter refreshes hourly; everything else is static content.
export const revalidate = 3600;

export function generateStaticParams() {
  return employees.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/ai-employees/[slug]">) {
  const e = getEmployee((await params).slug);
  if (!e) return {};
  return pageMetadata({
    title: `${e.name} — AI Employee for real estate`,
    description: `${e.oneLiner}. Connects to ${e.connects.join(", ")}. Built for you by Chanium at a fixed price.`,
    path: `/ai-employees/${e.slug}`,
  });
}

export default async function EmployeePage({ params }: PageProps<"/ai-employees/[slug]">) {
  const e = getEmployee((await params).slug);
  if (!e) notFound();
  const copy = employeesPage.detail;
  const pkg = e.buildPackage ? getPackage(e.buildPackage) : undefined;
  const count = await waitlistCount(e.slug);
  const related = employees.filter((x) => x.slug !== e.slug && x.segment.some((s) => e.segment.includes(s))).slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `${e.name} AI Employee`,
          description: e.oneLiner,
          provider: { "@type": "Organization", name: site.name, url: absoluteUrl("/") },
          areaServed: "US",
          url: absoluteUrl(`/ai-employees/${e.slug}`),
        }}
      />
      <section className="hero-glow">
        <Container className="pt-16 pb-12 sm:pt-28 sm:pb-16">
          <div className="flex flex-wrap items-center gap-3">
            <Eyebrow>AI Employee</Eyebrow>
            <Chip tone={e.status === "available" ? "success" : "warn"}>{employeesPage.statusLabels[e.status]}</Chip>
          </div>
          <H1 className="mt-5 max-w-4xl">{e.name}</H1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{e.oneLiner}.</p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Segments">
            {e.segment.map((s) => {
              const seg = getSegment(s);
              return (
                <li key={s}>
                  <Link href={`/${seg.path}`} className="text-sm text-accent-soft underline-offset-4 hover:underline">
                    {seg.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <Section className="pt-4! sm:pt-8!">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="font-display text-4xl text-title sm:text-5xl">{copy.dayHeading}</h2>
            <ol className="relative mt-8 border-l border-line pl-8">
              {e.dayInTheLife.map((line, i) => (
                <Reveal as="li" key={line} delay={i * 90} className="relative pb-8 last:pb-0">
                  <span className="absolute top-1.5 -left-[2.32rem] h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-bg" />
                  <span className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-1 text-lg leading-relaxed text-fg">{line}</p>
                </Reveal>
              ))}
            </ol>
            <h2 className="mt-16 font-display text-3xl text-title">{copy.connectsHeading}</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {e.connects.map((c) => (
                <li key={c}>
                  <Chip>{c}</Chip>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <Card>
              <h2 className="font-display text-3xl text-title">{copy.buildHeading}</h2>
              {pkg ? (
                <>
                  <p className="mt-2 text-muted">Delivered as part of {pkg.name}.</p>
                  <div className="mt-5 flex items-baseline justify-between gap-4 border-y border-line py-4">
                    <span className="font-mono text-xl text-title">{e.priceFrom ?? pkg.price}</span>
                    <span className="text-right font-mono text-sm text-muted">{e.timeline ?? pkg.timeline}</span>
                  </div>
                </>
              ) : (
                <p className="mt-2 text-muted">{copy.customBuild}</p>
              )}
              <ul className="mt-5 space-y-2 text-sm">
                {home.guarantee.points.map((line) => (
                  <li key={line} className="flex gap-2 text-fg">
                    <CheckIcon className="text-accent-soft" />
                    {line}
                  </li>
                ))}
              </ul>
              <ButtonLink href={`/quote?employee=${e.slug}`} className="mt-6 w-full">
                {copy.buildCta}
              </ButtonLink>
            </Card>

            <Card className="scroll-mt-24">
              <h2 id="waitlist" className="font-display text-3xl text-title">{copy.waitlistHeading}</h2>
              <p className="mt-2 mb-5 text-muted">{copy.waitlistBody}</p>
              <WaitlistForm employeeSlug={e.slug} />
              {count !== null && count > copy.counterThreshold && (
                <p className="mt-4 text-sm text-subtle">
                  <strong className="text-title">{count}</strong> {copy.counterLabel}
                </p>
              )}
            </Card>
          </div>
        </div>
      </Section>

      {related.length > 0 && (
        <Section>
          <h2 className="mb-10 font-display text-4xl text-title sm:text-5xl">Works well alongside</h2>
          <EmployeeGrid employees={related} />
        </Section>
      )}
    </>
  );
}
