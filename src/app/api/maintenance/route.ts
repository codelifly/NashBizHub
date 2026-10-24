import { NextResponse } from "next/server";
import { z } from "zod";
import { getDemoActor } from "@/server/demo/actor";
import { assignWorkspaceCookieIfMissing } from "@/server/demo/workspace";
import {
  createMaintenanceRequest,
  listMaintenanceRequests,
} from "@/server/repositories/memory/agreements";

export async function GET() {
  const { workspaceId } = await assignWorkspaceCookieIfMissing();
  const actor = await getDemoActor();
  const requests = listMaintenanceRequests(workspaceId);
  return NextResponse.json({ workspaceId, actor, requests });
}

const createSchema = z.object({
  agreementId: z.string().min(1).optional(),
  listingId: z.string().min(1).optional(),
  assetLabel: z.string().min(2).max(200),
  description: z.string().min(10).max(4000),
  urgency: z.enum(["low", "normal", "high", "emergency"]).optional(),
  responsibleParty: z.string().max(200).optional(),
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

  try {
    const record = createMaintenanceRequest({
      workspaceId,
      createdBy: actor.userId,
      agreementId: parsed.data.agreementId,
      listingId: parsed.data.listingId,
      assetLabel: parsed.data.assetLabel,
      description: parsed.data.description,
      urgency: parsed.data.urgency,
      responsibleParty: parsed.data.responsibleParty,
    });
    return NextResponse.json({ workspaceId, request: record }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Create failed" },
      { status: 400 },
    );
  }
}
