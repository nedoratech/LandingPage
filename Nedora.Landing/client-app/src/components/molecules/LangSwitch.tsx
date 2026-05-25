"use client";

import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "@/components/atoms/Icon";
import { useLocale } from "@/providers/LocaleProvider";
import { locales, type Locale } from "@/i18n/locales";

const localeCodes: Record<Locale, string> = {
  en: "EN",
  ro: "RO",
};

type LangSwitchProps = {
  variant?: "default" | "footer";
};

export function LangSwitch({ variant = "default" }: LangSwitchProps) {
  const { locale, setLocale, t } = useLocale();

  const isFooter = variant === "footer";

  return (
    <div
      className={`relative inline-flex shrink-0 items-center ${isFooter ? "w-[3.25rem]" : "w-[4.5rem] md:w-auto"}`}
    >
      <select
        value={locale}
        onChange={(event) => setLocale(event.target.value as Locale)}
        aria-label={t.nav.languageLabel}
        className={
          isFooter
            ? "w-full appearance-none rounded-md border border-neutral-600 bg-neutral-800 py-1 pl-2 pr-5 text-center text-xs font-normal text-white transition-colors hover:border-neutral-500 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
            : "w-full appearance-none rounded-md border border-neutral-300 bg-white py-1.5 pl-2 pr-7 text-center text-sm font-normal text-black transition-colors hover:border-neutral-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black md:py-2 md:text-base"
        }
      >
        {locales.map((value) => (
          <option key={value} value={value}>
            {localeCodes[value]}
          </option>
        ))}
      </select>
      <Icon
        icon={faChevronDown}
        className={
          isFooter
            ? "pointer-events-none absolute right-1.5 top-1/2 h-2 w-2 -translate-y-1/2 text-neutral-400"
            : "pointer-events-none absolute right-2 top-1/2 h-2.5 w-2.5 -translate-y-1/2 text-neutral-500 md:right-3 md:h-3 md:w-3"
        }
        aria-hidden
      />
    </div>
  );
}
