import { Suspense } from "react";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { COMPARE_LIMIT } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { StatusBadge } from "@/components/shared/status-badge";
import { MoneyText, RecurringMoneyText } from "@/components/shared/money";
import { kindLabels } from "@/features/listings/lib/kind-labels";
import { getListingsByIds } from "@/server/repositories/sqlite/listings";
import type { ListingCardData } from "@/features/listings/types";

export const metadata = buildPageMetadata({
  title: "Compare listings",
  description: "Compare up to four fictional NashBizHub listings side by side.",
  path: "/compare",
  noIndex: true,
});

function commercialLine(listing: ListingCardData) {
  const c = listing.commercial;
  if (c.kind === "sale") {
    return c.asking.status === "disclosed" ? (
      <MoneyText value={c.asking.value} />
    ) : (
      "Asking undisclosed"
    );
  }
  if (c.kind === "business-rental") {
    return c.rent.status === "disclosed" ? (
      <RecurringMoneyText value={c.rent.value} />
    ) : (
      "Rent undisclosed"
    );
  }
  if (c.kind === "premises-lease") {
    return c.baseRent.status === "disclosed" ? (
      <RecurringMoneyText value={c.baseRent.value} />
    ) : (
      "Base rent undisclosed"
    );
  }
  if (c.kind === "management-contract") {
    return `${c.proposedTermMonths}-month term`;
  }
  return `Deadline ${new Date(c.deadlineAt).toLocaleDateString("en-US")}`;
}

async function CompareResults({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const raw = params.ids;
  const ids = (Array.isArray(raw) ? raw.join(",") : raw ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean)
    .slice(0, COMPARE_LIMIT);

  const listings = getListingsByIds(ids);

  if (listings.length === 0) {
    return (
      <EmptyState
        title="Nothing to compare yet"
        description="Open a listing and choose Add to compare, or browse search results to pick opportunities."
        actionHref="/businesses-for-sale"
        actionLabel="Browse businesses for sale"
      />
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--border-subtle)]">
              <th className="p-3 font-medium text-[var(--text-body)]">Field</th>
              {listings.map((listing) => (
                <th key={listing.id} className="min-w-[14rem] p-3 align-top">
                  <div className="space-y-2">
                    <StatusBadge label={kindLabels[listing.kind]} tone="info" />
                    <Link
                      href={`/listings/${listing.slug}`}
                      className="block font-semibold text-[var(--text-heading)] underline-offset-4 hover:underline"
                    >
                      {listing.title}
                    </Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(
              [
                ["City", (l: ListingCardData) => `${l.cityName}, TN`],
                ["Industry", (l: ListingCardData) => l.industryName],
                ["Location", (l: ListingCardData) => l.locationLabel],
                ["Commercial", (l: ListingCardData) => commercialLine(l)],
                ["Summary", (l: ListingCardData) => l.summary],
                ["Code", (l: ListingCardData) => l.publicCode],
              ] as const
            ).map(([label, render]) => (
              <tr key={label} className="border-b border-[var(--border-subtle)] align-top">
                <th className="p-3 font-medium text-[var(--text-body)]">{label}</th>
                {listings.map((listing) => (
                  <td key={listing.id} className="p-3 text-[var(--text-heading)]">
                    {render(listing)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button asChild variant="secondary">
          <Link href="/businesses-for-sale">Add more from search</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/compare">Clear comparison</Link>
        </Button>
      </div>
    </>
  );
}

export default function ComparePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <div className="mx-auto max-w-[80rem] space-y-8 px-4 py-10">
      <header className="space-y-3">
        <h1>Compare listings</h1>
        <p className="max-w-2xl text-[var(--text-body)]">
          Side-by-side comparison for up to {COMPARE_LIMIT} fictional opportunities. Pass listing
          ids with <code className="rounded bg-[var(--surface-subtle)] px-1.5 py-0.5 text-sm">?ids=</code>.
        </p>
      </header>
      <Suspense
        fallback={
          <div className="h-64 animate-pulse rounded-[var(--radius-card)] bg-[var(--surface-subtle)]" />
        }
      >
        <CompareResults searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
