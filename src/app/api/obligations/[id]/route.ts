import { NextResponse } from "next/server";
import { z } from "zod";
import { getDemoActor } from "@/server/demo/actor";
import { assignWorkspaceCookieIfMissing } from "@/server/demo/workspace";
import {
  getObligation,
  reportObligationPayment,
} from "@/server/repositories/memory/agreements";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const { workspaceId } = await assignWorkspaceCookieIfMissing();
  const obligation = getObligation(workspaceId, id);
  if (!obligation) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ workspaceId, obligation });
}

const actionSchema = z.object({
  action: z.literal("report-payment"),
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
  const parsed = actionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.message }, { status: 400 });
  }

  try {
    const obligation = reportObligationPayment(
      workspaceId,
      id,
      parsed.data.notes,
    );
    return NextResponse.json({ workspaceId, obligation });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Action failed" },
      { status: 400 },
    );
  }
}
