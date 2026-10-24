import Link from "next/link";
import {
  Building2,
  CalendarClock,
  CheckCircle2,
  MapPin,
  Shield,
  Users,
  XCircle,
} from "lucide-react";
import { StatusBadge } from "@/components/shared/status-badge";
import { MoneyText, RecurringMoneyText } from "@/components/shared/money";
import { Button } from "@/components/ui/button";
import { ListingActionPanel } from "@/features/listings/components/listing-action-panel";
import { ListingHero } from "@/features/listings/components/listing-hero";
import { ListingSectionNav } from "@/features/listings/components/listing-section-nav";
import {
  journeyTitleForKind,
  splitListingParagraphs,
} from "@/features/listings/lib/format-listing-copy";
import { kindLabels, kindRoutes } from "@/features/listings/lib/kind-labels";
import type { PublicListing } from "@/features/listings/types";
import type { PublicBroker } from "@/server/repositories/sqlite/brokers";

function FactCard({
  label,
  children,
  wide,
}: {
  label: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-page)] p-4 text-left ${
        wide ? "sm:col-span-2" : ""
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-body)]">
        {label}
      </p>
      <div className="mt-2 text-base font-semibold leading-snug text-[var(--text-heading)]">
        {children}
      </div>
    </div>
  );
}

function CommercialSections({ listing }: { listing: PublicListing }) {
  const c = listing.commercial;

  if (c.kind === "sale") {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        <FactCard label="Asking price">
          {c.asking.status === "disclosed" ? (
            <MoneyText value={c.asking.value} />
          ) : (
            "Undisclosed"
          )}
        </FactCard>
        <FactCard label="Revenue">
          {c.revenue.status === "disclosed" ? (
            <MoneyText value={c.revenue.value} />
          ) : (
            "Undisclosed"
          )}
        </FactCard>
        <FactCard label="Earnings">
          {c.earnings.status === "disclosed" ? (
            <span className="inline-flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
              <MoneyText value={c.earnings.value.amount} />
              <span className="text-sm font-normal text-[var(--text-body)]">
                ({c.earnings.value.measure})
              </span>
            </span>
          ) : (
            "Undisclosed"
          )}
        </FactCard>
        <FactCard label="Inventory included">
          {c.inventoryIncluded ? "Yes" : "No — billed separately"}
        </FactCard>
        <FactCard label="Property position" wide>
          <span className="font-normal text-[var(--text-body)]">{c.propertyPosition}</span>
        </FactCard>
        <FactCard label="Transition training" wide>
          <span className="font-normal text-[var(--text-body)]">{c.transitionTraining}</span>
        </FactCard>
        {c.conditions.length > 0 ? (
          <FactCard label="Conditions" wide>
            <ul className="list-disc space-y-1.5 pl-5 text-sm font-normal text-[var(--text-body)]">
              {c.conditions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </FactCard>
        ) : null}
      </div>
    );
  }

  if (c.kind === "business-rental") {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        <FactCard label="Rent">
          {c.rent.status === "disclosed" ? (
            <RecurringMoneyText value={c.rent.value} />
          ) : (
            "Undisclosed"
          )}
        </FactCard>
        <FactCard label="Term">{c.termMonths} months</FactCard>
        {c.availableFrom ? (
          <FactCard label="Available from">
            {new Date(c.availableFrom).toLocaleDateString("en-US")}
          </FactCard>
        ) : null}
        <FactCard label="Security">
          <span className="font-normal text-[var(--text-body)]">{c.securityArrangement}</span>
        </FactCard>
        <FactCard label="Handback" wide>
          <span className="font-normal text-[var(--text-body)]">{c.handbackExpectations}</span>
        </FactCard>
        <FactCard label="Responsibilities" wide>
          <ul className="list-disc space-y-1.5 pl-5 text-sm font-normal text-[var(--text-body)]">
            {c.responsibilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </FactCard>
        <FactCard label="Included assets" wide>
          <ul className="list-disc space-y-1.5 pl-5 text-sm font-normal text-[var(--text-body)]">
            {c.includedAssets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </FactCard>
      </div>
    );
  }

  if (c.kind === "premises-lease") {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        <FactCard label="Base rent">
          {c.baseRent.status === "disclosed" ? (
            <RecurringMoneyText value={c.baseRent.value} />
          ) : (
            "Undisclosed"
          )}
        </FactCard>
        <FactCard label="Area">{c.areaSqFt.toLocaleString("en-US")} sq ft</FactCard>
        <FactCard label="Property use">
          <span className="font-normal text-[var(--text-body)]">{c.propertyUse}</span>
        </FactCard>
        <FactCard label="Fit-out">
          <span className="font-normal text-[var(--text-body)]">{c.fitOut}</span>
        </FactCard>
        <FactCard label="Outgoings" wide>
          <span className="font-normal text-[var(--text-body)]">{c.outgoings}</span>
        </FactCard>
        <FactCard label="Viewing notes" wide>
          <span className="font-normal text-[var(--text-body)]">{c.viewingNotes}</span>
        </FactCard>
      </div>
    );
  }

  if (c.kind === "management-contract") {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        <FactCard label="Proposed term">{c.proposedTermMonths} months</FactCard>
        <FactCard label="Commercial model">
          <span className="font-normal text-[var(--text-body)]">{c.commercialModel}</span>
        </FactCard>
        <FactCard label="Decision rights" wide>
          <ul className="list-disc space-y-1.5 pl-5 text-sm font-normal text-[var(--text-body)]">
            {c.decisionRights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </FactCard>
        <FactCard label="Duties" wide>
          <ul className="list-disc space-y-1.5 pl-5 text-sm font-normal text-[var(--text-body)]">
            {c.duties.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </FactCard>
        <FactCard label="Reporting">
          <ul className="list-disc space-y-1.5 pl-5 text-sm font-normal text-[var(--text-body)]">
            {c.reporting.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </FactCard>
        <FactCard label="Performance measures">
          <ul className="list-disc space-y-1.5 pl-5 text-sm font-normal text-[var(--text-body)]">
            {c.performanceMeasures.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </FactCard>
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <FactCard label="Proposal deadline">
        {new Date(c.deadlineAt).toLocaleString("en-US")}
      </FactCard>
      <FactCard label="Duration">{c.durationMonths} months</FactCard>
      <FactCard label="Deliverables" wide>
        <ul className="list-disc space-y-1.5 pl-5 text-sm font-normal text-[var(--text-body)]">
          {c.deliverables.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </FactCard>
      <FactCard label="Eligibility">
        <ul className="list-disc space-y-1.5 pl-5 text-sm font-normal text-[var(--text-body)]">
          {c.eligibility.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </FactCard>
      <FactCard label="Milestones">
        <ul className="list-disc space-y-1.5 pl-5 text-sm font-normal text-[var(--text-body)]">
          {c.milestones.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </FactCard>
      <FactCard label="Clarification process" wide>
        <span className="font-normal text-[var(--text-body)]">{c.clarificationProcess}</span>
      </FactCard>
    </div>
  );
}

function suggestedOfferDollars(listing: PublicListing): number | undefined {
  const c = listing.commercial;
  if (c.kind === "sale" && c.asking.status === "disclosed") {
    return Math.round((c.asking.value.minorUnits / 100) * 0.95);
  }
  return undefined;
}

function operationsFacts(listing: PublicListing) {
  const ops = listing.operations ?? {};
  const employees = typeof ops.employees === "number" ? ops.employees : null;
  const years =
    typeof ops.yearsOperating === "number" ? ops.yearsOperating : null;
  return { employees, years };
}

export function ListingDetail({
  listing,
  broker,
}: {
  listing: PublicListing;
  broker?: PublicBroker | null;
}) {
  const gallery =
    listing.gallery.length > 0
      ? listing.gallery
      : listing.heroImage
        ? [listing.heroImage]
        : [];
  const { employees, years } = operationsFacts(listing);
  const paragraphs = splitListingParagraphs(listing.description);
  const hasInclusions =
    listing.inclusions.length > 0 || listing.exclusions.length > 0;

  const navSections = [
    { id: "overview", label: "Overview" },
    { id: "commercial", label: "Commercial" },
    { id: "operations", label: "Operations" },
    ...(hasInclusions ? [{ id: "inclusions", label: "Inclusions" }] : []),
    { id: "journey", label: "Next steps" },
    ...(broker ? [{ id: "broker", label: "Broker" }] : []),
  ];

  return (
    <article className="listing-detail-body space-y-6 text-left text-[var(--text-body)]">
      <nav aria-label="Breadcrumb" className="text-sm text-[var(--text-body)]">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <li>
            <Link href="/" className="hover:text-[var(--brand-blue-accessible-light)]">
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="text-[var(--text-body)]/50">
            /
          </li>
          <li>
            <Link
              href={kindRoutes[listing.kind]}
              className="hover:text-[var(--brand-blue-accessible-light)]"
            >
              {kindLabels[listing.kind]}
            </Link>
          </li>
          <li aria-hidden="true" className="text-[var(--text-body)]/50">
            /
          </li>
          <li>
            <Link
              href={`/tennessee/${listing.citySlug}`}
              className="hover:text-[var(--brand-blue-accessible-light)]"
            >
              {listing.cityName}
            </Link>
          </li>
          <li aria-hidden="true" className="text-[var(--text-body)]/50">
            /
          </li>
          <li
            className="max-w-[14rem] truncate font-medium text-[var(--text-heading)] sm:max-w-none"
            aria-current="page"
            title={listing.title}
          >
            {listing.title}
          </li>
        </ol>
      </nav>

      <ListingHero listing={listing} images={gallery} />

      <ListingSectionNav sections={navSections} />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] xl:grid-cols-[minmax(0,1fr)_24rem] lg:items-start">
        <div className="min-w-0 space-y-10">
          <section id="overview" className="scroll-mt-36 space-y-4">
            <h2 className="font-[family-name:var(--font-google-sans)] text-2xl font-semibold text-[var(--text-heading)]">
              Overview
            </h2>
            <div className="max-w-prose space-y-4 text-[1.05rem] leading-[1.7] text-[var(--text-body)]">
              {paragraphs.map((para, index) => (
                <p key={`${index}-${para.slice(0, 24)}`}>{para}</p>
              ))}
            </div>
          </section>

          <section aria-label="Key facts" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                icon: Building2,
                label: "Opportunity",
                value: kindLabels[listing.kind],
              },
              {
                icon: MapPin,
                label: "Location",
                value: listing.confidential
                  ? `${listing.cityName} area (approx.)`
                  : listing.locationLabel,
              },
              {
                icon: Users,
                label: "Team size",
                value: employees != null ? `${employees} employees` : "Not stated",
              },
              {
                icon: CalendarClock,
                label: "Years operating",
                value: years != null ? `${years} years` : "Not stated",
              },
            ].map((fact) => (
              <div
                key={fact.label}
                className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-4 text-left"
              >
                <fact.icon
                  className="h-5 w-5 text-[var(--brand-blue-accessible-light)]"
                  aria-hidden
                />
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-body)]">
                  {fact.label}
                </p>
                <p className="mt-1 font-semibold leading-snug text-[var(--text-heading)]">
                  {fact.value}
                </p>
              </div>
            ))}
          </section>

          <section id="commercial" className="scroll-mt-36 space-y-4">
            <div className="space-y-1">
              <h2 className="font-[family-name:var(--font-google-sans)] text-2xl font-semibold text-[var(--text-heading)]">
                Commercial terms
              </h2>
              <p className="text-sm text-[var(--text-body)]">
                Advertiser-supplied demo figures · not audited
              </p>
            </div>
            <CommercialSections listing={listing} />
          </section>

          <section id="operations" className="scroll-mt-36 space-y-4">
            <h2 className="font-[family-name:var(--font-google-sans)] text-2xl font-semibold text-[var(--text-heading)]">
              Operations snapshot
            </h2>
            <div className="rounded-[1.25rem] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-5 sm:p-6 text-left">
              <dl className="grid gap-5 sm:grid-cols-2">
                <div>
                  <dt className="text-sm text-[var(--text-body)]">Industry</dt>
                  <dd className="mt-1 font-semibold text-[var(--text-heading)]">
                    <Link
                      href={`/industries/${listing.industrySlug}`}
                      className="text-[var(--brand-blue-accessible-light)] hover:underline"
                    >
                      {listing.industryName}
                    </Link>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-[var(--text-body)]">Time zone</dt>
                  <dd className="mt-1 font-semibold text-[var(--text-heading)]">
                    {listing.timeZone}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-[var(--text-body)]">Employees</dt>
                  <dd className="mt-1 font-semibold text-[var(--text-heading)]">
                    {employees ?? "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-[var(--text-body)]">Years operating</dt>
                  <dd className="mt-1 font-semibold text-[var(--text-heading)]">
                    {years ?? "—"}
                  </dd>
                </div>
              </dl>
              <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-[var(--surface-subtle)] p-3.5 text-sm leading-relaxed text-[var(--text-body)]">
                <Shield
                  className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-blue-accessible-light)]"
                  aria-hidden
                />
                <p>
                  Verification badges on this demo never imply profitability, licensing transfer, or
                  audited financials.
                </p>
              </div>
            </div>
          </section>

          {hasInclusions ? (
            <section id="inclusions" className="scroll-mt-36 grid gap-6 sm:grid-cols-2">
              {listing.inclusions.length > 0 ? (
                <div className="rounded-[1.25rem] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-5 sm:p-6 text-left">
                  <h2 className="flex items-center gap-2 text-xl font-semibold text-[var(--text-heading)]">
                    <CheckCircle2
                      className="h-5 w-5 shrink-0 text-[var(--color-success)]"
                      aria-hidden
                    />
                    Inclusions
                  </h2>
                  <ul className="mt-4 space-y-2.5">
                    {listing.inclusions.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2.5 text-sm leading-relaxed text-[var(--text-body)]"
                      >
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-blue-accessible-light)]"
                          aria-hidden
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {listing.exclusions.length > 0 ? (
                <div className="rounded-[1.25rem] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-5 sm:p-6 text-left">
                  <h2 className="flex items-center gap-2 text-xl font-semibold text-[var(--text-heading)]">
                    <XCircle
                      className="h-5 w-5 shrink-0 text-[var(--color-warning)]"
                      aria-hidden
                    />
                    Exclusions
                  </h2>
                  <ul className="mt-4 space-y-2.5">
                    {listing.exclusions.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2.5 text-sm leading-relaxed text-[var(--text-body)]"
                      >
                        <XCircle
                          className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-warning)]"
                          aria-hidden
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </section>
          ) : null}

          <section
            id="journey"
            className="scroll-mt-36 overflow-hidden rounded-[1.25rem] border border-[var(--border-subtle)] bg-[var(--surface-card)] text-left"
          >
            <div className="border-b border-[var(--border-subtle)] bg-[var(--surface-subtle)] px-5 py-4 sm:px-6">
              <h2 className="text-xl font-semibold text-[var(--text-heading)]">
                {journeyTitleForKind(listing.kind)}
              </h2>
              <p className="mt-1 text-sm text-[var(--text-body)]">
                Proposal-aligned path for this opportunity type.
              </p>
            </div>
            <ol className="grid gap-px bg-[var(--border-subtle)] sm:grid-cols-2 lg:grid-cols-4">
              {[
                { step: "1", title: "Inquire", body: "Share timing and readiness." },
                { step: "2", title: "Qualify", body: "Answer owner questions." },
                { step: "3", title: "Documents", body: "Demo NDA + grants." },
                {
                  step: "4",
                  title: listing.kind === "sale" ? "Offer" : "Apply / visit",
                  body: "Record a demo next step.",
                },
              ].map((item) => (
                <li
                  key={item.step}
                  className="space-y-2 bg-[var(--surface-card)] px-5 py-5"
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#1E6EF4] text-sm font-bold !text-white">
                    {item.step}
                  </span>
                  <p className="font-semibold text-[var(--text-heading)]">{item.title}</p>
                  <p className="text-sm leading-relaxed text-[var(--text-body)]">{item.body}</p>
                </li>
              ))}
            </ol>
          </section>

          {broker ? (
            <section id="broker" className="scroll-mt-36 text-left">
              <div className="overflow-hidden rounded-[1.25rem] border border-[var(--border-subtle)] bg-[var(--surface-card)]">
                <div className="on-dark bg-[linear-gradient(120deg,#081827,#0b3d91)] px-5 py-5 sm:px-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] !text-[#5CB8FF]">
                    Representing broker
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold !text-white">{broker.name}</h2>
                  <p className="mt-1 !text-white/80">{broker.firm}</p>
                </div>
                <div className="space-y-4 p-5 sm:p-6">
                  <p className="leading-relaxed text-[var(--text-body)]">{broker.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {broker.specialties.map((s) => (
                      <StatusBadge key={s} label={s} tone="info" />
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button asChild className="!text-white">
                      <Link href={`/brokers/${broker.slug}`}>View broker profile</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href={`mailto:${broker.email}`}>Email (demo)</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          ) : null}

          <div className="flex flex-wrap gap-3 border-t border-[var(--border-subtle)] pt-6">
            <Button asChild variant="outline">
              <Link href={kindRoutes[listing.kind]}>← Back to {kindLabels[listing.kind]}</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href={`/tennessee/${listing.citySlug}`}>More in {listing.cityName}</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/">Home</Link>
            </Button>
          </div>
        </div>

        <ListingActionPanel
          listing={listing}
          suggestedOfferDollars={suggestedOfferDollars(listing)}
          brokerHref={
            broker
              ? `/brokers/${broker.slug}`
              : listing.brokerSlug
                ? `/brokers/${listing.brokerSlug}`
                : null
          }
          brokerName={broker?.name ?? null}
          brokerFirm={broker?.firm ?? null}
        />
      </div>
    </article>
  );
}
