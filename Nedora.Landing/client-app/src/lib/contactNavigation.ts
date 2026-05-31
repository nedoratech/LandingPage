import { SECTION_IDS } from "@/lib/constants";

export type ContactFormType = "quote" | "contact";

const FORM_TYPE_SUFFIX = {
  quote: "quote",
  contact: "contact",
} as const satisfies Record<ContactFormType, string>;

export function contactFormHash(formType: ContactFormType): string {
  return `#${SECTION_IDS.contact}-${FORM_TYPE_SUFFIX[formType]}`;
}

export function parseContactFormHash(hash: string): ContactFormType | null {
  if (hash === `#${SECTION_IDS.contact}-quote`) return "quote";
  if (hash === `#${SECTION_IDS.contact}-contact`) return "contact";
  return null;
}

export function scrollToContactSection(formType?: ContactFormType): void {
  if (formType) {
    history.replaceState(null, "", contactFormHash(formType));
  }

  document.getElementById(SECTION_IDS.contact)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}
