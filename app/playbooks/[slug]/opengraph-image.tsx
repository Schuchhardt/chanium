import { renderOg, ogSize, ogContentType } from "@/lib/og";
import { getPlaybook, getPlaybooks } from "@/lib/playbooks";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Chanium playbook";

export function generateStaticParams() {
  return getPlaybooks().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPlaybook((await params).slug)!;
  return renderOg({ title: p.title, eyebrow: "Playbook" });
}
