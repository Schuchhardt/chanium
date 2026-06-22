import type { DictKey } from "./i18n";

export interface ServiceDef {
  slug: string;
  num: string;
  nameKey: DictKey;
  descKey: DictKey;
  pageTitleKey: DictKey;
  pageMetaKey: DictKey;
  pageSubKey: DictKey;
  sections: { titleKey: DictKey; bodyKey: DictKey }[];
  benefits: DictKey[];
}

export const services: ServiceDef[] = [
  {
    slug: "ai-agents-automation",
    num: "01",
    nameKey: "s1.name",
    descKey: "s1.desc",
    pageTitleKey: "s1.page.title",
    pageMetaKey: "s1.page.meta",
    pageSubKey: "s1.page.sub",
    sections: [
      { titleKey: "s1.page.w1.t", bodyKey: "s1.page.w1.d" },
      { titleKey: "s1.page.w2.t", bodyKey: "s1.page.w2.d" },
      { titleKey: "s1.page.w3.t", bodyKey: "s1.page.w3.d" },
    ],
    benefits: ["s1.page.b1", "s1.page.b2", "s1.page.b3", "s1.page.b4"],
  },
  {
    slug: "fullstack-engineering",
    num: "02",
    nameKey: "s2.name",
    descKey: "s2.desc",
    pageTitleKey: "s2.page.title",
    pageMetaKey: "s2.page.meta",
    pageSubKey: "s2.page.sub",
    sections: [
      { titleKey: "s2.page.w1.t", bodyKey: "s2.page.w1.d" },
      { titleKey: "s2.page.w2.t", bodyKey: "s2.page.w2.d" },
      { titleKey: "s2.page.w3.t", bodyKey: "s2.page.w3.d" },
    ],
    benefits: ["s2.page.b1", "s2.page.b2", "s2.page.b3", "s2.page.b4"],
  },
  {
    slug: "ai-content-systems",
    num: "03",
    nameKey: "s3.name",
    descKey: "s3.desc",
    pageTitleKey: "s3.page.title",
    pageMetaKey: "s3.page.meta",
    pageSubKey: "s3.page.sub",
    sections: [
      { titleKey: "s3.page.w1.t", bodyKey: "s3.page.w1.d" },
      { titleKey: "s3.page.w2.t", bodyKey: "s3.page.w2.d" },
      { titleKey: "s3.page.w3.t", bodyKey: "s3.page.w3.d" },
    ],
    benefits: ["s3.page.b1", "s3.page.b2", "s3.page.b3", "s3.page.b4"],
  },
  {
    slug: "security-infrastructure",
    num: "04",
    nameKey: "s4.name",
    descKey: "s4.desc",
    pageTitleKey: "s4.page.title",
    pageMetaKey: "s4.page.meta",
    pageSubKey: "s4.page.sub",
    sections: [
      { titleKey: "s4.page.w1.t", bodyKey: "s4.page.w1.d" },
      { titleKey: "s4.page.w2.t", bodyKey: "s4.page.w2.d" },
      { titleKey: "s4.page.w3.t", bodyKey: "s4.page.w3.d" },
    ],
    benefits: ["s4.page.b1", "s4.page.b2", "s4.page.b3", "s4.page.b4"],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
