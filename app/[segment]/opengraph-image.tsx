import { renderOg, ogSize, ogContentType } from "@/lib/og";
import { segments, getSegmentByPath } from "@/content/segments";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Chanium — AI operations for real estate teams";

export function generateStaticParams() {
  return segments.map((s) => ({ segment: s.path }));
}

export default async function Image({ params }: { params: Promise<{ segment: string }> }) {
  const segment = getSegmentByPath((await params).segment)!;
  return renderOg({ title: segment.hero.h1, eyebrow: segment.name });
}
