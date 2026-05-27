/** Nedora wordmark SVG in public/ */
export const BRAND_LOGO = {
  src: "/nedora.svg",
  width: 800,
  height: 267,
} as const;

export const BRAND_LOGO_WHITE = {
  src: "/nedora_white.svg",
  width: 800,
  height: 267,
} as const;

/** Footer social profile URLs — leave empty to hide a link */
export const FOOTER_SOCIAL = {
  linkedin: "https://linkedin.com/company/nedora-tech",
  x: "",
  github: "",
} as const;

export const HERO_IMAGE = {
  src: "/hero.jpg",
  alt: "",
} as const;

export const WORK_IMAGE = {
  src: "/work.jpg",
  alt: "",
} as const;

export const SECTION_IDS = {
  facts: "facts",
  coreValues: "core-values",
  solutions: "solutions",
  why: "why",
  process: "process",
  engagement: "engagement",
  showcase: "showcase",
  contact: "contact",
} as const;

/** Order for the fixed scroll-down control (hero → first id → … → contact) */
export const SECTION_SCROLL_ORDER = [
  SECTION_IDS.facts,
  SECTION_IDS.coreValues,
  SECTION_IDS.solutions,
  SECTION_IDS.why,
  SECTION_IDS.process,
  SECTION_IDS.engagement,
  SECTION_IDS.contact,
] as const;
