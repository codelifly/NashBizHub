import { NextResponse } from "next/server";
import { getDemoActor } from "@/server/demo/actor";
import { assignWorkspaceCookieIfMissing } from "@/server/demo/workspace";
import {
  listModerationQueue,
  listSubmittedRevisions,
} from "@/server/repositories/memory/listing-drafts";

export async function GET() {
  const { workspaceId } = await assignWorkspaceCookieIfMissing();
  const actor = await getDemoActor();
  const drafts = listModerationQueue(workspaceId);
  const revisions = listSubmittedRevisions(workspaceId);
  return NextResponse.json({
    workspaceId,
    actor,
    queue: drafts,
    revisions,
  });
}
