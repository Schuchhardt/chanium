import { renderProposalPdf } from "@/lib/quote/pdf";

// Development-only preview of the proposal PDF layout: GET /api/dev/proposal-pdf
const SAMPLE = `# Proposal: Lead Response Engine for Acme Realty

## What you get
Every new lead gets a **personal reply in under 60 seconds**, is qualified, and lands with the right agent.

## Scope
- Instant SMS and email reply to every new Follow Up Boss lead
- Qualification questions in your voice
- Routing rules for your 40 agents

## Timeline & price
2 weeks, **$6,000** fixed.

## Assumptions
- Follow Up Boss API access on a paid plan

## Our guarantee
Delivered on the agreed date or 20% back. 30 days of post-launch support included. You own 100% of the code.

## Next step
Book the scoping call from the link in the email.`;

export async function GET() {
  if (process.env.NODE_ENV === "production") return new Response("Not found", { status: 404 });
  const pdf = await renderProposalPdf(SAMPLE, { company: "Acme Realty", date: "October 15, 2026" });
  return new Response(new Uint8Array(pdf), { headers: { "content-type": "application/pdf" } });
}
