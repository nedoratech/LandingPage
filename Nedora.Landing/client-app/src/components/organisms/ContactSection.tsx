"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Label } from "@/components/atoms/Label";
import { Section } from "@/components/atoms/Section";
import { Textarea } from "@/components/atoms/Textarea";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";
import { Container, SectionHeader } from "@/components/templates/LandingTemplate";
import { SECTION_IDS } from "@/lib/constants";
import { contactSchema } from "@/lib/validation/contact";
import { useLocale } from "@/providers/LocaleProvider";

type FormState = "idle" | "submitting" | "success" | "error";

type FieldErrors = Partial<Record<string, string>>;

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
        throw new Error("Request failed");
      }
      setState("success");
      event.currentTarget.reset();
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <Section id={SECTION_IDS.contact}>
        <Container className="max-w-xl text-center">
          <Heading level={2}>{t.contact.successTitle}</Heading>
          <Text className="mt-4" muted>
            {t.contact.successMessage}
          </Text>
          <Button
            type="button"
            variant="secondary"
            className="mt-8"
            onClick={() => setState("idle")}
          >
            {t.contact.submit}
          </Button>
        </Container>
      </Section>
    );
  }

  return (
    <Section id={SECTION_IDS.contact}>
      <Container>
        <SectionHeader title={t.contact.title} subtitle={t.contact.subtitle} />
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-xl space-y-5"
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

          <div>
            <Label htmlFor="name" required>
              {t.contact.name}
            </Label>
            <Input id="name" name="name" autoComplete="name" className="mt-1" />
            {errors.name ? (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            ) : null}
          </div>

          <div>
            <Label htmlFor="email" required>
              {t.contact.email}
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="mt-1"
            />
            {errors.email ? (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            ) : null}
          </div>

          <div>
            <Label htmlFor="company" required>
              {t.contact.company}
            </Label>
            <Input
              id="company"
              name="company"
              autoComplete="organization"
              className="mt-1"
            />
            {errors.company ? (
              <p className="mt-1 text-sm text-red-600">{errors.company}</p>
            ) : null}
          </div>

          <div>
            <Label htmlFor="projectType" required>
              {t.contact.projectType}
            </Label>
            <select
              id="projectType"
              name="projectType"
              defaultValue=""
              className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2.5 text-base focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            >
              <option value="" disabled />
              <option value="newApp">{t.contact.projectTypes.newApp}</option>
              <option value="integration">
                {t.contact.projectTypes.integration}
              </option>
              <option value="support">{t.contact.projectTypes.support}</option>
              <option value="unsure">{t.contact.projectTypes.unsure}</option>
            </select>
            {errors.projectType ? (
              <p className="mt-1 text-sm text-red-600">{errors.projectType}</p>
            ) : null}
          </div>

          <div>
            <Label htmlFor="engagement" required>
              {t.contact.engagement}
            </Label>
            <select
              id="engagement"
              name="engagement"
              defaultValue=""
              className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2.5 text-base focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            >
              <option value="" disabled />
              <option value="fixed">{t.contact.engagementOptions.fixed}</option>
              <option value="time">{t.contact.engagementOptions.time}</option>
              <option value="unsure">{t.contact.engagementOptions.unsure}</option>
            </select>
            {errors.engagement ? (
              <p className="mt-1 text-sm text-red-600">{errors.engagement}</p>
            ) : null}
          </div>

          <div>
            <Label htmlFor="message" required>
              {t.contact.message}
            </Label>
            <Textarea
              id="message"
              name="message"
              rows={5}
              className="mt-1"
            />
            {errors.message ? (
              <p className="mt-1 text-sm text-red-600">{errors.message}</p>
            ) : null}
          </div>

          <div>
            <Label htmlFor="timeline">{t.contact.timeline}</Label>
            <select
              id="timeline"
              name="timeline"
              defaultValue=""
              className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2.5 text-base focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            >
              <option value="" />
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
            </select>
          </div>

          <div className="flex items-start gap-2">
            <input
              id="privacy"
              name="privacy"
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-neutral-300"
            />
            <label htmlFor="privacy" className="text-base text-neutral-700">
              {t.contact.privacy}{" "}
              <a href="/privacy" className="underline hover:text-black">
                {t.footer.privacy}
              </a>
            </label>
          </div>
          {errors.privacy ? (
            <p className="text-sm text-red-600">{errors.privacy}</p>
          ) : null}

          {state === "error" ? (
            <p className="text-sm text-red-600">{t.contact.errorMessage}</p>
          ) : null}

          <Button type="submit" disabled={state === "submitting"}>
            {state === "submitting" ? t.contact.submitting : t.contact.submit}
          </Button>
        </form>
      </Container>
    </Section>
  );
}
