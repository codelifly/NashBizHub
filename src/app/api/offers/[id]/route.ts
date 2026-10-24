import { NextResponse } from "next/server";
import { z } from "zod";
import { getDemoActor } from "@/server/demo/actor";
import { assignWorkspaceCookieIfMissing } from "@/server/demo/workspace";
import {
  acceptOffer,
  counterOffer,
  getOffer,
  submitOffer,
} from "@/server/repositories/memory/offers";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const { workspaceId } = await assignWorkspaceCookieIfMissing();
  await getDemoActor();
  const offer = getOffer(workspaceId, id);
  if (!offer) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ workspaceId, offer });
}

const actionSchema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("submit") }),
  z.object({
    action: z.literal("counter"),
    amountMinor: z.number().int().positive(),
    message: z.string().max(2000).optional(),
    terms: z.record(z.string(), z.unknown()).optional(),
  }),
  z.object({
    action: z.literal("accept"),
    version: z.number().int().positive(),
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
      const offer = submitOffer(workspaceId, id);
      return NextResponse.json({ workspaceId, offer });
    }
    if (parsed.data.action === "counter") {
      const offer = counterOffer({
        workspaceId,
        offerId: id,
        createdBy: actor.userId,
        amountMinor: parsed.data.amountMinor,
        message: parsed.data.message,
        terms: parsed.data.terms,
      });
      return NextResponse.json({ workspaceId, offer });
    }
    const result = acceptOffer({
      workspaceId,
      offerId: id,
      version: parsed.data.version,
    });
    return NextResponse.json({ workspaceId, ...result });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Action failed" },
      { status: 400 },
    );
  }
}
