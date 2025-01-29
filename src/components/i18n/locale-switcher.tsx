"use client";

import { setUserLocale } from "@/actions/i18n";
import { Button, ButtonProps } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Locale, locales } from "@/lib/i18n-config";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { getLangDir } from "rtl-detect";

export default function LocaleSwitcher({ ...props }: ButtonProps) {
  const t = useTranslations("localeSwitcher");
  const currentLocale = useLocale();
  const [isPending, startTransition] = useTransition();

  function onChange(value: string) {
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  }

  return (
    <DropdownMenu dir={getLangDir(currentLocale)}>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} disabled={isPending} {...props}>
          {(() => {
            const { Flag, key } = locales.find(
              (locale) => locale.key === currentLocale,
            )!;
            return (
              <>
                <Flag />
                <span>{t(key)}</span>
              </>
            );
          })()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
        {locales.map(({ Flag, key }) => (
          <DropdownMenuItem
            key={`locale-switcher-dropdown-item-${key}`}
            onClick={() => {
              onChange(key);
            }}
          >
            <Flag />
            <span>{t(key)}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
