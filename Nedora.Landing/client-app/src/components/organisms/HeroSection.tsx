"use client";

import Image from "next/image";
import { Button } from "@/components/atoms/Button";
import { Heading } from "@/components/atoms/Heading";
import { Container } from "@/components/templates/LandingTemplate";
import { HERO_IMAGE, SECTION_IDS } from "@/lib/constants";
import { useLocale } from "@/providers/LocaleProvider";

export function HeroSection() {
  const { t } = useLocale();

  return (
    <section className="relative isolate min-h-[min(88vh,52rem)] w-full overflow-hidden">
      <Image
        src={HERO_IMAGE.src}
        alt={HERO_IMAGE.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Readability overlay — keeps B&W brand, anchors copy on the left */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"
        aria-hidden
      />

      <Container className="relative z-10 flex min-h-[min(88vh,52rem)] flex-col justify-center py-20 sm:py-28">
        <p className="mb-5 max-w-xl text-base font-normal uppercase tracking-[0.2em] text-white/75">
          {t.hero.eyebrow}
        </p>

        <Heading
          level={1}
          className="max-w-3xl text-white drop-shadow-sm lg:max-w-4xl"
        >
          {t.hero.headline}
        </Heading>

        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/90">
          {t.hero.subhead}
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Button href={`#${SECTION_IDS.contact}`} variant="inverse">
            {t.hero.primaryCta}
          </Button>
          <Button
            href={`#${SECTION_IDS.showcase}`}
            variant="outlineInverse"
          >
            {t.hero.secondaryCta}
          </Button>
        </div>
      </Container>
    </section>
  );
}
