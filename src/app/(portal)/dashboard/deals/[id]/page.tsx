import Link from "next/link";
import { notFound } from "next/navigation";
import { WorkspacePage } from "@/components/layout/workspace-page";
import { getDemoActor } from "@/server/demo/actor";
import { getOrCreateWorkspace } from "@/server/demo/workspace";
import { listDeals } from "@/server/repositories/memory/offers";
import { getListingById } from "@/server/repositories/sqlite/listings";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { workspaceId } = await getOrCreateWorkspace();
  const actor = await getDemoActor();
  const deal = listDeals(workspaceId).find((d) => d.id === id);
  if (!deal) notFound();
  const listing = getListingById(deal.listingId);
  const parties = JSON.parse(deal.partiesJson) as {
    userId: string;
    role: string;
  }[];

  return (
    <WorkspacePage
      title={listing?.title ? `Deal · ${listing.title}` : "Deal"}
      purpose={`Stage ${deal.stage}. Demo deal room after offer acceptance.`}
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
        {deal.offerId ? (
          <Link
            href={`/dashboard/offers/${deal.offerId}`}
            className="block text-sm text-[var(--brand-blue-accessible-light)] underline-offset-4 hover:underline"
          >
            Linked offer
          </Link>
        ) : null}
        <div className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-4">
          <h2 className="text-lg font-semibold">Parties</h2>
          <ul className="mt-2 space-y-1 text-sm">
            {parties.map((p) => (
              <li key={`${p.userId}-${p.role}`}>
                {p.role}: {p.userId}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-4 text-sm">
          <p>
            Private docs:{" "}
            <Link
              href="/api/documents/doc_riverside_pfs/download"
              className="underline-offset-4 hover:underline"
            >
              Download PFS (requires grant)
            </Link>
          </p>
        </div>
      </div>
    </WorkspacePage>
  );
}
