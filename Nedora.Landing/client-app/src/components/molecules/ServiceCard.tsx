import { Card } from "@/components/atoms/Card";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";

export function ServiceCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Card className="shadow-[0_0.25rem_1.25rem_0_rgb(0_0_0/0.06)]">
      <Heading level={3} className="mb-3">
        {title}
      </Heading>
      <Text muted>{description}</Text>
    </Card>
  );
}
