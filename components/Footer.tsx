import Link from "next/link";
import { footer, site } from "@/content/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-line pb-28 sm:pb-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.3fr_2fr] lg:px-8">
        <div className="max-w-sm">
          <Logo size="sm" />
          <p className="mt-5 text-sm leading-relaxed text-muted">{footer.blurb}</p>
          <a
            href={`mailto:${site.email}`}
            className="mt-5 inline-block text-sm text-title underline decoration-accent/60 underline-offset-4 hover:decoration-accent"
          >
            {site.email}
          </a>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {footer.columns.map((col) => (
            <div key={col.heading}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-subtle">{col.heading}</h2>
              <ul className="mt-4 space-y-1">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="inline-flex min-h-9 items-center text-sm text-muted hover:text-title">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-subtle sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <span>
            © {new Date().getFullYear()} {site.legalName}
          </span>
          <span>{site.guarantee.short}</span>
        </div>
      </div>
    </footer>
  );
}
