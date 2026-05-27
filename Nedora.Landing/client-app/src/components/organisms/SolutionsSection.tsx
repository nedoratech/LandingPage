"use client";

import { Section } from "@/components/atoms/Section";
import { ServiceCard } from "@/components/molecules/ServiceCard";
import {
  StaggeredReveal,
  StaggeredRevealItem,
} from "@/components/molecules/StaggeredReveal";
import { SectionHeader } from "@/components/templates/LandingTemplate";
import { SECTION_IDS } from "@/lib/constants";
import { useLocale } from "@/providers/LocaleProvider";

export function SolutionsSection() {
  const { t } = useLocale();

  return (
    <Section
      id={SECTION_IDS.solutions}
      className="relative z-10 !bg-white py-8 sm:py-10 lg:py-8 xl:py-10"
      revealOnView={false}
    >
      <div className="w-full px-6 lg:mx-auto lg:max-w-[90rem] lg:px-10 xl:max-w-[100rem] xl:px-12">
        <div className="landing-card w-full rounded-2xl bg-[#f1f4f6] px-6 py-12 sm:px-8 sm:py-14 lg:px-16 lg:py-16 xl:px-20 xl:py-20">
          <SectionHeader
            title={t.solutions.title}
            subtitle={t.solutions.subtitle}
          />
          <StaggeredReveal className="grid gap-6 md:grid-cols-3">
            {t.solutions.items.map((item, index) => (
              <StaggeredRevealItem key={item.title} index={index} className="min-w-0">
                <ServiceCard
                  title={item.title}
                  description={item.description}
                />
              </StaggeredRevealItem>
            ))}
          </StaggeredReveal>
        </div>
      </div>
    </Section>
  );
}
