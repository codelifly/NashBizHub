"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BadgeCheck,
  Building2,
  CalendarDays,
  FileText,
  HandCoins,
  MapPin,
  MessageSquare,
  Shield,
  UserRound,
} from "lucide-react";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { ApplicationForm } from "@/features/applications/components/application-form";
import { AppointmentActions } from "@/features/appointments/components/appointment-actions";
import { FavoriteButton } from "@/features/favorites/components/favorite-button";
import { InquiryForm } from "@/features/inquiries/components/inquiry-form";
import { SaleOfferForm } from "@/features/offers/components/sale-offer-form";
import { CompareToggle } from "@/features/compare/components/compare-toggle";
import { ListingDocumentRequest } from "@/features/listings/components/listing-document-request";
import {
  getHeadlineLabel,
  getHeadlineValue,
  getListingHighlights,
} from "@/features/listings/lib/listing-highlights";
import { formatStatusLabel } from "@/features/listings/lib/format-listing-copy";
import { kindLabels } from "@/features/listings/lib/kind-labels";
import type { PublicListing } from "@/features/listings/types";
import { cn } from "@/lib/utils";

type Tab = "inquire" | "offer" | "visit" | "docs";

export function ListingActionPanel({
  listing,
  suggestedOfferDollars,
  brokerHref,
  brokerName,
  brokerFirm,
}: {
  listing: PublicListing;
  suggestedOfferDollars?: number;
  brokerHref?: string | null;
  brokerName?: string | null;
  brokerFirm?: string | null;
}) {
  const canOffer = listing.kind === "sale";
  const canApplyForm =
    listing.kind === "business-rental" || listing.kind === "service-tender";
  const canApplyLink =
    listing.kind === "management-contract" || listing.kind === "premises-lease";
  const showOfferTab = canOffer || canApplyForm || canApplyLink;
  const highlights = getListingHighlights(listing);

  const tabs: { id: Tab; label: string; icon: typeof MessageSquare }[] = [
    { id: "inquire", label: "Inquire", icon: MessageSquare },
    ...(showOfferTab
      ? [
          {
            id: "offer" as const,
            label: canOffer ? "Offer" : "Apply",
            icon: HandCoins,
          },
        ]
      : []),
    { id: "visit", label: "Visit", icon: CalendarDays },
    { id: "docs", label: "Docs", icon: FileText },
  ];

  const [tab, setTab] = useState<Tab>("inquire");
  const tabCols =
    tabs.length === 4 ? "grid-cols-4" : tabs.length === 3 ? "grid-cols-3" : "grid-cols-2";

  return (
    <aside
      id="contact-panel"
      className="listing-detail-body w-full scroll-mt-28 space-y-4 text-[var(--text-body)] lg:sticky lg:top-[calc(var(--demo-banner-h,2.5rem)+1rem)] lg:self-start"
    >
      {/* Snapshot card */}
      <div className="overflow-hidden rounded-[1.25rem] border border-[var(--border-subtle)] bg-[var(--surface-card)] text-left shadow-[0_24px_60px_-40px_rgba(8,24,39,0.4)]">
        <div className="on-dark bg-[linear-gradient(145deg,#081827_0%,#0b3d91_58%,#1e6ef4_100%)] px-5 py-5">
          <div className="flex flex-wrap gap-2">
            <StatusBadge label={kindLabels[listing.kind]} tone="info" />
            <StatusBadge
              label={formatStatusLabel(listing.status)}
              tone={listing.status === "under-negotiation" ? "warning" : "success"}
            />
          </div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] !text-[#5CB8FF]">
            {getHeadlineLabel(listing)}
          </p>
          <p className="mt-1 font-[family-name:var(--font-google-sans)] text-3xl font-bold leading-tight !text-white">
            {getHeadlineValue(listing)}
          </p>
          <p className="mt-2 text-sm !text-white/75">
            {listing.confidential
              ? `${listing.cityName} area · confidential location`
              : `${listing.cityName}, TN · ${listing.industryName}`}
          </p>
        </div>

        <div className="space-y-1 border-b border-[var(--border-subtle)] bg-[var(--surface-card)] px-2 py-2">
          {highlights.map((row) => (
            <div
              key={row.label}
              className="flex items-start justify-between gap-3 rounded-xl px-3 py-2.5"
            >
              <span className="text-sm !text-[var(--text-body)]">{row.label}</span>
              <span className="max-w-[58%] text-right text-sm font-semibold leading-snug !text-[var(--text-heading)]">
                {row.value}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 p-4">
          <div className="rounded-xl bg-[var(--surface-subtle)] px-3 py-3 text-left">
            <Building2
              className="h-4 w-4 text-[var(--brand-blue-accessible-light)]"
              aria-hidden
            />
            <p className="mt-2 text-[0.65rem] font-semibold uppercase tracking-wide text-[var(--text-body)]">
              Opportunity
            </p>
            <p className="mt-0.5 text-sm font-semibold text-[var(--text-heading)]">
              {kindLabels[listing.kind]}
            </p>
          </div>
          <div className="rounded-xl bg-[var(--surface-subtle)] px-3 py-3 text-left">
            <MapPin
              className="h-4 w-4 text-[var(--brand-blue-accessible-light)]"
              aria-hidden
            />
            <p className="mt-2 text-[0.65rem] font-semibold uppercase tracking-wide text-[var(--text-body)]">
              Market
            </p>
            <p className="mt-0.5 text-sm font-semibold text-[var(--text-heading)]">
              {listing.cityName}
            </p>
          </div>
        </div>
      </div>

      {/* Actions card */}
      <div className="overflow-hidden rounded-[1.25rem] border border-[var(--border-subtle)] bg-[var(--surface-card)] text-left shadow-[0_24px_60px_-40px_rgba(8,24,39,0.35)]">
        <div className="border-b border-[var(--border-subtle)] px-5 py-4">
          <p className="font-semibold text-[var(--text-heading)]">Take the next step</p>
          <p className="mt-1 text-sm text-[var(--text-body)]">
            Demo workflows only — no real sellers or payments.
          </p>
        </div>

        <div className={cn("grid gap-1 border-b border-[var(--border-subtle)] p-2", tabCols)}>
          {tabs.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={cn(
                  "inline-flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-1 py-2.5 text-[0.7rem] font-semibold leading-tight transition sm:text-xs",
                  tab === item.id
                    ? "bg-[#1E6EF4] !text-white"
                    : "text-[var(--text-body)] hover:bg-[var(--surface-subtle)]",
                )}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="space-y-4 p-5">
          {tab === "inquire" ? (
            <InquiryForm
              listingId={listing.id}
              listingSlug={listing.slug}
              listingTitle={listing.title}
            />
          ) : null}

          {tab === "offer" ? (
            <div className="space-y-4">
              {canOffer ? (
                <SaleOfferForm
                  listingId={listing.id}
                  listingTitle={listing.title}
                  suggestedDollars={suggestedOfferDollars ?? 250000}
                />
              ) : null}
              {listing.kind === "business-rental" || listing.kind === "service-tender" ? (
                <ApplicationForm
                  listingId={listing.id}
                  listingTitle={listing.title}
                  kind={listing.kind}
                />
              ) : null}
              {canApplyLink ? (
                <div className="space-y-3">
                  <p className="text-sm leading-relaxed text-[var(--text-body)]">
                    Sign in to submit a management proposal or lease application in the demo
                    workspace.
                  </p>
                  <Button asChild className="w-full !text-white">
                    <Link href={`/login?returnUrl=/listings/${listing.slug}`}>
                      Continue to apply
                    </Link>
                  </Button>
                </div>
              ) : null}
            </div>
          ) : null}

          {tab === "visit" ? (
            <div className="space-y-3">
              <p className="text-sm leading-relaxed text-[var(--text-body)]">
                Request a fictional site visit or video diligence call. Times are demo-only.
              </p>
              <AppointmentActions mode="request" listingId={listing.id} />
              <Button asChild variant="outline" className="w-full">
                <Link href="/dashboard/appointments">Open visits dashboard</Link>
              </Button>
            </div>
          ) : null}

          {tab === "docs" ? (
            <div className="space-y-3">
              <ListingDocumentRequest listingId={listing.id} />
              <Button asChild variant="outline" className="w-full">
                <Link href="/dashboard/deals">Document rooms</Link>
              </Button>
            </div>
          ) : null}

          <div className="grid grid-cols-2 gap-2 border-t border-[var(--border-subtle)] pt-4">
            <FavoriteButton listingId={listing.id} className="w-full" />
            <CompareToggle slug={listing.slug} className="w-full" />
          </div>
        </div>
      </div>

      {/* Trust / process */}
      <div className="rounded-[1.25rem] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-5 text-left">
        <p className="flex items-center gap-2 font-semibold text-[var(--text-heading)]">
          <Shield className="h-4 w-4 text-[var(--brand-blue-accessible-light)]" aria-hidden />
          Demo trust notes
        </p>
        <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-[var(--text-body)]">
          <li className="flex gap-2">
            <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-blue-accessible-light)]" aria-hidden />
            Figures are advertiser-supplied for walkthroughs — not audited.
          </li>
          <li className="flex gap-2">
            <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-blue-accessible-light)]" aria-hidden />
            Confidential listings hide exact addresses until approval.
          </li>
          <li className="flex gap-2">
            <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-blue-accessible-light)]" aria-hidden />
            NDA acknowledgement is nonbinding in this sandbox.
          </li>
        </ul>
      </div>

      {/* Broker mini card */}
      {brokerHref ? (
        <div className="rounded-[1.25rem] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-5 text-left">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-body)]">
            <UserRound className="h-3.5 w-3.5 text-[var(--brand-blue-accessible-light)]" aria-hidden />
            Represented by
          </p>
          <p className="mt-2 font-semibold text-[var(--text-heading)]">
            {brokerName ?? "Broker profile"}
          </p>
          {brokerFirm ? (
            <p className="mt-0.5 text-sm text-[var(--text-body)]">{brokerFirm}</p>
          ) : null}
          <Button asChild variant="outline" className="mt-4 w-full">
            <Link href={brokerHref}>View broker profile</Link>
          </Button>
        </div>
      ) : null}

      <Button asChild variant="secondary" className="w-full">
        <Link href={`/login?returnUrl=/listings/${listing.slug}`}>Sign in to continue</Link>
      </Button>
    </aside>
  );
}
