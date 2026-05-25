"use client";

import { Section } from "@/components/atoms/Section";
import { ShowcaseCard } from "@/components/molecules/ShowcaseCard";
import {
  Container,
  SectionHeader,
} from "@/components/templates/LandingTemplate";
import { SECTION_IDS } from "@/lib/constants";
import { useLocale } from "@/providers/LocaleProvider";

export function ShowcaseSection() {
  const { t } = useLocale();

  return (
    <Section id={SECTION_IDS.showcase} muted>
      <Container>
        <SectionHeader title={t.showcase.title} subtitle={t.showcase.subtitle} />
        <div className="grid gap-6 lg:grid-cols-3">
          {t.showcase.items.map((item) => (
            <ShowcaseCard
              key={item.clientLabel}
              {...item}
              labels={t.showcase.labels}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
