import { z } from "zod";
import { OPPORTUNITY_KINDS } from "@/lib/constants";

export const listingSortValues = ["newest", "asking-asc", "asking-desc"] as const;
export const confidentialFilterValues = ["", "hide", "only"] as const;
export const statusFilterValues = ["", "active", "under-negotiation"] as const;
export const viewFilterValues = ["grid", "list"] as const;

export const listingSearchSchema = z.object({
  q: z.string().trim().max(120).optional().default(""),
  city: z.string().trim().max(80).optional().default(""),
  region: z.string().trim().max(80).optional().default(""),
  industry: z.string().trim().max(80).optional().default(""),
  sort: z.enum(listingSortValues).optional().default("newest"),
  kind: z.enum(OPPORTUNITY_KINDS).optional(),
  confidential: z.enum(["hide", "only"]).or(z.literal("")).optional().default(""),
  status: z
    .enum(["active", "under-negotiation"])
    .or(z.literal(""))
    .optional()
    .default(""),
  minAmount: z.string().trim().max(20).optional().default(""),
  maxAmount: z.string().trim().max(20).optional().default(""),
  disclosedOnly: z
    .union([z.literal("1"), z.literal("true"), z.literal("yes"), z.literal("")])
    .optional()
    .default(""),
  view: z.enum(viewFilterValues).optional().default("grid"),
  page: z.coerce.number().int().min(1).optional().default(1),
  pageSize: z.coerce.number().int().min(1).max(48).optional().default(12),
});

export type ListingSearchParams = z.infer<typeof listingSearchSchema>;

function firstString(
  value: string | string[] | undefined,
): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

/** Parse URL search params for listing discovery pages. */
export function parseListingSearchParams(
  input: Record<string, string | string[] | undefined>,
): ListingSearchParams {
  const raw = {
    q: firstString(input.q) ?? firstString(input.query),
    city: firstString(input.city),
    region: firstString(input.region),
    industry: firstString(input.industry),
    sort: firstString(input.sort),
    kind: firstString(input.kind),
    confidential: firstString(input.confidential) ?? "",
    status: firstString(input.status) ?? "",
    minAmount: firstString(input.minAmount) ?? "",
    maxAmount: firstString(input.maxAmount) ?? "",
    disclosedOnly: firstString(input.disclosedOnly) ?? "",
    view: firstString(input.view),
    page: firstString(input.page),
    pageSize: firstString(input.pageSize),
  };

  const parsed = listingSearchSchema.safeParse(raw);
  if (parsed.success) return parsed.data;
  return listingSearchSchema.parse({});
}

export function parseDollarToMinor(raw: string): number | undefined {
  const cleaned = raw.replace(/[$,\s]/g, "").trim();
  if (!cleaned) return undefined;
  const n = Number(cleaned);
  if (!Number.isFinite(n) || n < 0) return undefined;
  return Math.round(n * 100);
}

export function isDisclosedOnly(value: string): boolean {
  return value === "1" || value === "true" || value === "yes";
}
