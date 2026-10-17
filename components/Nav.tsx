"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { Logo } from "./Logo";
import { cx } from "@/lib/cx";

/** Floating glass bar. Hides on scroll down, returns on scroll up; full-screen sheet on mobile. */
export function Nav() {
  const pathname = usePathname();
  // The menu remembers the path it was opened on, so navigating closes it without an effect.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (value: boolean | ((v: boolean) => boolean)) =>
    setOpenOn((typeof value === "function" ? value(open) : value) ? pathname : null);
  const [hidden, setHidden] = useState(false);

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

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 240 && y > last + 4 ? true : y < last - 4 ? false : (h) => h);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-transform duration-700 ease-[var(--ease-expo)] sm:px-5",
        hidden && !open && "-translate-y-[120%]",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-accent-solid focus:px-3 focus:py-2 focus:text-accent-fg"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-6 rounded-full border border-line/80 bg-bg/80 pr-2 pl-5 shadow-elevated backdrop-blur-xl backdrop-saturate-150">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cx(
                "relative rounded-full px-3.5 py-2 text-sm transition-colors duration-300",
                isActive(item.href) ? "bg-bg-elevated text-title" : "text-muted hover:text-title",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href={site.primaryCta.href}
            className="hidden min-h-12 items-center rounded-full bg-accent-solid px-6 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-hover sm:inline-flex"
          >
            {site.primaryCta.label}
          </Link>
          <button
            type="button"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full text-title lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              ) : (
                <path d="M4 9h16M4 15h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="fade-up fixed inset-x-3 top-[84px] bottom-3 z-40 flex flex-col overflow-y-auto rounded-[20px] border border-line bg-bg px-6 pt-4 pb-6 shadow-elevated lg:hidden"
        >
          <ul className="divide-y divide-line">
            {nav.map((item, i) => (
              <li key={item.href} className="fade-up" style={{ animationDelay: `${80 + i * 50}ms` }}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="flex min-h-16 items-center justify-between font-display text-3xl text-title"
                >
                  {item.label}
                  <span className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={site.primaryCta.href}
            className="mt-auto flex min-h-14 items-center justify-center rounded-full bg-accent-solid font-medium text-accent-fg"
          >
            {site.primaryCta.label}
          </Link>
        </nav>
      )}
    </header>
  );
}
