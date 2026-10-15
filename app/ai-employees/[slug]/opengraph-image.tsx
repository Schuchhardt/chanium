import { renderOg, ogSize, ogContentType } from "@/lib/og";
import { employees, getEmployee } from "@/content/employees";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Chanium AI Employee";

export function generateStaticParams() {
  return employees.map((e) => ({ slug: e.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const e = getEmployee((await params).slug)!;
  return renderOg({ title: e.oneLiner, eyebrow: `AI Employee · ${e.name}` });
}
