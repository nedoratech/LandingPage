"use client";

import { WhyFeatureCard } from "@/components/molecules/WhyFeatureCard";
import { Section } from "@/components/atoms/Section";
import {
  Container,
  SectionHeader,
} from "@/components/templates/LandingTemplate";
import { SECTION_IDS } from "@/lib/constants";
import { whyNedoraIcons } from "@/lib/icons";
import { useLocale } from "@/providers/LocaleProvider";

export function WhyNedoraSection() {
  const { t } = useLocale();

  return (
    <Section id={SECTION_IDS.why}>
      <Container>
        <SectionHeader title={t.why.title} subtitle={t.why.subtitle} />
        <div className="grid gap-6 md:grid-cols-3">
          {t.why.items.map((item, index) => (
            <WhyFeatureCard
              key={item.title}
              icon={whyNedoraIcons[index]}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
