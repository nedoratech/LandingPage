import { Card } from "@/components/atoms/Card";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";

export function EngagementCard({
  title,
  description,
  bullets,
}: {
  title: string;
  description: string;
  bullets: readonly string[];
}) {
  return (
    <Card>
      <Heading level={3} className="mb-3">
        {title}
      </Heading>
      <Text muted className="mb-4">
        {description}
      </Text>
      <ul className="mt-auto space-y-2 text-base text-neutral-700">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex gap-2">
            <span className="text-black" aria-hidden>
              —
            </span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
