import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { StatusBadge } from "@/components/shared/status-badge";
import { MoneyText, RecurringMoneyText } from "@/components/shared/money";
import { ListingCard } from "@/features/listings/components/listing-card";
import { kindLabels } from "@/features/listings/lib/kind-labels";
import type { ListingCardData } from "@/features/listings/types";
import type { Paginated } from "@/lib/pagination";
import { cn } from "@/lib/utils";

function commercialSummary(listing: ListingCardData) {
  const c = listing.commercial;
  if (c.kind === "sale") {
    return c.asking.status === "disclosed" ? (
      <MoneyText value={c.asking.value} />
    ) : (
      "Asking undisclosed"
    );
  }
  if (c.kind === "business-rental") {
    return c.rent.status === "disclosed" ? (
      <RecurringMoneyText value={c.rent.value} />
    ) : (
      "Rent undisclosed"
    );
  }
  if (c.kind === "premises-lease") {
    return c.baseRent.status === "disclosed" ? (
      <RecurringMoneyText value={c.baseRent.value} />
    ) : (
      "Base rent undisclosed"
    );
  }
  if (c.kind === "management-contract") {
    return `${c.proposedTermMonths}-month management proposal`;
  }
  return `Deadline ${new Date(c.deadlineAt).toLocaleDateString("en-US")}`;
}

function ListRow({ listing }: { listing: ListingCardData }) {
  return (
    <li>
      <Link
        href={`/listings/${listing.slug}`}
        className="group flex gap-4 overflow-hidden rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-3 transition hover:border-[var(--brand-blue-accessible-light)] hover:shadow-md sm:p-4"
      >
        <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl bg-[var(--surface-subtle)] sm:h-28 sm:w-40">
          {listing.heroImage ? (
            <Image
              src={listing.heroImage}
              alt=""
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="160px"
            />
          ) : null}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap gap-2">
            <StatusBadge label={kindLabels[listing.kind]} tone="info" />
            {listing.confidential ? (
              <StatusBadge label="Confidential" tone="warning" />
            ) : null}
            {listing.status === "under-negotiation" ? (
              <StatusBadge label="Under negotiation" tone="warning" />
            ) : null}
          </div>
          <h3 className="mt-2 truncate font-[family-name:var(--font-google-sans)] text-lg font-semibold text-[var(--text-heading)] group-hover:text-[var(--brand-blue-accessible-light)]">
            {listing.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-[var(--text-body)]">{listing.summary}</p>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            <span className="inline-flex items-center gap-1 text-[var(--text-body)]">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              {listing.locationLabel}
            </span>
            <span className="font-semibold text-[var(--brand-blue-accessible-light)]">
              {commercialSummary(listing)}
            </span>
            <span className="font-mono text-xs text-[var(--text-body)]">{listing.publicCode}</span>
          </div>
        </div>
      </Link>
    </li>
  );
}

export function ListingResults({
  result,
  view = "grid",
  emptyTitle = "No listings match these filters",
  emptyDescription = "Try another city, industry, or clear filters to browse more Tennessee opportunities.",
  emptyActionHref = "/businesses-for-sale",
  emptyActionLabel = "Browse businesses for sale",
}: {
  result: Paginated<ListingCardData>;
  view?: "grid" | "list";
  emptyTitle?: string;
  emptyDescription?: string;
  emptyActionHref?: string;
  emptyActionLabel?: string;
}) {
  const { items, total, page, totalPages } = result;

  if (total === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        actionHref={emptyActionHref}
        actionLabel={emptyActionLabel}
      />
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-[var(--text-body)]">
        Showing {items.length} of {total} listing{total === 1 ? "" : "s"}
        {totalPages > 1 ? ` · Page ${page} of ${totalPages}` : null}
      </p>
      <ul
        className={cn(
          view === "list"
            ? "space-y-3"
            : "grid gap-6 sm:grid-cols-2 xl:grid-cols-3",
        )}
      >
        {items.map((listing) =>
          view === "list" ? (
            <ListRow key={listing.id} listing={listing} />
          ) : (
            <li key={listing.id} className="hover-lift">
              <ListingCard listing={listing} />
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
