import Image from "next/image";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { getStill, type StillKey } from "@/content/media";
import { cx } from "@/lib/cx";
import { Reveal, SplitText } from "./motion";

export { cx };

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx("mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10", className)}>{children}</div>;
}

export function Section({
  id,
  className,
  children,
  ...rest
}: { id?: string; className?: string; children: ReactNode } & ComponentProps<"section">) {
  return (
    <section id={id} className={cx("py-16 sm:py-32", className)} {...rest}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cx(
        "flex items-center gap-3 font-mono text-[0.72rem] font-medium uppercase tracking-[0.14em] text-subtle",
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-8 bg-accent" />
      {children}
    </p>
  );
}

const h1Classes =
  "font-display text-[2.6rem] leading-[1.02] font-normal tracking-[-0.02em] text-title text-balance sm:text-6xl lg:text-[5.5rem]";

/** Page headline. A plain string animates word by word on load. */
export function H1({ children, className, accent }: { children: ReactNode; className?: string; accent?: string }) {
  if (typeof children === "string") {
    return <SplitText as="h1" text={children} accent={accent} immediate className={cx(h1Classes, className)} />;
  }
  return <h1 className={cx(h1Classes, className)}>{children}</h1>;
}

export function SectionHeading({
  title,
  subline,
  action,
  eyebrow,
  accent,
  as: Tag = "h2",
}: {
  title: string;
  subline?: string;
  action?: ReactNode;
  eyebrow?: string;
  accent?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className="mb-10 flex flex-col gap-6 sm:mb-16 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
        <SplitText
          as={Tag}
          text={title}
          accent={accent}
          className="font-display text-[2.1rem] leading-[1.05] font-normal tracking-[-0.015em] text-title text-balance sm:text-5xl lg:text-[3.6rem]"
        />
        {subline && (
          <Reveal as="p" delay={150} className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {subline}
          </Reveal>
        )}
      </div>
      {action && (
        <Reveal delay={200} className="shrink-0">
          {action}
        </Reveal>
      )}
    </div>
  );
}

type ButtonVariant = "primary" | "secondary" | "ghost" | "light";

const buttonStyles: Record<ButtonVariant, string> = {
  primary: "bg-accent-solid text-accent-fg hover:bg-accent-hover",
  secondary: "border border-line-strong text-title hover:border-title",
  light: "border border-white/40 bg-white/10 text-white backdrop-blur-md hover:bg-white hover:text-[#141414]",
  ghost: "text-title px-0! min-h-0! link-draw rounded-none!",
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
    "group/btn inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 text-[0.95rem] font-medium transition-[background-color,color,border-color,transform] duration-300 active:scale-[0.98]",
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

export function Chip({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "accent" | "muted" | "success" | "warn";
}) {
  const tones = {
    default: "border-line-strong text-fg",
    accent: "border-accent/40 bg-accent-tint text-accent-soft",
    muted: "border-line text-muted",
    success: "border-success/30 bg-success/10 text-success",
    warn: "border-warn/30 bg-warn/10 text-warn",
  };
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full border px-3 py-1 font-mono text-[0.68rem] font-medium uppercase tracking-[0.08em]",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx("rounded-[12px] border border-line bg-card p-6 sm:p-8", className)}>{children}</div>;
}

/** A still that opens with a curtain on scroll and zooms slightly on hover of its `group`. */
export function Photo({
  still,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
  delay,
}: {
  still: StillKey;
  className?: string;
  sizes?: string;
  priority?: boolean;
  delay?: number;
}) {
  const s = getStill(still);
  return (
    <Reveal variant="media" delay={delay} className={cx("relative overflow-hidden bg-bg-elevated", className)}>
      <div className="absolute inset-0">
        <Image
          src={s.src}
          alt={s.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-expo)] group-hover:scale-[1.06]"
        />
      </div>
    </Reveal>
  );
}

export function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={cx("h-5 w-5 shrink-0", className)}>
      <path d="M5 10.5l3 3 7-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={cx("h-4 w-4 shrink-0", className)}>
      <path d="M4 10h11m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
