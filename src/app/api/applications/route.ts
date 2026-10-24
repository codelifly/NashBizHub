import { NextResponse } from "next/server";
import { z } from "zod";
import { getDemoActor } from "@/server/demo/actor";
import { assignWorkspaceCookieIfMissing } from "@/server/demo/workspace";
import {
  createApplication,
  listApplications,
} from "@/server/repositories/memory/applications";
import { getListingById } from "@/server/repositories/sqlite/listings";

export async function GET() {
  const { workspaceId } = await assignWorkspaceCookieIfMissing();
  const actor = await getDemoActor();
  const applications = listApplications(workspaceId).map((app) => {
    const listing = getListingById(app.listingId);
    return {
      ...app,
      listingTitle: listing?.title ?? null,
      listingSlug: listing?.slug ?? null,
      listingCode: listing?.publicCode ?? null,
      mine: app.userId === actor.userId,
    };
  });
  return NextResponse.json({ workspaceId, actor, applications });
}

const createSchema = z.object({
  listingId: z.string().min(1),
  message: z.string().min(10).max(5000),
  experience: z.string().max(1000).optional(),
  proposedTerms: z.string().max(2000).optional(),
  capacityNotes: z.string().max(2000).optional(),
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
  if (
    listing.kind !== "business-rental" &&
    listing.kind !== "service-tender"
  ) {
    return NextResponse.json(
      {
        error:
          "Applications are only supported for business-rental and service-tender listings",
      },
      { status: 400 },
    );
  }

  const application = createApplication({
    workspaceId,
    listingId: listing.id,
    userId: actor.userId,
    kind: listing.kind,
    submit: parsed.data.submit !== false,
    payload: {
      message: parsed.data.message,
      experience: parsed.data.experience ?? null,
      proposedTerms: parsed.data.proposedTerms ?? null,
      capacityNotes: parsed.data.capacityNotes ?? null,
      listingCode: listing.publicCode,
      demoAck: true,
    },
  });

  return NextResponse.json({ workspaceId, application }, { status: 201 });
}
