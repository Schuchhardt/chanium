"use client";

import { useSearchParams } from "next/navigation";
import type { PlaybookFrontmatter, SegmentSlug } from "@/content/types";
import { playbooksPage } from "@/content/playbooksPage";
import { cx } from "../ui";

/**
 * Segment filter over server-rendered cards. The full list is the server/no-JS fallback; the
 * filter state lives in ?segment= so filtered views are linkable.
 */
export function PlaybookIndex({
  playbooks,
  segments,
  cards,
}: {
  playbooks: PlaybookFrontmatter[];
  segments: { slug: SegmentSlug; name: string }[];
  cards: Record<string, React.ReactNode>;
}) {
  const params = useSearchParams();
  const active = segments.find((s) => s.slug === params.get("segment"))?.slug ?? null;
  const setActive = (slug: SegmentSlug | null) => {
    const url = new URL(window.location.href);
    if (slug) url.searchParams.set("segment", slug);
    else url.searchParams.delete("segment");
    window.history.replaceState(null, "", url);
  };
  const visible = active ? playbooks.filter((p) => p.segment.includes(active)) : playbooks;

  return (
    <>
      <div role="group" aria-label="Filter by segment" className="flex flex-wrap gap-2">
        {[{ slug: null, name: playbooksPage.allLabel }, ...segments].map((s) => (
          <button
            key={s.slug ?? "all"}
            type="button"
            aria-pressed={active === s.slug}
            onClick={() => setActive(s.slug as SegmentSlug | null)}
            className={cx(
              "min-h-11 rounded-full border px-4 text-sm font-medium transition-colors",
              active === s.slug ? "border-accent bg-accent-tint text-title" : "border-line-strong text-fg hover:border-accent/60",
            )}
          >
            {s.name}
          </button>
        ))}
      </div>
      <PlaybookList slugs={visible.map((p) => p.slug)} cards={cards} />
    </>
  );
}

export function PlaybookList({ slugs, cards }: { slugs: string[]; cards: Record<string, React.ReactNode> }) {
  return (
    <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {slugs.map((slug) => (
        <li key={slug}>{cards[slug]}</li>
      ))}
    </ul>
  );
}
