import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

type EncryptedPayload = {
  iv: string;
  ciphertext: string;
  tag: string;
};

type ContactSubmissionRecord = {
  id: string;
  created_at: string;
  form_type: "quote" | "contact";
  email_encrypted: string;
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

type WebhookPayload = {
  type: "INSERT";
  table: string;
  record: ContactSubmissionRecord;
};

function base64ToBytes(value: string): Uint8Array {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function decrypt(
  encryptedJson: string,
  keyBase64: string,
): Promise<string> {
  const payload = JSON.parse(encryptedJson) as EncryptedPayload;
  const key = await crypto.subtle.importKey(
    "raw",
    base64ToBytes(keyBase64),
    { name: "AES-GCM" },
    false,
    ["decrypt"],
  );

  const iv = base64ToBytes(payload.iv);
  const ciphertext = base64ToBytes(payload.ciphertext);
  const tag = base64ToBytes(payload.tag);
  const combined = new Uint8Array(ciphertext.length + tag.length);
  combined.set(ciphertext);
  combined.set(tag, ciphertext.length);

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    combined,
  );

  return new TextDecoder().decode(decrypted);
}

function formatSubmissionEmail(
  record: ContactSubmissionRecord,
  decrypted: {
    email: string;
    name?: string;
    firstName?: string;
    lastName?: string;
  },
): { subject: string; html: string } {
  const formLabel = record.form_type === "quote" ? "Quote request" : "Contact";
  const subject = `[Nedora] New ${formLabel.toLowerCase()} — ${record.id.slice(0, 8)}`;

  const nameLine =
    record.form_type === "quote"
      ? `<p><strong>Name:</strong> ${decrypted.name ?? "—"}</p>`
      : `<p><strong>Name:</strong> ${decrypted.firstName ?? ""} ${decrypted.lastName ?? ""}</p>`;

  const quoteDetails =
    record.form_type === "quote"
      ? `
        <p><strong>Company:</strong> ${record.company ?? "—"}</p>
        <p><strong>Project type:</strong> ${record.project_type ?? "—"}</p>
        <p><strong>Engagement:</strong> ${record.engagement ?? "—"}</p>
        <p><strong>Timeline:</strong> ${record.timeline ?? "—"}</p>
      `
      : `<p><strong>Subject:</strong> ${record.subject ?? "—"}</p>`;

  const html = `
    <h2>New ${formLabel} submission</h2>
    <p><strong>Submission ID:</strong> ${record.id}</p>
    <p><strong>Received:</strong> ${record.created_at}</p>
    <p><strong>Locale:</strong> ${record.locale ?? "—"}</p>
    ${nameLine}
    <p><strong>Email:</strong> ${decrypted.email}</p>
    ${quoteDetails}
    <p><strong>Message:</strong></p>
    <pre style="white-space:pre-wrap;font-family:inherit">${record.message}</pre>
  `;

  return { subject, html };
}

function isAuthorized(request: Request): boolean {
  const webhookSecret = Deno.env.get("WEBHOOK_SECRET");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  const incomingSecret = request.headers.get("x-webhook-secret");
  if (webhookSecret && incomingSecret === webhookSecret) {
    return true;
  }

  const auth = request.headers.get("Authorization");
  if (serviceRoleKey && auth === `Bearer ${serviceRoleKey}`) {
    return true;
  }

  return false;
}

Deno.serve(async (request) => {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  if (!isAuthorized(request)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const notificationEmail = Deno.env.get("CONTACT_NOTIFICATION_EMAIL");
  const resendFromEmail = Deno.env.get("RESEND_FROM_EMAIL");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (
    !resendApiKey ||
    !notificationEmail ||
    !resendFromEmail ||
    !supabaseUrl ||
    !serviceRoleKey
  ) {
    console.error("Missing required environment variables");
    return new Response("Server misconfigured", { status: 500 });
  }

  let payload: WebhookPayload;
  try {
    payload = (await request.json()) as WebhookPayload;
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  if (payload.type !== "INSERT" || payload.table !== "contact_submissions") {
    return new Response("Ignored", { status: 200 });
  }

  const record = payload.record;
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: keyRow, error: keyError } = await supabase
    .from("submission_encryption_keys")
    .select("encryption_key")
    .eq("submission_id", record.id)
    .single();

  if (keyError || !keyRow) {
    console.error("Failed to load encryption key", keyError);
    return new Response("Failed to load encryption key", { status: 500 });
  }

  try {
    const email = await decrypt(record.email_encrypted, keyRow.encryption_key);
    const decrypted =
      record.form_type === "quote"
        ? {
            email,
            name: record.name_encrypted
              ? await decrypt(record.name_encrypted, keyRow.encryption_key)
              : undefined,
          }
        : {
            email,
            firstName: record.first_name_encrypted
              ? await decrypt(
                  record.first_name_encrypted,
                  keyRow.encryption_key,
                )
              : undefined,
            lastName: record.last_name_encrypted
              ? await decrypt(record.last_name_encrypted, keyRow.encryption_key)
              : undefined,
          };

    const { subject, html } = formatSubmissionEmail(record, decrypted);

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: resendFromEmail,
        to: [notificationEmail],
        subject,
        html,
      }),
    });

    if (!resendResponse.ok) {
      const body = await resendResponse.text();
      console.error("Resend API error", resendResponse.status, body);
      return new Response("Failed to send email", { status: 502 });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Notification failed", error);
    return new Response("Processing failed", { status: 500 });
  }
});
