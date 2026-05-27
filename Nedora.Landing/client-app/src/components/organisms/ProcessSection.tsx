"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import {
  StaggeredReveal,
  StaggeredRevealItem,
} from "@/components/molecules/StaggeredReveal";
import { WORK_IMAGE, SECTION_IDS } from "@/lib/constants";
import { useLocale } from "@/providers/LocaleProvider";

function formatStep(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function ProcessSection() {
  const { t } = useLocale();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  return (
    <section
      id={SECTION_IDS.process}
      className="relative z-10 w-full bg-white py-8 sm:py-10 lg:py-8 xl:py-10"
    >
      <div className="w-full px-6 lg:mx-auto lg:max-w-[90rem] lg:px-10 xl:max-w-[100rem] xl:px-12">
        <div className="relative isolate w-full overflow-hidden rounded-2xl">
          <div
            className={`process-scroll__media ${imageLoaded ? "process-scroll__media--revealed" : ""}`}
          >
            <Image
              src={WORK_IMAGE.src}
              alt={WORK_IMAGE.alt}
              fill
              sizes="(min-width: 1280px) 90rem, 100vw"
              className="object-cover object-center"
              onLoad={handleImageLoad}
            />
          </div>
          <div
            className={`process-scroll__flash ${imageLoaded ? "process-scroll__flash--done" : ""}`}
            aria-hidden
          />

          <div
            className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/80 to-black/55"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/30"
            aria-hidden
          />

          <div className="landing-card relative z-10 px-6 py-10 sm:px-8 sm:py-12 lg:px-14 lg:py-14 xl:px-16 xl:py-16">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-normal text-white sm:text-4xl">
                {t.process.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">
                {t.process.subtitle}
              </p>
            </div>

            <StaggeredReveal
              as="ol"
              className="mt-8 grid list-none grid-cols-1 gap-8 p-0 sm:mt-10 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8"
            >
              {t.process.steps.map((step, index) => (
                <StaggeredRevealItem key={step.title} as="li" index={index} className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                    <span className="text-3xl font-bold leading-none text-primary-blue sm:text-4xl">
                      {formatStep(index)}
                    </span>
                    <h3 className="text-lg font-bold text-white sm:text-xl">
                      {step.title}
                      <span className="font-normal text-white/90">
                        {": "}
                        {step.tagline}
                      </span>
                    </h3>
                  </div>
                  <p className="mt-3 text-base leading-relaxed text-white/80 sm:text-lg">
                    {step.description}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {step.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-2.5 text-base leading-relaxed text-white/70"
                      >
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-blue"
                          aria-hidden
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </StaggeredRevealItem>
              ))}
            </StaggeredReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
