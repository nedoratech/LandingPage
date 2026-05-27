"use client";

import { type ReactNode } from "react";
import { useSlideUpInView } from "@/hooks/useSlideUpInView";

export function Section({
  id,
  children,
  className = "",
  muted = false,
  revealOnView = true,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  muted?: boolean;
  /** When false, skips the section-level slide-up (e.g. when children animate individually). */
  revealOnView?: boolean;
}) {
  const { ref, className: slideClass } = useSlideUpInView();

  return (
    <section
      ref={revealOnView ? ref : undefined}
      id={id}
      className={`${revealOnView ? slideClass : ""} py-10 sm:py-12 ${muted ? "bg-neutral-50" : "bg-white"} ${className}`}
    >
      {children}
    </section>
  );
}
