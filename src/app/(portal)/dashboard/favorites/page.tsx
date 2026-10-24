import Link from "next/link";
import { WorkspacePage } from "@/components/layout/workspace-page";
import { Panel } from "@/components/dashboard/ui";
import { ListingCard } from "@/features/listings/components/listing-card";
import { Button } from "@/components/ui/button";
import { getDemoActor } from "@/server/demo/actor";
import { getOrCreateWorkspace } from "@/server/demo/workspace";
import { listFavorites } from "@/server/repositories/memory/favorites";
import { getListingById } from "@/server/repositories/sqlite/listings";

export default async function Page() {
  const { workspaceId } = await getOrCreateWorkspace();
  const actor = await getDemoActor();
  const favorites = listFavorites(workspaceId, actor.userId);
  const cards = favorites
    .map((fav) => getListingById(fav.listingId))
    .filter(Boolean)
    .map((listing) => ({
      id: listing!.id,
      publicCode: listing!.publicCode,
      kind: listing!.kind,
      slug: listing!.slug,
      title: listing!.title,
      summary: listing!.summary,
      status: listing!.status,
      citySlug: listing!.citySlug,
      cityName: listing!.cityName,
      industrySlug: listing!.industrySlug,
      industryName: listing!.industryName,
      confidential: listing!.confidential,
      locationLabel: listing!.locationLabel,
      heroImage: listing!.heroImage,
      commercial: listing!.commercial,
    }));

  return (
    <WorkspacePage
      title="Saved opportunities"
      purpose="Your shortlist across sales, rentals, premises, management and tenders."
      eyebrow="Shortlist"
      demoNote={`Workspace ${workspaceId} · ${actor.label}`}
      actionHref="/businesses-for-sale"
      actionLabel="Find more"
      secondaryHref="/compare"
      secondaryLabel="Open compare"
    >
      {cards.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {cards.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <Panel
          title="Nothing saved yet"
          description="Heart listings from search or detail pages — they appear here instantly."
        >
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/businesses-for-sale">Browse for sale</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/businesses-for-rent">Browse rentals</Link>
            </Button>
          </div>
        </Panel>
      )}
    </WorkspacePage>
  );
}
