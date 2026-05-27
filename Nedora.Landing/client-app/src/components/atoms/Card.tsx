import { type ReactNode } from "react";

const cardBase =
  "flex h-full flex-col rounded-lg border border-neutral-200 p-6 md:transition-shadow md:duration-200 md:ease-out md:hover:shadow-[0_0.25rem_0.9375rem_0_rgb(0_0_0/0.08)]";

const cardSurface = {
  white: "bg-white",
  muted: "bg-[#f1f4f6]",
} as const;

export function Card({
  children,
  className = "",
  surface = "white",
}: {
  children: ReactNode;
  className?: string;
  surface?: keyof typeof cardSurface;
}) {
  return (
    <article className={`${cardBase} ${cardSurface[surface]} ${className}`}>
      {children}
    </article>
  );
}
