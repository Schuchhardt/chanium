import type { Package } from "./types";

export const packagesPage = {
  seo: {
    title: "Packages — fixed scope, fixed price, fixed date",
    description:
      "Fixed-price AI operations packages for real estate teams: Lead Response Engine, Deal Pipeline on Autopilot, STR Operations Autopilot and a monthly Care plan.",
  },
  h1: "Fixed scope. Fixed price. Fixed date.",
  subline:
    "Every build has a written scope, a price that doesn't move and a delivery date we put our money on. Pick the outcome; we'll confirm the details on one call.",
  cardCta: { label: "Get a quote", href: "/quote" },
  faq: [
    {
      q: "What does \"from\" mean in the price?",
      a: "It is the price for the standard scope listed on the card. Your written proposal confirms the exact number before anything starts — after that, it doesn't change.",
    },
    {
      q: "What happens if you miss the date?",
      a: "You get 20% of the build price back. The date is in the proposal you sign.",
    },
    {
      q: "Who owns the code?",
      a: "You do — 100% of it, plus the accounts and infrastructure it runs on.",
    },
    {
      q: "What happens after launch?",
      a: "30 days of post-launch support are included. After that you can run it yourself or move to a Care plan.",
    },
  ],
};

export const packages: Package[] = [
  {
    slug: "lead-response-engine",
    name: "Lead Response Engine",
    outcome: "Every lead answered, qualified and routed in under 60 seconds",
    price: "from $5,000",
    timeline: "2 weeks",
    includes: [
      "Instant SMS and email reply to every new lead",
      "Qualification questions in your voice",
      "Routing rules to the right agent",
      "Synced back to your CRM",
    ],
    segments: ["sales", "luxury"],
    listed: true,
    kind: "build",
  },
  {
    slug: "deal-pipeline-on-autopilot",
    name: "Deal Pipeline on Autopilot",
    outcome: "Every deal visible, every date tracked, zero fall-throughs",
    price: "from $12,000",
    timeline: "4 weeks",
    includes: [
      "One deal record across CRM and transaction tools",
      "Contract dates and contingencies tracked automatically",
      "Nudges to whoever is late",
      "Pipeline view for brokers and coordinators",
    ],
    segments: ["sales", "luxury"],
    listed: true,
    kind: "build",
  },
  {
    slug: "str-operations-autopilot",
    name: "STR Operations Autopilot",
    outcome: "Guest comms, cleanings and owner reports running without you",
    price: "from $8,000",
    timeline: "3–4 weeks",
    includes: [
      "Guest messaging connected to your PMS",
      "Cleaning schedule and handoffs automated",
      "Monthly owner statements generated and sent",
      "Escalation to a human only when it matters",
    ],
    segments: ["str"],
    listed: true,
    kind: "build",
  },
  {
    // Shown on /property-management; not in the v1 pricing table, so it is quoted per portfolio.
    slug: "pm-operations-autopilot",
    name: "PM Operations Autopilot",
    outcome: "Maintenance, leasing and tenant comms running out of one system, not your inbox",
    price: "Quoted per portfolio",
    timeline: "Confirmed in your proposal",
    includes: [
      "Tenant requests turned into tracked tickets",
      "Vendor assignment and follow-up",
      "Leasing inquiries answered and showings scheduled",
      "Connected to AppFolio or Buildium",
    ],
    segments: ["pm"],
    listed: false,
    kind: "build",
  },
  {
    slug: "care-plan",
    name: "Care plan",
    outcome: "Monitoring, fixes and one new automation per month",
    price: "$1,500–3,000 / mo",
    timeline: "ongoing",
    includes: [
      "Monitoring and alerting",
      "Fixes when a connected tool changes",
      "One new automation every month",
    ],
    segments: ["str", "pm", "sales", "luxury"],
    listed: true,
    kind: "retainer",
  },
];

export function getPackage(slug: string) {
  return packages.find((p) => p.slug === slug);
}

export const listedPackages = packages.filter((p) => p.listed);
