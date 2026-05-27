"use client";

import { Section } from "@/components/atoms/Section";
import {
  StaggeredReveal,
  StaggeredRevealItem,
} from "@/components/molecules/StaggeredReveal";
import { Container } from "@/components/templates/LandingTemplate";
import { SECTION_IDS } from "@/lib/constants";
import { useLocale } from "@/providers/LocaleProvider";

export function FactsFiguresSection() {
  const { t } = useLocale();

  return (
    <Section id={SECTION_IDS.facts} className="relative z-10 py-16 sm:py-20" revealOnView={false}>
      <Container>
        <h2 className="mb-12 text-center text-3xl font-bold tracking-normal text-black sm:mb-14 sm:text-4xl">
          {t.facts.title}
        </h2>

        <StaggeredReveal
          as="ul"
          className="facts-figures__grid grid list-none grid-cols-1 gap-0 p-0 md:grid-cols-3"
        >
          {t.facts.items.map((item, index) => (
            <StaggeredRevealItem
              key={item.label}
              as="li"
              index={index}
              className={`facts-figures__stat px-0 py-8 md:px-10 md:py-4 ${index > 0 ? "facts-figures__stat--divided" : ""}`}
            >
              <div className="text-center">
                <p className="text-5xl font-bold leading-none text-primary-blue sm:text-6xl">
                  <span>{item.value}</span>
                  {item.suffix ? (
                    <span className="text-4xl sm:text-5xl">{item.suffix}</span>
                  ) : null}
                </p>
                <p className="mx-auto mt-4 max-w-xs text-base leading-relaxed text-neutral-600">
                  {item.label}
                </p>
              </div>
            </StaggeredRevealItem>
          ))}
        </StaggeredReveal>
      </Container>
    </Section>
  );
}
