"use client";

import { Logo } from "@/components/atoms/Logo";
import { NavHoverLink } from "@/components/molecules/NavHoverLink";
import { SECTION_IDS } from "@/lib/constants";
import { contactFormHash } from "@/lib/contactNavigation";
import { useLocale } from "@/providers/LocaleProvider";
import type { Messages } from "@/i18n/messages";

const MOBILE_NAV_TOGGLE_ID = "mobile-nav-toggle";

const pillShadow = "shadow-[0_0.25rem_1.25rem_0_rgb(0_0_0/0.08)]";
const mobileMenuLink =
  "mobile-nav__link inline-flex items-center justify-center self-end rounded-full bg-white px-5 py-2 text-sm font-bold text-black shadow-[0_0.25rem_1rem_0_rgb(0_0_0/0.08)]";
const mobileMenuLinkCta = `${mobileMenuLink} bg-neutral-200`;

const navItems = [
  { href: `#${SECTION_IDS.solutions}`, labelKey: "solutions" as const },
  { href: `#${SECTION_IDS.why}`, labelKey: "why" as const },
  { href: `#${SECTION_IDS.process}`, labelKey: "process" as const },
  { href: `#${SECTION_IDS.engagement}`, labelKey: "engagement" as const },
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
      {navItems.map(({ href, labelKey }) => (
        <a
          key={href}
          href={href}
          className={mobileMenuLink}
          onClick={closeMobileMenu}
        >
          {t.nav[labelKey]}
        </a>
      ))}
      <a
        href={contactFormHash("quote")}
        className={mobileMenuLinkCta}
        onClick={closeMobileMenu}
      >
        {t.nav.cta}
      </a>
    </>
  );
}

type SiteHeaderProps = {
  /** Fixed over the hero; does not push page content down */
  overlay?: boolean;
};

const headerShellClass =
  "px-4 pt-4 sm:px-6 sm:pt-5 lg:px-10 lg:pt-6 nav-compact:px-8";

export function SiteHeader({ overlay = false }: SiteHeaderProps) {
  const { t } = useLocale();

  return (
    <header
      className={
        overlay
          ? `pointer-events-none fixed inset-x-0 top-0 z-[200] ${headerShellClass}`
          : `sticky top-0 z-[200] ${headerShellClass}`
      }
    >
      <div className="pointer-events-auto relative mx-auto w-full lg:max-w-[90rem] nav-compact:max-w-3xl">
        {/* Mobile: below 1024px (lg) */}
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

        {/* Desktop: 1024px–1399px full-width bar; 1400px+ compact pill (unchanged) */}
        <div className={`relative hidden w-full rounded-full lg:block nav-compact:w-auto ${pillShadow}`}>
          <div
            className="pointer-events-none absolute inset-0 rounded-full bg-white/90 backdrop-blur-lg"
            aria-hidden
          />
          <div className="relative z-10 grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 p-4 lg:gap-4 lg:px-5">
            <Logo priority className="h-6 w-auto shrink-0 sm:h-7" />

            <nav
              aria-label="Main"
              className="flex min-w-0 items-center justify-center gap-2 lg:gap-3"
            >
              {navItems.map(({ href, labelKey }) => (
                <NavHoverLink key={href} href={href} variant="nav">
                  {t.nav[labelKey]}
                </NavHoverLink>
              ))}
            </nav>

            <div className="flex justify-end">
              <NavHoverLink href={contactFormHash("quote")} variant="cta">
                {t.nav.cta}
              </NavHoverLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
