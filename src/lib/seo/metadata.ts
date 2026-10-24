import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { isIndexingEnabled } from "@/lib/env";

export function buildPageMetadata({
  title,
  description,
  path = "/",
  noIndex,
}: {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
}): Metadata {
  const indexing = isIndexingEnabled() && !noIndex;
  const url = new URL(path, process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000");

  return {
    title,
    description,
    alternates: { canonical: url.toString() },
    robots: indexing
      ? { index: true, follow: true }
      : { index: false, follow: false, nocache: true },
    openGraph: {
      title,
      description,
      url: url.toString(),
      siteName: siteConfig.name,
      locale: "en_US",
      type: "website",
    },
  };
}
