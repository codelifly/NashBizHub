import { NextResponse } from "next/server";
import { z } from "zod";
import { getDemoActor } from "@/server/demo/actor";
import { assignWorkspaceCookieIfMissing } from "@/server/demo/workspace";
import {
  isFavorite,
  listFavorites,
  toggleFavorite,
} from "@/server/repositories/memory/favorites";
import { getListingById } from "@/server/repositories/sqlite/listings";

export async function GET() {
  const { workspaceId } = await assignWorkspaceCookieIfMissing();
  const actor = await getDemoActor();
  const favorites = listFavorites(workspaceId, actor.userId).map((f) => {
    const listing = getListingById(f.listingId);
    return {
      ...f,
      listing: listing
        ? {
            id: listing.id,
            slug: listing.slug,
            title: listing.title,
            publicCode: listing.publicCode,
            kind: listing.kind,
          }
        : null,
    };
  });
  return NextResponse.json({ workspaceId, favorites });
}

const toggleSchema = z.object({
  listingId: z.string().min(1),
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
  const parsed = toggleSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.message }, { status: 400 });
  }
  if (!getListingById(parsed.data.listingId)) {
    return NextResponse.json({ error: "Listing not found" }, { status: 404 });
  }
  const result = toggleFavorite(
    workspaceId,
    actor.userId,
    parsed.data.listingId,
  );
  return NextResponse.json({
    workspaceId,
    favorited: result.favorited,
    record: result.record,
    isFavorite: isFavorite(workspaceId, actor.userId, parsed.data.listingId),
  });
}
