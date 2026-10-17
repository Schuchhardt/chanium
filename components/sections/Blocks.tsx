import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { CaseStudy, Employee, Package, Segment, Step } from "@/content/types";
import { employeesPage } from "@/content/employees";
import { integrations } from "@/content/integrations";
import { filmSrc, getStill, stillSrc, type FilmKey, type StillKey } from "@/content/media";
import { site } from "@/content/site";
import { AmbientVideo, CountUp, Parallax, Reveal, SplitText } from "../motion";
import { ArrowIcon, ButtonLink, CheckIcon, Chip, Container, Photo, cx } from "../ui";

/**
 * Full-bleed media hero: a still (always rendered, the LCP image), an optional looping film over
 * it, a legibility scrim and the page's headline block on top.
 */
export function MediaHero({
  still,
  film,
  children,
  footer,
  tall = true,
}: {
  still: StillKey;
  film?: FilmKey;
  children: ReactNode;
  footer?: ReactNode;
  tall?: boolean;
}) {
  const s = getStill(still);
  return (
    <section className="media-hero relative isolate overflow-hidden bg-[#141414] text-white">
      <div className="hero-open absolute inset-0 -z-10">
        <Image src={s.src} alt={s.alt} fill priority sizes="100vw" className="object-cover" />
        {film && (
          <div className="absolute inset-0">
            <AmbientVideo src={filmSrc(film)} poster={stillSrc(still)} />
          </div>
        )}
        <div className="grain absolute inset-0 overflow-hidden" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/40" />
      </div>
      <Container
        className={cx(
          "flex flex-col justify-end pt-32 pb-10 sm:pb-14",
          tall ? "min-h-[calc(100svh-0px)] sm:min-h-[860px]" : "min-h-[72svh] sm:min-h-[680px]",
        )}
      >
        {children}
        {footer && <div className="mt-12 sm:mt-16">{footer}</div>}
      </Container>
    </section>
  );
}

export function ProofStrip({
  items,
  tone = "default",
}: {
  items: { value: string; label: string }[];
  tone?: "default" | "light";
}) {
  const light = tone === "light";
  return (
    <dl
      className={cx(
        "grid grid-cols-1 border-t sm:grid-cols-3",
        light ? "border-white/25" : "border-line",
      )}
    >
      {items.map((item, i) => (
        <Reveal
          key={item.label}
          delay={600 + i * 120}
          className={cx(
            "flex items-baseline justify-between gap-3 border-b py-4 sm:flex-col sm:justify-start sm:gap-2 sm:border-b-0 sm:py-6 sm:pr-6",
            light ? "border-white/15" : "border-line",
            i > 0 && (light ? "sm:border-l sm:border-white/15 sm:pl-6" : "sm:border-l sm:border-line sm:pl-6"),
          )}
        >
          <dt className={cx("order-2 text-sm", light ? "text-white/70" : "text-muted")}>{item.label}</dt>
          <dd className={cx("order-1 font-mono text-2xl font-medium sm:text-4xl", light ? "text-white" : "text-title")}>
            <CountUp value={item.value} />
          </dd>
        </Reveal>
      ))}
    </dl>
  );
}

export function IntegrationRail({ label }: { label: string }) {
  const row = (hidden?: boolean) => (
    <ul className="flex shrink-0 items-center gap-12 pr-12 sm:gap-20 sm:pr-20" aria-hidden={hidden || undefined}>
      {integrations.map((tool) => (
        <li key={tool.name} className="font-display text-2xl whitespace-nowrap text-subtle italic sm:text-3xl">
          {tool.name}
        </li>
      ))}
    </ul>
  );
  return (
    <div>
      <Container>
        <p className="text-center font-mono text-[0.72rem] uppercase tracking-[0.14em] text-subtle">{label}</p>
      </Container>
      <div className="marquee mt-8 overflow-hidden">
        <div className="marquee-track">
          {row()}
          {row(true)}
        </div>
      </div>
    </div>
  );
}

