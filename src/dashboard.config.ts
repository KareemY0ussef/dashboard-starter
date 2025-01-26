import { Image, LayoutGrid, Shield } from "lucide-react";

export const config = {
  sidebarItems: (t: (key: string) => string) => {
    return {
      user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
      },
      navMain: [
        {
          title: t("dashboard.pages.home"),
          url: "/",
          icon: LayoutGrid,
        },
        {
          title: t("dashboard.pages.admins"),
          url: "/admins",
          icon: Shield,
        },
        {
          title: t("dashboard.pages.media"),
          url: "/media",
          icon: Image,
        },
      ],
    };
  },
};
