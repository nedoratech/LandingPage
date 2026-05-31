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
| `contact_submissions` | Quote / contact form data from the Next.js site |

The Next.js `/api/contact` route inserts using the **service role** key (server-only). RLS is on with no public policies.
