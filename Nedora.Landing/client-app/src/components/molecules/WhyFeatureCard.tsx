import { Card } from "@/components/atoms/Card";
import { Heading } from "@/components/atoms/Heading";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

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
    <Card>
      <Icon
        icon={icon}
        className="mb-5 h-7 w-7 text-neutral-400"
      />
      <Heading level={3} className="mb-3">
        {title}
      </Heading>
      <Text muted>{description}</Text>
    </Card>
  );
}
