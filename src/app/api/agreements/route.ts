import { NextResponse } from "next/server";
import { getDemoActor } from "@/server/demo/actor";
import { assignWorkspaceCookieIfMissing } from "@/server/demo/workspace";
import {
  listAgreements,
  listObligations,
  listMaintenanceRequests,
} from "@/server/repositories/memory/agreements";
import { getListingById } from "@/server/repositories/sqlite/listings";

export async function GET() {
  const { workspaceId } = await assignWorkspaceCookieIfMissing();
  const actor = await getDemoActor();
  const agreements = listAgreements(workspaceId).map((agr) => ({
    ...agr,
    listing: agr.listingId ? getListingById(agr.listingId) : null,
    obligations: listObligations(workspaceId, { agreementId: agr.id }),
    maintenance: listMaintenanceRequests(workspaceId, {
      agreementId: agr.id,
    }),
  }));
  return NextResponse.json({ workspaceId, actor, agreements });
}
