import type { MetadataRoute } from "next";
import { isIndexingEnabled } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  if (!isIndexingEnabled()) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/admin/", "/login", "/compare"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
