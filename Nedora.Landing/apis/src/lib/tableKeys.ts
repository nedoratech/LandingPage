import { randomUUID } from "node:crypto";

/**
 * Table Storage key strategy for contact submissions.
 *
 * ## PartitionKey: `yyyy-MM` (UTC month)
 *
 * **Why month?**
 * - Spreads writes across partitions over time (no single hot partition at scale).
 * - Easy operational queries: "all submissions in May 2026".
 * - Aligns with retention/archival by month if needed later.
 *
 * **Alternatives we did not choose:**
 * - Constant `contact` — simplest, but hot partition under heavy load.
 * - `yyyy-MM-dd` — finer spread; more partitions for cross-day admin views.
 * - Email/company hash — good for lookup by customer, poor for time-ordered listings.
 *
 * ## RowKey: `{invertedTicks}_{submissionId}`
 *
 * - `invertedTicks` = padded string so lexicographic sort ≈ newest first within a month.
 * - `submissionId` = UUID v4 guarantees uniqueness if two requests share the same millisecond.
 *
 * **Alternatives:**
 * - UUID only — simple, no natural time ordering in RowKey.
 * - `{yyyyMMddHHmmssfff}_{uuid}` — human-readable, longer keys.
 */
const ROW_KEY_TICK_PAD = 13;
const ROW_KEY_MAX_TICK = 9_999_999_999_999;

export type TableKeys = {
  partitionKey: string;
  rowKey: string;
  submissionId: string;
  createdAt: string;
};

export function buildTableKeys(submittedAt: Date = new Date()): TableKeys {
  const year = submittedAt.getUTCFullYear();
  const month = String(submittedAt.getUTCMonth() + 1).padStart(2, "0");
  const partitionKey = `${year}-${month}`;

  const invertedTicks = String(
    ROW_KEY_MAX_TICK - submittedAt.getTime(),
  ).padStart(ROW_KEY_TICK_PAD, "0");

  const submissionId = randomUUID();
  const rowKey = `${invertedTicks}_${submissionId}`;
  const createdAt = submittedAt.toISOString();

  return { partitionKey, rowKey, submissionId, createdAt };
}
