"use client";

import Image from "next/image";
import { Section } from "@/components/atoms/Section";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/templates/LandingTemplate";
import { SECTION_IDS } from "@/lib/constants";
import { contactFormHash } from "@/lib/contactNavigation";
import { useLocale } from "@/providers/LocaleProvider";

export function DealSection() {
  const { t } = useLocale();

  return (
    <Section className="!bg-white" revealOnView={false}>
      <Container className="max-w-5xl">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative isolate overflow-hidden rounded-2xl">
            <Image
              src="/deal.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 44rem, 100vw"
              className="object-cover object-center"
              priority={false}
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/15"
              aria-hidden
            />
            <div className="landing-card relative z-10 p-8 sm:p-10">
              <p className="text-sm font-normal uppercase tracking-[0.2em] text-white/75">
                {t.deal.eyebrow}
              </p>
              <h3 className="mt-4 max-w-md text-3xl font-bold tracking-normal text-white sm:text-4xl">
                {t.deal.title}
              </h3>
              <p className="mt-4 max-w-md text-base leading-relaxed text-white/80">
                {t.deal.subtitle}
              </p>
            </div>
          </div>

          <div className="landing-card flex flex-col justify-between rounded-2xl bg-[#f1f4f6] p-8 sm:p-10">
            <div>
              <h3 className="text-2xl font-bold tracking-normal text-black sm:text-3xl">
                {t.deal.cardTitle}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                {t.deal.cardSubtitle}
              </p>
              <ul className="mt-6 space-y-3 text-base text-neutral-700">
                {t.deal.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-blue"
                      aria-hidden
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={contactFormHash("quote")} variant="cta">
                {t.deal.cta}
              </Button>
              <Button href={`#${SECTION_IDS.process}`} variant="heroPrimary">
                {t.deal.secondaryCta}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

