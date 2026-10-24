import { getListingById } from "@/server/repositories/sqlite/listings";
import { listInquiries } from "./inquiries";
import type { InquiryRecord } from "./store";

export type CrmStage =
  | "new"
  | "engaged"
  | "qualified"
  | "negotiation"
  | "closed"
  | "nurture";

export type CrmCustomer = {
  id: string;
  inquiryId: string;
  userId: string;
  listingId: string;
  listingTitle: string | null;
  listingSlug: string | null;
  stage: CrmStage;
  status: string;
  messagePreview: string;
  assignedTo: string | null;
  updatedAt: string;
  createdAt: string;
};

function stageFromInquiry(inq: InquiryRecord): CrmStage {
  switch (inq.status) {
    case "new":
      return "new";
    case "open":
      return "engaged";
    case "qualified":
      return "qualified";
    case "negotiating":
      return "negotiation";
    case "closed":
    case "won":
      return "closed";
    default:
      return "nurture";
  }
}

export function listCrmCustomers(workspaceId: string): CrmCustomer[] {
  return listInquiries(workspaceId)
    .map((inq) => {
      const listing = getListingById(inq.listingId);
      return {
        id: `crm_${inq.id}`,
        inquiryId: inq.id,
        userId: inq.fromUserId,
        listingId: inq.listingId,
        listingTitle: listing?.title ?? null,
        listingSlug: listing?.slug ?? null,
        stage: stageFromInquiry(inq),
        status: inq.status,
        messagePreview: inq.message.slice(0, 140),
        assignedTo: inq.assignedTo,
        updatedAt: inq.updatedAt,
        createdAt: inq.createdAt,
      };
    })
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function getCrmCustomer(
  workspaceId: string,
  id: string,
): CrmCustomer | null {
  const inquiryId = id.startsWith("crm_") ? id.slice(4) : id;
  return (
    listCrmCustomers(workspaceId).find(
      (c) => c.id === id || c.inquiryId === inquiryId,
    ) ?? null
  );
}
