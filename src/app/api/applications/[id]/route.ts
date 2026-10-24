import { NextResponse } from "next/server";
import { z } from "zod";
import { getDemoActor } from "@/server/demo/actor";
import { assignWorkspaceCookieIfMissing } from "@/server/demo/workspace";
import {
  decideApplication,
  getApplication,
} from "@/server/repositories/memory/applications";
import { getListingById } from "@/server/repositories/sqlite/listings";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const { workspaceId } = await assignWorkspaceCookieIfMissing();
  const application = getApplication(workspaceId, id);
  if (!application) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const listing = getListingById(application.listingId);
  return NextResponse.json({ workspaceId, application, listing });
}

const decideSchema = z.object({
  action: z.enum(["accept", "reject", "award"]),
  notes: z.string().max(2000).optional(),
});

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const { workspaceId } = await assignWorkspaceCookieIfMissing();
  await getDemoActor();
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = decideSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.message }, { status: 400 });
  }

  try {
    const result = decideApplication({
      workspaceId,
      applicationId: id,
      decision: parsed.data.action,
      notes: parsed.data.notes,
    });
    return NextResponse.json({ workspaceId, ...result });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Decision failed" },
      { status: 400 },
    );
  }
}
