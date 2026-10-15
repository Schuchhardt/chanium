"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  automationOptions,
  budgetOptions,
  quoteCopy,
  quoteSegments,
  scaleLabels,
  sourceOptions,
  stackOptions,
  urgencyOptions,
  usStates,
} from "@/content/quote";
import { employees } from "@/content/employees";
import type { QuoteSegment } from "@/content/types";
import { track } from "@/lib/analytics";
import { readUtmCookie } from "@/lib/utm";
import { cx } from "../ui";

const STORAGE_KEY = "ch_quote_v1";
const TOTAL = quoteCopy.steps.length;

interface FormState {
  segment: QuoteSegment | "";
  stack: string[];
  stack_other: string;
  automations: string[];
  automations_other: string;
  units: string;
  leads_per_month: string;
  team_size: string;
  urgency: string;
  budget_band: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  state: string;
  source: string;
  consent: boolean;
  employee: string;
  website: string;
}

const empty: FormState = {
  segment: "",
  stack: [],
  stack_other: "",
  automations: [],
  automations_other: "",
  units: "",
  leads_per_month: "",
  team_size: "",
  urgency: "",
  budget_band: "",
  name: "",
  company: "",
  email: "",
  phone: "",
  state: "",
  source: "",
  consent: false,
  employee: "",
  website: "",
};

const isSegment = (v: string | null): v is QuoteSegment => quoteSegments.some((s) => s.id === v);

/** Drops selections that don't exist for the chosen segment. */
function fitToSegment(s: FormState): FormState {
  if (!s.segment) return s;
  const stacks = stackOptions[s.segment];
  const autos = automationOptions[s.segment].map((a) => a.id);
  return { ...s, stack: s.stack.filter((x) => stacks.includes(x)), automations: s.automations.filter((x) => autos.includes(x)) };
}

function loadInitial(params: URLSearchParams): FormState {
  let state = { ...empty };
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) state = { ...state, ...JSON.parse(saved), consent: false, website: "" };
  } catch {
    // Storage unavailable (private mode) — start fresh.
  }
  const employee = employees.find((e) => e.slug === params.get("employee"));
  if (employee) {
    const segment = employee.segment[0];
    state = {
      ...state,
      employee: employee.slug,
      segment,
      automations: state.segment === segment ? Array.from(new Set([...state.automations, ...employee.automations])) : employee.automations,
    };
  } else if (isSegment(params.get("segment")) && !state.segment) {
    state.segment = params.get("segment") as QuoteSegment;
  }
  return fitToSegment(state);
}

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

/** Returns an error message for a step, or null when it can be left. */
function validate(step: number, s: FormState): string | null {
  switch (step) {
    case 1:
      return s.segment ? null : "Pick the closest fit to continue.";
    case 2:
      return s.stack.length || s.stack_other.trim() ? null : "Select at least one tool, or tell us what you use.";
    case 3:
      return s.automations.length || s.automations_other.trim() ? null : "Select at least one thing to automate.";
    case 4:
      return s.units.trim() ? null : `Add a rough number for ${scaleLabels[s.segment || "other"].toLowerCase()}.`;
    case 5:
      return s.urgency && s.budget_band ? null : "Choose a start date and a budget band.";
    case 6:
      if (s.name.trim().length < 2) return "Add your name.";
      if (!s.company.trim()) return "Add your company.";
      if (!emailOk(s.email)) return "Add a valid email so we can send your proposal.";
      if (!s.state) return "Choose your state.";
      if (!s.source) return "Tell us how you heard about us.";
      return null;
    case 7:
      return s.consent ? null : "Please confirm you agree to receive your proposal by email.";
    default:
      return null;
  }
}

function firstInvalid(s: FormState, upTo: number) {
  for (let i = 1; i < upTo; i++) if (validate(i, s)) return i;
  return upTo;
}

