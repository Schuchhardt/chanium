import { renderOg, ogSize, ogContentType } from "@/lib/og";
import { home } from "@/content/home";

export const alt = home.hero.h1;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ title: home.hero.h1, eyebrow: "Chanium" });
}
