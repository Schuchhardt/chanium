import "server-only";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import type { PlaybookFrontmatter } from "@/content/types";

const DIR = join(process.cwd(), "content/playbooks");

export interface Playbook extends PlaybookFrontmatter {
  body: string;
}

function load(file: string): Playbook {
  const { data, content } = matter(readFileSync(join(DIR, file), "utf8"));
  const fm = data as PlaybookFrontmatter;
  const slug = fm.slug || file.replace(/\.mdx$/, "");
  // YAML parses bare dates into Date objects; normalize to YYYY-MM-DD strings.
  const day = (v: unknown) => (v instanceof Date ? v.toISOString().slice(0, 10) : String(v));
  return { ...fm, slug, publishedAt: day(fm.publishedAt), updatedAt: day(fm.updatedAt ?? fm.publishedAt), body: content };
}

let cache: Playbook[] | null = null;

/** All playbooks, newest first. Read from disk at build time. */
export function getPlaybooks(): Playbook[] {
  if (!cache) {
    cache = readdirSync(DIR)
      .filter((f) => f.endsWith(".mdx"))
      .map(load)
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.title.localeCompare(b.title));
  }
  return cache;
}

export function getPlaybook(slug: string) {
  return getPlaybooks().find((p) => p.slug === slug);
}

/** Published (non-draft) playbooks: the ones that go in the sitemap and RSS. */
export const publishedPlaybooks = () => getPlaybooks().filter((p) => !p.draft);
