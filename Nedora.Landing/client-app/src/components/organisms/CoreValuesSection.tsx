"use client";

import { Section } from "@/components/atoms/Section";
import {
  StaggeredReveal,
  StaggeredRevealItem,
} from "@/components/molecules/StaggeredReveal";
import {
  Container,
  SectionHeader,
} from "@/components/templates/LandingTemplate";
import { SECTION_IDS } from "@/lib/constants";
import { useLocale } from "@/providers/LocaleProvider";

function ValueCheckIcon() {
  return (
    <span
      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_0.0625rem_0.25rem_0_rgb(0_0_0/0.06)]"
      aria-hidden
    >
      <svg
        className="h-2.5 w-2.5 text-primary-blue"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}

export function CoreValuesSection() {
  const { t } = useLocale();

  return (
    <Section id={SECTION_IDS.coreValues} className="relative z-10" revealOnView={false}>
      <Container>
        <SectionHeader
          title={t.coreValues.title}
          subtitle={t.coreValues.subtitle}
        />

        <StaggeredReveal
          as="ul"
          className="core-values__grid mx-auto grid w-full max-w-[44rem] list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2"
        >
          {t.coreValues.items.map((item, index) => (
            <StaggeredRevealItem
              key={item.title}
              as="li"
              index={index}
              className="min-w-0"
            >
              <div className="landing-card core-values__card flex w-full gap-3 rounded-2xl bg-[#f1f4f6] px-[22px] py-4">
                <div className="min-w-0 flex-1">
                  <p className="text-[1rem] font-bold leading-snug text-black">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                    {item.body}
                  </p>
                </div>
                <div className="shrink-0 self-start pt-0.5">
                  <ValueCheckIcon />
                </div>
              </div>
            </StaggeredRevealItem>
          ))}
        </StaggeredReveal>
      </Container>
    </Section>
  );
}
