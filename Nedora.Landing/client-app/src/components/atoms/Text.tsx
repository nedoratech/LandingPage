import { type ReactNode } from "react";

export function Text({
  children,
  className = "",
  muted = false,
}: {
  children: ReactNode;
  className?: string;
  muted?: boolean;
}) {
  return (
    <p
      className={`text-base leading-7 ${muted ? "text-neutral-600" : "text-neutral-800"} ${className}`}
    >
      {children}
    </p>
  );
}
