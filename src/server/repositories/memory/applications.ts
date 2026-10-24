import {
  getWorkspaceBag,
  newId,
  nowIso,
  type AgreementRecord,
  type ApplicationRecord,
  type DealRecord,
  type ObligationRecord,
} from "./store";

export type CreateApplicationInput = {
  workspaceId: string;
  listingId: string;
  userId: string;
  kind: "business-rental" | "service-tender";
  payload: Record<string, unknown>;
  submit?: boolean;
};

export function listApplications(
  workspaceId: string,
  opts?: { userId?: string; listingId?: string },
): ApplicationRecord[] {
  return getWorkspaceBag(workspaceId).applications.filter((a) => {
    if (a.workspaceId !== workspaceId) return false;
    if (opts?.userId && a.userId !== opts.userId) return false;
    if (opts?.listingId && a.listingId !== opts.listingId) return false;
    return true;
  });
}

export function getApplication(
  workspaceId: string,
  id: string,
): ApplicationRecord | null {
  return (
    getWorkspaceBag(workspaceId).applications.find(
      (a) => a.id === id && a.workspaceId === workspaceId,
    ) ?? null
  );
}

export function createApplication(
  input: CreateApplicationInput,
): ApplicationRecord {
  const bag = getWorkspaceBag(input.workspaceId);
  const ts = nowIso();
  const record: ApplicationRecord = {
    id: newId("app"),
    workspaceId: input.workspaceId,
    listingId: input.listingId,
    userId: input.userId,
    kind: input.kind,
    status: input.submit === false ? "draft" : "submitted",
    payloadJson: JSON.stringify(input.payload),
    version: 1,
    createdAt: ts,
    updatedAt: ts,
  };
  bag.applications.push(record);
  return record;
}

export function decideApplication(input: {
  workspaceId: string;
  applicationId: string;
  decision: "accept" | "reject" | "award";
  notes?: string;
}): {
  application: ApplicationRecord;
  agreement: AgreementRecord | null;
  deal: DealRecord | null;
} {
  const bag = getWorkspaceBag(input.workspaceId);
  const application = getApplication(input.workspaceId, input.applicationId);
  if (!application) throw new Error("Application not found");
  if (
    application.status !== "submitted" &&
    application.status !== "under-review" &&
    application.status !== "accepted"
  ) {
    throw new Error(`Cannot decide application in status ${application.status}`);
  }

  const ts = nowIso();
  let agreement: AgreementRecord | null = null;
  let deal: DealRecord | null = null;

  if (input.decision === "reject") {
    application.status = "rejected";
    application.updatedAt = ts;
    const payload = JSON.parse(application.payloadJson) as Record<
      string,
      unknown
    >;
    payload.decisionNotes = input.notes ?? "Rejected in demo moderation.";
    application.payloadJson = JSON.stringify(payload);
    return { application, agreement: null, deal: null };
  }

  if (input.decision === "accept") {
    application.status = "accepted";
    application.updatedAt = ts;
    deal = {
      id: newId("deal"),
      workspaceId: input.workspaceId,
      listingId: application.listingId,
      offerId: null,
      applicationId: application.id,
      stage: "negotiation",
      partiesJson: JSON.stringify([
        { userId: application.userId, role: "applicant" },
        { userId: "user_harbor_owner", role: "owner" },
      ]),
      acceptedTermsJson: application.payloadJson,
      createdAt: ts,
      updatedAt: ts,
    };
    bag.deals.push(deal);
    return { application, agreement: null, deal };
  }

  // award → agreement stub (+ optional deal)
  application.status = "awarded";
  application.updatedAt = ts;

  deal = {
    id: newId("deal"),
    workspaceId: input.workspaceId,
    listingId: application.listingId,
    offerId: null,
    applicationId: application.id,
    stage: "awarded",
    partiesJson: JSON.stringify([
      { userId: application.userId, role: "applicant" },
      { userId: "user_harbor_owner", role: "owner" },
    ]),
    acceptedTermsJson: application.payloadJson,
    createdAt: ts,
    updatedAt: ts,
  };
  bag.deals.push(deal);

  const titlePrefix =
    application.kind === "business-rental"
      ? "Operating rental agreement"
      : "Service tender award agreement";

  agreement = {
    id: newId("agr"),
    workspaceId: input.workspaceId,
    dealId: deal.id,
    listingId: application.listingId,
    applicationId: application.id,
    status: "pending",
    startDate: null,
    endDate: null,
    partiesJson: deal.partiesJson,
    responsibilityJson: JSON.stringify({
      demo: true,
      notes: input.notes ?? "Agreement stub created on award.",
    }),
    currentVersion: 1,
    title: `${titlePrefix} (demo stub)`,
    createdAt: ts,
    updatedAt: ts,
  };
  bag.agreements.push(agreement);

  const obligation: ObligationRecord = {
    id: newId("obl"),
    workspaceId: input.workspaceId,
    agreementId: agreement.id,
    title:
      application.kind === "business-rental"
        ? "First month operating rent"
        : "Kickoff deliverable acknowledgement",
    dueAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    status: "upcoming",
    kind: application.kind === "business-rental" ? "payment" : "reporting",
    amountMinor: application.kind === "business-rental" ? 450000 : null,
    currency: application.kind === "business-rental" ? "USD" : null,
    notes: "Created with award stub — not bank verified.",
    paymentVerification: "none",
    createdAt: ts,
    updatedAt: ts,
  };
  bag.obligations.push(obligation);

  return { application, agreement, deal };
}
