import type { Metadata } from "next";
import { site } from "@/content/site";

export function absoluteUrl(path = "/") {
  return `${site.url}${path === "/" ? "" : path}`;
}

/**
 * One helper for every route's metadata: canonical to chanium.com, consistent OG/Twitter tags.
 * OG images come from each route's opengraph-image file (or the root default).
 */
export function pageMetadata({
  title,
  description,
  path,
  keywords,
  type = "website",
  absoluteTitle = false,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  absoluteTitle?: boolean;
  noindex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: { title, description, url, type, siteName: site.name, locale: "en_US" },
    twitter: { card: "summary_large_image", title, description },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}
