"use client";

import { WhyFeatureCard } from "@/components/molecules/WhyFeatureCard";
import {
  StaggeredReveal,
  StaggeredRevealItem,
} from "@/components/molecules/StaggeredReveal";
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
    <Section id={SECTION_IDS.why} revealOnView={false}>
      <Container>
        <SectionHeader title={t.why.title} subtitle={t.why.subtitle} />
        <StaggeredReveal className="grid gap-6 md:grid-cols-3">
          {t.why.items.map((item, index) => (
            <StaggeredRevealItem key={item.title} index={index} className="min-w-0">
              <WhyFeatureCard
                icon={whyNedoraIcons[index]}
                title={item.title}
                description={item.description}
              />
            </StaggeredRevealItem>
          ))}
        </StaggeredReveal>
      </Container>
    </Section>
  );
}
