import { en, type Messages } from "./en";
import { ro } from "./ro";

export type { Messages };

export const messages: Record<"en" | "ro", Messages> = {
  en,
  ro,
};
