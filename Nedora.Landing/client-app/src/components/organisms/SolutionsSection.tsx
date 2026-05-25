"use client";

import { Section } from "@/components/atoms/Section";
import { ServiceCard } from "@/components/molecules/ServiceCard";
import {
  Container,
  SectionHeader,
} from "@/components/templates/LandingTemplate";
import { SECTION_IDS } from "@/lib/constants";
import { useLocale } from "@/providers/LocaleProvider";

export function SolutionsSection() {
  const { t } = useLocale();

  return (
    <Section id={SECTION_IDS.solutions} muted className="relative z-10">
      <Container>
        <SectionHeader title={t.solutions.title} subtitle={t.solutions.subtitle} />
        <div className="grid gap-6 md:grid-cols-3">
          {t.solutions.items.map((item) => (
            <ServiceCard
              key={item.title}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
