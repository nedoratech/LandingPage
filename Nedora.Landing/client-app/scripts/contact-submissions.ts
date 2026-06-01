/**
 * Admin CLI for encrypted contact_submissions in Supabase.
 *
 * Requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in client-app/.env.local
 *
 * Usage:
 *   yarn contacts:export [--format json|csv] [--out file]
 *   yarn contacts:show <submission-id>
 *   yarn contacts:update-status <submission-id> <new|reviewed|replied>
 *   yarn contacts:apply <submission-id> <patch.json>
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve } from "path";
import { decrypt, encrypt } from "../src/lib/contact/encryption";

type FormType = "quote" | "contact";
type Status = "new" | "reviewed" | "replied";

type SubmissionRow = {
  id: string;
  created_at: string;
  status: Status;
  form_type: FormType;
  email_encrypted: string;
  email_domain: string;
  name_encrypted: string | null;
  first_name_encrypted: string | null;
  last_name_encrypted: string | null;
  company: string | null;
  project_type: string | null;
  engagement: string | null;
  timeline: string | null;
  subject: string | null;
  message: string;
  locale: string | null;
};

export type DecryptedSubmission = {
  id: string;
  createdAt: string;
  status: Status;
  formType: FormType;
  locale: string | null;
  email: string;
  emailDomain: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  company?: string | null;
  projectType?: string | null;
  engagement?: string | null;
  timeline?: string | null;
  subject?: string | null;
  message: string;
};

type SubmissionPatch = Partial<{
  status: Status;
  locale: string | null;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  company: string | null;
  projectType: string | null;
  engagement: string | null;
  timeline: string | null;
  subject: string | null;
  message: string;
}>;

function loadEnvFile(): void {
  const envPath = resolve(process.cwd(), ".env.local");
  if (!existsSync(envPath)) return;

  const content = readFileSync(envPath, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

function getSupabase() {
  loadEnvFile();
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in client-app/.env.local",
    );
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function emailDomain(email: string): string {
  const at = email.lastIndexOf("@");
  return at >= 0 ? email.slice(at + 1).toLowerCase() : "";
}

async function fetchEncryptionKey(
  supabase: ReturnType<typeof getSupabase>,
  submissionId: string,
): Promise<string> {
  const { data, error } = await supabase
    .from("submission_encryption_keys")
    .select("encryption_key")
    .eq("submission_id", submissionId)
    .single();

  if (error || !data) {
    throw new Error(`Encryption key not found for ${submissionId}: ${error?.message}`);
  }

  return data.encryption_key;
}

function decryptSubmission(
  row: SubmissionRow,
  encryptionKey: string,
): DecryptedSubmission {
  const email = decrypt(row.email_encrypted, encryptionKey);

  if (row.form_type === "quote") {
    return {
      id: row.id,
      createdAt: row.created_at,
      status: row.status,
      formType: "quote",
      locale: row.locale,
      email,
      emailDomain: row.email_domain,
      name: row.name_encrypted
        ? decrypt(row.name_encrypted, encryptionKey)
        : undefined,
      company: row.company,
      projectType: row.project_type,
      engagement: row.engagement,
      timeline: row.timeline,
      message: row.message,
    };
  }

  return {
    id: row.id,
    createdAt: row.created_at,
    status: row.status,
    formType: "contact",
    locale: row.locale,
    email,
    emailDomain: row.email_domain,
    firstName: row.first_name_encrypted
      ? decrypt(row.first_name_encrypted, encryptionKey)
      : undefined,
    lastName: row.last_name_encrypted
      ? decrypt(row.last_name_encrypted, encryptionKey)
      : undefined,
    subject: row.subject,
    message: row.message,
  };
}

async function fetchAllSubmissions(supabase: ReturnType<typeof getSupabase>) {
  const { data, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Failed to fetch submissions: ${error.message}`);
  return (data ?? []) as SubmissionRow[];
}

function toCsv(rows: DecryptedSubmission[]): string {
  const headers = [
    "id",
    "createdAt",
    "status",
    "formType",
    "locale",
    "email",
    "emailDomain",
    "name",
    "firstName",
    "lastName",
    "company",
    "projectType",
    "engagement",
    "timeline",
    "subject",
    "message",
  ];

  const escape = (value: string) => {
    if (value.includes('"') || value.includes(",") || value.includes("\n")) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  };

  const lines = [headers.join(",")];
  for (const row of rows) {
    lines.push(
      headers
        .map((header) => {
          const raw = row[header as keyof DecryptedSubmission];
          return escape(raw == null ? "" : String(raw));
        })
        .join(","),
    );
  }
  return lines.join("\n");
}

async function cmdExport(args: string[]) {
  const format = args.includes("--format")
    ? args[args.indexOf("--format") + 1]
    : "json";
  const outIndex = args.indexOf("--out");
  const outFile = outIndex >= 0 ? args[outIndex + 1] : undefined;

  if (format !== "json" && format !== "csv") {
    throw new Error('Format must be "json" or "csv"');
  }

  const supabase = getSupabase();
  const rows = await fetchAllSubmissions(supabase);
  const decrypted: DecryptedSubmission[] = [];

  for (const row of rows) {
    const key = await fetchEncryptionKey(supabase, row.id);
    decrypted.push(decryptSubmission(row, key));
  }

  const output =
    format === "csv" ? toCsv(decrypted) : JSON.stringify(decrypted, null, 2);

  if (outFile) {
    writeFileSync(resolve(process.cwd(), outFile), output, "utf8");
    console.log(`Wrote ${decrypted.length} submission(s) to ${outFile}`);
  } else {
    console.log(output);
  }
}

async function cmdShow(submissionId: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .eq("id", submissionId)
    .single();

  if (error || !data) {
    throw new Error(`Submission not found: ${error?.message ?? submissionId}`);
  }

  const key = await fetchEncryptionKey(supabase, submissionId);
  console.log(JSON.stringify(decryptSubmission(data as SubmissionRow, key), null, 2));
}

async function cmdUpdateStatus(submissionId: string, status: Status) {
  if (!["new", "reviewed", "replied"].includes(status)) {
    throw new Error("Status must be new, reviewed, or replied");
  }

  const supabase = getSupabase();
  const { error } = await supabase
    .from("contact_submissions")
    .update({ status })
    .eq("id", submissionId);

  if (error) throw new Error(`Failed to update status: ${error.message}`);
  console.log(`Updated ${submissionId} status → ${status}`);
}

async function cmdApply(submissionId: string, patchPath: string) {
  const supabase = getSupabase();
  const patch = JSON.parse(
    readFileSync(resolve(process.cwd(), patchPath), "utf8"),
  ) as SubmissionPatch;

  const { data, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .eq("id", submissionId)
    .single();

  if (error || !data) {
    throw new Error(`Submission not found: ${error?.message ?? submissionId}`);
  }

  const row = data as SubmissionRow;
  const encryptionKey = await fetchEncryptionKey(supabase, submissionId);
  const current = decryptSubmission(row, encryptionKey);
  const merged = { ...current, ...patch };

  const update: Record<string, unknown> = {};

  if (patch.status !== undefined) update.status = patch.status;
  if (patch.locale !== undefined) update.locale = patch.locale;
  if (patch.message !== undefined) update.message = patch.message;
  if (patch.subject !== undefined) update.subject = patch.subject;
  if (patch.company !== undefined) update.company = patch.company;
  if (patch.projectType !== undefined) update.project_type = patch.projectType;
  if (patch.engagement !== undefined) update.engagement = patch.engagement;
  if (patch.timeline !== undefined) update.timeline = patch.timeline;

  if (patch.email !== undefined) {
    update.email_encrypted = encrypt(patch.email, encryptionKey);
    update.email_domain = emailDomain(patch.email);
  }

  if (row.form_type === "quote") {
    if (patch.name !== undefined) {
      update.name_encrypted = encrypt(patch.name, encryptionKey);
    }
  } else {
    if (patch.firstName !== undefined) {
      update.first_name_encrypted = encrypt(patch.firstName, encryptionKey);
    }
    if (patch.lastName !== undefined) {
      update.last_name_encrypted = encrypt(patch.lastName, encryptionKey);
    }
  }

  if (Object.keys(update).length === 0) {
    console.log("No supported fields in patch.");
    return;
  }

  const { error: updateError } = await supabase
    .from("contact_submissions")
    .update(update)
    .eq("id", submissionId);

  if (updateError) {
    throw new Error(`Failed to apply patch: ${updateError.message}`);
  }

  console.log(`Updated ${submissionId}`);
  console.log(JSON.stringify(merged, null, 2));
}

function printHelp() {
  console.log(`Contact submissions admin (decrypt / update)

Commands:
  export [--format json|csv] [--out <file>]   Export all submissions decrypted
  show <submission-id>                        Show one decrypted submission
  update-status <id> <new|reviewed|replied>   Update workflow status only
  apply <id> <patch.json>                     Update fields (re-encrypts PII)

Patch JSON keys (all optional): status, locale, email, name, firstName,
lastName, company, projectType, engagement, timeline, subject, message

Examples:
  yarn contacts:export --format csv --out submissions.csv
  yarn contacts:show 550e8400-e29b-41d4-a716-446655440000
  yarn contacts:update-status 550e8400-e29b-41d4-a716-446655440000 reviewed
  yarn contacts:apply 550e8400-e29b-41d4-a716-446655440000 patch.json
`);
}

async function main() {
  const [command, ...args] = process.argv.slice(2);

  try {
    switch (command) {
      case "export":
        await cmdExport(args);
        break;
      case "show":
        if (!args[0]) throw new Error("Missing submission id");
        await cmdShow(args[0]);
        break;
      case "update-status":
        if (!args[0] || !args[1]) throw new Error("Usage: update-status <id> <status>");
        await cmdUpdateStatus(args[0], args[1] as Status);
        break;
      case "apply":
        if (!args[0] || !args[1]) throw new Error("Usage: apply <id> <patch.json>");
        await cmdApply(args[0], args[1]);
        break;
      default:
        printHelp();
        process.exit(command ? 1 : 0);
    }
  } catch (err) {
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

main();
