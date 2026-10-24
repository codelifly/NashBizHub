import type { OpportunityKind, ListingPublicationStatus } from "@/lib/constants";
import type { Money, RecurringMoney } from "@/lib/money";

export type Disclosure<T> =
  | { status: "disclosed"; value: T }
  | { status: "undisclosed" | "not-applicable" };

export type ListingCommercial =
  | {
      kind: "sale";
      asking: Disclosure<Money>;
      revenue: Disclosure<Money & { periodStart?: string; periodEnd?: string }>;
      earnings: Disclosure<{
        measure: string;
        amount: Money;
        adjustmentNote?: string;
      }>;
      inventoryIncluded: boolean;
      propertyPosition: string;
      transitionTraining: string;
      conditions: string[];
    }
  | {
      kind: "business-rental";
      rent: Disclosure<RecurringMoney>;
      termMonths: number;
      availableFrom?: string;
      securityArrangement: string;
      responsibilities: string[];
      handbackExpectations: string;
      includedAssets: string[];
    }
  | {
      kind: "premises-lease";
      baseRent: Disclosure<RecurringMoney>;
      areaSqFt: number;
      propertyUse: string;
      fitOut: string;
      outgoings: string;
      viewingNotes: string;
    }
  | {
      kind: "management-contract";
      proposedTermMonths: number;
      decisionRights: string[];
      duties: string[];
      reporting: string[];
      performanceMeasures: string[];
      commercialModel: string;
    }
  | {
      kind: "service-tender";
      deadlineAt: string;
      durationMonths: number;
      deliverables: string[];
      eligibility: string[];
      clarificationProcess: string;
      milestones: string[];
    };

export type PublicListing = {
  id: string;
  publicCode: string;
  kind: OpportunityKind;
  slug: string;
  title: string;
  summary: string;
  description: string;
  status: ListingPublicationStatus;
  citySlug: string;
  cityName: string;
  industrySlug: string;
  industryName: string;
  timeZone: string;
  confidential: boolean;
  locationLabel: string;
  heroImage: string | null;
  gallery: string[];
  commercial: ListingCommercial;
  operations: Record<string, unknown>;
  inclusions: string[];
  exclusions: string[];
  brokerSlug: string | null;
  publishedAt: string | null;
  expiresAt: string | null;
};

export type ListingCardData = Pick<
  PublicListing,
  | "id"
  | "publicCode"
  | "kind"
  | "slug"
  | "title"
  | "summary"
  | "status"
  | "citySlug"
  | "cityName"
  | "industrySlug"
  | "industryName"
  | "confidential"
  | "locationLabel"
  | "heroImage"
  | "commercial"
>;
