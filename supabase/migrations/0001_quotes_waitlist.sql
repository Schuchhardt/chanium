-- Chanium: quote flow + AI Employee waitlist.
-- Apply with `supabase db push` or paste into the SQL editor.

create extension if not exists pgcrypto;

create table if not exists public.quotes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  segment text not null check (segment in ('str', 'pm', 'sales', 'luxury', 'other')),
  stack text[] not null default '{}',
  stack_other text not null default '',
  automations text[] not null default '{}',
  automations_other text not null default '',
  scale jsonb not null default '{}'::jsonb,            -- units, leads_per_month, team_size
  urgency text not null,
  budget_band text not null,
  contact jsonb not null,                               -- name, company, email, phone, state, source
  recommended_package text,
  proposal_md text,
  proposal_pdf_url text,                                -- storage path in bucket "proposals"
  internal_brief_md text,
  employee_slug text,
  status text not null default 'new'
    check (status in ('new', 'proposal_sent', 'call_booked', 'accepted', 'lost')),
  needs_attention boolean not null default false,
  pipeline_error text,
  utm jsonb not null default '{}'::jsonb
);

create index if not exists quotes_created_at_idx on public.quotes (created_at desc);
create index if not exists quotes_status_idx on public.quotes (status);

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null,
  employee_slug text not null,
  segment text,
  utm jsonb not null default '{}'::jsonb,
  unique (email, employee_slug)
);

create index if not exists waitlist_employee_idx on public.waitlist (employee_slug);

-- Only the service role (server) touches these tables; no public policies on purpose.
alter table public.quotes enable row level security;
alter table public.waitlist enable row level security;

-- Private bucket for proposal PDFs.
insert into storage.buckets (id, name, public)
values ('proposals', 'proposals', false)
on conflict (id) do nothing;
