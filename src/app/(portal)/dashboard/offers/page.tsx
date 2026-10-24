import Link from "next/link";
import { WorkspacePage } from "@/components/layout/workspace-page";
import { formatMoney } from "@/lib/money";
import { getDemoActor } from "@/server/demo/actor";
import { getOrCreateWorkspace } from "@/server/demo/workspace";
import { listOffers } from "@/server/repositories/memory/offers";
import { getListingById } from "@/server/repositories/sqlite/listings";

export default async function Page() {
  const { workspaceId } = await getOrCreateWorkspace();
  const actor = await getDemoActor();
  const offers = listOffers(workspaceId);

  return (
    <WorkspacePage
      title="Offers"
      purpose="Sale offers, rental proposals, and tender bids."
      demoNote={`Workspace ${workspaceId} · persona ${actor.label}`}
      emptyTitle={offers.length ? undefined : "No offers yet"}
      emptyDescription={
        offers.length
          ? undefined
          : "Submit a simulated offer from Riverside Café or the offers API."
      }
      actionHref="/listings/riverside-cafe-nashville"
      actionLabel="Open Riverside Café"
    >
      {offers.length > 0 ? (
        <ul className="space-y-3">
          {offers.map((offer) => {
            const listing = getListingById(offer.listingId);
            const current = offer.versions.find(
              (v) => v.version === offer.currentVersion,
            );
            return (
              <li
                key={offer.id}
                className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-[var(--text-heading)]">
                      {listing?.title ?? offer.listingId}
                    </p>
                    <p className="text-sm text-[var(--text-body)]">
                      {offer.status} · v{offer.currentVersion} ·{" "}
                      {current?.amountMinor != null
                        ? formatMoney({
                            minorUnits: current.amountMinor,
                            currency: "USD",
                          })
                        : "No amount"}
                    </p>
                  </div>
                  <Link
                    href={`/dashboard/offers/${offer.id}`}
                    className="text-sm font-medium text-[var(--brand-blue-accessible-light)] underline-offset-4 hover:underline"
                  >
                    Review
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      ) : null}
    </WorkspacePage>
  );
}
