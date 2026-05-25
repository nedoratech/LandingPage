"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { detectBrowserLocale } from "@/i18n/detectLocale";
import { defaultLocale, LOCALE_STORAGE_KEY, type Locale } from "@/i18n/locales";
import { messages, type Messages } from "@/i18n/messages";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Messages;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
    const detected = detectBrowserLocale();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional locale hydration
    setLocaleState(detected);
    document.documentElement.lang = detected;
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
  }, []);

  const activeLocale = hasHydrated ? locale : defaultLocale;

  const value = useMemo(
    () => ({
      locale: activeLocale,
      setLocale,
      t: messages[activeLocale],
    }),
    [activeLocale, setLocale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return context;
}
