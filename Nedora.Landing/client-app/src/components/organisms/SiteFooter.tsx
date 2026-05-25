"use client";

import { Logo } from "@/components/atoms/Logo";
import { LangSwitch } from "@/components/molecules/LangSwitch";
import { FOOTER_SOCIAL, SECTION_IDS } from "@/lib/constants";
import { useLocale } from "@/providers/LocaleProvider";

const primarySections = [
  { id: SECTION_IDS.solutions, labelKey: "solutions" as const },
  { id: SECTION_IDS.why, labelKey: "why" as const },
  { id: SECTION_IDS.process, labelKey: "process" as const },
  { id: SECTION_IDS.engagement, labelKey: "engagement" as const },
  { id: SECTION_IDS.showcase, labelKey: "work" as const },
] as const;

function FooterLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className: string;
}) {
  return (
    <a href={href} className={`link-interactive text-white ${className}`}>
      {children}
    </a>
  );
}

function SocialIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-900 transition-colors duration-300 group-hover:bg-primary-blue group-hover:text-white">
      {children}
    </span>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.404 1.02.005 2.04.137 3 .404 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

export function SiteFooter() {
  const { t } = useLocale();
  const year = new Date().getFullYear();

  const socialLinks = [
    { href: FOOTER_SOCIAL.linkedin, label: t.footer.social.linkedin, icon: <LinkedInIcon /> },
    { href: FOOTER_SOCIAL.x, label: t.footer.social.x, icon: <XIcon /> },
    { href: FOOTER_SOCIAL.github, label: t.footer.social.github, icon: <GitHubIcon /> },
  ];

  return (
    <footer className="w-full bg-neutral-900 text-left lg:bg-white lg:py-16 xl:py-20">
      <div className="w-full lg:mx-auto lg:max-w-[90rem] lg:px-10 xl:max-w-[100rem] xl:px-12">
        <div className="w-full px-6 py-12 sm:px-8 sm:py-14 lg:rounded-2xl lg:bg-neutral-900 lg:px-16 lg:py-16 xl:px-20 xl:py-20">
          <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-12 xl:gap-20">
            <div className="lg:max-w-lg xl:max-w-xl">
              <Logo variant="white" className="h-7 w-auto sm:h-8" />
              <p className="mt-6 max-w-none text-base leading-7 text-neutral-400">
                {t.footer.description}
              </p>
            </div>

            <nav aria-label="Footer primary" className="lg:pt-0">
              <ul className="flex flex-col gap-4">
                {primarySections.map(({ id, labelKey }) => (
                  <li key={id}>
                    <FooterLink
                      href={`#${id}`}
                      className="text-2xl font-bold text-white sm:text-[1.75rem] lg:text-3xl"
                    >
                      {t.nav[labelKey]}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Footer secondary">
              <ul className="flex flex-col gap-3">
                <li>
                  <FooterLink
                    href={`#${SECTION_IDS.contact}`}
                    className="text-base text-white"
                  >
                    {t.footer.contact}
                  </FooterLink>
                </li>
                <li>
                  <FooterLink
                    href={`mailto:${t.footer.email}`}
                    className="text-base text-white"
                  >
                    {t.footer.email}
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="/privacy" className="text-base text-white">
                    {t.footer.privacy}
                  </FooterLink>
                </li>
                <li>
                  <span className="text-base text-white">{t.footer.location}</span>
                </li>
              </ul>
            </nav>
          </div>

          <div className="mt-12 flex flex-col items-start gap-6 border-t border-white/10 pt-8 lg:mt-16 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-sm text-neutral-500">
              {t.footer.copyright} · {year}. {t.footer.rights}
            </p>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <LangSwitch variant="footer" />
              <div className="flex items-center gap-3">
              {socialLinks.map(({ href, label, icon }) =>
                href ? (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="group"
                  >
                    <SocialIcon>{icon}</SocialIcon>
                  </a>
                ) : (
                  <span
                    key={label}
                    aria-label={label}
                    className="opacity-60"
                    title={label}
                  >
                    <SocialIcon>{icon}</SocialIcon>
                  </span>
                ),
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
