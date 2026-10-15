import { z } from "zod";
import { budgetOptions, quoteSegments, urgencyOptions, usStates, sourceOptions } from "@/content/quote";

const ids = <T extends { id: string }>(opts: T[]) => opts.map((o) => o.id) as [string, ...string[]];

const count = z.coerce.number().int().min(0).max(1_000_000);

/** Shared by the quote form (client) and /api/quote (server). */
export const quoteInputSchema = z.object({
  segment: z.enum(ids(quoteSegments)),
  stack: z.array(z.string().max(60)).max(30).default([]),
  stack_other: z.string().max(500).default(""),
  automations: z.array(z.string().max(60)).max(30).default([]),
  automations_other: z.string().max(1000).default(""),
  scale: z.object({
    units: count.optional(),
    leads_per_month: count.optional(),
    team_size: count.optional(),
  }),
  urgency: z.enum(ids(urgencyOptions)),
  budget_band: z.enum(ids(budgetOptions)),
  contact: z.object({
    name: z.string().trim().min(2).max(120),
    company: z.string().trim().min(1).max(160),
    email: z.email().max(200),
    phone: z.string().trim().max(40).default(""),
    state: z.enum(usStates as [string, ...string[]]),
    source: z.enum(sourceOptions as [string, ...string[]]),
  }),
  consent: z.literal(true),
  employee: z.string().max(60).optional(),
  utm: z.record(z.string(), z.string().max(300)).optional(),
  /** Honeypot: real users never see or fill this. */
  website: z.string().max(0).optional(),
});

export type QuoteInput = z.infer<typeof quoteInputSchema>;

/** A validated quote without the form-only fields (consent checkbox, honeypot). */
export type QuoteData = Omit<QuoteInput, "consent" | "website">;
