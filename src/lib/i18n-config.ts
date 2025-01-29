import { ArabicFlag, EnglishFlag } from "@/components/i18n/flags";

export type Locale = (typeof locales)[number]["key"];

export const locales = [
  { key: "en", Flag: EnglishFlag },
  { key: "ar", Flag: ArabicFlag },
] as const;
export const defaultLocale: Locale = "ar";
