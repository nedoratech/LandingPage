"use client";

import { useCallback, useEffect, useState } from "react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "@/components/atoms/Icon";
import { SECTION_SCROLL_ORDER } from "@/lib/constants";
import { useLocale } from "@/providers/LocaleProvider";

function getScrollTriggerLine() {
  return window.scrollY + window.innerHeight * 0.35;
}

export function ScrollSectionButton() {
  const { t } = useLocale();
  const [visible, setVisible] = useState(true);

  const scrollToNext = useCallback(() => {
    const trigger = getScrollTriggerLine();
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    for (const id of SECTION_SCROLL_ORDER) {
      const el = document.getElementById(id);
      if (el && el.offsetTop > trigger + 8) {
        el.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start",
        });
        return;
      }
    }
  }, []);

  useEffect(() => {
    const updateVisibility = () => {
      const lastId = SECTION_SCROLL_ORDER[SECTION_SCROLL_ORDER.length - 1];
      const last = document.getElementById(lastId);
      if (!last) {
        setVisible(true);
        return;
      }
      const pastEnd =
        window.scrollY + window.innerHeight * 0.85 >
        last.offsetTop + last.offsetHeight * 0.5;
      setVisible(!pastEnd);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={scrollToNext}
      className="scroll-section-btn fixed bottom-8 left-1/2 z-[190] flex h-12 w-12 -translate-x-1/2 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white text-black shadow-[0_0.25rem_1.25rem_0_rgb(0_0_0/0.12)] transition-colors duration-300 hover:border-primary-blue hover:bg-primary-blue hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
      aria-label={t.hero.scrollDownLabel}
    >
      <Icon icon={faChevronDown} className="h-5 w-5" />
    </button>
  );
}
