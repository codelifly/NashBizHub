import { formatMoney, formatRecurringMoney } from "@/lib/money";
import { kindLabels } from "@/features/listings/lib/kind-labels";
import type { PublicListing } from "@/features/listings/types";

export type ListingHighlight = {
  label: string;
  value: string;
};

export function getListingHighlights(listing: PublicListing): ListingHighlight[] {
  const c = listing.commercial;
  const ops = listing.operations ?? {};
  const employees = typeof ops.employees === "number" ? String(ops.employees) : null;
  const years =
    typeof ops.yearsOperating === "number" ? `${ops.yearsOperating} yrs` : null;

  const rows: ListingHighlight[] = [
    { label: "Type", value: kindLabels[listing.kind] },
    {
      label: "Location",
      value: listing.confidential
        ? `${listing.cityName} area`
        : `${listing.cityName}, TN`,
    },
  ];

  if (c.kind === "sale") {
    rows.push({
      label: "Asking",
      value:
        c.asking.status === "disclosed"
          ? formatMoney(c.asking.value)
          : "On application",
    });
    rows.push({
      label: "Revenue",
      value:
        c.revenue.status === "disclosed"
          ? formatMoney(c.revenue.value)
          : "Undisclosed",
    });
    if (c.earnings.status === "disclosed") {
      rows.push({
        label: "Earnings",
        value: formatMoney(c.earnings.value.amount),
      });
    }
  } else if (c.kind === "business-rental") {
    rows.push({
      label: "Rent",
      value:
        c.rent.status === "disclosed"
          ? formatRecurringMoney(c.rent.value)
          : "Undisclosed",
    });
    rows.push({ label: "Term", value: `${c.termMonths} months` });
  } else if (c.kind === "premises-lease") {
    rows.push({
      label: "Base rent",
      value:
        c.baseRent.status === "disclosed"
          ? formatRecurringMoney(c.baseRent.value)
          : "Undisclosed",
    });
    rows.push({
      label: "Area",
      value: `${c.areaSqFt.toLocaleString("en-US")} sq ft`,
    });
  } else if (c.kind === "management-contract") {
    rows.push({ label: "Term", value: `${c.proposedTermMonths} months` });
    rows.push({ label: "Model", value: c.commercialModel });
  } else {
    rows.push({
      label: "Deadline",
      value: new Date(c.deadlineAt).toLocaleDateString("en-US"),
    });
    rows.push({ label: "Duration", value: `${c.durationMonths} months` });
  }

  if (employees) rows.push({ label: "Team", value: `${employees} people` });
  if (years) rows.push({ label: "Operating", value: years });
  rows.push({ label: "Industry", value: listing.industryName });
  rows.push({ label: "Code", value: listing.publicCode });

  return rows.slice(0, 8);
}

export function getHeadlineLabel(listing: PublicListing): string {
  const c = listing.commercial;
  if (c.kind === "sale") return "Asking price";
  if (c.kind === "business-rental") return "Operating rent";
  if (c.kind === "premises-lease") return "Base rent";
  if (c.kind === "management-contract") return "Proposed term";
  return "Proposal deadline";
}

export function getHeadlineValue(listing: PublicListing): string {
  const c = listing.commercial;
  if (c.kind === "sale") {
    return c.asking.status === "disclosed"
      ? formatMoney(c.asking.value)
      : "On application";
  }
  if (c.kind === "business-rental") {
    return c.rent.status === "disclosed"
      ? formatRecurringMoney(c.rent.value)
      : "Undisclosed";
  }
  if (c.kind === "premises-lease") {
    return c.baseRent.status === "disclosed"
      ? formatRecurringMoney(c.baseRent.value)
      : "Undisclosed";
  }
  if (c.kind === "management-contract") {
    return `${c.proposedTermMonths} months`;
  }
  return new Date(c.deadlineAt).toLocaleDateString("en-US");
}
