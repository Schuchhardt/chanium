"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";

/** In-article CTA. `kind="quote"` links to the quote flow; `kind="waitlist"` to an AI Employee page. */
export function CtaBlock({
  kind = "quote",
  employee,
  label,
  slug,
}: {
  kind?: "quote" | "waitlist";
  employee?: string;
  label?: string;
  /** Playbook slug, for analytics. Injected by the page. */
  slug?: string;
}) {
  const href = kind === "waitlist" && employee ? `/ai-employees/${employee}#waitlist` : employee ? `/quote?employee=${employee}` : "/quote";
  const text = label ?? (kind === "waitlist" ? "Join the self-serve waitlist" : "Get a fixed quote");
  return (
    <div className="not-prose my-8 flex flex-col gap-4 rounded-xl border border-accent/40 bg-accent-tint p-5 sm:flex-row sm:items-center sm:justify-between">
      <p className="m-0 font-semibold text-title">
        {kind === "waitlist" ? "Want to run this yourself, without code?" : "Rather not build it yourself?"}
      </p>
      <Link
        href={href}
        onClick={() => track("playbook_cta_clicked", { kind, slug: slug ?? null, employee: employee ?? null })}
        className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent-solid px-5 text-sm font-semibold text-accent-fg! no-underline! hover:bg-accent-hover"
      >
        {text}
      </Link>
    </div>
  );
}
