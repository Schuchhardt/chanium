"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { Logo } from "./Logo";
import { cx } from "./ui";

export function Nav() {
  const pathname = usePathname();
  // The menu remembers the path it was opened on, so navigating closes it without an effect.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (value: boolean | ((v: boolean) => boolean)) =>
    setOpenOn((typeof value === "function" ? value(open) : value) ? pathname : null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-accent-solid focus:px-3 focus:py-2 focus:text-accent-fg"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cx(
                "rounded-md px-3 py-2 text-sm transition-colors",
                isActive(item.href) ? "text-title" : "text-muted hover:text-title",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href={site.primaryCta.href}
            className="hidden min-h-10 items-center rounded-md bg-accent-solid px-4 text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover sm:inline-flex"
          >
            {site.primaryCta.label}
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-fg lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-bg px-4 pb-10 lg:hidden"
        >
          <ul className="divide-y divide-line">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="flex min-h-14 items-center text-lg text-title"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={site.primaryCta.href}
            className="mt-6 flex min-h-12 items-center justify-center rounded-md bg-accent-solid font-semibold text-accent-fg"
          >
            {site.primaryCta.label}
          </Link>
        </nav>
      )}
    </header>
  );
}
