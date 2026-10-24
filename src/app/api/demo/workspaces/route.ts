import { NextResponse } from "next/server";
import { isDemoMode } from "@/lib/env";
import {
  assignWorkspaceCookieIfMissing,
  listKnownWorkspaces,
} from "@/server/demo/workspace";
import { getWorkspaceBag } from "@/server/repositories/memory/store";

export async function GET() {
  if (!isDemoMode()) {
    return NextResponse.json({ error: "Demo workspaces disabled" }, { status: 403 });
  }
  const { workspaceId } = await assignWorkspaceCookieIfMissing();
  const bag = getWorkspaceBag(workspaceId);
  const workspaces = await listKnownWorkspaces();
  return NextResponse.json({
    demo: true,
    activeWorkspaceId: workspaceId,
    workspaces: workspaces.map((w) => ({
      ...w,
      seedTimestamp: new Date().toISOString(),
      counts: w.id === workspaceId
        ? {
            inquiries: bag.inquiries.length,
            offers: bag.offers.length,
            deals: bag.deals.length,
            favorites: bag.favorites.length,
          }
        : null,
    })),
  });
}
