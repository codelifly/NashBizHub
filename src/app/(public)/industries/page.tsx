import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { industries } from "@/config/industries";
import { listPublicListings } from "@/server/repositories/sqlite/listings";

export const metadata = buildPageMetadata({
  title: "Industries",
  description:
    "Browse NashBizHub demonstration listings by industry—from restaurants to commercial cleaning.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <div className="mx-auto max-w-[80rem] space-y-8 px-4 py-10">
      <header className="space-y-3">
        <h1>Industries</h1>
        <p className="max-w-3xl text-[var(--text-body)]">
          Category hubs for Tennessee demonstration inventory. Counts reflect currently public
          fictional listings.
        </p>
      </header>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry) => {
          const count = listPublicListings({
            industrySlug: industry.slug,
            pageSize: 1,
          }).total;
          return (
            <li key={industry.slug}>
              <Link
                href={`/industries/${industry.slug}`}
                className="block h-full rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-5 hover:border-[var(--brand-blue-accessible-light)]"
              >
                <h2 className="text-xl">{industry.name}</h2>
                <p className="mt-2 text-sm text-[var(--text-body)]">{industry.summary}</p>
                <p className="mt-4 text-sm text-[var(--text-body)]">
                  {count} listing{count === 1 ? "" : "s"}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
