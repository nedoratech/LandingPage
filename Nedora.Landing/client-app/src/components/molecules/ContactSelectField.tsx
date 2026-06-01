import type { ReactNode, SelectHTMLAttributes } from "react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "@/components/atoms/Icon";

const selectClass =
  "w-full appearance-none rounded-xl border-0 bg-white py-3.5 pl-4 pr-11 text-base text-black shadow-none focus:outline-none focus:ring-2 focus:ring-primary-blue/30 invalid:text-neutral-400";

const chevronClass =
  "pointer-events-none absolute right-4 top-1/2 h-3 w-3 -translate-y-1/2 text-neutral-500 transition-transform duration-200 group-focus-within:rotate-180";

export function ContactSelectField({
  error,
  placeholder,
  optional = false,
  hidePlaceholder = false,
  children,
  className,
  ...selectProps
}: {
  error?: string;
  placeholder?: string;
  optional?: boolean;
  hidePlaceholder?: boolean;
  children: ReactNode;
} & SelectHTMLAttributes<HTMLSelectElement>) {
  const id = selectProps.id ?? selectProps.name;

  return (
    <div>
      <div className={`group relative w-full ${className ?? ""}`}>
        <select
          {...selectProps}
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={error && id ? `${id}-error` : undefined}
          className={selectClass}
        >
          {!hidePlaceholder && placeholder ? (
            <option value="" disabled={!optional} hidden={!optional}>
              {placeholder}
            </option>
          ) : null}
          {children}
        </select>
        <Icon icon={faChevronDown} className={chevronClass} aria-hidden />
      </div>
      {error ? (
        <p id={id ? `${id}-error` : undefined} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
