import type { CaseStudy } from "./types";

/**
 * Before/after copy is qualitative on purpose: bracketed values are metrics Seba confirms
 * before launch (`pnpm check:placeholders` lists them). Do not invent numbers here.
 */
export const cases: CaseStudy[] = [
  {
    slug: "depando",
    client: "Depando",
    named: true,
    segment: "str",
    image: "suite",
    title: "Short-term rental operations, fully automated",
    summary:
      "Depando runs a short-term rental portfolio where guest messaging, cleaning coordination and owner reporting run on one automated system instead of a team's inbox.",
    rows: [
      {
        area: "Guest messaging",
        before: "Every guest message answered by hand, at any hour",
        after: "Routine questions answered instantly; the team only sees escalations",
      },
      {
        area: "Cleaning coordination",
        before: "Cleanings scheduled and confirmed over chat, one by one",
        after: "Cleanings created from reservations and tracked to completion automatically",
      },
      {
        area: "Owner reporting",
        before: "Monthly owner reports assembled by hand from several tools",
        after: "Owner statements generated from reservation and expense data",
      },
    ],
    stack: ["Airbnb", "ProHost", "Next.js", "Claude"],
    link: { label: "Visit depando.cl", href: "https://depando.cl" },
    seo: {
      title: "Depando case study — short-term rental operations, fully automated",
      description:
        "How Depando automated guest messaging, cleaning coordination and owner reporting for its short-term rental portfolio.",
    },
  },
  {
    slug: "residential-brokerage",
    client: "US residential brokerage",
    named: false,
    segment: "sales",
    image: "kitchen",
    title: "One operating system for a 40-agent brokerage",
    summary:
      "A 40-agent residential brokerage ran on Follow Up Boss, Dotloop and SkySlope — three tools that never agreed. We unified them into one operating system for deals, dates and coordinators.",
    rows: [
      {
        area: "Deal visibility",
        before: "Deal status scattered across three tools and a spreadsheet",
        after: "One record per deal, synced across Follow Up Boss, Dotloop and SkySlope",
      },
      {
        area: "Missed deadlines",
        before: "Contract dates tracked by memory and calendar reminders",
        after: "Every date tracked automatically, with nudges before anything slips",
      },
      {
        area: "Coordinator hours",
        before: "[X] hours a week reconciling tools by hand",
        after: "[Y] hours a week — the rest is automated",
      },
    ],
    stack: ["Follow Up Boss", "Dotloop", "SkySlope", "Claude"],
    seo: {
      title: "Brokerage case study — one operating system for a 40-agent brokerage",
      description:
        "How a 40-agent US brokerage unified Follow Up Boss, Dotloop and SkySlope into one operating system for deals, dates and coordinators.",
    },
  },
];

export function getCase(slug: string) {
  return cases.find((c) => c.slug === slug);
}
