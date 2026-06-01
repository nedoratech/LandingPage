# Contact submissions admin CLI

Decrypt, export, and update `contact_submissions` in Supabase. Run from `client-app/` with credentials in `.env.local`:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## Commands

```bash
# Export all (decrypted) to stdout
yarn contacts:export

# CSV file for Excel / Google Sheets
yarn contacts:export --format csv --out submissions.csv

# JSON file
yarn contacts:export --format json --out submissions.json

# Single record
yarn contacts:show <submission-uuid>

# Status only (no decryption needed in Table Editor for this field)
yarn contacts:update-status <submission-uuid> reviewed

# Apply a JSON patch (re-encrypts PII fields when changed)
yarn contacts:apply <submission-uuid> patch.json
```

## Patch file format

`patch.json` — include only fields you want to change:

```json
{
  "status": "reviewed",
  "message": "Follow-up scheduled for next week."
}
```

Update encrypted PII (same submission key is reused):

```json
{
  "email": "updated@company.com",
  "firstName": "Ada",
  "lastName": "Lovelace"
}
```

Quote submissions use `name` instead of `firstName` / `lastName`.

Allowed keys: `status`, `locale`, `email`, `name`, `firstName`, `lastName`, `company`, `projectType`, `engagement`, `timeline`, `subject`, `message`.

## Manual workflow in Supabase

| Task | Where |
|------|--------|
| Change `status` | Table Editor, or `yarn contacts:update-status` |
| Read PII | `yarn contacts:export` or `yarn contacts:show` |
| Edit `message`, `subject`, quote fields | Table Editor (plaintext), or patch JSON |
| Edit email / name | Must use `yarn contacts:apply` (re-encryption) |

Never edit `*_encrypted` columns or `submission_encryption_keys` by hand unless you know the AES format.
