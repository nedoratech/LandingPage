"use client";

import { Logo } from "@/components/atoms/Logo";
import { NavHoverLink } from "@/components/molecules/NavHoverLink";
import { SECTION_IDS } from "@/lib/constants";
import { useLocale } from "@/providers/LocaleProvider";
import type { Messages } from "@/i18n/messages";

const MOBILE_NAV_TOGGLE_ID = "mobile-nav-toggle";

const pillShadow = "shadow-[0_0.25rem_1.25rem_0_rgb(0_0_0/0.08)]";
const mobileMenuLink =
  "mobile-nav__link inline-flex items-center justify-center self-end rounded-full bg-white px-5 py-2 text-sm font-bold text-black shadow-[0_0.25rem_1rem_0_rgb(0_0_0/0.08)]";
const mobileMenuLinkCta = `${mobileMenuLink} bg-neutral-200`;

const navItems = [
  { id: SECTION_IDS.solutions, labelKey: "solutions" as const },
  { id: SECTION_IDS.why, labelKey: "why" as const },
  { id: SECTION_IDS.process, labelKey: "process" as const },
  { id: SECTION_IDS.engagement, labelKey: "engagement" as const },
  { id: SECTION_IDS.showcase, labelKey: "work" as const },
] as const;

function MenuIcon() {
  return (
    <span className="mobile-nav__icon relative flex h-4 w-4 flex-col items-center justify-center" aria-hidden>
      <span className="mobile-nav__icon-bar mobile-nav__icon-bar--top absolute h-0.5 w-4 rounded-full bg-white" />
      <span className="mobile-nav__icon-bar mobile-nav__icon-bar--mid h-0.5 w-4 rounded-full bg-white" />
      <span className="mobile-nav__icon-bar mobile-nav__icon-bar--bottom absolute h-0.5 w-4 rounded-full bg-white" />
    </span>
  );
}

function closeMobileMenu() {
  const toggle = document.getElementById(MOBILE_NAV_TOGGLE_ID);
  if (toggle instanceof HTMLInputElement) {
    toggle.checked = false;
  }
}

function MobileMenuLinks({ t }: { t: Messages }) {
  return (
    <>
      {navItems.map(({ id, labelKey }) => (
        <a
          key={id}
          href={`#${id}`}
          className={mobileMenuLink}
          onClick={closeMobileMenu}
        >
          {t.nav[labelKey]}
        </a>
      ))}
      <a
        href={`#${SECTION_IDS.contact}`}
        className={mobileMenuLinkCta}
        onClick={closeMobileMenu}
      >
        {t.nav.cta}
      </a>
    </>
  );
}

export function SiteHeader() {
  const { t } = useLocale();

  return (
    <header className="sticky top-0 z-[200] px-4 pt-4 sm:px-6 sm:pt-5 lg:px-8 lg:pt-6">
      <div className="relative mx-auto w-full lg:max-w-2xl xl:max-w-3xl">
        {/* Checkbox + label — opens/closes without React (works if JS hydration fails) */}
        <div className="mobile-nav relative w-full lg:hidden">
          <input
            type="checkbox"
            id={MOBILE_NAV_TOGGLE_ID}
            className="mobile-nav__toggle"
            aria-hidden
            tabIndex={-1}
          />

          <div
            className={`mobile-nav__bar relative z-[220] flex items-center justify-between gap-3 rounded-full bg-white p-[0.75rem] ${pillShadow}`}
          >
            <Logo priority className="h-6 w-auto shrink-0 sm:h-7" />
            <label
              htmlFor={MOBILE_NAV_TOGGLE_ID}
              className="mobile-nav__trigger relative z-[221] flex h-10 w-10 shrink-0 cursor-pointer touch-manipulation items-center justify-center rounded-full bg-black"
              aria-label={t.nav.menuOpen}
            >
              <MenuIcon />
            </label>
          </div>

          <label
            htmlFor={MOBILE_NAV_TOGGLE_ID}
            className="mobile-nav__backdrop"
            aria-hidden
            tabIndex={-1}
          />

          <nav
            id="mobile-nav-panel"
            className="mobile-nav__panel absolute inset-x-0 top-full z-[205] mt-3 w-full"
            aria-label="Mobile"
          >
            <div className="mobile-nav__panel-inner flex flex-col items-end gap-2">
              <MobileMenuLinks t={t} />
            </div>
          </nav>
        </div>

        {/* Desktop */}
        <div className={`relative hidden rounded-full lg:block ${pillShadow}`}>
          <div
            className="pointer-events-none absolute inset-0 rounded-full bg-white/90 backdrop-blur-lg"
            aria-hidden
          />
          <div className="relative z-10 flex items-center justify-between gap-3 p-4">
            <Logo priority className="h-6 w-auto shrink-0 sm:h-7" />
            <div className="flex items-center gap-2 xl:gap-3">
              <nav aria-label="Main" className="flex items-center gap-2 xl:gap-3">
                {navItems.map(({ id, labelKey }) => (
                  <NavHoverLink key={id} href={`#${id}`} variant="nav">
                    {t.nav[labelKey]}
                  </NavHoverLink>
                ))}
              </nav>
              <NavHoverLink href={`#${SECTION_IDS.contact}`} variant="cta">
                {t.nav.cta}
              </NavHoverLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
