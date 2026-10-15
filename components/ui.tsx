import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

export function Section({
  id,
  className,
  children,
  ...rest
}: { id?: string; className?: string; children: ReactNode } & ComponentProps<"section">) {
  return (
    <section id={id} className={cx("py-16 sm:py-24", className)} {...rest}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cx("text-xs font-semibold uppercase tracking-[0.18em] text-accent-soft", className)}>
      {children}
    </p>
  );
}

export function H1({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h1
      className={cx(
        "font-display text-[1.9rem] leading-[1.15] font-bold tracking-tight text-title text-balance sm:text-5xl lg:text-6xl",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function SectionHeading({
  title,
  subline,
  action,
  as: Tag = "h2",
}: {
  title: string;
  subline?: string;
  action?: ReactNode;
  as?: "h1" | "h2";
}) {
  return (
    <div className="mb-10 flex flex-col gap-4 sm:mb-14 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <Tag className="font-display text-2xl leading-tight font-bold text-title text-balance sm:text-4xl">
          {title}
        </Tag>
        {subline && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{subline}</p>}
      </div>
      {action}
    </div>
  );
}

type ButtonVariant = "primary" | "secondary" | "ghost";

const buttonStyles: Record<ButtonVariant, string> = {
  primary: "bg-accent-solid text-accent-fg hover:bg-accent-hover",
  secondary: "border border-line-strong text-fg hover:border-accent hover:text-title",
  ghost: "text-accent-soft hover:text-title underline-offset-4 hover:underline px-0!",
};

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
  ...rest
}: { href: string; variant?: ButtonVariant; className?: string; children: ReactNode } & Omit<
  ComponentProps<typeof Link>,
  "href"
>) {
  const external = /^https?:\/\//.test(href);
  const classes = cx(
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-6 text-[0.95rem] font-semibold transition-colors",
    buttonStyles[variant],
    className,
  );
  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

export function Chip({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "accent" | "muted" }) {
  const tones = {
    default: "border-line-strong text-fg",
    accent: "border-accent/50 bg-accent-tint text-accent-soft",
    muted: "border-line text-muted",
  };
  return (
    <span className={cx("inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium", tones[tone])}>
      {children}
    </span>
  );
}

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx("rounded-xl border border-line bg-card p-6 sm:p-7", className)}>{children}</div>;
}

export function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={cx("h-5 w-5 shrink-0", className)}>
      <path d="M5 10.5l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={cx("h-4 w-4 shrink-0", className)}>
      <path d="M4 10h11m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
