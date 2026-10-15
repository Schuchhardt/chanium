import { renderOg, ogSize, ogContentType } from "@/lib/og";
import { packagesPage } from "@/content/packages";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = packagesPage.h1;

export default function Image() {
  return renderOg({ title: packagesPage.h1, eyebrow: "Packages" });
}
