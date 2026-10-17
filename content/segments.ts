import type { Segment, SegmentSlug } from "./types";

export const segments: Segment[] = [
  {
    slug: "str",
    path: "short-term-rentals",
    navLabel: "STR",
    name: "Short-term rentals",
    cardLine: "Guest messages, cleanings and owner reports, handled.",
    hero: {
      h1: "Run 200 units like it's 20.",
      subline:
        "AI operations for short-term rental managers: guest messaging, cleaning handoffs and owner reporting connected to your PMS and running on their own — at a fixed price, and you own the code.",
    },
    painsHeading: "Sound familiar?",
    pains: [
      "Guest questions at 2am",
      "Cleaning handoffs that slip",
      "Owner reports built by hand every month",
    ],
    employeesHeading: "The AI Employees for this job",
    employees: ["guest-concierge", "owner-reporting"],
    packagesHeading: "The package",
    packages: [{ slug: "str-operations-autopilot" }],
    caseStudy: "depando",
    media: { still: "strVilla", film: "strVilla", card: "strVilla" },
    seo: {
      title: "Short-term rental automation — AI operations for STR managers",
      description:
        "Short-term rental automation for guest messaging, cleaning coordination and owner reports. Built on Guesty, Hostaway or Hospitable in weeks, at a fixed price.",
      keywords: [
        "short-term rental automation",
        "vacation rental AI",
        "Airbnb guest messaging automation",
        "owner statement automation",
      ],
    },
  },
  {
    slug: "pm",
    path: "property-management",
    navLabel: "Property Management",
    name: "Property management",
    cardLine: "Maintenance, leasing and tenant comms without the inbox.",
    hero: {
      h1: "Stop running your portfolio from your inbox.",
      subline:
        "AI operations for property managers: maintenance requests, leasing follow-ups and tenant communication routed, tracked and answered on top of AppFolio or Buildium.",
    },
    painsHeading: "Sound familiar?",
    pains: [
      "Maintenance requests lost in email",
      "Leasing follow-ups that go cold",
      "Tenant comms that eat your team's day",
    ],
    employeesHeading: "The AI Employees for this job",
    employees: ["maintenance-dispatcher", "leasing-assistant"],
    packagesHeading: "The package",
    packages: [{ slug: "pm-operations-autopilot" }],
    media: { still: "pmBuilding", card: "pmBuilding" },
    seo: {
      title: "Property management AI — maintenance, leasing and tenant comms on autopilot",
      description:
        "Property management AI that turns tenant requests into tickets, follows up on leasing inquiries and keeps tenant comms out of your inbox. Fixed price, you own the code.",
      keywords: [
        "property management AI",
        "property management automation",
        "AppFolio automation",
        "maintenance request automation",
      ],
    },
  },
  {
    slug: "sales",
    path: "sales-teams",
    navLabel: "Sales Teams",
    name: "Sales teams",
    cardLine: "Every lead answered in under a minute. Every deal on track.",
    hero: {
      h1: "Answer every lead in under 60 seconds.",
      subline:
        "AI operations for brokerages and sales teams: instant lead response and routing, and every deal date tracked across Follow Up Boss, Dotloop and SkySlope.",
    },
    painsHeading: "Sound familiar?",
    pains: [
      "Leads that wait hours for a reply",
      "Deals that fall through on a missed date",
      "Three tools that never agree on the truth",
    ],
    employeesHeading: "The AI Employees for this job",
    employees: ["lead-responder", "transaction-coordinator"],
    packagesHeading: "The packages",
    packages: [{ slug: "lead-response-engine" }, { slug: "deal-pipeline-on-autopilot" }],
    caseStudy: "residential-brokerage",
    media: { still: "salesHome", card: "salesHome" },
    seo: {
      title: "Real estate AI automation for sales teams — lead response and deal tracking",
      description:
        "Real estate AI automation for brokerages: every lead answered in under 60 seconds and every deal date tracked across Follow Up Boss, Dotloop and SkySlope.",
      keywords: [
        "real estate AI automation",
        "Follow Up Boss automation",
        "real estate lead response",
        "transaction coordinator automation",
      ],
    },
  },
  {
    slug: "luxury",
    path: "luxury",
    navLabel: "Luxury",
    name: "Luxury & boutique",
    cardLine: "White-glove follow-up at scale, without losing the touch.",
    hero: {
      h1: "Concierge-level follow-up for every client.",
      subline:
        "AI operations for luxury and boutique brokerages: every high-value client followed up personally and on brand, and listing marketing produced without the late nights.",
    },
    painsHeading: "Sound familiar?",
    pains: [
      "High-value clients slipping through the cracks",
      "Listing marketing done by hand",
      "No time for the relationships that close",
    ],
    employeesHeading: "The AI Employees for this job",
    employees: ["lead-responder", "listing-marketer"],
    packagesHeading: "The package",
    packages: [{ slug: "lead-response-engine", variant: "Luxury variant" }],
    media: { still: "luxuryHills", film: "luxuryHills", card: "luxuryHills" },
    seo: {
      title: "AI for luxury real estate — concierge-level client follow-up",
      description:
        "AI for luxury and boutique brokerages: on-brand, personal follow-up for every high-value client and listing marketing produced for you. Fixed price, you own the code.",
      keywords: [
        "luxury real estate AI",
        "boutique brokerage automation",
        "real estate client follow-up automation",
        "listing marketing AI",
      ],
    },
  },
];

export function getSegment(slug: SegmentSlug) {
  return segments.find((s) => s.slug === slug)!;
}

export function getSegmentByPath(path: string) {
  return segments.find((s) => s.path === path);
}
