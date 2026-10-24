export const OPPORTUNITY_KINDS = [
  "sale",
  "business-rental",
  "premises-lease",
  "management-contract",
  "service-tender",
] as const;

export type OpportunityKind = (typeof OPPORTUNITY_KINDS)[number];

export const LISTING_PUBLICATION_STATUSES = [
  "draft",
  "submitted",
  "changes-requested",
  "approved",
  "active",
  "paused",
  "under-negotiation",
  "completed",
  "expired",
  "withdrawn",
  "suspended",
] as const;

export type ListingPublicationStatus = (typeof LISTING_PUBLICATION_STATUSES)[number];

export const ANCHOR_LISTING_IDS = {
  sale: "NBH-S-1001",
  rental: "NBH-R-2001",
  premises: "NBH-L-2101",
  management: "NBH-M-3001",
  tender: "NBH-T-4001",
} as const;

export const COMPARE_LIMIT = 4;
export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
export const ALLOWED_UPLOAD_EXTENSIONS = [".pdf", ".txt", ".png", ".jpg", ".jpeg", ".webp"] as const;
