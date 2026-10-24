import {
  isDisclosedOnly,
  parseDollarToMinor,
  type ListingSearchParams,
} from "@/features/search/schemas/listing-search.schema";
import type { OpportunityKind } from "@/lib/constants";
import type {
  ListingSort,
  ListPublicListingsFilters,
} from "@/server/repositories/sqlite/listings";

export function toListPublicFilters(
  filters: ListingSearchParams,
  extras?: { kind?: OpportunityKind; citySlug?: string; industrySlug?: string },
): ListPublicListingsFilters {
  const status =
    filters.status === "active" || filters.status === "under-negotiation"
      ? filters.status
      : undefined;

  return {
    kind: extras?.kind ?? filters.kind,
    citySlug: extras?.citySlug ?? (filters.city || undefined),
    region: filters.region || undefined,
    industrySlug: extras?.industrySlug ?? (filters.industry || undefined),
    query: filters.q || undefined,
    status,
    includeConfidential: filters.confidential !== "hide",
    confidentialOnly: filters.confidential === "only",
    minAmountMinor: parseDollarToMinor(filters.minAmount),
    maxAmountMinor: parseDollarToMinor(filters.maxAmount),
    disclosedOnly: isDisclosedOnly(filters.disclosedOnly),
    sort: filters.sort as ListingSort,
    page: filters.page,
    pageSize: filters.pageSize,
  };
}

export function listingSearchToQuery(filters: ListingSearchParams): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.q) params.set("q", filters.q);
  if (filters.city) params.set("city", filters.city);
  if (filters.region) params.set("region", filters.region);
  if (filters.industry) params.set("industry", filters.industry);
  if (filters.sort !== "newest") params.set("sort", filters.sort);
  if (filters.confidential) params.set("confidential", filters.confidential);
  if (filters.status) params.set("status", filters.status);
  if (filters.minAmount) params.set("minAmount", filters.minAmount);
  if (filters.maxAmount) params.set("maxAmount", filters.maxAmount);
  if (isDisclosedOnly(filters.disclosedOnly)) params.set("disclosedOnly", "1");
  if (filters.view !== "grid") params.set("view", filters.view);
  if (filters.pageSize !== 12) params.set("pageSize", String(filters.pageSize));
  if (filters.page > 1) params.set("page", String(filters.page));
  return params;
}
