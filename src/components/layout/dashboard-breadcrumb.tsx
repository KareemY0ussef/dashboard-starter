"use client";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { config } from "@/dashboard.config";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function DashboardBreadcrumb() {
  const t = useTranslations();
  const pathname = usePathname();
  const paths = pathname
    .split("/")
    .flatMap((part, index, arr) =>
      index === arr.length - 1 ? [part] : [part, "/"]
    )
    .filter(Boolean);
  const sidebarItems = config.sidebarItems(t);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths
          .map((item, index) => {
            const url = paths.slice(0, index + 1).join("");
            const navItem = sidebarItems.navMain.find(
              (item) => item.url === (url === "" ? "/" : url)
            );
            if (!navItem) return null;
            return (
              <BreadcrumbItem
                key={`dashboard-breadcrumb-item-${index}`}
                className={index === paths.length - 1 ? "" : "hidden md:block"}
              >
                {index === paths.length - 1 ? (
                  <BreadcrumbPage>{navItem.title}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={navItem.url}>{navItem.title}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            );
          })
          .filter(Boolean)
          .reduce((prev, curr, index) => (
            <>
              {prev}
              <BreadcrumbSeparator
                className="hidden md:block"
                key={`separator-${index}`}
              />
              {curr}
            </>
          ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
