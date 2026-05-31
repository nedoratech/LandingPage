# Nedora Landing

Bilingual marketing site (EN/RO) on **Vercel**, with contact form submissions stored in **Supabase**.

## Repository layout

```text
client-app/    # Next.js site + /api/contact BFF
supabase/      # Database migrations (deployed via Supabase GitHub integration)
```

## Features

- Bilingual **EN** / **RO** (browser `ro-*` detection + manual toggle)
- Atomic UI components per section
- Contact / quote form persisted to **Supabase Postgres** via Next.js API route

## Local development

```bash
cd client-app
yarn install
cp .env.example .env.local
# Fill SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY from Supabase Dashboard
yarn dev
```

The form posts to `http://localhost:3000/api/contact`.

## Deploy

### 1. Supabase (database)

Migrations live in `supabase/migrations/` and deploy automatically when pushed to `main` (see [supabase/README.md](supabase/README.md)).

In Supabase Dashboard → Integrations → GitHub, set the project directory to **`Nedora.Landing`**.

### 2. Vercel (site)

Import `nedoratech/LandingPage` in Vercel and set **Root Directory** to `Nedora.Landing/client-app`.

Add environment variables from `client-app/.env.example`:

| Variable | Notes |
|----------|--------|
| `SUPABASE_URL` | Project URL from Supabase Dashboard |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only; never prefix with `NEXT_PUBLIC_` |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | `/api/contact` (default) |

## Parallel work

| Area | Path |
|------|------|
| English copy | `client-app/src/i18n/messages/en.ts` |
| Romanian copy | `client-app/src/i18n/messages/ro.ts` |
| UI sections | `client-app/src/components/organisms/` |
| Contact API | `client-app/src/app/api/contact/` |
| Database | `supabase/migrations/` |

## License

Proprietary — Nedora.
