import { NextResponse } from "next/server";
import { z } from "zod";
import { employees, getEmployee } from "@/content/employees";
import { supabaseAdmin } from "@/lib/supabase";
import { clientIp, rateLimiter } from "@/lib/rate-limit";

const schema = z.object({
  email: z.email().max(200),
  employee_slug: z.enum(employees.map((e) => e.slug) as [string, ...string[]]),
  utm: z.record(z.string(), z.string().max(300)).optional(),
  /** Honeypot. */
  website: z.string().max(0).optional(),
});

const limit = rateLimiter("waitlist", 10, 60 * 60);

export async function POST(req: Request) {
  const { success } = await limit(clientIp(req));
  if (!success) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (body && typeof body === "object" && (body as { website?: string }).website) {
    return NextResponse.json({ ok: true });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const { email, employee_slug, utm } = parsed.data;
  const db = supabaseAdmin();
  if (db) {
    const { error } = await db.from("waitlist").upsert(
      {
        email: email.toLowerCase(),
        employee_slug,
        segment: getEmployee(employee_slug)?.segment[0] ?? null,
        utm: utm ?? {},
      },
      { onConflict: "email,employee_slug", ignoreDuplicates: true },
    );
    if (error) {
      console.error(`[waitlist] insert failed: ${error.message}`);
      return NextResponse.json({ error: "Could not join the waitlist" }, { status: 500 });
    }
  } else {
    console.warn(`[waitlist] Supabase not configured — ${employee_slug} signup not stored`);
  }
  return NextResponse.json({ ok: true });
}
