"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import { track } from "@/lib/analytics";

/** Bottom bar on phones. Hidden inside the quote flow, where it would compete with the form. */
export function StickyCta() {
  const pathname = usePathname();
  if (pathname.startsWith("/quote")) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/90 p-3 backdrop-blur-md sm:hidden">
      <Link
        href={site.stickyCta.href}
        onClick={() => track("quote_cta_clicked", { location: "sticky", path: pathname })}
        className="flex min-h-12 items-center justify-center rounded-md bg-accent-solid font-semibold text-accent-fg"
      >
        {site.stickyCta.label}
      </Link>
    </div>
  );
}
