import { NextResponse } from "next/server";
import { z } from "zod";
import { getDemoActor } from "@/server/demo/actor";
import { assignWorkspaceCookieIfMissing } from "@/server/demo/workspace";
import {
  grantAccess,
  listDocuments,
  requestGrant,
} from "@/server/repositories/memory/documents";
import { getWorkspaceBag } from "@/server/repositories/memory/store";

export async function GET(request: Request) {
  const { workspaceId } = await assignWorkspaceCookieIfMissing();
  const actor = await getDemoActor();
  const listingId = new URL(request.url).searchParams.get("listingId");
  const documents = listDocuments(workspaceId, listingId ?? undefined);
  const bag = getWorkspaceBag(workspaceId);
  return NextResponse.json({
    workspaceId,
    actor,
    documents: documents.map((d) => ({
      ...d,
      downloadUrl: `/api/documents/${d.id}/download`,
      grant: bag.grants.find(
        (g) => g.documentId === d.id && g.userId === actor.userId,
      ),
    })),
    grants: bag.grants.filter((g) => g.workspaceId === workspaceId),
  });
}

const schema = z.discriminatedUnion("action", [
  z.object({
    action: z.literal("request"),
    documentId: z.string().min(1),
  }),
  z.object({
    action: z.literal("grant"),
    grantId: z.string().min(1),
  }),
]);

export async function POST(request: Request) {
  const { workspaceId } = await assignWorkspaceCookieIfMissing();
  const actor = await getDemoActor();
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.message }, { status: 400 });
  }
  try {
    if (parsed.data.action === "request") {
      const grant = requestGrant({
        workspaceId,
        documentId: parsed.data.documentId,
        userId: actor.userId,
      });
      return NextResponse.json({ workspaceId, grant }, { status: 201 });
    }
    const grant = grantAccess({
      workspaceId,
      grantId: parsed.data.grantId,
      grantedBy: actor.userId,
    });
    return NextResponse.json({ workspaceId, grant });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed" },
      { status: 400 },
    );
  }
}
