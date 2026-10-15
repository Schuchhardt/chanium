import type { MetadataRoute } from "next";
import { segments } from "@/content/segments";
import { cases } from "@/content/cases";
import { employees } from "@/content/employees";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, priority: number, lastModified?: string): MetadataRoute.Sitemap[number] => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly",
    priority,
    ...(lastModified ? { lastModified } : {}),
  });

  return [
    entry("/", 1),
    ...segments.map((s) => entry(`/${s.path}`, 0.9)),
    entry("/ai-employees", 0.9),
    ...employees.map((e) => entry(`/ai-employees/${e.slug}`, 0.8)),
    entry("/packages", 0.8),
    entry("/quote", 0.8),
    ...cases.map((c) => entry(`/case-studies/${c.slug}`, 0.7)),
    entry("/privacy", 0.2),
    entry("/terms", 0.2),
  ];
}
