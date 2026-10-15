import type { Employee } from "./types";

export const employeesPage = {
  seo: {
    title: "AI Employees for real estate — specialized agents that do one job end to end",
    description:
      "Lead Responder, Transaction Coordinator, Guest Concierge, Owner Reporting and more: AI Employees for real estate teams, built for you today, self-serve soon.",
  },
  h1: "Meet your AI Employees",
  subline:
    "Specialized agents that do one job in your business, end to end. We build them for you today; hire them yourself soon.",
  statusLabels: { available: "Available as a build", "coming-soon": "Coming soon" },
  detail: {
    dayHeading: "A day in the life",
    connectsHeading: "Connects to",
    buildHeading: "Get it built",
    buildCta: "Build it with Chanium",
    waitlistHeading: "Hire it yourself, soon",
    waitlistBody:
      "We're turning each AI Employee into a self-serve product. Join the waitlist and you'll be first to try it.",
    waitlistCta: "Join the self-serve waitlist",
    waitlistSuccess: "You're on the list. We'll email you when it's ready.",
    /** The live counter only appears once the waitlist passes this number. */
    counterThreshold: 50,
    counterLabel: "teams already on the waitlist",
    customBuild: "Custom build — quoted in your proposal",
  },
};

export const employees: Employee[] = [
  {
    slug: "lead-responder",
    name: "Lead Responder",
    segment: ["sales", "luxury"],
    oneLiner:
      "Replies to every new lead in under 60 seconds, qualifies it and routes it to the right agent",
    dayInTheLife: [
      "A Zillow lead lands at 9:47pm; a personal reply goes out before 9:48.",
      "Asks the qualifying questions you'd ask — timeline, budget, pre-approval.",
      "Routes hot leads to the right agent with the full conversation attached.",
      "Logs every touch in your CRM so nothing lives in someone's phone.",
    ],
    connects: ["FUB", "kvCORE", "Lofty", "SMS", "email"],
    buildPackage: "lead-response-engine",
    priceFrom: "from $5,000",
    timeline: "2 weeks",
    status: "available",
    automations: ["lead-response", "lead-routing"],
  },
  {
    slug: "transaction-coordinator",
    name: "Transaction Coordinator",
    segment: ["sales", "luxury"],
    oneLiner:
      "Tracks every date, document and task on every deal and nudges whoever is late",
    dayInTheLife: [
      "Reads the executed contract and builds the timeline of every deadline.",
      "Checks Dotloop or SkySlope for missing documents each morning.",
      "Nudges the agent, lender or title company before a date slips.",
      "Gives the broker one view of every open deal.",
    ],
    connects: ["Dotloop", "SkySlope", "FUB", "Google Calendar"],
    buildPackage: "deal-pipeline-on-autopilot",
    priceFrom: "from $12,000",
    timeline: "4 weeks",
    status: "available",
    automations: ["transaction-tracking", "document-checklists"],
  },
  {
    slug: "guest-concierge",
    name: "Guest Concierge",
    segment: ["str"],
    oneLiner:
      "Answers guest questions, handles check-in logistics and escalates only what needs a human",
    dayInTheLife: [
      "Answers the 2am Wi-Fi question from the listing's own details.",
      "Sends check-in instructions at the right time for each reservation.",
      "Handles early check-in and late checkout requests against the calendar.",
      "Escalates complaints and anything unusual to your team, with context.",
    ],
    connects: ["Guesty", "Hospitable", "Hostaway", "Airbnb"],
    buildPackage: "str-operations-autopilot",
    priceFrom: "from $8,000",
    timeline: "3–4 weeks",
    status: "available",
    automations: ["guest-messaging", "check-in-logistics"],
  },
  {
    slug: "owner-reporting",
    name: "Owner Reporting",
    segment: ["str", "pm"],
    oneLiner: "Builds and sends monthly owner statements with occupancy, revenue and expenses",
    dayInTheLife: [
      "Pulls reservations and payouts from your PMS on the first of the month.",
      "Matches expenses from your accounting tool to each property.",
      "Builds a branded statement per owner with occupancy, revenue and expenses.",
      "Sends it — and flags anything that looks off before it goes out.",
    ],
    connects: ["PMS", "accounting"],
    buildPackage: "str-operations-autopilot",
    priceFrom: "from $8,000",
    timeline: "3–4 weeks",
    status: "available",
    automations: ["owner-reports"],
  },
  {
    slug: "maintenance-dispatcher",
    name: "Maintenance Dispatcher",
    segment: ["pm"],
    oneLiner: "Turns tenant requests into tickets, assigns vendors and follows up to close",
    dayInTheLife: [
      "Turns a tenant's text about a leaking sink into a ticket with photos.",
      "Assigns the right vendor based on trade, property and availability.",
      "Confirms the appointment with the tenant and the vendor.",
      "Follows up until the ticket is closed and logged.",
    ],
    connects: ["AppFolio", "Buildium", "SMS"],
    buildPackage: "pm-operations-autopilot",
    priceFrom: null,
    timeline: null,
    status: "coming-soon",
    automations: ["maintenance-requests", "vendor-dispatch"],
  },
  {
    slug: "leasing-assistant",
    name: "Leasing Assistant",
    segment: ["pm"],
    oneLiner: "Responds to rental inquiries, schedules showings and screens applicants",
    dayInTheLife: [
      "Replies to a Zillow rental inquiry within a minute.",
      "Answers questions about the unit, pets and move-in dates.",
      "Books a showing on your team's calendar.",
      "Sends the application link and follows up until it's complete.",
    ],
    connects: ["AppFolio", "Buildium", "Zillow"],
    buildPackage: "pm-operations-autopilot",
    priceFrom: null,
    timeline: null,
    status: "coming-soon",
    automations: ["leasing-follow-up", "showing-scheduling"],
  },
  {
    slug: "listing-marketer",
    name: "Listing Marketer",
    segment: ["luxury", "sales"],
    oneLiner: "Produces listing descriptions, social posts and email blasts on brand",
    dayInTheLife: [
      "Drafts the listing description from MLS data and your notes.",
      "Produces social posts sized for each channel, in your brand.",
      "Builds the just-listed email blast for your sphere.",
      "Queues everything for your approval before it goes out.",
    ],
    connects: ["MLS", "Canva", "Mailchimp"],
    buildPackage: null,
    priceFrom: null,
    timeline: null,
    status: "coming-soon",
    automations: ["listing-marketing"],
  },
];

export function getEmployee(slug: string) {
  return employees.find((e) => e.slug === slug);
}
