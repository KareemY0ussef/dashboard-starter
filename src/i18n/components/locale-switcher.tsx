"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale, useTranslations } from "next-intl";
import { ArabicFlag, EnglishFlag } from "./flags";
import { Button, ButtonProps } from "@/components/ui/button";
import { useTransition } from "react";
import { setUserLocale } from "../actions";
import { Locale } from "../config";

export default function LocaleSwitcher({ ...props }: ButtonProps) {
  const t = useTranslations("localeSwitcher");
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  function onChange(value: string) {
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  }

  return (
    <DropdownMenu dir={locale === "ar" ? "rtl" : "ltr"}>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} disabled={isPending} {...props}>
          {locale === "ar" && (
            <>
              <ArabicFlag />
              <span>{t("ar")}</span>
            </>
          )}
          {locale === "en" && (
            <>
              <EnglishFlag />
              <span>{t("en")}</span>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
        <DropdownMenuItem
          onClick={() => {
            onChange("ar");
          }}
        >
          <ArabicFlag />
          <span>{t("ar")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            onChange("en");
          }}
        >
          <EnglishFlag />
          <span>{t("en")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
