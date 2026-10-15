import Link from "next/link";
import type { CaseStudy, Employee, Package, Segment, Step } from "@/content/types";
import { employeesPage } from "@/content/employees";
import { integrations } from "@/content/integrations";
import { site } from "@/content/site";
import { ArrowIcon, ButtonLink, Card, CheckIcon, Chip, cx } from "../ui";

export function ProofStrip({ items }: { items: { value: string; label: string }[] }) {
  return (
    <dl className="grid grid-cols-1 divide-y divide-line border-y border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      {items.map((item) => (
        <div key={item.label} className="flex items-baseline gap-3 py-5 sm:flex-col sm:gap-1 sm:px-6 sm:first:pl-0">
          <dt className="sr-only">{item.label}</dt>
          <dd className="font-display text-2xl font-bold text-title sm:text-3xl">{item.value}</dd>
          <dd className="text-sm text-muted">{item.label}</dd>
        </div>
      ))}
    </dl>
  );
}

export function IntegrationRail({ label }: { label: string }) {
  return (
    <div>
      <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-subtle">{label}</p>
      <ul className="mt-6 flex flex-wrap justify-center gap-x-7 gap-y-3">
        {integrations.map((tool) => (
          <li key={tool.name} className="text-sm font-semibold text-muted sm:text-base">
            {tool.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SegmentGrid({ segments }: { segments: Segment[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {segments.map((s) => (
        <li key={s.slug}>
          <Link
            href={`/${s.path}`}
            className="group flex h-full flex-col justify-between gap-8 rounded-xl border border-line bg-card p-6 transition-colors hover:border-accent/60 hover:bg-card-hover sm:p-8"
          >
            <div>
              <h3 className="text-xl font-bold text-title">{s.name}</h3>
              <p className="mt-3 leading-relaxed text-muted">{s.cardLine}</p>
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent-soft">
              See how it works <ArrowIcon className="transition-transform group-hover:translate-x-1" />
            </span>
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
      className="group flex h-full flex-col gap-5 rounded-xl border border-line bg-card p-6 transition-colors hover:border-accent/60 hover:bg-card-hover"
    >
      <div className="flex items-start justify-between gap-3">
        <Heading className="text-lg font-bold text-title">{employee.name}</Heading>
        <Chip tone={available ? "accent" : "muted"}>{employeesPage.statusLabels[employee.status]}</Chip>
      </div>
      <p className="leading-relaxed text-muted">{employee.oneLiner}.</p>
      <p className="mt-auto text-xs text-subtle">Connects: {employee.connects.join(", ")}</p>
    </Link>
  );
}

export function EmployeeGrid({ employees, headingLevel }: { employees: Employee[]; headingLevel?: "h2" | "h3" }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {employees.map((e) => (
        <li key={e.slug}>
          <EmployeeCard employee={e} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  );
}

export function PackageCard({
  pkg,
  variant,
  cta = { label: "Get a quote", href: "/quote" },
}: {
  pkg: Package;
  variant?: string;
  cta?: { label: string; href: string };
}) {
  return (
    <Card className="flex h-full flex-col">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-lg font-bold text-title">{pkg.name}</h3>
        {variant && <Chip tone="accent">{variant}</Chip>}
      </div>
      <p className="mt-3 leading-relaxed text-muted">{pkg.outcome}</p>
      <div className="mt-6 flex items-baseline justify-between gap-4 border-y border-line py-4">
        <span className="text-xl font-bold text-title">{pkg.price}</span>
        <span className="text-right text-sm text-muted">{pkg.timeline}</span>
      </div>
      <ul className="mt-5 space-y-2.5">
        {pkg.includes.map((line) => (
          <li key={line} className="flex gap-2.5 text-sm text-fg">
            <CheckIcon className="text-accent-soft" />
            {line}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-xs leading-relaxed text-subtle">{site.guarantee.short}</p>
      <ButtonLink href={cta.href} className="mt-5 w-full" aria-label={`${cta.label} for ${pkg.name}`}>
        {cta.label}
      </ButtonLink>
    </Card>
  );
}

export function PackageGrid({ packages }: { packages: { pkg: Package; variant?: string }[] }) {
  return (
    <ul className={cx("grid gap-4", packages.length > 1 && "md:grid-cols-2", packages.length > 2 && "lg:grid-cols-4")}>
      {packages.map(({ pkg, variant }) => (
        <li key={pkg.slug + (variant ?? "")} className={cx(packages.length === 1 && "max-w-md")}>
          <PackageCard pkg={pkg} variant={variant} />
        </li>
      ))}
    </ul>
  );
}

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="group flex h-full flex-col rounded-xl border border-line bg-card p-6 transition-colors hover:border-accent/60 hover:bg-card-hover sm:p-8"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-subtle">{study.client}</p>
      <h3 className="mt-3 text-xl font-bold text-title">{study.title}</h3>
      <ul className="mt-6 space-y-4">
        {study.rows.map((row) => (
          <li key={row.area} className="text-sm">
            <p className="font-semibold text-title">{row.area}</p>
            <p className="mt-1 text-muted">
              <span className="line-through decoration-subtle/70">{row.before}</span>
            </p>
            <p className="mt-1 text-fg">→ {row.after}</p>
          </li>
        ))}
      </ul>
      <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-accent-soft">
        Read the case study <ArrowIcon className="transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

export function ProcessSteps({ steps }: { steps: Step[] }) {
  return (
    <ol className="grid gap-4 md:grid-cols-3">
      {steps.map((step, i) => (
        <li key={step.title} className="rounded-xl border border-line bg-card p-6 sm:p-7">
          <span className="font-display text-sm font-bold text-accent-soft">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-4 text-xl font-bold text-title">{step.title}</h3>
          <p className="mt-3 leading-relaxed text-muted">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function GuaranteePanel({ heading, points }: { heading: string; points: string[] }) {
  return (
    <div className="rounded-2xl border border-accent/40 bg-accent-tint p-6 sm:p-10">
      <h2 className="font-display text-xl font-bold text-title sm:text-2xl">{heading}</h2>
      <ul className="mt-6 grid gap-4 md:grid-cols-3">
        {points.map((p) => (
          <li key={p} className="flex gap-3 text-lg leading-snug text-title">
            <CheckIcon className="mt-0.5 text-accent-soft" />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PainList({ pains }: { pains: string[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {pains.map((pain) => (
        <li key={pain} className="rounded-xl border border-line bg-card p-6 text-lg font-semibold leading-snug text-title">
          {pain}
        </li>
      ))}
    </ul>
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
  return (
    <div className="hero-glow rounded-2xl border border-line px-6 py-14 text-center sm:px-12 sm:py-20">
      <h2 className="mx-auto max-w-3xl font-display text-2xl leading-tight font-bold text-title text-balance sm:text-4xl">
        {heading}
      </h2>
      {body && <p className="mx-auto mt-5 max-w-xl text-muted sm:text-lg">{body}</p>}
      <ButtonLink href={cta.href} className="mt-8">
        {cta.label}
      </ButtonLink>
      <p className="mt-5 text-sm text-subtle">{site.guarantee.short}</p>
    </div>
  );
}
