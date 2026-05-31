-- Landing page contact / quote form submissions.
-- Inserts are performed server-side via the Next.js API route (service_role key).
-- RLS is enabled with no public policies.

create table public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'new'
    check (status in ('new', 'reviewed', 'replied')),

  name text not null,
  email text not null,
  email_domain text not null,
  company text not null,
  project_type text not null
    check (project_type in ('newApp', 'integration', 'support', 'unsure')),
  engagement text not null
    check (engagement in ('fixed', 'time', 'unsure')),
  message text not null,
  timeline text
    check (
      timeline is null
      or timeline in ('asap', 'oneToThree', 'threeToSix', 'exploring')
    ),
  locale text
    check (locale is null or locale in ('en', 'ro'))
);

create index contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

create index contact_submissions_status_idx
  on public.contact_submissions (status);

alter table public.contact_submissions enable row level security;

comment on table public.contact_submissions is
  'Contact form submissions from the Nedora landing site.';
