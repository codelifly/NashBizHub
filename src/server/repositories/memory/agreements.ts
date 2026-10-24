import {
  getWorkspaceBag,
  newId,
  nowIso,
  type AgreementRecord,
  type MaintenanceRequestRecord,
  type ObligationRecord,
} from "./store";

export function listAgreements(
  workspaceId: string,
): AgreementRecord[] {
  return getWorkspaceBag(workspaceId).agreements.filter(
    (a) => a.workspaceId === workspaceId,
  );
}

export function getAgreement(
  workspaceId: string,
  id: string,
): AgreementRecord | null {
  return (
    getWorkspaceBag(workspaceId).agreements.find(
      (a) => a.id === id && a.workspaceId === workspaceId,
    ) ?? null
  );
}

export function listObligations(
  workspaceId: string,
  opts?: { agreementId?: string },
): ObligationRecord[] {
  return getWorkspaceBag(workspaceId).obligations.filter((o) => {
    if (o.workspaceId !== workspaceId) return false;
    if (opts?.agreementId && o.agreementId !== opts.agreementId) return false;
    return true;
  });
}

export function getObligation(
  workspaceId: string,
  id: string,
): ObligationRecord | null {
  return (
    getWorkspaceBag(workspaceId).obligations.find(
      (o) => o.id === id && o.workspaceId === workspaceId,
    ) ?? null
  );
}

/** Mark a payment obligation as manually reported (not bank verified). */
export function reportObligationPayment(
  workspaceId: string,
  obligationId: string,
  notes?: string,
): ObligationRecord {
  const obligation = getObligation(workspaceId, obligationId);
  if (!obligation) throw new Error("Obligation not found");
  if (obligation.kind !== "payment") {
    throw new Error("Only payment obligations can be marked reported");
  }
  if (obligation.status === "completed" || obligation.status === "waived") {
    throw new Error(`Cannot report obligation in status ${obligation.status}`);
  }
  const ts = nowIso();
  obligation.status = "reported";
  obligation.paymentVerification = "manual-reported";
  obligation.notes = [
    obligation.notes,
    notes ?? "Operator reported payment manually (demo — not bank verified).",
  ]
    .filter(Boolean)
    .join(" · ");
  obligation.updatedAt = ts;
  return obligation;
}

export function listMaintenanceRequests(
  workspaceId: string,
  opts?: { agreementId?: string },
): MaintenanceRequestRecord[] {
  return getWorkspaceBag(workspaceId).maintenanceRequests.filter((m) => {
    if (m.workspaceId !== workspaceId) return false;
    if (opts?.agreementId && m.agreementId !== opts.agreementId) return false;
    return true;
  });
}

export function createMaintenanceRequest(input: {
  workspaceId: string;
  createdBy: string;
  agreementId?: string | null;
  listingId?: string | null;
  assetLabel: string;
  description: string;
  urgency?: MaintenanceRequestRecord["urgency"];
  responsibleParty?: string | null;
}): MaintenanceRequestRecord {
  const bag = getWorkspaceBag(input.workspaceId);
  if (input.agreementId) {
    const agreement = getAgreement(input.workspaceId, input.agreementId);
    if (!agreement) throw new Error("Agreement not found");
  }
  const ts = nowIso();
  const record: MaintenanceRequestRecord = {
    id: newId("mnt"),
    workspaceId: input.workspaceId,
    agreementId: input.agreementId ?? null,
    listingId: input.listingId ?? null,
    assetLabel: input.assetLabel,
    description: input.description,
    urgency: input.urgency ?? "normal",
    status: "reported",
    responsibleParty: input.responsibleParty ?? null,
    evidenceNote: null,
    createdBy: input.createdBy,
    createdAt: ts,
    updatedAt: ts,
  };
  bag.maintenanceRequests.push(record);
  return record;
}
