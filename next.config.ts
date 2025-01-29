import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/lib/i18n-request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "ola1blpswxbeinv6.public.blob.vercel-storage.com" },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: false,
    },
  },
};

export default withNextIntl(nextConfig);
