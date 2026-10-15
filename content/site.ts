import type { Cta } from "./types";

export const site = {
  name: "Chanium",
  legalName: "Chanium LLC",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://chanium.com").replace(/\/$/, ""),
  email: "hello@chanium.com",
  tagline: "AI operations for real estate teams.",
  description:
    "Chanium builds AI operations for real estate teams — CRM, transaction tools and messaging connected into one system, built in weeks at a fixed price. You own 100% of the code.",
  guarantee: {
    short: "Delivered on the agreed date or 20% back. You own 100% of the code.",
    full: "Delivered on the agreed date or 20% back. 30 days of post-launch support included. You own 100% of the code.",
  },
  primaryCta: { label: "Get a quote", href: "/quote" } satisfies Cta,
  stickyCta: { label: "Get a fixed quote", href: "/quote" } satisfies Cta,
};

export const nav: Cta[] = [
  { label: "STR", href: "/short-term-rentals" },
  { label: "Property Management", href: "/property-management" },
  { label: "Sales Teams", href: "/sales-teams" },
  { label: "Luxury", href: "/luxury" },
  { label: "AI Employees", href: "/ai-employees" },
  { label: "Playbooks", href: "/playbooks" },
];

export const footer = {
  blurb: "AI operations for real estate teams. Fixed scope, fixed price, fixed date — and you own all of it.",
  columns: [
    {
      heading: "Segments",
      links: [
        { label: "Short-term rentals", href: "/short-term-rentals" },
        { label: "Property management", href: "/property-management" },
        { label: "Sales teams", href: "/sales-teams" },
        { label: "Luxury & boutique", href: "/luxury" },
      ],
    },
    {
      heading: "Product",
      links: [
        { label: "AI Employees", href: "/ai-employees" },
        { label: "Packages", href: "/packages" },
        { label: "Get a quote", href: "/quote" },
      ],
    },
    {
      heading: "Learn",
      links: [
        { label: "Playbooks", href: "/playbooks" },
        { label: "Depando case study", href: "/case-studies/depando" },
        { label: "Brokerage case study", href: "/case-studies/residential-brokerage" },
        { label: "RSS", href: "/playbooks/rss.xml" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
      ],
    },
  ] satisfies { heading: string; links: Cta[] }[],
};
