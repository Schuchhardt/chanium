import { renderOg, ogSize, ogContentType } from "@/lib/og";
import { playbooksPage } from "@/content/playbooksPage";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = playbooksPage.subline;

export default function Image() {
  return renderOg({ title: playbooksPage.subline, eyebrow: "Playbooks" });
}
