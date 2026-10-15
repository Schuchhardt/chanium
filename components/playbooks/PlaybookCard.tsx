import Link from "next/link";
import type { PlaybookFrontmatter } from "@/content/types";
import { playbooksPage } from "@/content/playbooksPage";
import { getSegment } from "@/content/segments";
import { ArrowIcon, Chip } from "../ui";

export function PlaybookCard({ playbook }: { playbook: PlaybookFrontmatter }) {
  return (
    <Link
      href={`/playbooks/${playbook.slug}`}
      className="group flex h-full flex-col rounded-xl border border-line bg-card p-6 transition-colors hover:border-accent/60 hover:bg-card-hover"
    >
      <div className="flex flex-wrap gap-2">
        {playbook.draft && <Chip tone="muted">{playbooksPage.draftLabel}</Chip>}
        {playbook.segment.length < 4 &&
          playbook.segment.map((s) => (
            <Chip key={s} tone="accent">
              {getSegment(s).name}
            </Chip>
          ))}
      </div>
      <h3 className="mt-4 text-lg leading-snug font-bold text-title">{playbook.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{playbook.description}</p>
      <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-accent-soft">
        Read the playbook <ArrowIcon className="transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
