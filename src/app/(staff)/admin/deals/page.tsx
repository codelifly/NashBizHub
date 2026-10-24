import Link from "next/link";
import { WorkspacePage } from "@/components/layout/workspace-page";
import { Panel } from "@/components/dashboard/ui";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { listingFixtures } from "@/server/db/seeds/listing-fixtures";

const demoDeals = [
  {
    id: "deal-riverside",
    listing: "Riverside Café",
    stage: "negotiation",
    parties: "Maya Chen · Harbor Foods",
    href: "/dashboard/deals",
  },
  {
    id: "deal-laundry",
    listing: "Cumberland Laundry",
    stage: "agreement",
    parties: "Daniel Brooks · Harbor Foods",
    href: "/dashboard/agreements",
  },
  {
    id: "deal-cleaning",
    listing: "Five Store Cleaning Program",
    stage: "evaluation",
    parties: "BrightCare · Owner org",
    href: "/dashboard/applications",
  },
  {
    id: "deal-lodge",
    listing: "Volunteer Lodge Operations",
    stage: "review",
    parties: "Operator shortlist",
    href: "/management-contracts",
  },
];

export default function Page() {
  const negotiating = listingFixtures.filter((l) => l.status === "under-negotiation");

  return (
    <WorkspacePage
      eyebrow="Transactions"
      title="Deals"
      purpose="Monitor negotiation workspaces, awards and handover readiness across the demo."
      actionHref="/admin/contracts"
      actionLabel="Contracts"
      secondaryHref="/admin/tasks"
      secondaryLabel="Tasks"
    >
      <Panel title="Active deal threads" description="Demo negotiation and award records.">
        <ul className="space-y-3">
          {demoDeals.map((deal) => (
            <li
              key={deal.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-page)] px-4 py-3"
            >
              <div>
                <p className="font-semibold text-[var(--text-heading)]">{deal.listing}</p>
                <p className="text-sm text-[var(--text-body)]">{deal.parties}</p>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge label={deal.stage} tone="warning" />
                <Button asChild size="sm" variant="outline">
                  <Link href={deal.href}>Open</Link>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel
        title="Listings under negotiation"
        description="Public catalogue items flagged under-negotiation."
      >
        <ul className="divide-y divide-[var(--border-subtle)]">
          {negotiating.length === 0 ? (
            <li className="py-4 text-sm text-[var(--text-body)]">No under-negotiation listings in seed.</li>
          ) : (
            negotiating.map((listing) => (
              <li key={listing.id} className="flex items-center justify-between gap-3 py-3">
                <div>
                  <p className="font-medium text-[var(--text-heading)]">{listing.title}</p>
                  <p className="text-sm text-[var(--text-body)]">{listing.publicCode}</p>
                </div>
                <Button asChild size="sm" variant="ghost">
                  <Link href={`/listings/${listing.slug}`}>Public page</Link>
                </Button>
              </li>
            ))
          )}
        </ul>
      </Panel>
    </WorkspacePage>
  );
}
