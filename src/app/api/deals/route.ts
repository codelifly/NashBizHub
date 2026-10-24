import { NextResponse } from "next/server";
import { getDemoActor } from "@/server/demo/actor";
import { assignWorkspaceCookieIfMissing } from "@/server/demo/workspace";
import { listDeals } from "@/server/repositories/memory/offers";
import { getListingById } from "@/server/repositories/sqlite/listings";

export async function GET() {
  const { workspaceId } = await assignWorkspaceCookieIfMissing();
  await getDemoActor();
  const deals = listDeals(workspaceId).map((d) => ({
    ...d,
    listing: getListingById(d.listingId),
  }));
  return NextResponse.json({ workspaceId, deals });
}
