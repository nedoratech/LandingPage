import { Card } from "@/components/atoms/Card";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";

function BulletArrow() {
  return (
    <span
      className="flex h-4 w-4 shrink-0 items-center justify-center text-primary-blue"
      aria-hidden
    >
      <svg
        className="h-3 w-3"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </span>
  );
}

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
    <Card surface="muted" className="rounded-2xl border-0">
      <Heading level={3} className="mb-3">
        {title}
      </Heading>
      <Text muted className="mb-4">
        {description}
      </Text>
      <ul className="mt-auto space-y-2 text-base text-neutral-700">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-center gap-2.5">
            <BulletArrow />
            <span className="leading-snug">{bullet}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
