import Link from "next/link";
import type { PlaybookFrontmatter } from "@/content/types";
import { playbooksPage } from "@/content/playbooksPage";
import { getSegment } from "@/content/segments";
import { ArrowIcon, Chip } from "../ui";

export function PlaybookCard({
  playbook,
  headingLevel: Heading = "h3",
}: {
  playbook: PlaybookFrontmatter;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <Link
      href={`/playbooks/${playbook.slug}`}
      className="group flex h-full flex-col rounded-[12px] border border-line bg-card p-6 transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 hover:border-line-strong hover:shadow-elevated sm:p-8"
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
      <Heading className="mt-5 font-display text-[1.7rem] leading-[1.1] text-title">{playbook.title}</Heading>
      <p className="mt-3 text-sm leading-relaxed text-muted">{playbook.description}</p>
      <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-medium text-title">
        <span className="link-draw">Read the playbook</span>
        <ArrowIcon className="text-accent transition-transform duration-500 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
