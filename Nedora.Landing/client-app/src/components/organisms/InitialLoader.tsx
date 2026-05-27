"use client";

import { useEffect, useMemo, useState } from "react";
import { Logo } from "@/components/atoms/Logo";

type Phase = "loading" | "exiting" | "done";

const DURATION_MS = 1200;
const EXIT_MS = 650;

function clampInt(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, Math.round(value)));
}

export function InitialLoader() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [progress, setProgress] = useState(0);

  const isVisible = phase !== "done";
  const percentLabel = useMemo(() => `${progress}%`, [progress]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;

    if (reduceMotion) {
      setProgress(100);
      setPhase("done");
      return;
    }

    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = (now - start) / DURATION_MS;
      const eased = 1 - Math.pow(1 - Math.min(1, t), 3);
      const next = clampInt(eased * 100, 0, 100);
      setProgress(next);

      if (t >= 1) {
        setPhase("exiting");
        window.setTimeout(() => setPhase("done"), EXIT_MS);
        return;
      }

      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(raf);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`initial-loader ${phase === "exiting" ? "initial-loader--exit" : ""}`}
      aria-hidden
    >
      <div className="initial-loader__inner">
        <Logo priority className="h-7 w-auto sm:h-8" />

        <div className="initial-loader__meter" aria-hidden>
          <div
            className="initial-loader__bar"
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </div>

        <div className="initial-loader__percent" aria-hidden>
          {percentLabel}
        </div>
      </div>
    </div>
  );
}

