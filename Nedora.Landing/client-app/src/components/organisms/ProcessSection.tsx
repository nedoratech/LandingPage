"use client";

import Image from "next/image";
import { ProcessStepCard } from "@/components/molecules/ProcessStepCard";
import { Container } from "@/components/templates/LandingTemplate";
import { SECTION_IDS, WORK_IMAGE } from "@/lib/constants";
import { processStepIcons } from "@/lib/icons";
import { useLocale } from "@/providers/LocaleProvider";

export function ProcessSection() {
  const { t } = useLocale();

  return (
    <section
      id={SECTION_IDS.process}
      className="relative isolate w-full overflow-hidden"
    >
      <Image
        src={WORK_IMAGE.src}
        alt={WORK_IMAGE.alt}
        fill
        sizes="100vw"
        className="object-cover object-center"
      />

      <div
        className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/35"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-black/25"
        aria-hidden
      />

      <Container className="relative z-10 py-20 sm:py-28">
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-14 md:text-left">
          <h2 className="text-3xl font-bold tracking-normal text-white sm:text-4xl">
            {t.process.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">
            {t.process.subtitle}
          </p>
        </div>

        <ol className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
          {t.process.steps.map((step, index) => (
            <ProcessStepCard
              key={step.title}
              variant="onImage"
              icon={processStepIcons[index]}
              step={String(index + 1).padStart(2, "0")}
              title={step.title}
              description={step.description}
            />
          ))}
        </ol>
      </Container>
    </section>
  );
}
