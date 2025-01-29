"use client";

import { NavMain } from "@/components/layout/nav-main";
import { NavUser } from "@/components/layout/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { config } from "@/dashboard.config";
import { Command } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import * as React from "react";
import { getLangDir } from "rtl-detect";

import LocaleSwitcher from "../i18n/locale-switcher";
import ThemeButton from "../theme/theme-button";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations();
  const locale = useLocale();
  const dir = getLangDir(locale);
  const data = config.sidebarItems(t);
  return (
    <Sidebar side={dir === "ltr" ? "left" : "right"} variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <div className="flex w-full gap-2">
          <ThemeButton
            variant={"outline"}
            className="shrink-0 bg-transparent"
          />
          <LocaleSwitcher
            variant={"outline"}
            className="w-full bg-transparent"
          />
        </div>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
