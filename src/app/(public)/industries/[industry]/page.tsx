import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getIndustryBySlug } from "@/config/industries";
import {
  ActiveFilterChips,
  ListingFilters,
} from "@/features/search/components/listing-filters";
import { ListingResults } from "@/features/listings/components/listing-results";
import { parseListingSearchParams } from "@/features/search/schemas/listing-search.schema";
import { toListPublicFilters } from "@/features/search/lib/to-list-filters";
import { listPublicListings } from "@/server/repositories/sqlite/listings";
import { Button } from "@/components/ui/button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry: industrySlug } = await params;
  const industry = getIndustryBySlug(industrySlug);
  if (!industry) {
    return buildPageMetadata({
      title: "Industry not found",
      description: "Unknown industry.",
      path: `/industries/${industrySlug}`,
      noIndex: true,
    });
  }
  return buildPageMetadata({
    title: `${industry.name} opportunities in Tennessee`,
    description: industry.summary,
    path: `/industries/${industry.slug}`,
  });
}

async function IndustryPageBody({
  params,
  searchParams,
}: {
  params: Promise<{ industry: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { industry: industrySlug } = await params;
  const industry = getIndustryBySlug(industrySlug);
  if (!industry) notFound();

  const filters = parseListingSearchParams(await searchParams);
  const result = listPublicListings(
    toListPublicFilters(filters, { industrySlug: industry.slug }),
  );

  return (
    <>
      <header className="space-y-3">
        <p className="text-sm text-[var(--text-body)]">
          <Link href="/industries" className="hover:text-[var(--brand-blue-accessible-light)]">
            Industries
          </Link>{" "}
          / {industry.name}
        </p>
        <h1 className="font-[family-name:var(--font-google-sans)] text-4xl font-bold text-[var(--text-heading)]">
          {industry.name}
        </h1>
        <p className="max-w-3xl text-[var(--text-body)]">{industry.summary}</p>
      </header>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
        <ListingFilters
          lockIndustry
          defaults={{
            q: filters.q,
            city: filters.city,
            region: filters.region,
            industry: industry.slug,
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
          <div className="space-y-2 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] px-4 py-3">
            <p className="text-sm font-semibold text-[var(--text-heading)]">
              {result.total} {industry.name.toLowerCase()} listing
              {result.total === 1 ? "" : "s"}
            </p>
            <ActiveFilterChips filters={{ ...filters, industry: industry.slug }} />
          </div>
          <ListingResults
            result={result}
            view={filters.view}
            emptyTitle={`No ${industry.name.toLowerCase()} listings`}
            emptyDescription="Try another city or browse all opportunity types."
            emptyActionHref="/businesses-for-sale"
            emptyActionLabel="Browse for sale"
          />
        </div>
      </div>
    </>
  );
}

export default function IndustryDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ industry: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <div className="mx-auto w-full max-w-[80rem] space-y-8 px-4 py-10">
      <Suspense
        fallback={
          <div className="h-96 animate-pulse rounded-[var(--radius-card)] bg-[var(--surface-subtle)]" />
        }
      >
        <IndustryPageBody params={params} searchParams={searchParams} />
      </Suspense>
      <div className="flex justify-end">
        <Button asChild variant="outline">
          <Link href="/">← Back to home</Link>
        </Button>
      </div>
    </div>
  );
}
