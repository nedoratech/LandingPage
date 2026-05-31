# Supabase — Nedora Landing

Database migrations and Edge Functions for the landing site, deployed automatically via **Supabase GitHub integration**.

## Layout

```text
supabase/
  config.toml          # Project config (migrations + Edge Functions)
  migrations/          # Timestamped SQL — applied in order on deploy
  functions/
    notify-submission/ # Email notification on new form submission
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
supabase functions deploy notify-submission
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

## Email notifications (Edge Function)

When a row is inserted into `contact_submissions`, a **Database Webhook** invokes the `notify-submission` Edge Function, which:

1. Validates the webhook secret
2. Loads the encryption key for the submission
3. Decrypts PII fields
4. Sends an email to your team via **Resend**

### 1. Resend setup

1. Create an account at [resend.com](https://resend.com)
2. Add and verify your sending domain (e.g. `nedora.com`)
3. Create an API key

### 2. Edge Function secrets

Supabase Dashboard → **Edge Functions** → **Secrets** (or via CLI):

```bash
supabase secrets set \
  RESEND_API_KEY=re_... \
  RESEND_FROM_EMAIL="Nedora Forms <notifications@nedora.com>" \
  CONTACT_NOTIFICATION_EMAIL=team@nedora.com \
  WEBHOOK_SECRET=<random-secret> \
  SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
```

`SUPABASE_URL` is available automatically in Edge Functions. `SUPABASE_SERVICE_ROLE_KEY` must be set explicitly for decrypting submissions.

Deploy the function:

```bash
supabase functions deploy notify-submission
```

### 3. Database Webhook

Supabase Dashboard → **Database** → **Webhooks** → **Create a new hook**:

| Setting | Value |
|---------|-------|
| Name | `notify-submission` |
| Table | `contact_submissions` |
| Events | `INSERT` |
| Type | Supabase Edge Function |
| Edge Function | `notify-submission` |

Supabase invokes the function with an `Authorization: Bearer <service-role-key>` header automatically. You can also call the function via HTTP with an `x-webhook-secret` header matching `WEBHOOK_SECRET`.

If configuring manually via HTTP instead:

- **URL:** `https://<project-ref>.supabase.co/functions/v1/notify-submission`
- **Headers:** `x-webhook-secret: <WEBHOOK_SECRET>` (must match the secret above)

The function rejects requests without a valid `x-webhook-secret` header.

### Webhook payload format

Supabase Database Webhooks send:

```json
{
  "type": "INSERT",
  "table": "contact_submissions",
  "record": { ... }
}
```

The Edge Function ignores events for other tables or non-INSERT operations.

## Next.js integration

The client-app uses:

- `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` (server-only) for form inserts
- `NEXT_PUBLIC_CONTACT_ENDPOINT=/api/contact` (default)

See `client-app/.env.example` for the full list.
