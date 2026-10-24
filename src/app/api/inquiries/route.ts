import { NextResponse } from "next/server";
import { z } from "zod";
import { getDemoActor } from "@/server/demo/actor";
import { assignWorkspaceCookieIfMissing } from "@/server/demo/workspace";
import {
  createInquiry,
  listInquiries,
} from "@/server/repositories/memory/inquiries";
import {
  getListingById,
  getListingBySlug,
} from "@/server/repositories/sqlite/listings";

export async function GET() {
  const { workspaceId } = await assignWorkspaceCookieIfMissing();
  const actor = await getDemoActor();
  const inquiries = listInquiries(workspaceId).map((inq) => {
    const listing = getListingById(inq.listingId);
    return {
      ...inq,
      listingTitle: listing?.title ?? null,
      listingSlug: listing?.slug ?? null,
      mine:
        inq.fromUserId === actor.userId || inq.assignedTo === actor.userId,
    };
  });
  return NextResponse.json({ workspaceId, actor, inquiries });
}

const createSchema = z.object({
  listingId: z.string().min(1).optional(),
  listingSlug: z.string().min(1).optional(),
  message: z.string().min(10).max(5000),
  experience: z.string().max(500).optional(),
  timeframe: z.string().max(200).optional(),
  readiness: z.string().max(200).optional(),
  idempotencyKey: z.string().min(8).max(120).optional(),
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

  const listing = parsed.data.listingId
    ? getListingById(parsed.data.listingId)
    : parsed.data.listingSlug
      ? getListingBySlug(parsed.data.listingSlug)
      : null;
  if (!listing) {
    return NextResponse.json({ error: "Listing not found" }, { status: 404 });
  }

  const inquiry = createInquiry({
    workspaceId,
    listingId: listing.id,
    fromUserId: actor.userId,
    message: parsed.data.message,
    experience: parsed.data.experience,
    timeframe: parsed.data.timeframe,
    readiness: parsed.data.readiness,
    idempotencyKey:
      parsed.data.idempotencyKey ??
      `inq-${actor.userId}-${listing.id}-${Date.now()}`,
  });

  return NextResponse.json({ workspaceId, inquiry }, { status: 201 });
}
