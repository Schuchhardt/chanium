import type { MetadataRoute } from "next";
import { services } from "./services-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["en", "es"];
  const urls: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    urls.push({
      url: `https://chanium.com/${locale}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    });
    for (const svc of services) {
      urls.push({
        url: `https://chanium.com/${locale}/services/${svc.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  return urls;
}
