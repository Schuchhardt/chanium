import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env } from "./env";

let client: SupabaseClient | null | undefined;

/** Service-role client. Server-only: never import this from a client component. */
export function supabaseAdmin(): SupabaseClient | null {
  if (client !== undefined) return client;
  client =
    env.supabaseUrl && env.supabaseServiceKey
      ? createClient(env.supabaseUrl, env.supabaseServiceKey, { auth: { persistSession: false } })
      : null;
  if (!client) console.warn("[supabase] not configured — rows will not be stored");
  return client;
}

export const PROPOSALS_BUCKET = "proposals";
