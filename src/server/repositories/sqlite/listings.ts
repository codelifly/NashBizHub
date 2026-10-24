import { getCityBySlug, tennesseeCities } from "@/config/tennessee-locations";
import { getIndustryBySlug, industries } from "@/config/industries";
import type { ListingCardData, PublicListing } from "@/features/listings/types";
import type { ListingPublicationStatus, OpportunityKind } from "@/lib/constants";
import { normalizePagination, toPaginated, type Paginated } from "@/lib/pagination";
import {
  listingFixtures,
  type SeedListing,
} from "@/server/db/seeds/listing-fixtures";
import { imagesForListing } from "@/config/listing-images";

/** Public statuses shown on marketplace search by default. */
export const DEFAULT_PUBLIC_STATUSES: ListingPublicationStatus[] = [
  "active",
  "under-negotiation",
];

export type ListingSort = "newest" | "asking-asc" | "asking-desc";

export type ListPublicListingsFilters = {
  kind?: OpportunityKind | OpportunityKind[];
  citySlug?: string;
  /** Match cities in a Tennessee region (e.g. Middle Tennessee). */
  region?: string;
  industrySlug?: string;
  query?: string;
  status?: ListingPublicationStatus | ListingPublicationStatus[];
  /** Include confidential listings that are otherwise public-status (default true). */
  includeConfidential?: boolean;
  /** When true, only confidential listings. */
  confidentialOnly?: boolean;
  /** Inclusive amount band in minor units (asking / rent / base rent when disclosed). */
  minAmountMinor?: number;
  maxAmountMinor?: number;
  /** Exclude listings with undisclosed primary amount. */
  disclosedOnly?: boolean;
  sort?: ListingSort;
  page?: number;
  pageSize?: number;
};

function cityName(slug: string): string {
  return getCityBySlug(slug)?.name ?? tennesseeCities[0]?.name ?? slug;
}

function industryName(slug: string): string {
  return getIndustryBySlug(slug)?.name ?? industries[0]?.name ?? slug;
}

function toPublicListing(seed: SeedListing): PublicListing {
  const photos = imagesForListing({
    industrySlug: seed.industrySlug,
    kind: seed.kind,
    publicCode: seed.publicCode,
  });
  return {
    id: seed.id,
    publicCode: seed.publicCode,
    kind: seed.kind,
    slug: seed.slug,
    title: seed.title,
    summary: seed.summary,
    description: seed.description,
    status: seed.status,
    citySlug: seed.citySlug,
    cityName: cityName(seed.citySlug),
    industrySlug: seed.industrySlug,
    industryName: industryName(seed.industrySlug),
    timeZone: seed.timeZone,
    confidential: seed.confidential,
    locationLabel: seed.locationLabel,
    heroImage: photos.heroImage,
    gallery: photos.gallery,
    commercial: seed.commercial,
    operations: seed.operations,
    inclusions: seed.inclusions,
    exclusions: seed.exclusions,
    brokerSlug: seed.brokerSlug ?? null,
    publishedAt: seed.publishedAt,
    expiresAt: seed.expiresAt ?? null,
  };
}

function toCardData(listing: PublicListing): ListingCardData {
  return {
    id: listing.id,
    publicCode: listing.publicCode,
    kind: listing.kind,
    slug: listing.slug,
    title: listing.title,
    summary: listing.summary,
    status: listing.status,
    citySlug: listing.citySlug,
    cityName: listing.cityName,
    industrySlug: listing.industrySlug,
    industryName: listing.industryName,
    confidential: listing.confidential,
    locationLabel: listing.locationLabel,
    heroImage: listing.heroImage,
    commercial: listing.commercial,
  };
}

const allListings: PublicListing[] = listingFixtures.map(toPublicListing);

function asArray<T>(value: T | T[] | undefined): T[] | undefined {
  if (value === undefined) return undefined;
  return Array.isArray(value) ? value : [value];
}

function disclosedAskingMinor(listing: PublicListing): number | null {
  const c = listing.commercial;
  if (c.kind === "sale" && c.asking.status === "disclosed") {
    return c.asking.value.minorUnits;
  }
  if (c.kind === "business-rental" && c.rent.status === "disclosed") {
    return c.rent.value.minorUnits;
  }
  if (c.kind === "premises-lease" && c.baseRent.status === "disclosed") {
    return c.baseRent.value.minorUnits;
  }
  return null;
}

function sortListings(items: PublicListing[], sort: ListingSort): PublicListing[] {
  const copy = [...items];
  if (sort === "newest") {
    copy.sort((a, b) => {
      const at = a.publishedAt ? Date.parse(a.publishedAt) : 0;
      const bt = b.publishedAt ? Date.parse(b.publishedAt) : 0;
      return bt - at;
    });
    return copy;
  }

  copy.sort((a, b) => {
    const am = disclosedAskingMinor(a);
    const bm = disclosedAskingMinor(b);
    if (am === null && bm === null) return 0;
    if (am === null) return 1;
    if (bm === null) return -1;
    return sort === "asking-asc" ? am - bm : bm - am;
  });
  return copy;
}

