import type { Step } from "./types";

export const home = {
  seo: {
    title: "Chanium — AI operations for real estate teams",
    description:
      "We connect your CRM, your transaction tools and your messaging into one system that runs itself — built in weeks at a fixed price, and you own all of it.",
    keywords: ["real estate AI automation", "AI for real estate teams", "real estate operations automation"],
  },
  hero: {
    eyebrow: "Fixed price · Fixed date · You own the code",
    h1: "AI operations for real estate teams.",
    /** Words of h1 set in the italic serif accent. */
    accent: "real estate",
    subline:
      "We connect your CRM, your transaction tools and your messaging into one system that runs itself — built in weeks at a fixed price, and you own all of it.",
    primary: { label: "Get a fixed quote", href: "/quote" },
    secondary: { label: "See the AI Employees", href: "/ai-employees" },
  },
  /** Bracketed values are filled in by Seba before launch (see `pnpm check:placeholders`). */
  proof: [
    { value: "[N]", label: "real estate systems shipped" },
    { value: "<60s", label: "lead response" },
    { value: "100%", label: "code ownership" },
  ],
  integrations: {
    label: "Works with the tools you already run",
  },
  segments: {
    eyebrow: "Who we build for",
    accent: "actually operates",
    h2: "Built for how your business actually operates",
  },
  employees: {
    eyebrow: "The catalog",
    h2: "Meet your AI Employees",
    accent: "AI Employees",
    subline:
      "Specialized agents that do one job in your business, end to end. We build them for you today; hire them yourself soon.",
    cta: { label: "See all AI Employees", href: "/ai-employees" },
  },
  cases: {
    eyebrow: "Case studies",
    h2: "What this looks like in production",
    accent: "in production",
  },
  statement: {
    line: "Your team sells homes. The busywork runs itself.",
    by: "Built in weeks · Owned by you",
  },
  packages: {
    eyebrow: "Packages",
    h2: "Fixed scope. Fixed price. Fixed date.",
    cta: { label: "Compare packages", href: "/packages" },
  },
  process: {
    eyebrow: "Process",
    h2: "How it works",
    steps: [
      {
        title: "Quote",
        body: "Answer seven questions. A written proposal lands in your inbox within minutes.",
      },
      {
        title: "Scope",
        body: "One call to lock the details. You get a delivery date in writing.",
      },
      {
        title: "Ship",
        body: "We build, demo weekly, and hand over the keys. Then we stay 30 days.",
      },
    ] satisfies Step[],
  },
  guarantee: {
    h2: "The guarantee",
    points: [
      "Delivered on the agreed date or 20% back.",
      "30 days of post-launch support included.",
      "You own 100% of the code.",
    ],
  },
  playbooks: {
    eyebrow: "Playbooks",
    h2: "Playbooks: do it yourself, or let us",
    accent: "or let us",
    cta: { label: "All playbooks", href: "/playbooks" },
  },
  finalCta: {
    h2: "Get a proposal in minutes, not weeks.",
    body: "Seven questions, about three minutes. A written, fixed-price proposal lands in your inbox right after.",
    primary: { label: "Get a fixed quote", href: "/quote" },
  },
};
