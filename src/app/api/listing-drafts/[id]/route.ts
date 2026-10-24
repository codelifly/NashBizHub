import { NextResponse } from "next/server";
import { z } from "zod";
import { getDemoActor } from "@/server/demo/actor";
import { assignWorkspaceCookieIfMissing } from "@/server/demo/workspace";
import {
  approveListingDraft,
  getListingDraft,
  requestListingChanges,
  submitListingDraft,
} from "@/server/repositories/memory/listing-drafts";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const { workspaceId } = await assignWorkspaceCookieIfMissing();
  const draft = getListingDraft(workspaceId, id);
  if (!draft) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ workspaceId, draft });
}

const actionSchema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("submit") }),
  z.object({
    action: z.literal("approve"),
    notes: z.string().max(2000).optional(),
  }),
  z.object({
    action: z.literal("request-changes"),
    notes: z.string().min(5).max(2000),
  }),
]);

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const { workspaceId } = await assignWorkspaceCookieIfMissing();
  const actor = await getDemoActor();
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = actionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.message }, { status: 400 });
  }

  try {
    if (parsed.data.action === "submit") {
      const result = submitListingDraft(workspaceId, id, actor.userId);
      return NextResponse.json({ workspaceId, ...result });
    }
    if (parsed.data.action === "approve") {
      const draft = approveListingDraft(
        workspaceId,
        id,
        parsed.data.notes,
      );
      return NextResponse.json({ workspaceId, draft });
    }
    const draft = requestListingChanges(
      workspaceId,
      id,
      parsed.data.notes,
    );
    return NextResponse.json({ workspaceId, draft });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Action failed" },
      { status: 400 },
    );
  }
}