function matchesQuery(listing: PublicListing, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    listing.title.toLowerCase().includes(q) ||
    listing.summary.toLowerCase().includes(q) ||
    listing.publicCode.toLowerCase().includes(q)
  );
}

function filterListings(filters: ListPublicListingsFilters = {}): PublicListing[] {
  const kinds = asArray(filters.kind);
  const statuses = asArray(filters.status) ?? DEFAULT_PUBLIC_STATUSES;
  const includeConfidential = filters.includeConfidential ?? true;
  const regionCities = filters.region
    ? new Set(
        tennesseeCities
          .filter((city) => city.region === filters.region)
          .map((city) => city.slug),
      )
    : null;

  return allListings.filter((listing) => {
    if (!statuses.includes(listing.status)) return false;
    // confidential-active: confidential listings remain visible when status is public
    if (filters.confidentialOnly && !listing.confidential) return false;
    if (!includeConfidential && listing.confidential) return false;
    if (kinds && !kinds.includes(listing.kind)) return false;
    if (filters.citySlug && listing.citySlug !== filters.citySlug) return false;
    if (regionCities && !regionCities.has(listing.citySlug)) return false;
    if (filters.industrySlug && listing.industrySlug !== filters.industrySlug) {
      return false;
    }
    if (filters.query && !matchesQuery(listing, filters.query)) return false;

    const amount = disclosedAskingMinor(listing);
    if (filters.disclosedOnly && amount === null) return false;
    if (filters.minAmountMinor != null) {
      if (amount === null || amount < filters.minAmountMinor) return false;
    }
    if (filters.maxAmountMinor != null) {
      if (amount === null || amount > filters.maxAmountMinor) return false;
    }
    return true;
  });
}

export function listPublicListings(
  filters: ListPublicListingsFilters = {},
): Paginated<ListingCardData> {
  const { page, pageSize, offset } = normalizePagination({
    page: filters.page,
    pageSize: filters.pageSize,
  });
  const sort = filters.sort ?? "newest";
  const filtered = sortListings(filterListings(filters), sort);
  const slice = filtered.slice(offset, offset + pageSize).map(toCardData);
  return toPaginated(slice, filtered.length, page, pageSize);
}

export function getListingBySlug(slug: string): PublicListing | null {
  return allListings.find((listing) => listing.slug === slug) ?? null;
}

export function getListingById(id: string): PublicListing | null {
  return allListings.find((listing) => listing.id === id) ?? null;
}

export function getFeaturedListings(limit = 6): ListingCardData[] {
  const featured = sortListings(
    filterListings({ status: DEFAULT_PUBLIC_STATUSES }),
    "newest",
  )
    .filter((listing) => !listing.confidential)
    .slice(0, Math.max(1, limit));
  return featured.map(toCardData);
}

export function getRelatedListings(
  listing: PublicListing | ListingCardData,
  limit = 4,
): ListingCardData[] {
  const related = filterListings({
    kind: listing.kind,
    status: DEFAULT_PUBLIC_STATUSES,
  }).filter(
    (item) =>
      item.id !== listing.id &&
      (item.citySlug === listing.citySlug ||
        item.industrySlug === listing.industrySlug),
  );

  const sameCity = related.filter((item) => item.citySlug === listing.citySlug);
  const rest = related.filter((item) => item.citySlug !== listing.citySlug);
  const ordered = [...sameCity, ...rest].slice(0, Math.max(1, limit));
  return ordered.map(toCardData);
}

/** Accepts listing ids or public slugs (compare tray uses slugs). */
export function getListingsByIds(idsOrSlugs: string[]): ListingCardData[] {
  const set = new Set(idsOrSlugs);
  const matched = allListings.filter(
    (listing) => set.has(listing.id) || set.has(listing.slug),
  );
  const order = new Map(idsOrSlugs.map((key, index) => [key, index]));
  return matched
    .sort(
      (a, b) =>
        (order.get(a.slug) ?? order.get(a.id) ?? 0) -
        (order.get(b.slug) ?? order.get(b.id) ?? 0),
    )
    .map(toCardData);
}

export function getListingsByBrokerSlug(
  brokerSlug: string,
  limit = 12,
): ListingCardData[] {
  return filterListings({ status: DEFAULT_PUBLIC_STATUSES })
    .filter((listing) => listing.brokerSlug === brokerSlug)
    .slice(0, Math.max(1, limit))
    .map(toCardData);
}
