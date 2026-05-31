"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { Section } from "@/components/atoms/Section";
import { Textarea } from "@/components/atoms/Textarea";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";
import { ContactIconField } from "@/components/molecules/ContactIconField";
import { ContactSelectField } from "@/components/molecules/ContactSelectField";
import { SECTION_IDS } from "@/lib/constants";
import { contactFieldIcons } from "@/lib/icons";
import { contactSchema } from "@/lib/validation/contact";
import { useLocale } from "@/providers/LocaleProvider";

type FormState = "idle" | "submitting" | "success" | "error";

type FieldErrors = Partial<Record<string, string>>;

const textareaClass =
  "min-h-[8.5rem] resize-y border-0 bg-white px-4 py-3.5 text-base shadow-none rounded-xl focus:border-transparent focus:ring-2 focus:ring-primary-blue/30";

function ContactCard({ children }: { children: ReactNode }) {
  return (
    <div className="w-full px-4 sm:px-6 lg:mx-auto lg:max-w-[90rem] lg:px-10 xl:max-w-[100rem] xl:px-12">
      <div className="landing-card mx-auto w-full max-w-5xl rounded-2xl bg-[#f1f4f6] px-5 py-8 sm:px-12 sm:py-14">
        {children}
      </div>
    </div>
  );
}

export function ContactSection() {
  const { t, locale } = useLocale();
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    setState("submitting");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      company: String(formData.get("company") ?? ""),
      projectType: String(formData.get("projectType") ?? ""),
      engagement: String(formData.get("engagement") ?? ""),
      message: String(formData.get("message") ?? ""),
      timeline: String(formData.get("timeline") ?? "") || undefined,
      privacy: formData.get("privacy") === "on",
      website: String(formData.get("website") ?? ""),
    };

    const result = contactSchema.safeParse(payload);
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0]?.toString();
        if (key && !fieldErrors[key]) {
          const validationKey = key as keyof typeof t.contact.validation;
          fieldErrors[key] =
            t.contact.validation[validationKey] ?? issue.message;
        }
      }
      setErrors(fieldErrors);
      setState("idle");
      return;
    }

    const endpoint =
      process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "/api/contact";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: result.data.name,
          email: result.data.email,
          company: result.data.company,
          projectType: result.data.projectType,
          engagement: result.data.engagement,
          message: result.data.message,
          timeline: result.data.timeline,
          locale,
        }),
      });

      if (!response.ok) {
        setState("error");
        return;
      }

      setState("success");
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <Section id={SECTION_IDS.contact} className="!bg-white py-8 sm:py-10" revealOnView={false}>
        <ContactCard>
          <div className="mx-auto max-w-xl text-center">
            <div
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100"
              aria-hidden
            >
              <Icon icon={faCheck} className="h-8 w-8 text-green-600" />
            </div>
            <Heading level={2}>{t.contact.successTitle}</Heading>
            <Text className="mt-4" muted>
              {t.contact.successMessage}
            </Text>
          </div>
        </ContactCard>
      </Section>
    );
  }

  return (
    <Section id={SECTION_IDS.contact} className="!bg-white py-8 sm:py-10" revealOnView={false}>
      <ContactCard>
        <div className="mx-auto w-full max-w-xl sm:max-w-2xl">
          <h2 className="text-3xl font-bold tracking-normal text-black sm:text-4xl">
            {t.contact.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            {t.contact.subtitle}
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-4"
            noValidate
          >
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <ContactIconField
                id="name"
                name="name"
                icon={contactFieldIcons.name}
                placeholder={t.contact.name}
                autoComplete="name"
                required
                error={errors.name}
              />
              <ContactIconField
                id="email"
                name="email"
                type="email"
                icon={contactFieldIcons.email}
                placeholder={t.contact.email}
                autoComplete="email"
                required
                error={errors.email}
              />
            </div>

            <ContactIconField
              id="company"
              name="company"
              icon={contactFieldIcons.company}
              placeholder={t.contact.company}
              autoComplete="organization"
              required
              error={errors.company}
            />

            <ContactSelectField
              id="projectType"
              name="projectType"
              required
              defaultValue=""
              placeholder={t.contact.projectType}
              error={errors.projectType}
            >
              <option value="newApp">{t.contact.projectTypes.newApp}</option>
              <option value="integration">
                {t.contact.projectTypes.integration}
              </option>
              <option value="support">{t.contact.projectTypes.support}</option>
              <option value="unsure">{t.contact.projectTypes.unsure}</option>
            </ContactSelectField>

            <ContactSelectField
              id="engagement"
              name="engagement"
              required
              defaultValue=""
              placeholder={t.contact.engagement}
              error={errors.engagement}
            >
              <option value="fixed">{t.contact.engagementOptions.fixed}</option>
              <option value="time">{t.contact.engagementOptions.time}</option>
              <option value="unsure">{t.contact.engagementOptions.unsure}</option>
            </ContactSelectField>

            <div>
              <Textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder={t.contact.message}
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={textareaClass}
              />
              {errors.message ? (
                <p id="message-error" className="mt-1.5 text-sm text-red-600">
                  {errors.message}
                </p>
              ) : null}
            </div>

            <ContactSelectField
              id="timeline"
              name="timeline"
              optional
              defaultValue=""
              placeholder={t.contact.timeline}
            >
              <option value="asap">{t.contact.timelineOptions.asap}</option>
              <option value="oneToThree">
                {t.contact.timelineOptions.oneToThree}
              </option>
              <option value="threeToSix">
                {t.contact.timelineOptions.threeToSix}
              </option>
              <option value="exploring">
                {t.contact.timelineOptions.exploring}
              </option>
            </ContactSelectField>

            <div className="flex items-start gap-2.5 pt-2">
              <input
                id="privacy"
                name="privacy"
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-neutral-300"
              />
              <label htmlFor="privacy" className="text-sm text-neutral-600">
                {t.contact.privacy}{" "}
                <a href="/privacy" className="text-link">
                  {t.contact.privacyLink}
                </a>
              </label>
            </div>
            {errors.privacy ? (
              <p className="text-sm text-red-600">{errors.privacy}</p>
            ) : null}

            {state === "error" ? (
              <p className="text-sm text-red-600">{t.contact.errorMessage}</p>
            ) : null}

            <Button
              type="submit"
              variant="cta"
              className="w-full sm:w-auto"
              disabled={state === "submitting"}
            >
              {state === "submitting" ? t.contact.submitting : t.contact.submit}
            </Button>
          </form>
        </div>
      </ContactCard>
    </Section>
  );
}
