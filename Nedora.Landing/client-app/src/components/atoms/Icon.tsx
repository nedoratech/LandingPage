import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export function Icon({
  icon,
  className = "h-5 w-5",
  label,
}: {
  icon: IconDefinition;
  className?: string;
  label?: string;
}) {
  return (
    <FontAwesomeIcon
      icon={icon}
      className={className}
      aria-hidden={label ? undefined : true}
      aria-label={label}
    />
  );
}
