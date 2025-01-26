import ThemeButton from "@/components/theme-button";
import LocaleSwitcher from "@/i18n/components/locale-switcher";
import { getLocale } from "next-intl/server";

export default async function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div
        className={`absolute top-5 ${
          locale === "ar" ? "right-5" : "left-5"
        } flex gap-2`}
      >
        <ThemeButton />
        <LocaleSwitcher />
      </div>
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}
