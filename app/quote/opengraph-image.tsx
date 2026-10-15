import { renderOg, ogSize, ogContentType } from "@/lib/og";
import { home } from "@/content/home";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = home.finalCta.h2;

export default function Image() {
  return renderOg({ title: home.finalCta.h2, eyebrow: "Get a fixed quote" });
}
