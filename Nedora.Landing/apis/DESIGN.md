# Contact submissions — Table Storage keys

## Chosen design

| Key | Format | Example |
|-----|--------|---------|
| **PartitionKey** | `yyyy-MM` (UTC) | `2026-05` |
| **RowKey** | `{invertedTicks}_{uuid}` | `9999999987654_a1b2c3d4-...` |

Implementation: `src/lib/tableKeys.ts`.

## PartitionKey debate

| Option | Pros | Cons |
|--------|------|------|
| **`yyyy-MM` (chosen)** | Spreads load monthly; simple admin/reporting by month; room to archive old months | Cross-month queries need multiple partitions |
| `yyyy-MM-dd` | Finer partition spread at very high volume | More partitions; listing "last 30 days" spans many keys |
| Constant `contact` | Trivial queries for "all rows" | Hot partition if traffic grows |
| Hash of `email` / `company` | Fast lookup per customer | Poor time-ordered listing; uneven partitions |

For a marketing contact form, **monthly partitions** balance simplicity and scale.

## RowKey debate

| Option | Pros | Cons |
|--------|------|------|
| **Inverted time + UUID (chosen)** | Newest-first lexicographic order within partition; unique under concurrency | Keys are opaque (use `submissionId` / `createdAt` fields for display) |
| UUID only | Minimal logic | No inherent sort; need `Timestamp` field + client-side sort |
| ISO timestamp prefix | Human-readable | Sort order is wrong unless inverted or reversed |
| `{companySlug}_{uuid}` | Groups visually by company | Uneven length; slug collisions; sorting by time is harder |

## Entity fields (besides keys)

- `submissionId` — business id returned to client (UUID)
- `createdAt` — ISO-8601 UTC
- `status` — `new` (workflow: `reviewed`, `replied`, … later)
- `emailDomain` — derived for light analytics without indexing email as key

## Query patterns

- **Recent in month:** `PartitionKey = '2026-05'`, `RowKey` range scan (newest first due to inverted ticks)
- **By id:** scan/filter on `submissionId` (add secondary index later if needed — e.g. Cosmos, or duplicate row with PK = submissionId for O(1) lookup)

## GDPR

Partition/row keys do **not** contain PII. Email and name live in separate properties for easier export/delete jobs.
