import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { buildPageMetadata } from "@/lib/seo/metadata";
import {
  approvedCityIntents,
  getCityBySlug,
} from "@/config/tennessee-locations";
import { cityHeroImages, siteHeroImage } from "@/config/listing-images";
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
  params: Promise<{ city: string }>;
}) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) {
    return buildPageMetadata({
      title: "City not found",
      description: "Unknown Tennessee city.",
      path: `/tennessee/${citySlug}`,
      noIndex: true,
    });
  }
  return buildPageMetadata({
    title: `Business opportunities in ${city.name}, TN`,
    description: city.summary,
    path: `/tennessee/${city.slug}`,
  });
}

async function CityPageBody({
  params,
  searchParams,
}: {
  params: Promise<{ city: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const filters = parseListingSearchParams(await searchParams);
  const result = listPublicListings(
    toListPublicFilters(filters, { citySlug: city.slug }),
  );

  return (
    <>
      <header className="space-y-5">
        <div className="relative aspect-[21/9] overflow-hidden rounded-[1.5rem]">
          <Image
            src={cityHeroImages[city.slug] ?? siteHeroImage}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081827]/80 via-[#081827]/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
            <p className="text-sm text-white/80">
              <Link href="/tennessee" className="hover:underline">
                Tennessee
              </Link>{" "}
              / {city.name}
            </p>
            <h1 className="mt-2 !text-[#5CB8FF]">
              {city.name}
              <span className="!text-white">, Tennessee</span>
            </h1>
          </div>
        </div>
        <p className="max-w-3xl text-[var(--text-body)]">{city.summary}</p>
        <ul className="flex flex-wrap gap-2 pt-2">
          {approvedCityIntents.map((intent) => (
            <li key={intent}>
              <Link
                href={`/${intent}?city=${city.slug}`}
                className="rounded-[var(--radius-control)] border border-[var(--border-subtle)] bg-[var(--surface-card)] px-3 py-1.5 text-sm hover:border-[var(--brand-blue-accessible-light)]"
              >
                {intent.replaceAll("-", " ")}
              </Link>
            </li>
          ))}
        </ul>
      </header>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
        <ListingFilters
          lockCity
          defaults={{
            q: filters.q,
            city: city.slug,
            region: filters.region || city.region,
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
          <div className="space-y-2 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] px-4 py-3">
            <p className="text-sm font-semibold text-[var(--text-heading)]">
              {result.total} listing{result.total === 1 ? "" : "s"} in {city.name}
            </p>
            <ActiveFilterChips filters={{ ...filters, city: city.slug }} />
          </div>
          <ListingResults
            result={result}
            view={filters.view}
            emptyTitle={`No listings in ${city.name} yet`}
            emptyDescription="Try another industry filter or browse statewide inventory."
            emptyActionHref="/businesses-for-sale"
            emptyActionLabel="Browse statewide"
          />
        </div>
      </div>
    </>
  );
}

export default function TennesseeCityPage({
  params,
  searchParams,
}: {
  params: Promise<{ city: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <div className="mx-auto w-full max-w-[80rem] space-y-8 px-4 py-10">
      <Suspense
        fallback={
          <div className="h-96 animate-pulse rounded-[var(--radius-card)] bg-[var(--surface-subtle)]" />
        }
      >
        <CityPageBody params={params} searchParams={searchParams} />
      </Suspense>
      <div className="flex justify-end">
        <Button asChild variant="outline">
          <Link href="/">← Back to home</Link>
        </Button>
      </div>
    </div>
  );
}
