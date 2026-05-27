import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type { InputHTMLAttributes } from "react";
import { Icon } from "@/components/atoms/Icon";
import { Input } from "@/components/atoms/Input";

const fieldClass =
  "border-0 bg-white py-3.5 pl-11 pr-4 text-base shadow-none rounded-xl focus:border-transparent focus:ring-2 focus:ring-primary-blue/30";

export function ContactIconField({
  icon,
  error,
  ...props
}: {
  icon: IconDefinition;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  const id = props.id ?? props.name;

  return (
    <div>
      <div className="relative">
        <span
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-primary-blue"
          aria-hidden
        >
          <Icon icon={icon} className="h-[1.125rem] w-[1.125rem]" />
        </span>
        <Input
          {...props}
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={error && id ? `${id}-error` : undefined}
          className={`${fieldClass} ${props.className ?? ""}`}
        />
      </div>
      {error ? (
        <p id={id ? `${id}-error` : undefined} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
