import { nanoid } from "nanoid";
import type { OpportunityKind, ListingPublicationStatus } from "@/lib/constants";

export type FavoriteRecord = {
  id: string;
  workspaceId: string;
  userId: string;
  listingId: string;
  createdAt: string;
  updatedAt: string;
};

export type InquiryRecord = {
  id: string;
  workspaceId: string;
  listingId: string;
  fromUserId: string;
  status: string;
  message: string;
  experience: string | null;
  timeframe: string | null;
  readiness: string | null;
  consentJson: string;
  idempotencyKey: string;
  assignedTo: string | null;
  createdAt: string;
  updatedAt: string;
};

export type MessageRecord = {
  id: string;
  workspaceId: string;
  inquiryId: string;
  senderUserId: string;
  body: string;
  createdAt: string;
};

export type OfferRecord = {
  id: string;
  workspaceId: string;
  listingId: string;
  fromUserId: string;
  status: "draft" | "submitted" | "countered" | "accepted" | "withdrawn" | "expired";
  currentVersion: number;
  createdAt: string;
  updatedAt: string;
};

export type OfferVersionRecord = {
  id: string;
  offerId: string;
  workspaceId: string;
  version: number;
  amountMinor: number | null;
  currency: string;
  termsJson: string;
  message: string | null;
  expiresAt: string | null;
  createdBy: string;
  createdAt: string;
};

export type DealRecord = {
  id: string;
  workspaceId: string;
  listingId: string;
  offerId: string | null;
  applicationId?: string | null;
  stage: string;
  partiesJson: string;
  acceptedTermsJson: string;
  createdAt: string;
  updatedAt: string;
};

