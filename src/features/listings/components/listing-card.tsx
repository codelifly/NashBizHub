import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { StatusBadge } from "@/components/shared/status-badge";
import { MoneyText, RecurringMoneyText } from "@/components/shared/money";
import { kindLabels } from "@/features/listings/lib/kind-labels";
import type { ListingCardData } from "@/features/listings/types";
import { CompareToggle } from "@/features/compare/components/compare-toggle";

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

export function ListingCard({ listing }: { listing: ListingCardData }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-[var(--surface-card)] shadow-[0_1px_0_rgba(8,24,39,0.04),0_18px_40px_-28px_rgba(8,24,39,0.35)] ring-1 ring-[var(--border-subtle)] transition duration-[var(--motion-base)] hover:-translate-y-0.5 hover:shadow-[0_1px_0_rgba(8,24,39,0.06),0_28px_50px_-24px_rgba(30,110,244,0.35)] motion-reduce:transform-none">
      <Link
        href={`/listings/${listing.slug}`}
        className="flex flex-1 flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
      >
        <div className="relative aspect-[5/3] overflow-hidden bg-[var(--surface-subtle)]">
          {listing.heroImage ? (
            <Image
              src={listing.heroImage}
              alt=""
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-[#081827]/70 via-transparent to-transparent" />
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            <StatusBadge label={kindLabels[listing.kind]} tone="info" />
            {listing.confidential ? (
              <StatusBadge label="Confidential area" tone="warning" />
            ) : null}
          </div>
          <p className="absolute bottom-3 left-3 right-3 font-[family-name:var(--font-google-sans)] text-lg font-semibold text-white drop-shadow">
            {commercialSummary(listing)}
          </p>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-4">
          <div>
            <h3 className="font-[family-name:var(--font-google-sans)] text-xl leading-snug text-[var(--text-heading)]">
              {listing.title}
            </h3>
            <p className="mt-1.5 flex items-center gap-1.5 text-sm text-[var(--text-body)]">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-[var(--brand-blue-accessible-light)]" aria-hidden />
              {listing.cityName}, TN · {listing.industryName}
            </p>
          </div>
          <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-[var(--text-body)]">
            {listing.summary}
          </p>
          <p className="text-xs uppercase tracking-wide text-[var(--text-body)]/65">
            Fictional demo listing · {listing.publicCode}
          </p>
        </div>
      </Link>
      <div className="flex items-center justify-between gap-2 border-t border-[var(--border-subtle)] px-4 py-3">
        <Link
          href={`/listings/${listing.slug}`}
          className="text-sm font-medium text-[var(--brand-blue-accessible-light)] underline-offset-4 hover:underline"
        >
          View details
        </Link>
        <CompareToggle slug={listing.slug} />
      </div>
    </article>
  );
}
