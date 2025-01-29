import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Rubik } from "next/font/google";
import { getLangDir } from "rtl-detect";

import "./globals.css";

const rubik = Rubik({ subsets: ["latin", "arabic"], variable: "--font-rubik" });

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const dir = getLangDir(locale);

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className={`${rubik.variable} font-rubik antialiased`}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            {children}
            <Toaster richColors />
          </NextIntlClientProvider>
        </NextThemesProvider>
      </body>
    </html>
  );
}
