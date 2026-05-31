"use client";

import { Logo } from "@/components/atoms/Logo";
import { Text } from "@/components/atoms/Text";
import { Container } from "@/components/templates/LandingTemplate";
import { useLocale } from "@/providers/LocaleProvider";

export default function PrivacyPage() {
  const { t } = useLocale();

  return (
    <div className="min-h-screen bg-white py-20">
      <Container className="max-w-2xl">
        <Logo className="h-8 w-auto" />
        <h1 className="mt-8 text-3xl font-bold text-black">
          {t.privacy.title}
        </h1>
        <Text muted className="mt-6">
          {t.privacy.intro}
        </Text>
        <div className="mt-10 space-y-8">
          {t.privacy.sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-semibold text-black">
                {section.title}
              </h2>
              <Text muted className="mt-3">
                {section.body}
              </Text>
            </section>
          ))}
        </div>
      </Container>
    </div>
  );
}
