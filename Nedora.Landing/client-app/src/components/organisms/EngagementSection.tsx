"use client";

import { Text } from "@/components/atoms/Text";
import { Section } from "@/components/atoms/Section";
import { EngagementCard } from "@/components/molecules/EngagementCard";
import {
  Container,
  SectionHeader,
} from "@/components/templates/LandingTemplate";
import { SECTION_IDS } from "@/lib/constants";
import { useLocale } from "@/providers/LocaleProvider";

export function EngagementSection() {
  const { t } = useLocale();

  return (
    <Section id={SECTION_IDS.engagement}>
      <Container>
        <SectionHeader
          title={t.engagement.title}
          subtitle={t.engagement.subtitle}
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {t.engagement.items.map((item) => (
            <EngagementCard
              key={item.title}
              title={item.title}
              description={item.description}
              bullets={item.bullets}
            />
          ))}
        </div>
        <Text className="mt-8 text-center" muted>
          {t.engagement.bridge}
        </Text>
      </Container>
    </Section>
  );
}
