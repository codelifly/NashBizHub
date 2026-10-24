import { z } from "zod";
import {
  LISTING_PUBLICATION_STATUSES,
  OPPORTUNITY_KINDS,
} from "@/lib/constants";

export const listingSortSchema = z.enum([
  "newest",
  "asking-asc",
  "asking-desc",
]);

export const listingSearchFilterSchema = z.object({
  kind: z
    .union([
      z.enum(OPPORTUNITY_KINDS),
      z.array(z.enum(OPPORTUNITY_KINDS)),
    ])
    .optional(),
  citySlug: z.string().min(1).optional(),
  industrySlug: z.string().min(1).optional(),
  query: z.string().max(200).optional(),
  status: z
    .union([
      z.enum(LISTING_PUBLICATION_STATUSES),
      z.array(z.enum(LISTING_PUBLICATION_STATUSES)),
    ])
    .optional(),
  includeConfidential: z.boolean().optional(),
  sort: listingSortSchema.optional(),
  page: z.coerce.number().int().min(1).optional(),
  pageSize: z.coerce.number().int().min(1).max(100).optional(),
});

export type ListingSearchFilters = z.infer<typeof listingSearchFilterSchema>;

export function parseListingSearchFilters(
  input: unknown,
): ListingSearchFilters {
  return listingSearchFilterSchema.parse(input);
}
