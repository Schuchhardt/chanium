import Link from "next/link";
import { footer, site } from "@/content/site";
import { Logo } from "./Logo";
import { SplitText } from "./motion";

export function Footer() {
  return (
    <footer className="mt-8 border-t border-line pb-28 sm:pb-0">
      <div className="mx-auto max-w-[1280px] px-4 pt-20 sm:px-6 sm:pt-28 lg:px-10">
        <SplitText
          as="p"
          text={footer.statement}
          accent={footer.statementAccent}
          className="max-w-5xl font-display text-[2.6rem] leading-[1] tracking-[-0.02em] text-title sm:text-7xl lg:text-8xl"
        />
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            href={site.primaryCta.href}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent-solid px-7 font-medium text-accent-fg transition-colors hover:bg-accent-hover"
          >
            {site.primaryCta.label}
          </Link>
          <a href={`mailto:${site.email}`} className="link-draw self-start font-mono text-sm text-title sm:self-auto">
            {site.email}
          </a>
        </div>
      </div>
      <div className="mx-auto grid max-w-[1280px] gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.3fr_2fr] lg:px-10">
        <div className="max-w-sm">
          <Logo size="sm" />
          <p className="mt-5 text-sm leading-relaxed text-muted">{footer.blurb}</p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {footer.columns.map((col) => (
            <div key={col.heading}>
              <h2 className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.14em] text-subtle">{col.heading}</h2>
              <ul className="mt-4 space-y-1">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="inline-flex min-h-9 items-center text-sm text-muted hover:text-title">
                      <span className="link-draw">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-2 px-4 py-6 font-mono text-[0.7rem] text-subtle sm:flex-row sm:justify-between sm:px-6 lg:px-10">
          <span>
            © {new Date().getFullYear()} {site.legalName}
          </span>
          <span>EN</span>
          <span>{site.guarantee.short}</span>
        </div>
      </div>
    </footer>
  );
}