export type AppointmentRecord = {
  id: string;
  workspaceId: string;
  listingId: string;
  organizerUserId: string;
  participantUserId: string;
  type: string;
  status: "requested" | "confirmed" | "cancelled" | "completed";
  startsAtUtc: string;
  endsAtUtc: string;
  timeZone: string;
  locationOrLink: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

export type DocumentRecord = {
  id: string;
  workspaceId: string;
  listingId: string | null;
  fileName: string;
  category: string;
  storageKey: string;
  mimeType: string;
  sizeBytes: number;
  label: string;
  createdAt: string;
};

export type GrantRecord = {
  id: string;
  workspaceId: string;
  documentId: string;
  userId: string;
  status: "requested" | "granted" | "revoked" | "expired";
  expiresAt: string | null;
  grantedBy: string | null;
  createdAt: string;
  updatedAt: string;
};

export type NdaRecord = {
  id: string;
  workspaceId: string;
  listingId: string;
  userId: string;
  status: "pending" | "acknowledged";
  acknowledgedAt: string | null;
  simulationNote: string;
  createdAt: string;
};

export type ListingDraftRecord = {
  id: string;
  workspaceId: string;
  createdBy: string;
  kind: OpportunityKind;
  status: ListingPublicationStatus;
  title: string;
  summary: string;
  description: string;
  citySlug: string;
  industrySlug: string;
  locationLabel: string;
  confidential: boolean;
  commercial: Record<string, unknown>;
  operations: Record<string, unknown>;
  inclusions: string[];
  exclusions: string[];
  reviewNotes: string | null;
  version: number;
  publicCode: string | null;
  slug: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ListingRevisionRecord = {
  id: string;
  listingDraftId: string;
  workspaceId: string;
  version: number;
  status: "submitted" | "changes-requested" | "approved";
  payloadJson: string;
  reviewNotes: string | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

export type ApplicationRecord = {
  id: string;
  workspaceId: string;
  listingId: string;
  userId: string;
  kind: "business-rental" | "service-tender";
  status:
    | "draft"
    | "submitted"
    | "under-review"
    | "accepted"
    | "rejected"
    | "withdrawn"
    | "awarded";
  payloadJson: string;
  version: number;
  createdAt: string;
  updatedAt: string;
};

export type AgreementRecord = {
  id: string;
  workspaceId: string;
  dealId: string | null;
  listingId: string | null;
  applicationId: string | null;
  status: "pending" | "active" | "completed" | "terminated";
  startDate: string | null;
  endDate: string | null;
  partiesJson: string;
  responsibilityJson: string;
  currentVersion: number;
  title: string;
  createdAt: string;
  updatedAt: string;
};

export type ObligationRecord = {
  id: string;
  workspaceId: string;
  agreementId: string;
  title: string;
  dueAt: string;
  status: "upcoming" | "due" | "reported" | "completed" | "overdue" | "waived";
  kind: "payment" | "reporting" | "insurance" | "maintenance" | "other";
  amountMinor: number | null;
  currency: string | null;
  notes: string | null;
  paymentVerification: "none" | "manual-reported" | "bank-verified";
  createdAt: string;
  updatedAt: string;
};

export type MaintenanceRequestRecord = {
  id: string;
  workspaceId: string;
  agreementId: string | null;
  listingId: string | null;
  assetLabel: string;
  description: string;
  urgency: "low" | "normal" | "high" | "emergency";
  status: "reported" | "triaged" | "in-progress" | "resolved" | "cancelled";
  responsibleParty: string | null;
  evidenceNote: string | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

export type WorkspaceBag = {
  favorites: FavoriteRecord[];
  inquiries: InquiryRecord[];
  messages: MessageRecord[];
  offers: OfferRecord[];
  offerVersions: OfferVersionRecord[];
  deals: DealRecord[];
  appointments: AppointmentRecord[];
  documents: DocumentRecord[];
  grants: GrantRecord[];
  ndas: NdaRecord[];
  listingDrafts: ListingDraftRecord[];
  listingRevisions: ListingRevisionRecord[];
  applications: ApplicationRecord[];
  agreements: AgreementRecord[];
  obligations: ObligationRecord[];
  maintenanceRequests: MaintenanceRequestRecord[];
};

const globalKey = "__nbh_workspace_bags__";

type GlobalBags = {
  bags: Map<string, WorkspaceBag>;
};

function getBagsMap(): Map<string, WorkspaceBag> {
  const g = globalThis as typeof globalThis & { [globalKey]?: GlobalBags };
  if (!g[globalKey]) {
    g[globalKey] = { bags: new Map() };
  }
  return g[globalKey].bags;
}

function nowIso() {
  return new Date().toISOString();
}

/** Seed anchors cloned into every new workspace for demo continuity. */
function buildSeedBag(workspaceId: string): WorkspaceBag {
  const ts = nowIso();
  const riversideId = "lst_nbh_s_1001";
  const laundryId = "lst_nbh_r_2001";
  const mayaId = "user_maya_chen";
  const ownerId = "user_harbor_owner";
  const operatorId = "user_daniel_brooks";
  const inquiryId = `inq_${workspaceId}_riverside`;
  const offerId = `off_${workspaceId}_riverside`;
  const agreementId = `agr_${workspaceId}_laundry`;

  return {
    favorites: [
      {
        id: `fav_${workspaceId}_riverside`,
        workspaceId,
        userId: mayaId,
        listingId: riversideId,
        createdAt: ts,
        updatedAt: ts,
      },
    ],
    inquiries: [
      {
        id: inquiryId,
        workspaceId,
        listingId: riversideId,
        fromUserId: mayaId,
        status: "open",
        message:
          "Interested in a diligence call for Riverside Café. Demo inquiry only.",
        experience: "First-time buyer exploring Middle Tennessee cafés.",
        timeframe: "60-90 days",
        readiness: "proof-of-funds pending",
        consentJson: JSON.stringify({ marketing: false, demoAck: true }),
        idempotencyKey: `seed-riverside-${workspaceId}`,
        assignedTo: ownerId,
        createdAt: ts,
        updatedAt: ts,
      },
    ],
    messages: [
      {
        id: `msg_${workspaceId}_1`,
        workspaceId,
        inquiryId,
        senderUserId: mayaId,
        body: "Thanks for publishing this demo listing — happy to schedule a walkthrough.",
        createdAt: ts,
      },
    ],
    offers: [
      {
        id: offerId,
        workspaceId,
        listingId: riversideId,
        fromUserId: mayaId,
        status: "submitted",
        currentVersion: 1,
        createdAt: ts,
        updatedAt: ts,
      },
    ],
    offerVersions: [
      {
        id: `offv_${workspaceId}_1`,
        offerId,
        workspaceId,
        version: 1,
        amountMinor: 40000000,
        currency: "USD",
        termsJson: JSON.stringify({
          closingDays: 45,
          inventory: "valued at closing",
        }),
        message: "Nonbinding demo offer at $400,000.",
        expiresAt: null,
        createdBy: mayaId,
        createdAt: ts,
      },
    ],
    deals: [
      {
        id: `deal_${workspaceId}_riverside`,
        workspaceId,
        listingId: riversideId,
        offerId,
        applicationId: null,
        stage: "negotiation",
        partiesJson: JSON.stringify([
          { userId: mayaId, role: "buyer" },
          { userId: ownerId, role: "owner" },
        ]),
        acceptedTermsJson: "{}",
        createdAt: ts,
        updatedAt: ts,
      },
    ],
    appointments: [
      {
        id: `appt_${workspaceId}_riverside`,
        workspaceId,
        listingId: riversideId,
        organizerUserId: mayaId,
        participantUserId: ownerId,
        type: "site-visit",
        status: "requested",
        startsAtUtc: "2026-11-05T15:00:00.000Z",
        endsAtUtc: "2026-11-05T16:00:00.000Z",
        timeZone: "America/Chicago",
        locationOrLink: "Riverside corridor, Nashville (demo)",
        notes: "Seeded demo visit request.",
        createdAt: ts,
        updatedAt: ts,
      },
    ],
    documents: [
      {
        id: "doc_riverside_pfs",
        workspaceId,
        listingId: riversideId,
        fileName: "riverside-cafe-pfs.txt",
        category: "financial",
        storageKey: "doc_riverside_pfs/riverside-cafe-pfs.txt",
        mimeType: "text/plain",
        sizeBytes: 180,
        label: "Riverside Café — fictional PFS summary",
        createdAt: ts,
      },
      {
        id: "doc_riverside_lease",
        workspaceId,
        listingId: riversideId,
        fileName: "riverside-cafe-lease-excerpt.txt",
        category: "legal",
        storageKey: "doc_riverside_lease/riverside-cafe-lease-excerpt.txt",
        mimeType: "text/plain",
        sizeBytes: 160,
        label: "Riverside Café — fictional lease excerpt",
        createdAt: ts,
      },
      {
        id: "doc_nda_template",
        workspaceId,
        listingId: riversideId,
        fileName: "nda-acknowledgement.txt",
        category: "nda",
        storageKey: "doc_nda_template/nda-acknowledgement.txt",
        mimeType: "text/plain",
        sizeBytes: 200,
        label: "Demo NDA acknowledgement text",
        createdAt: ts,
      },
    ],
    grants: [
      {
        id: `grant_${workspaceId}_pfs_maya`,
        workspaceId,
        documentId: "doc_riverside_pfs",
        userId: mayaId,
        status: "granted",
        expiresAt: null,
        grantedBy: ownerId,
        createdAt: ts,
        updatedAt: ts,
      },
      {
        id: `grant_${workspaceId}_lease_maya`,
        workspaceId,
        documentId: "doc_riverside_lease",
        userId: mayaId,
        status: "granted",
        expiresAt: null,
        grantedBy: ownerId,
        createdAt: ts,
        updatedAt: ts,
      },
    ],
    ndas: [
      {
        id: `nda_${workspaceId}_maya`,
        workspaceId,
        listingId: riversideId,
        userId: mayaId,
        status: "acknowledged",
        acknowledgedAt: ts,
        simulationNote: "Nonbinding demonstration acknowledgement",
        createdAt: ts,
      },
    ],
    listingDrafts: [],
    listingRevisions: [],
    applications: [],
    agreements: [
      {
        id: agreementId,
        workspaceId,
        dealId: null,
        listingId: laundryId,
        applicationId: null,
        status: "active",
        startDate: "2026-01-01",
        endDate: "2027-12-31",
        partiesJson: JSON.stringify([
          { userId: operatorId, role: "operator" },
          { userId: ownerId, role: "owner" },
        ]),
        responsibilityJson: JSON.stringify({
          rent: "operator",
          routineMaintenance: "operator",
          capitalRepairs: "owner",
        }),
        currentVersion: 1,
        title: "Cumberland Laundry operating agreement (demo)",
        createdAt: ts,
        updatedAt: ts,
      },
    ],
    obligations: [
      {
        id: `obl_${workspaceId}_rent`,
        workspaceId,
        agreementId,
        title: "November operating rent",
        dueAt: "2026-11-01T12:00:00.000Z",
        status: "due",
        kind: "payment",
        amountMinor: 450000,
        currency: "USD",
        notes: "Manual demo obligation — not bank-linked.",
        paymentVerification: "none",
        createdAt: ts,
        updatedAt: ts,
      },
      {
        id: `obl_${workspaceId}_ins`,
        workspaceId,
        agreementId,
        title: "Liability insurance certificate",
        dueAt: "2026-11-15T12:00:00.000Z",
        status: "upcoming",
        kind: "insurance",
        amountMinor: null,
        currency: null,
        notes: "Upload placeholder only in this demo.",
        paymentVerification: "none",
        createdAt: ts,
        updatedAt: ts,
      },
    ],
    maintenanceRequests: [],
  };
}

export function ensureWorkspaceBag(workspaceId: string): WorkspaceBag {
  const bags = getBagsMap();
  let bag = bags.get(workspaceId);
  if (!bag) {
    bag = buildSeedBag(workspaceId);
    bags.set(workspaceId, bag);
  } else {
    // Migrate bags created before Phase 3–5 collections existed.
    bag.listingDrafts ??= [];
    bag.listingRevisions ??= [];
    bag.applications ??= [];
    bag.agreements ??= [];
    bag.obligations ??= [];
    bag.maintenanceRequests ??= [];
  }
  return bag;
}

export function getWorkspaceBag(workspaceId: string): WorkspaceBag {
  return ensureWorkspaceBag(workspaceId);
}

export function listWorkspaceIds(): string[] {
  const bags = getBagsMap();
  if (!bags.has("base")) {
    ensureWorkspaceBag("base");
  }
  return [...bags.keys()];
}

export function resetWorkspaceBag(workspaceId: string): WorkspaceBag {
  const bag = buildSeedBag(workspaceId);
  getBagsMap().set(workspaceId, bag);
  return bag;
}

export function newId(prefix: string): string {
  return `${prefix}_${nanoid(10)}`;
}

export { nowIso };
