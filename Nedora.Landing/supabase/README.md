# Supabase — Nedora Landing

Database migrations for the landing site, deployed automatically via **Supabase GitHub integration**.

## Layout

```text
supabase/
  config.toml          # Project config (migrations enabled)
  migrations/          # Timestamped SQL — applied in order on deploy
  README.md
```

Add new migrations as `YYYYMMDDHHMMSS_description.sql` in `migrations/`. Do not use nested subfolders — Supabase expects a flat directory.

## GitHub integration

1. Supabase Dashboard → **Project Settings** → **Integrations** → **GitHub**
2. Connect `nedoratech/LandingPage`
3. Set **Supabase directory** to: `Nedora.Landing`
4. Enable **Deploy to production** for your production branch (`main`)

On push/merge to `main`, Supabase runs any new files in `supabase/migrations/` against the linked project.

## Local development (optional)

Install the [Supabase CLI](https://supabase.com/docs/guides/cli), then from `Nedora.Landing/`:

```bash
supabase link --project-ref <your-project-ref>
supabase db push          # apply pending migrations to remote
supabase db reset         # reset local DB and replay all migrations
```

## Schema

| Table | Purpose |
|-------|---------|
| `contact_submissions` | Quote and contact form data from the Next.js site |
| `submission_encryption_keys` | Per-submission AES-256 keys for decrypting PII |

### Encryption model

Personal identifiers (`email`, and `name` or `first_name`/`last_name`) are encrypted **server-side in Next.js** before insert using AES-256-GCM. Each submission gets a unique 32-byte key stored in `submission_encryption_keys` (linked by `submission_id`).

Non-PII fields (`message`, `subject`, quote business fields, `email_domain`) remain plaintext. `email_domain` is derived from the email address before encryption for analytics without decryption.

The Next.js `/api/contact` route calls the `insert_contact_submission` RPC using the **service role** key (server-only). RLS is enabled on both tables with no public policies.

### Form types

| `form_type` | Fields stored |
|-------------|---------------|
| `quote` | Encrypted name + email; company, project type, engagement, timeline, message |
| `contact` | Encrypted first name, last name, email; subject, message |

## Viewing and updating encrypted submissions

PII cannot be read directly in the Supabase Table Editor. Use the admin CLI in the Next.js app (requires `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in `client-app/.env.local`):

```bash
cd Nedora.Landing/client-app

# Export all submissions (decrypted) to JSON or CSV
yarn contacts:export
yarn contacts:export --format csv --out submissions.csv

# View one submission
yarn contacts:show <submission-uuid>

# Update workflow status only
yarn contacts:update-status <submission-uuid> reviewed

# Update fields (re-encrypts PII when email/name fields change)
yarn contacts:apply <submission-uuid> patch.json
```

See [`client-app/scripts/README.md`](../client-app/scripts/README.md) for patch file format and examples.

If you previously configured a **Database Webhook** for `notify-submission`, delete it in **Database → Webhooks** (the Edge Function has been removed).

## Next.js integration

The client-app uses:

- `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` (server-only) for form inserts
- `NEXT_PUBLIC_CONTACT_ENDPOINT=/api/contact` (default)

See `client-app/.env.example` for the full list.
