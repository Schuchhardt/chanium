# chanium.com

AI operations for real estate teams — fixed scope, fixed price, fixed date. Next.js 16 (App Router), Tailwind v4, deployed on Vercel.

## Getting started

```bash
pnpm install
cp .env.example .env.local   # every variable is optional for local dev
pnpm dev
```

| Script | What it does |
| --- | --- |
| `pnpm dev` / `pnpm build` / `pnpm start` | Next.js |
| `pnpm lint` / `pnpm typecheck` | ESLint / `tsc --noEmit` |
| `pnpm check:placeholders` | Lists bracketed launch values (`[N]`, `[X]`…) left in `/content`; exits 1 if any |

## Where things live

```
content/            All copy, as typed data. Edit here, never in components.
  site.ts           Nav, footer, guarantee, email
  home.ts           Home page
  segments.ts       /short-term-rentals, /property-management, /sales-teams, /luxury
  employees.ts      /ai-employees and /ai-employees/[slug]
  packages.ts       /packages and package cards everywhere
  cases.ts          /case-studies/[slug]
  quote.ts          Quote flow questions and options per segment
  playbooks/*.mdx   /playbooks/[slug] (frontmatter typed in content/types.ts)
app/                Routes (one metadata export each; OG image per route)
components/         Layout, UI primitives, section blocks, quote flow, MDX components
lib/quote/          Quote schema (Zod), Claude proposal, PDF, emails, pipeline
supabase/migrations SQL for the quotes and waitlist tables and the proposals bucket
```

Adding a segment, AI Employee, package, case study or playbook is a data change: add an entry (or an `.mdx` file) and the pages, sitemap and OG images pick it up.

## Quote pipeline

`POST /api/quote` validates with Zod, rate-limits, inserts into Supabase `quotes`, returns 200, then in `after()`:

1. Claude (`claude-opus-5-5`, structured output) writes the proposal and an internal build brief from the answers plus the packages/pricing in `content/`.
2. The proposal is rendered to PDF (`@react-pdf/renderer`) and uploaded to the private `proposals` bucket.
3. Resend emails the prospect the PDF, the Cal.com link and the guarantee.
4. Resend emails `INTERNAL_NOTIFY_EMAIL` the internal brief and a link to the row; Slack gets a summary if `SLACK_WEBHOOK_URL` is set.
5. If anything in the AI half fails, the prospect gets a "within 24 hours" email and the row is flagged `needs_attention`.

Preview the PDF layout locally at `/api/dev/proposal-pdf` (404 in production).

### Setup checklist

1. Run `supabase/migrations/0001_quotes_waitlist.sql` on the Supabase project.
2. Verify the sending domain in Resend and set `QUOTE_FROM_EMAIL`.
3. Set every variable in `.env.example` on Vercel (Production + Preview).
4. Optional: create an Upstash Redis database for cross-instance rate limiting.
5. Submit a real quote from a phone and confirm the PDF and internal brief arrive within 5 minutes.

## Design tokens

`app/globals.css` holds the tokens (`:root` dark, `prefers-color-scheme: light` override) and the Tailwind v4 `@theme` mapping. When the Claude Design System's `tokens.css` is ready, paste it over the `:root` blocks; components only use the semantic names (`bg`, `fg`, `muted`, `accent`, …). Tailwind v4 has no `tailwind.config.ts` — the `@theme` block is the mapping.
