import { NextResponse } from "next/server";
import { listingFixtures } from "@/server/db/seeds/listing-fixtures";
import { toListingCardData } from "@/features/listings/lib/to-public-listing";

/** Public listings feed — fixture-backed DTO only (no private owner fields). */
export async function GET() {
  const active = listingFixtures.filter((l) => l.status === "active" || l.status === "under-negotiation");
  const listings = active.map(toListingCardData);
  return NextResponse.json({
    source: "fixtures",
    demo: true,
    count: listings.length,
    listings,
  });
}
