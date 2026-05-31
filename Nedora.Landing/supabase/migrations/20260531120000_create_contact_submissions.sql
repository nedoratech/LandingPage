-- Landing page contact / quote form submissions with per-submission PII encryption.
-- Inserts are performed server-side via the Next.js API route (service_role key).
-- RLS is enabled with no public policies.

create table public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'new'
    check (status in ('new', 'reviewed', 'replied')),

  form_type text not null
    check (form_type in ('quote', 'contact')),

  email_encrypted text not null,
  email_domain text not null,

  name_encrypted text,
  first_name_encrypted text,
  last_name_encrypted text,

  company text,
  project_type text
    check (
      project_type is null
      or project_type in ('newApp', 'integration', 'support', 'unsure')
    ),
  engagement text
    check (
      engagement is null
      or engagement in ('fixed', 'time', 'unsure')
    ),
  timeline text
    check (
      timeline is null
      or timeline in ('asap', 'oneToThree', 'threeToSix', 'exploring')
    ),

  subject text,
  message text not null,

  locale text
    check (locale is null or locale in ('en', 'ro')),

  constraint contact_submissions_form_fields_check check (
    (
      form_type = 'quote'
      and name_encrypted is not null
      and company is not null
      and project_type is not null
      and engagement is not null
      and first_name_encrypted is null
      and last_name_encrypted is null
      and subject is null
    )
    or (
      form_type = 'contact'
      and first_name_encrypted is not null
      and last_name_encrypted is not null
      and subject is not null
      and name_encrypted is null
      and company is null
      and project_type is null
      and engagement is null
      and timeline is null
    )
  )
);

create index contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

create index contact_submissions_status_idx
  on public.contact_submissions (status);

create index contact_submissions_form_type_idx
  on public.contact_submissions (form_type);

alter table public.contact_submissions enable row level security;

comment on table public.contact_submissions is
  'Contact and quote form submissions from the Nedora landing site. PII fields are encrypted.';

-- Per-submission encryption keys (submission_id -> AES-256 key).
create table public.submission_encryption_keys (
  submission_id uuid primary key
    references public.contact_submissions (id) on delete cascade,
  encryption_key text not null,
  created_at timestamptz not null default now()
);

alter table public.submission_encryption_keys enable row level security;

comment on table public.submission_encryption_keys is
  'AES-256 encryption keys for decrypting PII in contact_submissions.';

-- Atomic insert: submission row + encryption key in one transaction.
create or replace function public.insert_contact_submission(
  p_form_type text,
  p_email_encrypted text,
  p_email_domain text,
  p_name_encrypted text,
  p_first_name_encrypted text,
  p_last_name_encrypted text,
  p_company text,
  p_project_type text,
  p_engagement text,
  p_timeline text,
  p_subject text,
  p_message text,
  p_locale text,
  p_encryption_key text
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  new_id uuid;
begin
  insert into public.contact_submissions (
    form_type,
    email_encrypted,
    email_domain,
    name_encrypted,
    first_name_encrypted,
    last_name_encrypted,
    company,
    project_type,
    engagement,
    timeline,
    subject,
    message,
    locale
  ) values (
    p_form_type,
    p_email_encrypted,
    p_email_domain,
    p_name_encrypted,
    p_first_name_encrypted,
    p_last_name_encrypted,
    p_company,
    p_project_type,
    p_engagement,
    p_timeline,
    p_subject,
    p_message,
    p_locale
  )
  returning id into new_id;

  insert into public.submission_encryption_keys (
    submission_id,
    encryption_key
  ) values (
    new_id,
    p_encryption_key
  );

  return new_id;
end;
$$;

revoke all on function public.insert_contact_submission(
  text, text, text, text, text, text, text, text, text, text, text, text, text, text
) from public;

grant execute on function public.insert_contact_submission(
  text, text, text, text, text, text, text, text, text, text, text, text, text, text
) to service_role;
