import { type ReactNode } from "react";

const cardBase =
  "flex h-full flex-col rounded-lg border border-neutral-200 bg-white p-6 md:transition-shadow md:duration-200 md:ease-out md:hover:shadow-[0_0.25rem_0.9375rem_0_rgb(0_0_0/0.08)]";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <article className={`${cardBase} ${className}`}>{children}</article>;
}
