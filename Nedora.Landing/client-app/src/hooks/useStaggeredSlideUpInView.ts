"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  buildSlideUpClassName,
  buildStaggeredSlideUpStyle,
  prefersReducedMotion,
  SLIDE_UP_MIN_VISIBLE_RATIO,
  SLIDE_UP_OBSERVER_OPTIONS,
  type RevealState,
} from "@/hooks/slideUpInViewUtils";

const DEFAULT_STAGGER_MS = 75;

export function useStaggeredSlideUpInView(staggerMs = DEFAULT_STAGGER_MS) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<RevealState>("hidden");
  const wasIntersectingRef = useRef(false);
  const didInitRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (prefersReducedMotion()) {
      setState("shown");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const intersecting =
          entry.isIntersecting &&
          entry.intersectionRatio >= SLIDE_UP_MIN_VISIBLE_RATIO;

        if (!didInitRef.current) {
          didInitRef.current = true;
          wasIntersectingRef.current = intersecting;

          if (intersecting) {
            setState("shown");
            observer.disconnect();
          }
          return;
        }

        if (intersecting && !wasIntersectingRef.current) {
          setState("animated");
          observer.disconnect();
        }

        wasIntersectingRef.current = intersecting;
      },
      SLIDE_UP_OBSERVER_OPTIONS,
    );

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        observer.observe(node);
      });
    });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  const getItemClassName = useCallback(
    () => buildSlideUpClassName(state),
    [state],
  );

  const getItemStyle = useCallback(
    (index: number) => buildStaggeredSlideUpStyle(state, index, staggerMs),
    [state, staggerMs],
  );

  return { ref, state, getItemClassName, getItemStyle };
}
