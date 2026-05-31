-- Add form types, PII encryption columns, encryption key store, and insert RPC.
-- Existing plaintext rows are removed — they cannot be re-encrypted without per-submission keys.

truncate public.contact_submissions;

alter table public.contact_submissions
  drop column name,
  drop column email;

alter table public.contact_submissions
  alter column company drop not null,
  alter column project_type drop not null,
  alter column engagement drop not null;

alter table public.contact_submissions
  add column form_type text not null
    check (form_type in ('quote', 'contact')),
  add column email_encrypted text not null,
  add column name_encrypted text,
  add column first_name_encrypted text,
  add column last_name_encrypted text,
  add column subject text;

alter table public.contact_submissions
  drop constraint if exists contact_submissions_project_type_check;

alter table public.contact_submissions
  add constraint contact_submissions_project_type_check check (
    project_type is null
    or project_type in ('newApp', 'integration', 'support', 'unsure')
  );

alter table public.contact_submissions
  drop constraint if exists contact_submissions_engagement_check;

alter table public.contact_submissions
  add constraint contact_submissions_engagement_check check (
    engagement is null
    or engagement in ('fixed', 'time', 'unsure')
  );

alter table public.contact_submissions
  add constraint contact_submissions_form_fields_check check (
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
  );

create index contact_submissions_form_type_idx
  on public.contact_submissions (form_type);

comment on table public.contact_submissions is
  'Contact and quote form submissions from the Nedora landing site. PII fields are encrypted.';

create table public.submission_encryption_keys (
  submission_id uuid primary key
    references public.contact_submissions (id) on delete cascade,
  encryption_key text not null,
  created_at timestamptz not null default now()
);

alter table public.submission_encryption_keys enable row level security;

comment on table public.submission_encryption_keys is
  'AES-256 encryption keys for decrypting PII in contact_submissions.';

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
