import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/status-badge";
import { MoneyText, RecurringMoneyText } from "@/components/shared/money";
import { CompareToggle } from "@/features/compare/components/compare-toggle";
import { kindLabels, kindRoutes } from "@/features/listings/lib/kind-labels";
import type { ListingCardData } from "@/features/listings/types";
import type { OpportunityKind } from "@/lib/constants";
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

const browseKinds: OpportunityKind[] = [
  "sale",
  "business-rental",
  "premises-lease",
  "management-contract",
  "service-tender",
];

function SpotlightCard({ listing }: { listing: ListingCardData }) {
  return (
    <article className="group relative isolate h-full min-h-[28rem] overflow-hidden rounded-[1.35rem] bg-[#081827] shadow-[0_32px_80px_-48px_rgba(8,24,39,0.75)] sm:min-h-[32rem] lg:min-h-0">
      <Link
        href={`/listings/${listing.slug}`}
        className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2"
        aria-label={`View ${listing.title}`}
      />
      {listing.heroImage ? (
        <Image
          src={listing.heroImage}
          alt=""
          fill
          className="ken-burns object-cover transition duration-700 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      ) : null}
      <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(3,9,20,0.25)_0%,rgba(3,9,20,0.55)_42%,rgba(3,9,20,0.94)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(92,184,255,0.22),transparent_50%)]" />

      <div className="relative flex h-full flex-col justify-between p-6 sm:p-8 lg:p-9">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <StatusBadge label="Spotlight" tone="neutral" icon={<Sparkles className="h-3.5 w-3.5" />} />
            <StatusBadge label={kindLabels[listing.kind]} tone="info" />
            {listing.confidential ? (
              <StatusBadge label="Confidential area" tone="warning" />
            ) : null}
          </div>
          <div className="relative z-20">
            <CompareToggle slug={listing.slug} />
          </div>
        </div>

        <div className="max-w-xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] !text-[#5CB8FF]">
            Featured · {listing.publicCode}
          </p>
          <h3 className="font-[family-name:var(--font-google-sans)] text-3xl font-bold leading-[1.1] !text-white sm:text-4xl">
            {listing.title}
          </h3>
          <p className="flex items-center gap-1.5 text-sm !text-white/80">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-[#5CB8FF]" aria-hidden />
            {listing.confidential
              ? `${listing.cityName} area · confidential`
              : `${listing.cityName}, TN · ${listing.industryName}`}
          </p>
          <p className="line-clamp-2 text-base leading-relaxed !text-white/75">
            {listing.summary}
          </p>
          <div className="flex flex-wrap items-end justify-between gap-4 pt-2">
            <p className="font-[family-name:var(--font-google-sans)] text-2xl font-bold !text-white">
              {commercialSummary(listing)}
            </p>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm font-semibold !text-white ring-1 ring-white/20 backdrop-blur transition group-hover:bg-white/20">
              Open listing
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

function MosaicCard({
  listing,
  compact = false,
}: {
  listing: ListingCardData;
  compact?: boolean;
}) {
  return (
    <article
      className={cn(
        "group relative flex overflow-hidden rounded-[1.15rem] bg-[var(--surface-card)] ring-1 ring-[var(--border-subtle)] transition duration-[var(--motion-base)] hover:-translate-y-0.5 hover:shadow-[0_28px_50px_-28px_rgba(30,110,244,0.35)] motion-reduce:transform-none",
        compact ? "flex-row" : "h-full flex-col",
      )}
    >
      <Link
        href={`/listings/${listing.slug}`}
        className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
        aria-label={`View ${listing.title}`}
      />
      <div
        className={cn(
          "relative overflow-hidden bg-[var(--surface-subtle)]",
          compact ? "w-[42%] min-w-[7.5rem] shrink-0 self-stretch" : "aspect-[5/3]",
        )}
      >
        {listing.heroImage ? (
          <Image
            src={listing.heroImage}
            alt=""
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            sizes={compact ? "180px" : "(max-width: 1024px) 50vw, 25vw"}
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-[#081827]/55 via-transparent to-transparent" />
        {!compact ? (
          <div className="absolute left-3 top-3">
            <StatusBadge label={kindLabels[listing.kind]} tone="info" />
          </div>
        ) : null}
      </div>

      <div
        className={cn(
          "relative flex flex-1 flex-col",
          compact ? "justify-center gap-1.5 p-3.5 sm:p-4" : "gap-2.5 p-4",
        )}
      >
        {compact ? (
          <StatusBadge label={kindLabels[listing.kind]} tone="info" />
        ) : null}
        <h3
          className={cn(
            "font-[family-name:var(--font-google-sans)] font-semibold leading-snug text-[var(--text-heading)]",
            compact ? "line-clamp-2 text-base" : "text-lg",
          )}
        >
          {listing.title}
        </h3>
        <p className="flex items-center gap-1 text-xs text-[var(--text-body)]">
          <MapPin className="h-3 w-3 shrink-0 text-[var(--brand-blue-accessible-light)]" aria-hidden />
          <span className="truncate">
            {listing.cityName}, TN · {listing.industryName}
          </span>
        </p>
        {!compact ? (
          <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-[var(--text-body)]">
            {listing.summary}
          </p>
        ) : null}
        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <p className="font-[family-name:var(--font-google-sans)] text-sm font-bold text-[var(--text-heading)]">
            {commercialSummary(listing)}
          </p>
          <div className="relative z-20 shrink-0">
            <CompareToggle slug={listing.slug} />
          </div>
        </div>
      </div>
    </article>
  );
}

export function FeaturedOpportunities({
  listings,
}: {
  listings: ListingCardData[];
}) {
  if (listings.length === 0) return null;

  const spotlight = listings[0]!;
  const rightGrid = listings.slice(1, 5);
  const secondRow = listings.slice(5, 9);

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(30,110,244,0.08),transparent_45%),radial-gradient(ellipse_at_bottom_right,rgba(92,184,255,0.1),transparent_40%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--brand-blue-accessible-light)]/35 to-transparent"
      />

      <div className="relative mx-auto max-w-[80rem] px-4 py-16 sm:py-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl rise-in">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--brand-blue-accessible-light)]">
              Featured opportunities
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-google-sans)]">
              Tennessee inventory worth a closer look
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--text-body)]">
              A curated mix of sales, rentals, premises, management appointments and
              tenders — fictional demo listings with real marketplace workflows.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 sm:items-end">
            <ul className="flex max-w-xl flex-wrap gap-2 sm:justify-end">
              {browseKinds.map((kind) => (
                <li key={kind}>
                  <Link
                    href={kindRoutes[kind]}
                    className="inline-flex rounded-full border border-[var(--border-subtle)] bg-[var(--surface-card)] px-3 py-1.5 text-xs font-semibold text-[var(--text-heading)] transition hover:border-[var(--brand-blue-accessible-light)] hover:text-[var(--brand-blue-accessible-light)]"
                  >
                    {kindLabels[kind]}
                  </Link>
                </li>
              ))}
            </ul>
            <Button asChild variant="outline" className="gap-2">
              <Link href="/businesses-for-sale">
                Browse all sales
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Row 1: big left + 2×2 right */}
        <div className="mt-10 grid gap-4 sm:gap-5 lg:grid-cols-2 lg:items-stretch">
          <SpotlightCard listing={spotlight} />
          {rightGrid.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              {rightGrid.map((listing) => (
                <MosaicCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : null}
        </div>

        {/* Row 2: four equal listings */}
        {secondRow.length > 0 ? (
          <div className="stagger-children mt-4 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {secondRow.map((listing) => (
              <MosaicCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : null}

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-[1.15rem] border border-[var(--border-subtle)] bg-[var(--surface-card)] px-5 py-4 sm:px-6">
          <p className="text-sm text-[var(--text-body)]">
            <span className="font-semibold text-[var(--text-heading)]">
              {listings.length} featured demos
            </span>
            {" · "}
            Compare side-by-side, then inquire from one customer workspace.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button asChild size="sm" className="!text-white">
              <Link href="/compare">Open compare</Link>
            </Button>
            <Button asChild size="sm" variant="secondary">
              <Link href="/tennessee">Explore by city</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
