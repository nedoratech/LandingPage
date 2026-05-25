import { type ReactNode } from "react";

export function Section({
  id,
  children,
  className = "",
  muted = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  muted?: boolean;
}) {
  return (
    <section
      id={id}
      className={`py-20 sm:py-24 ${muted ? "bg-neutral-50" : "bg-white"} ${className}`}
    >
      {children}
    </section>
  );
}
