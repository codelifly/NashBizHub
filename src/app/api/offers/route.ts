import { NextResponse } from "next/server";
import { z } from "zod";
import { getDemoActor } from "@/server/demo/actor";
import { assignWorkspaceCookieIfMissing } from "@/server/demo/workspace";
import {
  draftOffer,
  listOffers,
  submitOffer,
} from "@/server/repositories/memory/offers";
import { getListingById } from "@/server/repositories/sqlite/listings";

export async function GET() {
  const { workspaceId } = await assignWorkspaceCookieIfMissing();
  const actor = await getDemoActor();
  const offers = listOffers(workspaceId).map((o) => ({
    ...o,
    listing: getListingById(o.listingId),
    mine: o.fromUserId === actor.userId,
  }));
  return NextResponse.json({ workspaceId, actor, offers });
}

const createSchema = z.object({
  listingId: z.string().min(1),
  amountMinor: z.number().int().positive(),
  message: z.string().max(2000).optional(),
  terms: z.record(z.string(), z.unknown()).optional(),
  submit: z.boolean().optional(),
});

export async function POST(request: Request) {
  const { workspaceId } = await assignWorkspaceCookieIfMissing();
  const actor = await getDemoActor();
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.message }, { status: 400 });
  }
  const listing = getListingById(parsed.data.listingId);
  if (!listing) {
    return NextResponse.json({ error: "Listing not found" }, { status: 404 });
  }
  if (listing.kind !== "sale") {
    return NextResponse.json(
      { error: "Offers are only supported for sale listings in this demo" },
      { status: 400 },
    );
  }

  let offer = draftOffer({
    workspaceId,
    listingId: listing.id,
    fromUserId: actor.userId,
    amountMinor: parsed.data.amountMinor,
    message: parsed.data.message,
    terms: parsed.data.terms,
  });
  if (parsed.data.submit) {
    submitOffer(workspaceId, offer.id);
    offer = { ...offer, status: "submitted" };
  }
  return NextResponse.json({ workspaceId, offer }, { status: 201 });
}
