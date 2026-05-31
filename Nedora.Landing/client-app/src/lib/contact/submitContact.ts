import type { ContactPayload } from "@/lib/validation/contactApi";
import { getSupabaseAdmin } from "./supabaseAdmin";

function emailDomain(email: string): string {
  const at = email.lastIndexOf("@");
  return at >= 0 ? email.slice(at + 1).toLowerCase() : "";
}

export async function submitContact(
  payload: ContactPayload,
): Promise<{ submissionId: string }> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("contact_submissions")
    .insert({
      name: payload.name,
      email: payload.email,
      email_domain: emailDomain(payload.email),
      company: payload.company,
      project_type: payload.projectType,
      engagement: payload.engagement,
      message: payload.message,
      timeline: payload.timeline ?? null,
      locale: payload.locale ?? null,
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(`Failed to save contact submission: ${error.message}`);
  }

  return { submissionId: data.id };
}
