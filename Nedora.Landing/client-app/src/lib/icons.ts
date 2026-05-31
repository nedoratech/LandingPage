import {
  faBuilding,
  faClipboardCheck,
  faCode,
  faCompass,
  faEnvelope,
  faHandshake,
  faPenRuler,
  faRocket,
  faShieldHalved,
  faTag,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export const whyNedoraIcons: IconDefinition[] = [
  faShieldHalved,
  faClipboardCheck,
  faHandshake,
];

export const processStepIcons: IconDefinition[] = [
  faCompass,
  faPenRuler,
  faCode,
  faRocket,
];

export const contactFieldIcons = {
  name: faUser,
  firstName: faUser,
  lastName: faUser,
  email: faEnvelope,
  company: faBuilding,
  subject: faTag,
} as const;
