import type { ContactPayload } from "@/lib/validation/contactApi";
import { encrypt, generateEncryptionKey } from "./encryption";
import { getSupabaseAdmin } from "./supabaseAdmin";

function emailDomain(email: string): string {
  const at = email.lastIndexOf("@");
  return at >= 0 ? email.slice(at + 1).toLowerCase() : "";
}

export async function submitContact(
  payload: ContactPayload,
): Promise<{ submissionId: string }> {
  const supabase = getSupabaseAdmin();
  const encryptionKey = generateEncryptionKey();
  const emailEncrypted = encrypt(payload.email, encryptionKey);

  const rpcParams =
    payload.formType === "quote"
      ? {
          p_form_type: "quote" as const,
          p_email_encrypted: emailEncrypted,
          p_email_domain: emailDomain(payload.email),
          p_name_encrypted: encrypt(payload.name, encryptionKey),
          p_first_name_encrypted: null,
          p_last_name_encrypted: null,
          p_company: payload.company,
          p_project_type: payload.projectType,
          p_engagement: payload.engagement,
          p_timeline: payload.timeline ?? null,
          p_subject: null,
          p_message: payload.message,
          p_locale: payload.locale ?? null,
          p_encryption_key: encryptionKey,
        }
      : {
          p_form_type: "contact" as const,
          p_email_encrypted: emailEncrypted,
          p_email_domain: emailDomain(payload.email),
          p_name_encrypted: null,
          p_first_name_encrypted: encrypt(payload.firstName, encryptionKey),
          p_last_name_encrypted: encrypt(payload.lastName, encryptionKey),
          p_company: null,
          p_project_type: null,
          p_engagement: null,
          p_timeline: null,
          p_subject: payload.subject,
          p_message: payload.message,
          p_locale: payload.locale ?? null,
          p_encryption_key: encryptionKey,
        };

  const { data, error } = await supabase.rpc(
    "insert_contact_submission",
    rpcParams,
  );

  if (error) {
    throw new Error(`Failed to save contact submission: ${error.message}`);
  }

  return { submissionId: data as string };
}
