import { defaultLocale, LOCALE_STORAGE_KEY, type Locale } from "./locales";

function isRomanian(language: string): boolean {
  return language.toLowerCase().startsWith("ro");
}

export function detectBrowserLocale(): Locale {
  if (typeof window === "undefined") {
    return defaultLocale;
  }

  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  if (stored === "en" || stored === "ro") {
    return stored;
  }

  const languages = [
    ...navigator.languages,
    navigator.language,
  ].filter(Boolean);

  for (const language of languages) {
    if (isRomanian(language)) {
      return "ro";
    }
  }

  return defaultLocale;
}
