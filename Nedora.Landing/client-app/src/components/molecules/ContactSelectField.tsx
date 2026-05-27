import type { ReactNode, SelectHTMLAttributes } from "react";

const selectClass =
  "w-full appearance-none rounded-xl border-0 bg-white px-4 py-3.5 text-base text-black shadow-none focus:outline-none focus:ring-2 focus:ring-primary-blue/30 invalid:text-neutral-400";

export function ContactSelectField({
  error,
  placeholder,
  optional = false,
  children,
  ...props
}: {
  error?: string;
  placeholder: string;
  optional?: boolean;
  children: ReactNode;
} & SelectHTMLAttributes<HTMLSelectElement>) {
  const id = props.id ?? props.name;

  return (
    <div>
      <select
        {...props}
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error && id ? `${id}-error` : undefined}
        className={`${selectClass} ${props.className ?? ""}`}
      >
        <option value="" disabled={!optional} hidden={!optional}>
          {placeholder}
        </option>
        {children}
      </select>
      {error ? (
        <p id={id ? `${id}-error` : undefined} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
