import { describe, expect, it } from "vitest";
import {
  listingSearchFilterSchema,
  parseListingSearchFilters,
} from "@/lib/listings/search-filters";

describe("listingSearchFilterSchema", () => {
  it("accepts empty filters", () => {
    expect(parseListingSearchFilters({})).toEqual({});
  });

  it("accepts kind, city, and sort", () => {
    const parsed = parseListingSearchFilters({
      kind: "sale",
      citySlug: "nashville",
      sort: "asking-desc",
      page: "2",
      pageSize: "12",
    });
    expect(parsed.kind).toBe("sale");
    expect(parsed.citySlug).toBe("nashville");
    expect(parsed.sort).toBe("asking-desc");
    expect(parsed.page).toBe(2);
    expect(parsed.pageSize).toBe(12);
  });

  it("rejects invalid kind", () => {
    const result = listingSearchFilterSchema.safeParse({ kind: "auction" });
    expect(result.success).toBe(false);
  });

  it("rejects oversized pageSize", () => {
    const result = listingSearchFilterSchema.safeParse({ pageSize: 500 });
    expect(result.success).toBe(false);
  });
});
