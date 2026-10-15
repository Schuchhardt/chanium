import "server-only";
import { Resend } from "resend";
import { site } from "@/content/site";
import { env } from "../env";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function layout(body: string) {
  return `<!doctype html><html><body style="margin:0;background:#f5f6f8;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#15171c">
<div style="max-width:560px;margin:0 auto;padding:32px 24px">
<p style="font-size:11px;letter-spacing:3px;color:#2f5fe8;margin:0 0 24px">CHANIUM</p>
<div style="background:#fff;border:1px solid #e3e5ea;border-radius:10px;padding:28px">${body}</div>
<p style="font-size:12px;color:#5f6670;margin-top:20px">${esc(site.legalName)} · <a href="mailto:${site.email}" style="color:#5f6670">${site.email}</a> · Reply to this email to reach a human.</p>
</div></body></html>`;
}

function button(href: string, label: string) {
  return `<a href="${esc(href)}" style="display:inline-block;background:#2f5fe8;color:#fff;text-decoration:none;font-weight:600;padding:12px 20px;border-radius:6px">${esc(label)}</a>`;
}

let resend: Resend | null | undefined;
function client() {
  if (resend === undefined) resend = env.resendKey ? new Resend(env.resendKey) : null;
  return resend;
}

async function send(args: Parameters<Resend["emails"]["send"]>[0]) {
  const c = client();
  if (!c) {
    console.warn(`[email] RESEND_API_KEY not set — skipped "${args.subject}" to ${args.to}`);
    return;
  }
  const { error } = await c.emails.send(args);
  if (error) throw new Error(`Resend: ${error.message}`);
}

export async function sendProposalEmail(opts: {
  to: string;
  name: string;
  packageName: string;
  priceUsd: number;
  timelineWeeks: number;
  pdf: Buffer;
}) {
  const first = opts.name.split(" ")[0];
  const price = `$${opts.priceUsd.toLocaleString("en-US")}`;
  const cal = env.calUrl;
  await send({
    from: env.quoteFrom,
    to: opts.to,
    replyTo: env.internalEmail,
    subject: `Your Chanium proposal — ${opts.packageName}`,
    attachments: [{ filename: "Chanium-proposal.pdf", content: opts.pdf }],
    html: layout(`
<p style="margin:0 0 14px">Hi ${esc(first)},</p>
<p style="margin:0 0 14px">Your proposal is attached. The short version: <strong>${esc(opts.packageName)}</strong>, fixed at <strong>${price}</strong>, delivered in <strong>${opts.timelineWeeks} weeks</strong>.</p>
<p style="margin:0 0 20px">Next step is one call to lock the details — after it you get the delivery date in writing.</p>
${cal ? `<p style="margin:0 0 24px">${button(cal, "Book your scoping call")}</p>` : `<p style="margin:0 0 24px">Reply to this email with a few times that work and we'll send an invite.</p>`}
<p style="margin:0;padding-top:16px;border-top:1px solid #e3e5ea;font-size:14px;color:#4a515c">${esc(site.guarantee.full)}</p>`),
  });
}

export async function sendFallbackEmail(opts: { to: string; name: string }) {
  const first = opts.name.split(" ")[0];
  await send({
    from: env.quoteFrom,
    to: opts.to,
    replyTo: env.internalEmail,
    subject: "Your Chanium proposal is on its way",
    html: layout(`
<p style="margin:0 0 14px">Hi ${esc(first)},</p>
<p style="margin:0 0 14px">Thanks for your answers. We're preparing your proposal by hand and you'll have it within 24 hours.</p>
${env.calUrl ? `<p style="margin:0 0 20px">Want to talk sooner? ${button(env.calUrl, "Book a call")}</p>` : ""}
<p style="margin:0;padding-top:16px;border-top:1px solid #e3e5ea;font-size:14px;color:#4a515c">${esc(site.guarantee.full)}</p>`),
  });
}

export async function sendInternalEmail(opts: { subject: string; markdown: string; rowLink?: string }) {
  await send({
    from: env.quoteFrom,
    to: env.internalEmail,
    subject: opts.subject,
    text: `${opts.rowLink ? `Row: ${opts.rowLink}\n\n` : ""}${opts.markdown}`,
  });
}

export async function postSlack(text: string) {
  if (!env.slackWebhook) return;
  const res = await fetch(env.slackWebhook, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) console.error(`[slack] webhook failed: ${res.status}`);
}