export function SegmentGrid({ segments }: { segments: Segment[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 sm:gap-6">
      {segments.map((s, i) => (
        <li key={s.slug} className={cx(i % 2 === 1 && "sm:mt-24")}>
          <Link href={`/${s.path}`} className="group block">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] sm:aspect-[5/6]">
              <Photo still={s.media.card} className="absolute! inset-0" sizes="(min-width: 640px) 50vw, 100vw" delay={i * 80} />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <span className="absolute top-5 left-5 font-mono text-xs text-white/80">
                {String(i + 1).padStart(2, "0")} / {String(segments.length).padStart(2, "0")}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                <h3 className="font-display text-4xl leading-none sm:text-5xl">{s.name}</h3>
                <p className="mt-3 max-w-sm text-white/80">{s.cardLine}</p>
                <span className="mt-6 inline-flex items-center gap-3 text-sm font-medium">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 transition-colors duration-500 group-hover:border-accent group-hover:bg-accent">
                    <ArrowIcon className="transition-transform duration-500 group-hover:translate-x-0.5" />
                  </span>
                  <span className="link-draw">See how it works</span>
                </span>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function EmployeeCard({ employee, headingLevel = "h3" }: { employee: Employee; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  const available = employee.status === "available";
  return (
    <Link
      href={`/ai-employees/${employee.slug}`}
      className="group relative flex h-full flex-col gap-6 overflow-hidden rounded-[12px] border border-line bg-card p-6 transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 hover:border-line-strong hover:shadow-elevated sm:p-8"
    >
      <div className="flex items-start justify-between gap-3">
        <Chip tone={available ? "success" : "warn"}>{employeesPage.statusLabels[employee.status]}</Chip>
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-title transition-colors duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
          <ArrowIcon className="-rotate-45 transition-transform duration-500 group-hover:rotate-0" />
        </span>
      </div>
      <div>
        <Heading className="font-display text-3xl leading-tight text-title">{employee.name}</Heading>
        <p className="mt-3 leading-relaxed text-muted">{employee.oneLiner}.</p>
      </div>
      <div className="mt-auto space-y-4">
        <ul className="flex flex-wrap gap-1.5" aria-label="Connects">
          {employee.connects.map((c) => (
            <li key={c} className="rounded-[6px] bg-bg-elevated px-2 py-1 font-mono text-[0.7rem] text-muted">
              {c}
            </li>
          ))}
        </ul>
        {(employee.priceFrom || employee.timeline) && (
          <p className="flex justify-between border-t border-line pt-4 font-mono text-sm text-title">
            {employee.priceFrom && <span>{employee.priceFrom}</span>}
            {employee.timeline && <span className="text-muted">{employee.timeline}</span>}
          </p>
        )}
      </div>
    </Link>
  );
}

export function EmployeeGrid({ employees, headingLevel }: { employees: Employee[]; headingLevel?: "h2" | "h3" }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {employees.map((e, i) => (
        <Reveal as="li" key={e.slug} delay={i * 90}>
          <EmployeeCard employee={e} headingLevel={headingLevel} />
        </Reveal>
      ))}
    </ul>
  );
}

export function PackageCard({
  pkg,
  variant,
  highlight = false,
  cta = { label: "Get a quote", href: "/quote" },
  headingLevel: Heading = "h3",
}: {
  pkg: Package;
  variant?: string;
  highlight?: boolean;
  cta?: { label: string; href: string };
  headingLevel?: "h2" | "h3";
}) {
  return (
    <div
      className={cx(
        "flex h-full flex-col rounded-[20px] border p-6 sm:p-8",
        highlight ? "border-transparent bg-[#141414] text-[#f4f3ef] shadow-elevated" : "border-line bg-card",
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        {highlight && <Chip tone="accent">Most chosen</Chip>}
        {variant && <Chip tone="accent">{variant}</Chip>}
      </div>
      <Heading className={cx("mt-4 font-display text-[1.9rem] leading-tight", highlight ? "text-white" : "text-title")}>
        {pkg.name}
      </Heading>
      <p className={cx("mt-3 leading-relaxed", highlight ? "text-white/70" : "text-muted")}>{pkg.outcome}</p>
      <div
        className={cx(
          "mt-6 flex items-baseline justify-between gap-4 border-y py-4 font-mono",
          highlight ? "border-white/15" : "border-line",
        )}
      >
        <span className={cx("text-xl font-medium", highlight ? "text-white" : "text-title")}>{pkg.price}</span>
        <span className={cx("text-right text-sm", highlight ? "text-white/60" : "text-muted")}>{pkg.timeline}</span>
      </div>
      <ul className="mt-6 space-y-3">
        {pkg.includes.map((line) => (
          <li key={line} className={cx("flex gap-3 text-sm", highlight ? "text-white/85" : "text-fg")}>
            <CheckIcon className="text-accent" />
            {line}
          </li>
        ))}
      </ul>
      <p className={cx("mt-auto pt-8 text-xs leading-relaxed", highlight ? "text-white/50" : "text-subtle")}>
        {site.guarantee.short}
      </p>
      <ButtonLink
        href={cta.href}
        variant={highlight ? "primary" : "secondary"}
        className="mt-5 w-full"
        aria-label={`${cta.label} for ${pkg.name}`}
      >
        {cta.label}
      </ButtonLink>
    </div>
  );
}

export function PackageGrid({ packages }: { packages: { pkg: Package; variant?: string }[] }) {
  const highlightAt = packages.length > 2 ? 1 : -1;
  return (
    <ul className={cx("grid gap-4", packages.length > 1 && "md:grid-cols-2", packages.length > 2 && "lg:grid-cols-4")}>
      {packages.map(({ pkg, variant }, i) => (
        <Reveal as="li" key={pkg.slug + (variant ?? "")} delay={i * 90} className={cx(packages.length === 1 && "max-w-md")}>
          <PackageCard pkg={pkg} variant={variant} highlight={i === highlightAt} />
        </Reveal>
      ))}
    </ul>
  );
}

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link href={`/case-studies/${study.slug}`} className="group flex h-full flex-col">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[20px]">
        <Photo still={study.image} className="absolute! inset-0" />
        <span className="absolute top-5 left-5 rounded-full bg-white/90 px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-[#141414] backdrop-blur">
          {study.named ? study.client : "Anonymized"}
        </span>
      </div>
      <div className="flex flex-1 flex-col pt-6">
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-subtle">{study.client}</p>
        <h3 className="mt-3 font-display text-3xl leading-tight text-title sm:text-4xl">{study.title}</h3>
        <ul className="mt-6 divide-y divide-line border-y border-line">
          {study.rows.map((row) => (
            <li key={row.area} className="grid gap-1 py-4 text-sm sm:grid-cols-[9rem_1fr] sm:gap-4">
              <p className="font-medium text-title">{row.area}</p>
              <div>
                <p className="text-subtle line-through decoration-subtle/60">{row.before}</p>
                <p className="mt-1 text-fg">{row.after}</p>
              </div>
            </li>
          ))}
        </ul>
        <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-title">
          <span className="link-draw">Read the case study</span>
          <ArrowIcon className="text-accent transition-transform duration-500 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function ProcessSteps({ steps }: { steps: Step[] }) {
  return (
    <ol className="grid border-t border-line md:grid-cols-3">
      {steps.map((step, i) => (
        <Reveal
          as="li"
          key={step.title}
          delay={i * 120}
          className={cx("border-b border-line py-8 md:border-b-0 md:py-10 md:pr-10", i > 0 && "md:border-l md:pl-10")}
        >
          <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-6 font-display text-5xl leading-none text-title">{step.title}</h3>
          <p className="mt-4 max-w-sm leading-relaxed text-muted">{step.body}</p>
        </Reveal>
      ))}
    </ol>
  );
}

export function GuaranteePanel({ heading, points }: { heading: string; points: string[] }) {
  return (
    <div className="grid overflow-hidden rounded-[20px] bg-[#141414] text-[#f4f3ef] md:grid-cols-[1fr_1.3fr]">
      <Photo still="keys" className="min-h-[280px] md:min-h-[460px]" sizes="(min-width: 768px) 40vw, 100vw" />
      <div className="flex flex-col justify-center p-8 sm:p-14">
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-white/50">In writing, every time</p>
        <SplitText
          text={heading}
          className="mt-4 font-display text-4xl leading-none text-white sm:text-6xl"
        />
        <ul className="mt-10 divide-y divide-white/10 border-y border-white/10">
          {points.map((p, i) => (
            <Reveal as="li" key={p} delay={200 + i * 120} className="flex gap-4 py-5 text-lg leading-snug sm:text-xl">
              <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
              {p}
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function PainList({ pains }: { pains: string[] }) {
  return (
    <ol className="border-t border-line">
      {pains.map((pain, i) => (
        <Reveal
          as="li"
          key={pain}
          delay={i * 100}
          className="group flex items-baseline gap-6 border-b border-line py-7 sm:gap-12 sm:py-10"
        >
          <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
          <span className="font-display text-3xl leading-tight text-title transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-3 sm:text-6xl">
            {pain}
          </span>
        </Reveal>
      ))}
    </ol>
  );
}

/** Full-bleed photograph that drifts with the scroll, with one large line over it. */
export function StatementBand({ still, line, by }: { still: StillKey; line: string; by?: string }) {
  const s = getStill(still);
  return (
    <section className="relative isolate overflow-hidden text-white">
      <Parallax speed={0.15} className="absolute! inset-0 -z-10">
        <Image src={s.src} alt={s.alt} fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/45" />
      </Parallax>
      <Container className="flex min-h-[80svh] flex-col justify-center py-24 sm:min-h-[760px]">
        <SplitText
          as="p"
          text={line}
          className="max-w-5xl font-display text-[2.4rem] leading-[1.05] sm:text-7xl lg:text-[5.5rem]"
        />
        {by && (
          <Reveal delay={400} className="mt-8 font-mono text-xs uppercase tracking-[0.14em] text-white/70">
            {by}
          </Reveal>
        )}
      </Container>
    </section>
  );
}

export function FinalCta({
  heading,
  body,
  cta,
}: {
  heading: string;
  body?: string;
  cta: { label: string; href: string };
}) {
  const s = getStill("penthouse");
  return (
    <div className="relative isolate overflow-hidden rounded-[20px] bg-[#141414] px-6 py-20 text-center text-white sm:px-12 sm:py-32">
      <div className="absolute inset-0 -z-10">
        <Image src={s.src} alt="" fill sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover" />
        <AmbientVideo src={filmSrc("penthouse")} />
        <div className="absolute inset-0 bg-black/55" />
      </div>
      <SplitText
        text={heading}
        accent="minutes"
        className="mx-auto max-w-4xl font-display text-[2.4rem] leading-[1.02] text-balance sm:text-7xl"
      />
      {body && (
        <Reveal as="p" delay={200} className="mx-auto mt-6 max-w-xl text-white/75 sm:text-lg">
          {body}
        </Reveal>
      )}
      <Reveal delay={350}>
        <ButtonLink href={cta.href} className="mt-10">
          {cta.label}
          <ArrowIcon className="transition-transform duration-300 group-hover/btn:translate-x-1" />
        </ButtonLink>
      </Reveal>
      <p className="mt-6 font-mono text-xs text-white/55">{site.guarantee.short}</p>
    </div>
  );
}
