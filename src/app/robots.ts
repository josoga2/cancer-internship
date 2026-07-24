import type { MetadataRoute } from "next";
import { SITE_BASE_URL } from "@/lib/page-metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dashboard/",
        "/login",
        "/register",
        "/forgot-password",
        "/reset-password/",
        "/set-password",
        "/cshjxrf02b7dbb0e24e34f17a6f3e1f63f2024",
      ],
    },
    sitemap: `${SITE_BASE_URL}/sitemap.xml`,
    host: SITE_BASE_URL,
  };
}
