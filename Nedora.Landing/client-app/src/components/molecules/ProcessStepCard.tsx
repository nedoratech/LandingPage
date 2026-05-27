import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Heading } from "@/components/atoms/Heading";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";

const cardHover =
  "md:transition-shadow md:duration-200 md:ease-out md:hover:shadow-[0_0.25rem_0.9375rem_0_rgb(0_0_0/0.08)]";

export function ProcessStepCard({
  icon,
  step,
  title,
  description,
  variant = "default",
}: {
  icon: IconDefinition;
  step: string;
  title: string;
  description: string;
  variant?: "default" | "onImage";
}) {
  const isOnImage = variant === "onImage";

  return (
    <li
      className={`landing-card relative flex h-full flex-col rounded-lg border p-6 ${cardHover} ${
        isOnImage
          ? "border-white/25 bg-white/95 backdrop-blur-sm"
          : "border-neutral-200 bg-white"
      }`}
    >
      <div className="mb-5 flex items-start justify-between gap-3">
        <Icon icon={icon} className="h-7 w-7 shrink-0 text-neutral-400" />
        <span
          className={`text-2xl font-bold tabular-nums leading-none ${
            isOnImage ? "text-neutral-300" : "text-neutral-200"
          }`}
        >
          {step}
        </span>
      </div>
      <Heading level={3} className="mb-2">
        {title}
      </Heading>
      <Text muted className="leading-relaxed">
        {description}
      </Text>
    </li>
  );
}
