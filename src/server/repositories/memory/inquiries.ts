import {
  getWorkspaceBag,
  newId,
  nowIso,
  type InquiryRecord,
  type MessageRecord,
} from "./store";

export type CreateInquiryInput = {
  workspaceId: string;
  listingId: string;
  fromUserId: string;
  message: string;
  experience?: string;
  timeframe?: string;
  readiness?: string;
  idempotencyKey: string;
};

export function listInquiries(
  workspaceId: string,
  opts?: { userId?: string },
): InquiryRecord[] {
  const bag = getWorkspaceBag(workspaceId);
  return bag.inquiries.filter((inq) => {
    if (!opts?.userId) return true;
    return (
      inq.fromUserId === opts.userId || inq.assignedTo === opts.userId
    );
  });
}

export function getInquiry(
  workspaceId: string,
  id: string,
): InquiryRecord | null {
  return (
    getWorkspaceBag(workspaceId).inquiries.find(
      (i) => i.id === id && i.workspaceId === workspaceId,
    ) ?? null
  );
}

export function createInquiry(
  input: CreateInquiryInput,
): InquiryRecord {
  const bag = getWorkspaceBag(input.workspaceId);
  const existing = bag.inquiries.find(
    (i) =>
      i.workspaceId === input.workspaceId &&
      i.idempotencyKey === input.idempotencyKey,
  );
  if (existing) return existing;

  const ts = nowIso();
  const record: InquiryRecord = {
    id: newId("inq"),
    workspaceId: input.workspaceId,
    listingId: input.listingId,
    fromUserId: input.fromUserId,
    status: "new",
    message: input.message,
    experience: input.experience ?? null,
    timeframe: input.timeframe ?? null,
    readiness: input.readiness ?? null,
    consentJson: JSON.stringify({ demoAck: true }),
    idempotencyKey: input.idempotencyKey,
    assignedTo: "user_harbor_owner",
    createdAt: ts,
    updatedAt: ts,
  };
  bag.inquiries.push(record);
  bag.messages.push({
    id: newId("msg"),
    workspaceId: input.workspaceId,
    inquiryId: record.id,
    senderUserId: input.fromUserId,
    body: input.message,
    createdAt: ts,
  });
  return record;
}

export function listInquiryMessages(
  workspaceId: string,
  inquiryId: string,
): MessageRecord[] {
  return getWorkspaceBag(workspaceId)
    .messages.filter(
      (m) => m.inquiryId === inquiryId && m.workspaceId === workspaceId,
    )
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export function replyToInquiry(
  workspaceId: string,
  inquiryId: string,
  senderUserId: string,
  body: string,
): MessageRecord {
  const inquiry = getInquiry(workspaceId, inquiryId);
  if (!inquiry) {
    throw new Error("Inquiry not found in this workspace");
  }
  const bag = getWorkspaceBag(workspaceId);
  const ts = nowIso();
  const message: MessageRecord = {
    id: newId("msg"),
    workspaceId,
    inquiryId,
    senderUserId,
    body,
    createdAt: ts,
  };
  bag.messages.push(message);
  inquiry.status = "open";
  inquiry.updatedAt = ts;
  return message;
}
