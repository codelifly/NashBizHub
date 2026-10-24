import { NextResponse } from "next/server";
import { getDemoActor } from "@/server/demo/actor";
import { assignWorkspaceCookieIfMissing } from "@/server/demo/workspace";
import { listCrmCustomers } from "@/server/repositories/memory/crm";

export async function GET() {
  const { workspaceId } = await assignWorkspaceCookieIfMissing();
  const actor = await getDemoActor();
  const customers = listCrmCustomers(workspaceId);
  return NextResponse.json({ workspaceId, actor, customers });
}
