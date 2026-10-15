"use client";

import { track as vercelTrack } from "@vercel/analytics";

/**
 * Thin event layer over Vercel Analytics. Every custom event goes through here so the names
 * stay consistent and can be re-pointed to another provider in one place.
 */
export type EventName =
  | "quote_started"
  | `quote_step_${number}`
  | "quote_submitted"
  | "quote_cta_clicked"
  | "waitlist_joined"
  | "playbook_cta_clicked";

type Props = Record<string, string | number | boolean | null>;

export function track(name: EventName, props?: Props) {
  try {
    vercelTrack(name, props);
  } catch {
    // Analytics must never break the page.
  }
}
