"use client";

import { Text } from "@/components/atoms/Text";
import { Section } from "@/components/atoms/Section";
import { EngagementCard } from "@/components/molecules/EngagementCard";
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

export function EngagementSection() {
  const { t } = useLocale();

  return (
    <Section id={SECTION_IDS.engagement} revealOnView={false}>
      <Container>
        <SectionHeader
          title={t.engagement.title}
          subtitle={t.engagement.subtitle}
        />
        <StaggeredReveal className="grid gap-6 lg:grid-cols-2">
          {t.engagement.items.map((item, index) => (
            <StaggeredRevealItem key={item.title} index={index} className="min-w-0">
              <EngagementCard
                title={item.title}
                description={item.description}
                bullets={item.bullets}
              />
            </StaggeredRevealItem>
          ))}
        </StaggeredReveal>
        <Text className="mt-8 text-center" muted>
          {t.engagement.bridge}
        </Text>
      </Container>
    </Section>
  );
}
