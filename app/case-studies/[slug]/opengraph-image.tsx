import { renderOg, ogSize, ogContentType } from "@/lib/og";
import { cases, getCase } from "@/content/cases";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Chanium case study";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const study = getCase((await params).slug)!;
  return renderOg({ title: study.title, eyebrow: `Case study · ${study.client}` });
}
