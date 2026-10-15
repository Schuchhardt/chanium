import "server-only";
import { supabaseAdmin, PROPOSALS_BUCKET } from "../supabase";
import { env } from "../env";
import { generateProposal, packageName } from "./proposal";
import { renderProposalPdf } from "./pdf";
import { postSlack, sendFallbackEmail, sendInternalEmail, sendProposalEmail } from "./email";
import type { QuoteData as Clean } from "./schema";

export async function insertQuote(id: string, q: Clean) {
  const db = supabaseAdmin();
  if (!db) return;
  const { error } = await db.from("quotes").insert({
    id,
    segment: q.segment,
    stack: q.stack,
    stack_other: q.stack_other,
    automations: q.automations,
    automations_other: q.automations_other,
    scale: q.scale,
    urgency: q.urgency,
    budget_band: q.budget_band,
    contact: q.contact,
    employee_slug: q.employee ?? null,
    utm: q.utm ?? {},
    status: "new",
  });
  if (error) throw new Error(`Supabase insert: ${error.message}`);
}

async function updateQuote(id: string, patch: Record<string, unknown>) {
  const db = supabaseAdmin();
  if (!db) return;
  const { error } = await db.from("quotes").update(patch).eq("id", id);
  if (error) console.error(`[quote ${id}] update failed: ${error.message}`);
}

function rowLink(id: string) {
  if (!env.supabaseUrl) return undefined;
  const ref = new URL(env.supabaseUrl).hostname.split(".")[0];
  return `https://supabase.com/dashboard/project/${ref}/editor?filter=id%3Aeq%3A${id}`;
}

/**
 * Runs after the 200 response (via next/server `after`): Claude proposal → PDF → storage →
 * prospect email → internal brief. Any failure in the AI half still gets the prospect a
 * "within 24 hours" email and flags the row for a human.
 */
export async function runQuotePipeline(id: string, q: Clean) {
  const started = Date.now();
  const { contact } = q;
  try {
    const proposal = await generateProposal(q);
    const name = packageName(proposal.recommended_package);
    const pdf = await renderProposalPdf(proposal.proposal_md, {
      company: contact.company,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    });

    let pdfPath: string | null = null;
    const db = supabaseAdmin();
    if (db) {
      pdfPath = `${new Date().toISOString().slice(0, 7)}/${id}.pdf`;
      const { error } = await db.storage.from(PROPOSALS_BUCKET).upload(pdfPath, pdf, {
        contentType: "application/pdf",
        upsert: true,
      });
      if (error) {
        console.error(`[quote ${id}] storage upload failed: ${error.message}`);
        pdfPath = null;
      }
    }

    await sendProposalEmail({
      to: contact.email,
      name: contact.name,
      packageName: name,
      priceUsd: proposal.price_usd,
      timelineWeeks: proposal.timeline_weeks,
      pdf,
    });

    await updateQuote(id, {
      recommended_package: proposal.recommended_package,
      proposal_md: proposal.proposal_md,
      internal_brief_md: proposal.internal_brief_md,
      proposal_pdf_url: pdfPath,
      status: "proposal_sent",
    });

    const summary = `${contact.company} (${contact.state}) · ${q.segment} · ${name} · $${proposal.price_usd.toLocaleString("en-US")} / ${proposal.timeline_weeks} wks · budget ${q.budget_band} · start ${q.urgency}`;
    await Promise.allSettled([
      sendInternalEmail({
        subject: `New quote: ${contact.company} — ${name}`,
        rowLink: rowLink(id),
        markdown: `${summary}\nContact: ${contact.name} <${contact.email}> ${contact.phone}\nSource: ${contact.source}\nUTM: ${JSON.stringify(q.utm ?? {})}\n\n# Internal brief\n\n${proposal.internal_brief_md}\n\n# Proposal sent\n\n${proposal.proposal_md}`,
      }),
      postSlack(`:house: New quote — ${summary} (${Math.round((Date.now() - started) / 1000)}s to proposal)`),
    ]);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[quote ${id}] pipeline failed: ${message}`);
    await updateQuote(id, { needs_attention: true, pipeline_error: message.slice(0, 1000) });
    await Promise.allSettled([
      sendFallbackEmail({ to: contact.email, name: contact.name }),
      sendInternalEmail({
        subject: `⚠ Quote needs a manual proposal: ${contact.company}`,
        rowLink: rowLink(id),
        markdown: `The AI pipeline failed: ${message}\n\nThe prospect was told to expect a proposal within 24 hours.\n\n${JSON.stringify(q, null, 2)}`,
      }),
      postSlack(`:warning: Quote from ${contact.company} needs a manual proposal — ${message}`),
    ]);
  }
}
