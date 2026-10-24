import type { MetadataRoute } from "next";
import { isIndexingEnabled } from "@/lib/env";
import { getPublicRouteManifest } from "@/lib/seo/public-route-manifest";
import { listingFixtures } from "@/server/db/seeds/listing-fixtures";
import { brokerFixtures } from "@/server/db/seeds/broker-fixtures";
import { contentFixtures } from "@/server/db/seeds/content-fixtures";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isIndexingEnabled()) {
    return [];
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const now = new Date();

  const staticRoutes = getPublicRouteManifest()
    .filter((route) => route.indexableInProduction)
    .map((route) => ({
      url: new URL(route.path, siteUrl).toString(),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: route.path === "/" ? 1 : 0.7,
    }));

  const listingRoutes = listingFixtures
    .filter((listing) =>
      listing.status === "active" || listing.status === "under-negotiation",
    )
    .map((listing) => ({
      url: new URL(`/listings/${listing.slug}`, siteUrl).toString(),
      lastModified: listing.publishedAt ? new Date(listing.publishedAt) : now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

  const brokerRoutes = brokerFixtures.map((broker) => ({
    url: new URL(`/brokers/${broker.slug}`, siteUrl).toString(),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const resourceRoutes = contentFixtures
    .filter((article) => article.status === "published")
    .map((article) => ({
      url: new URL(`/resources/${article.slug}`, siteUrl).toString(),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }));

  return [...staticRoutes, ...listingRoutes, ...brokerRoutes, ...resourceRoutes];
}
