import Link from "next/link";
import { notFound } from "next/navigation";
import { WorkspacePage } from "@/components/layout/workspace-page";
import { OfferActions } from "@/features/offers/components/offer-actions";
import { formatMoney } from "@/lib/money";
import { getDemoActor } from "@/server/demo/actor";
import { getOrCreateWorkspace } from "@/server/demo/workspace";
import { getOffer } from "@/server/repositories/memory/offers";
import { getListingById } from "@/server/repositories/sqlite/listings";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { workspaceId } = await getOrCreateWorkspace();
  const actor = await getDemoActor();
  const offer = getOffer(workspaceId, id);
  if (!offer) notFound();
  const listing = getListingById(offer.listingId);

  return (
    <WorkspacePage
      title={listing?.title ? `Offer · ${listing.title}` : "Offer"}
      purpose={`Status ${offer.status}, current version ${offer.currentVersion}.`}
      demoNote={`Workspace ${workspaceId} · persona ${actor.label}`}
    >
      <div className="space-y-4">
        {listing ? (
          <Link
            href={`/listings/${listing.slug}`}
            className="text-sm text-[var(--brand-blue-accessible-light)] underline-offset-4 hover:underline"
          >
            View listing
          </Link>
        ) : null}
        <ol className="space-y-2 rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-4">
          {offer.versions.map((v) => (
            <li key={v.id} className="text-sm">
              <span className="font-medium">v{v.version}</span> ·{" "}
              {v.amountMinor != null
                ? formatMoney({ minorUnits: v.amountMinor, currency: "USD" })
                : "—"}{" "}
              · {v.message ?? "No message"}
            </li>
          ))}
        </ol>
        <OfferActions
          offerId={offer.id}
          status={offer.status}
          currentVersion={offer.currentVersion}
        />
      </div>
    </WorkspacePage>
  );
}
