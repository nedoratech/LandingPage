"use client";

import { Logo } from "@/components/atoms/Logo";
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
        <p className="mt-6 leading-7 text-neutral-700">{t.privacy.intro}</p>
      </Container>
    </div>
  );
}
