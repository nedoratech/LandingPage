import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Card } from "@/components/atoms/Card";
import { Heading } from "@/components/atoms/Heading";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";

export function WhyFeatureCard({
  icon,
  title,
  description,
}: {
  icon: IconDefinition;
  title: string;
  description: string;
}) {
  return (
    <Card surface="muted" className="rounded-2xl border-0">
      <div
        className="mb-5 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white"
        aria-hidden
      >
        <Icon icon={icon} className="h-9 w-9 text-primary-blue" />
      </div>
      <Heading level={3} className="mb-3">
        {title}
      </Heading>
      <Text muted>{description}</Text>
    </Card>
  );
}
