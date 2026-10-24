import Link from "next/link";
import Image from "next/image";
import {
  ActiveFilterChips,
  ListingFilters,
} from "@/features/search/components/listing-filters";
import { ListingResults } from "@/features/listings/components/listing-results";
import { parseListingSearchParams } from "@/features/search/schemas/listing-search.schema";
import {
  listingSearchToQuery,
  toListPublicFilters,
} from "@/features/search/lib/to-list-filters";
import { kindLabels } from "@/features/listings/lib/kind-labels";
import type { OpportunityKind } from "@/lib/constants";
import { listPublicListings } from "@/server/repositories/sqlite/listings";
import { siteHeroImage } from "@/config/listing-images";
import { Button } from "@/components/ui/button";

export function KindSearchFallback({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-[80rem] space-y-8 px-4 py-10">
      <header className="on-dark overflow-hidden rounded-[var(--radius-dialog)] bg-[linear-gradient(125deg,#081827_0%,#0b3d91_55%,#1e6ef4_100%)] px-6 py-10 text-white sm:px-8">
        <h1 className="max-w-3xl text-white">{title}</h1>
        <p className="mt-3 max-w-3xl text-white/80">{description}</p>
      </header>
      <div className="grid gap-8 lg:grid-cols-[17.5rem_minmax(0,1fr)]">
        <div className="h-96 animate-pulse rounded-[var(--radius-card)] bg-[var(--surface-subtle)]" />
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[4/5] animate-pulse rounded-[var(--radius-card)] bg-[var(--surface-subtle)]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const heroByKind: Partial<Record<OpportunityKind, string>> = {
  sale: "/images/listings/cafe-1.webp",
  "business-rental": "/images/listings/laundry-1.webp",
  "premises-lease": "/images/listings/retail-1.webp",
  "management-contract": "/images/listings/motel-1.webp",
  "service-tender": "/images/listings/cleaning-1.webp",
};

export async function KindSearchPage({
  kind,
  title,
  description,
  searchParams,
  path,
}: {
  kind: OpportunityKind;
  title: string;
  description: string;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
  path: string;
}) {
  const filters = parseListingSearchParams(await searchParams);
  const result = listPublicListings(toListPublicFilters(filters, { kind }));

  const page = filters.page;
  const baseQuery = listingSearchToQuery({ ...filters, page: 1 });

  const prevHref =
    page > 1
      ? `?${new URLSearchParams({
          ...Object.fromEntries(baseQuery),
          page: String(page - 1),
        }).toString()}`
      : null;
  const nextHref =
    page < result.totalPages
      ? `?${new URLSearchParams({
          ...Object.fromEntries(baseQuery),
          page: String(page + 1),
        }).toString()}`
      : null;

  const hero = heroByKind[kind] ?? siteHeroImage;

  return (
    <div className="mx-auto max-w-[80rem] space-y-8 px-4 py-8 sm:py-10">
      <header className="on-dark relative overflow-hidden rounded-[1.5rem]">
        <Image
          src={hero}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(3,9,20,0.92)_0%,rgba(8,24,39,0.86)_50%,rgba(30,110,244,0.72)_100%)]" />
        <div className="relative px-6 py-10 sm:px-8 sm:py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] !text-[#5CB8FF]">
            {kindLabels[kind]}
          </p>
          <h1 className="mt-2 max-w-3xl font-[family-name:var(--font-google-sans)] text-3xl font-bold !text-white sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-3xl text-base !text-white/85 sm:text-lg">{description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="!text-white">
              <Link href="/signup">Create account</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/40 bg-transparent !text-white hover:bg-white/10"
            >
              <Link href="/compare">Compare shortlist</Link>
            </Button>
            <Button asChild variant="ghost" className="!text-white hover:bg-white/10">
              <Link href="/">← Back to home</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
        <ListingFilters
          kind={kind}
          defaults={{
            q: filters.q,
            city: filters.city,
            region: filters.region,
            industry: filters.industry,
            sort: filters.sort,
            confidential: filters.confidential,
            status: filters.status,
            minAmount: filters.minAmount,
            maxAmount: filters.maxAmount,
            disclosedOnly: filters.disclosedOnly,
            view: filters.view,
            pageSize: filters.pageSize,
          }}
        />

        <div className="min-w-0 flex-1 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] px-4 py-3">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-[var(--text-heading)]">
                {result.total} result{result.total === 1 ? "" : "s"}
                {filters.city || filters.region || filters.industry
                  ? " matching your filters"
                  : " across Tennessee"}
              </p>
              <ActiveFilterChips filters={filters} />
            </div>
            <Button asChild variant="secondary" size="sm">
              <Link href="/dashboard/saved-searches">Save this search</Link>
            </Button>
          </div>

          <ListingResults
            result={result}
            view={filters.view}
            emptyActionHref={path}
            emptyActionLabel="Clear and browse again"
          />

          {result.totalPages > 1 ? (
            <div className="flex items-center justify-between gap-4 border-t border-[var(--border-subtle)] pt-4">
              {prevHref ? (
                <Button asChild variant="secondary">
                  <Link href={prevHref}>Previous</Link>
                </Button>
              ) : (
                <span />
              )}
              <p className="text-sm text-[var(--text-body)]">
                Page {page} of {result.totalPages}
              </p>
              {nextHref ? (
                <Button asChild variant="secondary">
                  <Link href={nextHref}>Next</Link>
                </Button>
              ) : (
                <span />
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
