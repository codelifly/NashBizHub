import { NextResponse } from "next/server";
import { z } from "zod";
import { getDemoActor } from "@/server/demo/actor";
import { assignWorkspaceCookieIfMissing } from "@/server/demo/workspace";
import { acknowledgeNda } from "@/server/repositories/memory/documents";

const schema = z.object({
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
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.message }, { status: 400 });
  }
  const nda = acknowledgeNda({
    workspaceId,
    listingId: parsed.data.listingId,
    userId: actor.userId,
  });
  return NextResponse.json({
    workspaceId,
    nda,
    note: "Nonbinding demonstration NDA acknowledgement",
  });
}
