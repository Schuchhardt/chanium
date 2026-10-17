"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { track } from "@/lib/analytics";

/**
 * Bottom bar on phones, shown once the hero has scrolled away. Hidden inside the quote flow, where
 * it would compete with the form.
 */
export function StickyCta() {
  const pathname = usePathname();
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (pathname.startsWith("/quote")) return null;
  return (
    <div
      aria-hidden={!shown || undefined}
      inert={!shown || undefined}
      className={`transition-[opacity,transform] duration-500 ${shown ? "" : "pointer-events-none translate-y-full opacity-0"} fixed inset-x-0 bottom-0 z-40 bg-gradient-to-t from-bg via-bg/90 to-transparent p-3 pt-6 sm:hidden`}
    >
      <Link
        href={site.stickyCta.href}
        onClick={() => track("quote_cta_clicked", { location: "sticky", path: pathname })}
        className="flex min-h-12 items-center justify-center rounded-full bg-accent-solid font-medium text-accent-fg shadow-elevated"
      >
        {site.stickyCta.label}
      </Link>
    </div>
  );
}
