"use client";

import { useState, type FormEvent } from "react";
import { employeesPage } from "@/content/employees";
import { track } from "@/lib/analytics";
import { readUtmCookie } from "@/lib/utm";

export function WaitlistForm({ employeeSlug }: { employeeSlug: string }) {
  const copy = employeesPage.detail;
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus("sending");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          employee_slug: employeeSlug,
          utm: readUtmCookie() ?? undefined,
          website: form.get("website") || undefined,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      track("waitlist_joined", { employee: employeeSlug });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p role="status" className="rounded-md border border-accent/40 bg-accent-tint px-4 py-3 text-title">
        {copy.waitlistSuccess}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <input name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="flex-1">
        <span className="sr-only">Work email</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          className="block min-h-12 w-full rounded-md border border-line-strong bg-card px-3.5 text-base text-title placeholder:text-subtle focus:border-accent focus:outline-none"
        />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="min-h-12 rounded-md border border-line-strong px-5 font-semibold text-title transition-colors hover:border-accent disabled:opacity-60"
      >
        {status === "sending" ? "Joining…" : copy.waitlistCta}
      </button>
      {status === "error" && (
        <p role="alert" className="text-sm text-danger sm:basis-full">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
