import "server-only";
import { supabaseAdmin } from "./supabase";

/** Waitlist size for one AI Employee, or null when storage isn't configured. */
export async function waitlistCount(employeeSlug: string): Promise<number | null> {
  const db = supabaseAdmin();
  if (!db) return null;
  const { count, error } = await db
    .from("waitlist")
    .select("id", { count: "exact", head: true })
    .eq("employee_slug", employeeSlug);
  if (error) {
    console.error(`[waitlist] count failed: ${error.message}`);
    return null;
  }
  return count;
}
