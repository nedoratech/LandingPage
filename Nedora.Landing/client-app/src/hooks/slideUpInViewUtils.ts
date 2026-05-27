import type { CSSProperties } from "react";

export const slideUpInViewClass = "slide-up-in-view";
export const slideUpInViewVisibleClass = "slide-up-in-view--visible";
export const slideUpInViewAnimateClass = "slide-up-in-view--animate";

export type RevealState = "hidden" | "shown" | "animated";

export const SLIDE_UP_MIN_VISIBLE_RATIO = 0.15;

export const SLIDE_UP_OBSERVER_OPTIONS: IntersectionObserverInit = {
  threshold: [0, SLIDE_UP_MIN_VISIBLE_RATIO, 0.25, 0.35],
  rootMargin: "0px 0px -8% 0px",
};

export function buildSlideUpClassName(state: RevealState): string {
  return [
    slideUpInViewClass,
    state !== "hidden" && slideUpInViewVisibleClass,
    state === "animated" && slideUpInViewAnimateClass,
  ]
    .filter(Boolean)
    .join(" ");
}

export function buildStaggeredSlideUpStyle(
  state: RevealState,
  index: number,
  staggerMs = 75,
): CSSProperties {
  if (state !== "animated") return {};
  return { transitionDelay: `${index * staggerMs}ms` };
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
