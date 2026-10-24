import Link from "next/link";
import { WorkspacePage } from "@/components/layout/workspace-page";
import { getDemoActor } from "@/server/demo/actor";
import { getOrCreateWorkspace } from "@/server/demo/workspace";
import { listDeals } from "@/server/repositories/memory/offers";
import { getListingById } from "@/server/repositories/sqlite/listings";

export default async function Page() {
  const { workspaceId } = await getOrCreateWorkspace();
  const actor = await getDemoActor();
  const deals = listDeals(workspaceId);

  return (
    <WorkspacePage
      title="Deals"
      purpose="Active transaction workspaces after an accepted offer."
      demoNote={`Workspace ${workspaceId} · persona ${actor.label}`}
      emptyTitle={deals.length ? undefined : "No deals open"}
      emptyDescription={
        deals.length
          ? undefined
          : "Accept a demo offer to materialize a deal room."
      }
      actionHref="/dashboard/offers"
      actionLabel="Review offers"
    >
      {deals.length > 0 ? (
        <ul className="space-y-3">
          {deals.map((deal) => {
            const listing = getListingById(deal.listingId);
            return (
              <li
                key={deal.id}
                className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-[var(--text-heading)]">
                      {listing?.title ?? deal.listingId}
                    </p>
                    <p className="text-sm text-[var(--text-body)]">
                      Stage {deal.stage} · offer {deal.offerId ?? "n/a"}
                    </p>
                  </div>
                  <Link
                    href={`/dashboard/deals/${deal.id}`}
                    className="text-sm font-medium text-[var(--brand-blue-accessible-light)] underline-offset-4 hover:underline"
                  >
                    Open deal
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