export function QuoteFlow() {
  const params = useSearchParams();
  const router = useRouter();
  const [state, setState] = useState<FormState>(() => loadInitial(new URLSearchParams(params.toString())));
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const requested = Math.min(Math.max(Number(params.get("step")) || 1, 1), TOTAL);
  // Never show a step whose prerequisites aren't answered (e.g. a shared ?step=6 link).
  const step = firstInvalid(state, requested);

  const goTo = (n: number, replace = false) => {
    const next = new URLSearchParams(params.toString());
    next.set("step", String(n));
    window.history[replace ? "replaceState" : "pushState"](null, "", `?${next.toString()}`);
    setError(null);
  };

  useEffect(() => {
    if (step === requested) return;
    const fixed = new URLSearchParams(window.location.search);
    fixed.set("step", String(step));
    window.history.replaceState(null, "", `?${fixed.toString()}`);
  }, [step, requested]);

  useEffect(() => {
    try {
      const { consent: _c, website: _w, ...persist } = state;
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(persist));
    } catch {}
  }, [state]);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem("ch_quote_started")) {
        sessionStorage.setItem("ch_quote_started", "1");
        track("quote_started", { segment: state.segment || null, employee: state.employee || null });
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const firstRender = useRef(true);
  useEffect(() => {
    track(`quote_step_${step}`);
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  const update = (patch: Partial<FormState>) => {
    setState((s) => fitToSegment({ ...s, ...patch }));
    setError(null);
  };

  const toggle = (key: "stack" | "automations", value: string) =>
    update({ [key]: state[key].includes(value) ? state[key].filter((v) => v !== value) : [...state[key], value] });

  const next = () => {
    const problem = validate(step, state);
    if (problem) return setError(problem);
    if (step < TOTAL) goTo(step + 1);
    else submit();
  };

  async function submit() {
    setSubmitting(true);
    setError(null);
    const num = (v: string) => (v.trim() === "" ? undefined : Number(v));
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          segment: state.segment,
          stack: state.stack,
          stack_other: state.stack_other,
          automations: state.automations,
          automations_other: state.automations_other,
          scale: { units: num(state.units), leads_per_month: num(state.leads_per_month), team_size: num(state.team_size) },
          urgency: state.urgency,
          budget_band: state.budget_band,
          contact: {
            name: state.name,
            company: state.company,
            email: state.email,
            phone: state.phone,
            state: state.state,
            source: state.source,
          },
          consent: state.consent,
          employee: state.employee || undefined,
          utm: readUtmCookie() ?? undefined,
          website: state.website,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      track("quote_submitted", { segment: state.segment, budget: state.budget_band, urgency: state.urgency });
      try {
        window.localStorage.removeItem(STORAGE_KEY);
        sessionStorage.removeItem("ch_quote_started");
      } catch {}
      router.push("/quote/thanks");
    } catch {
      setError(quoteCopy.error);
      setSubmitting(false);
    }
  }

  const copy = quoteCopy.steps[step - 1];
  const seg = (state.segment || "other") as QuoteSegment;

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        next();
      }}
      className="flex min-h-[calc(100dvh-4rem)] flex-col"
    >
      <div className="mx-auto w-full max-w-2xl flex-1 px-4 pt-8 pb-10 sm:px-6 sm:pt-14">
        <p className="text-sm text-subtle">{quoteCopy.progress(step, TOTAL)}</p>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-line" role="progressbar" aria-valuemin={1} aria-valuemax={TOTAL} aria-valuenow={step} aria-label="Quote progress">
          <div className="h-full bg-accent transition-[width] duration-300" style={{ width: `${(step / TOTAL) * 100}%` }} />
        </div>

        <h1 ref={headingRef} tabIndex={-1} className="mt-10 text-2xl leading-tight font-bold text-title outline-none sm:text-3xl">
          {copy.title}
        </h1>
        <p className="mt-2 text-muted">{copy.help}</p>

        {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Website
            <input tabIndex={-1} autoComplete="off" value={state.website} onChange={(e) => update({ website: e.target.value })} />
          </label>
        </div>

        <div className="mt-8">
          {step === 1 && (
            <Choices
              name="segment"
              options={quoteSegments}
              value={state.segment}
              onChange={(v) => update({ segment: v as QuoteSegment })}
            />
          )}

          {step === 2 && (
            <>
              <ChipGroup label={copy.title} options={stackOptions[seg].map((s) => ({ id: s, label: s }))} selected={state.stack} onToggle={(v) => toggle("stack", v)} />
              <TextArea label={copy.otherLabel!} value={state.stack_other} onChange={(v) => update({ stack_other: v })} />
            </>
          )}

          {step === 3 && (
            <>
              <ChipGroup label={copy.title} options={automationOptions[seg]} selected={state.automations} onToggle={(v) => toggle("automations", v)} />
              <TextArea label={copy.otherLabel!} value={state.automations_other} onChange={(v) => update({ automations_other: v })} />
            </>
          )}

          {step === 4 && (
            <div className="grid gap-5 sm:grid-cols-3">
              <NumberField label={scaleLabels[seg]} value={state.units} onChange={(v) => update({ units: v })} required />
              <NumberField label={quoteCopy.scale.leads} value={state.leads_per_month} onChange={(v) => update({ leads_per_month: v })} />
              <NumberField label={quoteCopy.scale.team} value={state.team_size} onChange={(v) => update({ team_size: v })} />
            </div>
          )}

          {step === 5 && (
            <div className="space-y-8">
              <fieldset>
                <legend className="mb-3 font-semibold text-title">{quoteCopy.urgencyLabel}</legend>
                <Choices name="urgency" options={urgencyOptions} value={state.urgency} onChange={(v) => update({ urgency: v })} />
              </fieldset>
              <fieldset>
                <legend className="mb-3 font-semibold text-title">{quoteCopy.budgetLabel}</legend>
                <Choices name="budget" options={budgetOptions} value={state.budget_band} onChange={(v) => update({ budget_band: v })} columns />
              </fieldset>
            </div>
          )}

          {step === 6 && (
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField label={quoteCopy.contact.name} value={state.name} onChange={(v) => update({ name: v })} autoComplete="name" required />
              <TextField label={quoteCopy.contact.company} value={state.company} onChange={(v) => update({ company: v })} autoComplete="organization" required />
              <TextField label={quoteCopy.contact.email} type="email" value={state.email} onChange={(v) => update({ email: v })} autoComplete="email" inputMode="email" required />
              <TextField label={quoteCopy.contact.phone} type="tel" value={state.phone} onChange={(v) => update({ phone: v })} autoComplete="tel" inputMode="tel" />
              <Select label={quoteCopy.contact.state} value={state.state} options={usStates} onChange={(v) => update({ state: v })} />
              <Select label={quoteCopy.contact.source} value={state.source} options={sourceOptions} onChange={(v) => update({ source: v })} />
            </div>
          )}

          {step === 7 && <Summary state={state} onEdit={(n) => goTo(n)} onConsent={(v) => update({ consent: v })} />}
        </div>

        <p role="alert" aria-live="polite" className={cx("mt-6 min-h-6 text-sm text-danger", !error && "invisible")}>
          {error}
        </p>
      </div>

      <div className="sticky bottom-0 z-40 border-t border-line bg-bg/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3 sm:px-6">
          {step > 1 && (
            <button type="button" onClick={() => goTo(step - 1)} className="min-h-12 rounded-md border border-line-strong px-5 font-semibold text-fg hover:border-accent">
              {quoteCopy.back}
            </button>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="min-h-12 flex-1 rounded-md bg-accent-solid px-5 font-semibold text-accent-fg transition-colors hover:bg-accent-hover disabled:opacity-60"
          >
            {step === TOTAL ? (submitting ? quoteCopy.submitting : quoteCopy.submit) : quoteCopy.next}
          </button>
        </div>
      </div>
    </form>
  );
}

function Choices({
  name,
  options,
  value,
  onChange,
  columns,
}: {
  name: string;
  options: { id: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  columns?: boolean;
}) {
  return (
    <div role="radiogroup" className={cx("grid gap-3", columns && "grid-cols-2 sm:grid-cols-4")}>
      {options.map((o) => {
        const checked = value === o.id;
        return (
          <label
            key={o.id}
            className={cx(
              "flex min-h-14 cursor-pointer items-center gap-3 rounded-lg border px-4 text-base transition-colors has-focus-visible:outline-2 has-focus-visible:outline-accent",
              checked ? "border-accent bg-accent-tint text-title" : "border-line-strong bg-card text-fg hover:border-accent/60",
            )}
          >
            <input type="radio" name={name} value={o.id} checked={checked} onChange={() => onChange(o.id)} className="sr-only" />
            <span aria-hidden="true" className={cx("flex h-5 w-5 shrink-0 items-center justify-center rounded-full border", checked ? "border-accent" : "border-line-strong")}>
              {checked && <span className="h-2.5 w-2.5 rounded-full bg-accent" />}
            </span>
            {o.label}
          </label>
        );
      })}
    </div>
  );
}

function ChipGroup({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: { id: string; label: string }[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2.5">
      {options.map((o) => {
        const on = selected.includes(o.id);
        return (
          <button
            key={o.id}
            type="button"
            aria-pressed={on}
            onClick={() => onToggle(o.id)}
            className={cx(
              "min-h-11 rounded-full border px-4 text-sm font-medium transition-colors",
              on ? "border-accent bg-accent-tint text-title" : "border-line-strong text-fg hover:border-accent/60",
            )}
          >
            {on && <span aria-hidden="true">✓ </span>}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

const inputClass =
  "mt-2 block min-h-12 w-full rounded-md border border-line-strong bg-card px-3.5 text-base text-title placeholder:text-subtle focus:border-accent focus:outline-none";

function Field({ label, children, required }: { label: string; children: ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-medium text-fg">
      {label}
      {required && <span className="sr-only"> (required)</span>}
      {children}
    </label>
  );
}

function TextField({
  label,
  value,
  onChange,
  type = "text",
  required,
  ...rest
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "email" | "tel" | "text";
}) {
  return (
    <Field label={label} required={required}>
      <input type={type} value={value} required={required} onChange={(e) => onChange(e.target.value)} className={inputClass} {...rest} />
    </Field>
  );
}

function NumberField({ label, value, onChange, required }: { label: string; value: string; onChange: (v: string) => void; required?: boolean }) {
  return (
    <Field label={label} required={required}>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value.replace(/[^0-9]/g, "").slice(0, 7))}
        className={inputClass}
      />
    </Field>
  );
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="mt-6">
      <Field label={label}>
        <textarea rows={3} value={value} maxLength={500} onChange={(e) => onChange(e.target.value)} className={cx(inputClass, "py-3")} />
      </Field>
    </div>
  );
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <Field label={label} required>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={inputClass}>
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </Field>
  );
}

function Summary({ state, onEdit, onConsent }: { state: FormState; onEdit: (step: number) => void; onConsent: (v: boolean) => void }) {
  const seg = (state.segment || "other") as QuoteSegment;
  const label = (opts: { id: string; label: string }[], id: string) => opts.find((o) => o.id === id)?.label ?? id;
  const rows = useMemo(
    () => [
      { step: 1, title: "Business", value: label(quoteSegments, state.segment) },
      { step: 2, title: "Stack", value: [...state.stack, state.stack_other].filter(Boolean).join(", ") },
      { step: 3, title: "Automate", value: [...state.automations.map((a) => label(automationOptions[seg], a)), state.automations_other].filter(Boolean).join(", ") },
      {
        step: 4,
        title: "Scale",
        value: [
          `${state.units} ${scaleLabels[seg].toLowerCase()}`,
          state.leads_per_month && `${state.leads_per_month} leads/mo`,
          state.team_size && `team of ${state.team_size}`,
        ].filter(Boolean).join(" · "),
      },
      { step: 5, title: "Timing & budget", value: `${label(urgencyOptions, state.urgency)} · ${label(budgetOptions, state.budget_band)}` },
      { step: 6, title: "Contact", value: [state.name, state.company, state.email, state.phone, state.state].filter(Boolean).join(" · ") },
    ],
    [state, seg],
  );
  return (
    <>
      <dl className="divide-y divide-line rounded-xl border border-line bg-card">
        {rows.map((r) => (
          <div key={r.step} className="flex items-start justify-between gap-4 px-4 py-4 sm:px-5">
            <div className="min-w-0">
              <dt className="text-xs font-semibold uppercase tracking-wider text-subtle">{r.title}</dt>
              <dd className="mt-1 break-words text-fg">{r.value || "—"}</dd>
            </div>
            <button type="button" onClick={() => onEdit(r.step)} className="min-h-11 shrink-0 px-2 text-sm font-semibold text-accent-soft hover:underline" aria-label={`${quoteCopy.summary.edit} ${r.title}`}>
              {quoteCopy.summary.edit}
            </button>
          </div>
        ))}
      </dl>
      <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-fg">
        <input type="checkbox" checked={state.consent} onChange={(e) => onConsent(e.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--ch-accent)]" />
        <span>
          {quoteCopy.summary.consent}{" "}
          <Link href="/privacy" className="text-accent-soft underline underline-offset-2" target="_blank">
            {quoteCopy.summary.privacyLink}
          </Link>
        </span>
      </label>
    </>
  );
}
