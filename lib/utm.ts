export const UTM_COOKIE = "ch_utm";
export const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

export type Utm = Partial<Record<(typeof UTM_KEYS)[number] | "landing_path" | "referrer", string>>;

/** Reads the first-touch UTM cookie in the browser. */
export function readUtmCookie(): Utm | null {
  if (typeof document === "undefined") return null;
  const raw = document.cookie.split("; ").find((c) => c.startsWith(`${UTM_COOKIE}=`));
  if (!raw) return null;
  try {
    return JSON.parse(decodeURIComponent(raw.slice(UTM_COOKIE.length + 1))) as Utm;
  } catch {
    return null;
  }
}
