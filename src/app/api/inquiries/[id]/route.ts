import { NextResponse } from "next/server";
import { getDemoActor } from "@/server/demo/actor";
import { assignWorkspaceCookieIfMissing } from "@/server/demo/workspace";
import {
  getInquiry,
  listInquiryMessages,
} from "@/server/repositories/memory/inquiries";
import { getListingById } from "@/server/repositories/sqlite/listings";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const { workspaceId } = await assignWorkspaceCookieIfMissing();
  await getDemoActor();
  const inquiry = getInquiry(workspaceId, id);
  if (!inquiry) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const listing = getListingById(inquiry.listingId);
  const messages = listInquiryMessages(workspaceId, id);
  return NextResponse.json({ workspaceId, inquiry, listing, messages });
}
