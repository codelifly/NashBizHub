import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getPublicRouteManifest } from "@/lib/seo/public-route-manifest";

export const metadata = buildPageMetadata({
  title: "Sitemap",
  description: "HTML sitemap of public NashBizHub marketplace routes.",
  path: "/sitemap",
});

export default function HtmlSitemapPage() {
  const routes = getPublicRouteManifest();

  return (
    <div className="mx-auto max-w-[80rem] space-y-8 px-4 py-10">
      <header className="space-y-3">
        <h1>Sitemap</h1>
        <p className="max-w-3xl text-[var(--text-body)]">
          Public marketplace pages. Listing, broker, and resource detail URLs appear when those
          records are published in the demo inventory.
        </p>
      </header>
      <ul className="columns-1 gap-x-8 sm:columns-2 lg:columns-3">
        {routes.map((route) => (
          <li key={route.path} className="mb-2 break-inside-avoid">
            <Link
              href={route.path}
              className="text-[var(--brand-blue-accessible-light)] underline-offset-4 hover:underline"
            >
              {route.title}
            </Link>
            <span className="ml-2 text-xs text-[var(--text-body)]/70">{route.path}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
