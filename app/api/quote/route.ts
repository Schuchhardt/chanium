import { after, NextResponse } from "next/server";
import { quoteInputSchema } from "@/lib/quote/schema";
import { insertQuote, runQuotePipeline } from "@/lib/quote/pipeline";
import { clientIp, rateLimiter } from "@/lib/rate-limit";

// The proposal pipeline runs in `after()`, within this function's lifetime.
export const maxDuration = 300;

const limit = rateLimiter("quote", 5, 60 * 60);

export async function POST(req: Request) {
  const { success } = await limit(clientIp(req));
  if (!success) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot filled → pretend success so bots learn nothing.
  if (body && typeof body === "object" && "website" in body && (body as { website?: string }).website) {
    return NextResponse.json({ ok: true });
  }

  const parsed = quoteInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", issues: parsed.error.issues.map((i) => i.path.join(".")) }, { status: 400 });
  }

  const { consent: _consent, website: _website, ...quote } = parsed.data;
  const id = crypto.randomUUID();

  try {
    await insertQuote(id, quote);
  } catch (err) {
    console.error(`[quote ${id}]`, err);
    return NextResponse.json({ error: "Could not save your answers" }, { status: 500 });
  }

  after(() => runQuotePipeline(id, quote));
  return NextResponse.json({ ok: true, id });
}
