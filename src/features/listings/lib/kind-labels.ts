import type { OpportunityKind } from "@/lib/constants";

export const kindLabels: Record<OpportunityKind, string> = {
  sale: "Business for sale",
  "business-rental": "Business for rent",
  "premises-lease": "Commercial premises for lease",
  "management-contract": "Management contract",
  "service-tender": "Service contract / tender",
};

export const kindRoutes: Record<OpportunityKind, string> = {
  sale: "/businesses-for-sale",
  "business-rental": "/businesses-for-rent",
  "premises-lease": "/commercial-properties-for-lease",
  "management-contract": "/management-contracts",
  "service-tender": "/service-contracts",
};
