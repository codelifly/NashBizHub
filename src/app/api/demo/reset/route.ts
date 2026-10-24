import { NextResponse } from "next/server";
import { isDemoMode } from "@/lib/env";
import { assignWorkspaceCookieIfMissing } from "@/server/demo/workspace";
import { resetWorkspaceBag } from "@/server/repositories/memory/store";

/**
 * Clears the current workspace memory bag and reseeds demo anchors.
 * Guarded by DEMO_MODE; requires explicit confirmation body.
 */
export async function POST(request: Request) {
  if (!isDemoMode()) {
    return NextResponse.json({ error: "Demo reset disabled" }, { status: 403 });
  }

  let body: { confirm?: string } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (body.confirm !== "RESET_DEMO_WORKSPACE") {
    return NextResponse.json(
      {
        error: "Confirmation required",
        hint: 'POST JSON { "confirm": "RESET_DEMO_WORKSPACE" }',
      },
      { status: 400 },
    );
  }

  const { workspaceId } = await assignWorkspaceCookieIfMissing();
  const bag = resetWorkspaceBag(workspaceId);

  return NextResponse.json({
    demo: true,
    simulated: true,
    workspaceId,
    message:
      "Workspace memory bag cleared and reseeded with demo anchors. SQLite catalogue fixtures were not modified.",
    counts: {
      favorites: bag.favorites.length,
      inquiries: bag.inquiries.length,
      offers: bag.offers.length,
      deals: bag.deals.length,
      applications: bag.applications.length,
      agreements: bag.agreements.length,
      obligations: bag.obligations.length,
      listingDrafts: bag.listingDrafts.length,
      maintenanceRequests: bag.maintenanceRequests.length,
    },
  });
}
