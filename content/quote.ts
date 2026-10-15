import type { QuoteSegment } from "./types";

export interface Option {
  id: string;
  label: string;
}

export const quoteSegments: Option[] = [
  { id: "str", label: "Short-term rentals" },
  { id: "pm", label: "Property management" },
  { id: "sales", label: "Sales team" },
  { id: "luxury", label: "Luxury brokerage" },
  { id: "other", label: "Other" },
];

const crm = ["Follow Up Boss", "kvCORE", "BoomTown", "Lofty"];
const transaction = ["Dotloop", "SkySlope", "Brokermint"];

export const stackOptions: Record<QuoteSegment, string[]> = {
  sales: [...crm, ...transaction, "Google Workspace", "Other"],
  luxury: [...crm, "Salesforce", ...transaction, "Mailchimp", "Canva", "Google Workspace", "Other"],
  str: ["Guesty", "Hostaway", "Hospitable", "Airbnb", "Vrbo", "Breezeway", "PriceLabs", "QuickBooks", "Google Workspace", "Other"],
  pm: ["AppFolio", "Buildium", "Rent Manager", "Yardi", "Zillow Rental Manager", "QuickBooks", "Google Workspace", "Other"],
  other: ["Follow Up Boss", "Salesforce", "HubSpot", "AppFolio", "Guesty", "Dotloop", "Google Workspace", "Microsoft 365", "Other"],
};

export const automationOptions: Record<QuoteSegment, Option[]> = {
  sales: [
    { id: "lead-response", label: "Lead response" },
    { id: "lead-routing", label: "Lead routing" },
    { id: "transaction-tracking", label: "Transaction tracking" },
    { id: "document-checklists", label: "Document checklists" },
    { id: "agent-reporting", label: "Agent reporting" },
    { id: "commission-calc", label: "Commission calc" },
  ],
  luxury: [
    { id: "lead-response", label: "Lead response" },
    { id: "lead-routing", label: "Lead routing" },
    { id: "client-follow-up", label: "Client follow-up" },
    { id: "listing-marketing", label: "Listing marketing" },
    { id: "transaction-tracking", label: "Transaction tracking" },
    { id: "document-checklists", label: "Document checklists" },
  ],
  str: [
    { id: "guest-messaging", label: "Guest messaging" },
    { id: "check-in-logistics", label: "Check-in logistics" },
    { id: "cleaning-coordination", label: "Cleaning coordination" },
    { id: "owner-reports", label: "Owner reports" },
    { id: "review-responses", label: "Review responses" },
    { id: "maintenance-issues", label: "Maintenance issues" },
  ],
  pm: [
    { id: "maintenance-requests", label: "Maintenance requests" },
    { id: "vendor-dispatch", label: "Vendor dispatch" },
    { id: "leasing-follow-up", label: "Leasing follow-up" },
    { id: "showing-scheduling", label: "Showing scheduling" },
    { id: "tenant-comms", label: "Tenant comms" },
    { id: "owner-reports", label: "Owner reports" },
  ],
  other: [
    { id: "lead-response", label: "Lead response" },
    { id: "customer-messaging", label: "Customer messaging" },
    { id: "reporting", label: "Reporting" },
    { id: "document-workflows", label: "Document workflows" },
    { id: "data-sync", label: "Syncing data between tools" },
  ],
};

export const scaleLabels: Record<QuoteSegment, string> = {
  str: "Units managed",
  pm: "Doors managed",
  sales: "Agents",
  luxury: "Agents",
  other: "Units, doors or agents",
};

export const urgencyOptions: Option[] = [
  { id: "this-month", label: "This month" },
  { id: "next-quarter", label: "Next quarter" },
  { id: "exploring", label: "Just exploring" },
];

export const budgetOptions: Option[] = [
  { id: "lt-5k", label: "<$5k" },
  { id: "5-10k", label: "$5–10k" },
  { id: "10-20k", label: "$10–20k" },
  { id: "20k-plus", label: "$20k+" },
];

export const sourceOptions = [
  "Google search",
  "A playbook",
  "LinkedIn",
  "Referral",
  "Podcast or event",
  "Other",
];

export const usStates = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA",
  "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM",
  "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA",
  "WV", "WI", "WY", "Outside the US",
];

export const quoteCopy = {
  seo: {
    title: "Get a fixed quote",
    description:
      "Answer seven questions and get a written, fixed-price proposal for your real estate AI operations in your inbox within minutes.",
  },
  progress: (n: number, total: number) => `Step ${n} of ${total}`,
  back: "Back",
  next: "Continue",
  submit: "Send me my proposal",
  submitting: "Sending…",
  error: "Something went wrong sending your answers. Please try again, or email hello@chanium.com.",
  steps: [
    { title: "What kind of business do you run?", help: "Pick the closest fit." },
    { title: "What do you run it on today?", help: "Select every tool you use.", otherLabel: "Anything else?" },
    { title: "What do you want to automate?", help: "Select everything that applies.", otherLabel: "Anything else?" },
    { title: "How big is the operation?", help: "Rough numbers are fine." },
    { title: "When, and roughly what budget?", help: "This helps us recommend the right scope." },
    { title: "Where should we send your proposal?", help: "We only use this to send your proposal." },
    { title: "Does this look right?", help: "Edit anything before you send." },
  ],
  scale: { leads: "Leads per month", team: "Team size" },
  urgencyLabel: "When do you want to start?",
  budgetLabel: "Budget",
  contact: {
    name: "Full name",
    company: "Company",
    email: "Work email",
    phone: "Phone (optional)",
    state: "State",
    source: "How did you hear about us?",
  },
  summary: {
    edit: "Edit",
    consent: "I agree to receive my proposal and related follow-up from Chanium by email.",
    privacyLink: "See the privacy policy.",
  },
  thanks: {
    seo: { title: "Your proposal is on its way" },
    h1: "Your proposal is on its way.",
    body: "Check your inbox in the next few minutes for a written, fixed-price proposal. It includes a link to book your scoping call.",
    next: [
      "Read the proposal — scope, price, timeline and assumptions are all on one page.",
      "Book the scoping call from the link in the email.",
      "Get a delivery date in writing. If we miss it, 20% back.",
    ],
    secondary: { label: "Browse the playbooks while you wait", href: "/playbooks" },
  },
};
