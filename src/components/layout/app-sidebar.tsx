"use client";

import * as React from "react";
import { Command } from "lucide-react";

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
import { useLocale, useTranslations } from "next-intl";
import { getLangDir } from "rtl-detect";
import ThemeButton from "../theme-button";
import LocaleSwitcher from "@/i18n/components/locale-switcher";
import { config } from "@/dashboard.config";

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
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
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
        <div className="w-full flex gap-2">
          <ThemeButton
            variant={"outline"}
            className="bg-transparent shrink-0"
          />
          <LocaleSwitcher
            variant={"outline"}
            className="bg-transparent w-full"
          />
        </div>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
