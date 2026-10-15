"use client";

import { useEffect } from "react";
import { UTM_COOKIE, UTM_KEYS, readUtmCookie, type Utm } from "@/lib/utm";

/**
 * Stores first-touch attribution in a cookie on the first landing that carries utm_* params
 * (or the first landing at all, to keep the referrer). Never overwrites an existing cookie.
 */
export function UtmCapture() {
  useEffect(() => {
    if (readUtmCookie()) return;
    const params = new URLSearchParams(window.location.search);
    const utm: Utm = {};
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) utm[key] = value.slice(0, 200);
    }
    utm.landing_path = window.location.pathname;
    if (document.referrer && !document.referrer.startsWith(window.location.origin)) {
      utm.referrer = document.referrer.slice(0, 300);
    }
    const maxAge = 60 * 60 * 24 * 90;
    document.cookie = `${UTM_COOKIE}=${encodeURIComponent(JSON.stringify(utm))}; Max-Age=${maxAge}; Path=/; SameSite=Lax`;
  }, []);
  return null;
}
