import type { OpportunityKind } from "@/lib/constants";
import {
  getWorkspaceBag,
  newId,
  nowIso,
  type ListingDraftRecord,
  type ListingRevisionRecord,
} from "./store";

export type ListingDraftInput = {
  workspaceId: string;
  createdBy: string;
  kind: OpportunityKind;
  title: string;
  summary: string;
  description: string;
  citySlug: string;
  industrySlug: string;
  locationLabel: string;
  confidential?: boolean;
  commercial?: Record<string, unknown>;
  operations?: Record<string, unknown>;
  inclusions?: string[];
  exclusions?: string[];
};

function slugify(title: string): string {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 48) || "demo-listing"
  );
}

export function listListingDrafts(
  workspaceId: string,
  opts?: { createdBy?: string; status?: string },
): ListingDraftRecord[] {
  return getWorkspaceBag(workspaceId).listingDrafts.filter((d) => {
    if (d.workspaceId !== workspaceId) return false;
    if (opts?.createdBy && d.createdBy !== opts.createdBy) return false;
    if (opts?.status && d.status !== opts.status) return false;
    return true;
  });
}

export function getListingDraft(
  workspaceId: string,
  id: string,
): ListingDraftRecord | null {
  return (
    getWorkspaceBag(workspaceId).listingDrafts.find(
      (d) => d.id === id && d.workspaceId === workspaceId,
    ) ?? null
  );
}

export function createListingDraft(
  input: ListingDraftInput,
): ListingDraftRecord {
  const bag = getWorkspaceBag(input.workspaceId);
  const ts = nowIso();
  const record: ListingDraftRecord = {
    id: newId("ldraft"),
    workspaceId: input.workspaceId,
    createdBy: input.createdBy,
    kind: input.kind,
    status: "draft",
    title: input.title,
    summary: input.summary,
    description: input.description,
    citySlug: input.citySlug,
    industrySlug: input.industrySlug,
    locationLabel: input.locationLabel,
    confidential: input.confidential ?? false,
    commercial: { kind: input.kind, ...(input.commercial ?? {}) },
    operations: input.operations ?? {},
    inclusions: input.inclusions ?? [],
    exclusions: input.exclusions ?? [],
    reviewNotes: null,
    version: 1,
    publicCode: null,
    slug: null,
    createdAt: ts,
    updatedAt: ts,
  };
  bag.listingDrafts.push(record);
  return record;
}

export function updateListingDraft(
  workspaceId: string,
  id: string,
  patch: Partial<
    Pick<
      ListingDraftRecord,
      | "kind"
      | "title"
      | "summary"
      | "description"
      | "citySlug"
      | "industrySlug"
      | "locationLabel"
      | "confidential"
      | "commercial"
      | "operations"
      | "inclusions"
      | "exclusions"
    >
  >,
): ListingDraftRecord {
  const draft = getListingDraft(workspaceId, id);
  if (!draft) throw new Error("Listing draft not found");
  if (draft.status === "active" || draft.status === "approved") {
    throw new Error(`Cannot edit draft in status ${draft.status}`);
  }
  if (patch.kind !== undefined) draft.kind = patch.kind;
  if (patch.title !== undefined) draft.title = patch.title;
  if (patch.summary !== undefined) draft.summary = patch.summary;
  if (patch.description !== undefined) draft.description = patch.description;
  if (patch.citySlug !== undefined) draft.citySlug = patch.citySlug;
  if (patch.industrySlug !== undefined) draft.industrySlug = patch.industrySlug;
  if (patch.locationLabel !== undefined) draft.locationLabel = patch.locationLabel;
  if (patch.confidential !== undefined) draft.confidential = patch.confidential;
  if (patch.commercial !== undefined) draft.commercial = patch.commercial;
  if (patch.operations !== undefined) draft.operations = patch.operations;
  if (patch.inclusions !== undefined) draft.inclusions = patch.inclusions;
  if (patch.exclusions !== undefined) draft.exclusions = patch.exclusions;
  draft.updatedAt = nowIso();
  if (patch.kind) {
    draft.commercial = { ...draft.commercial, kind: patch.kind };
  }
  return draft;
}

export function submitListingDraft(
  workspaceId: string,
  id: string,
  createdBy: string,
): { draft: ListingDraftRecord; revision: ListingRevisionRecord } {
  const bag = getWorkspaceBag(workspaceId);
  const draft = getListingDraft(workspaceId, id);
  if (!draft) throw new Error("Listing draft not found");
  if (draft.status !== "draft" && draft.status !== "changes-requested") {
    throw new Error(`Cannot submit draft in status ${draft.status}`);
  }
  if (!draft.title.trim() || !draft.summary.trim()) {
    throw new Error("Title and summary are required to submit");
  }

  const ts = nowIso();
  draft.status = "submitted";
  draft.version += 1;
  draft.updatedAt = ts;
  draft.reviewNotes = null;

  const revision: ListingRevisionRecord = {
    id: newId("lrev"),
    listingDraftId: draft.id,
    workspaceId,
    version: draft.version,
    status: "submitted",
    payloadJson: JSON.stringify({
      kind: draft.kind,
      title: draft.title,
      summary: draft.summary,
      description: draft.description,
      citySlug: draft.citySlug,
      industrySlug: draft.industrySlug,
      locationLabel: draft.locationLabel,
      confidential: draft.confidential,
      commercial: draft.commercial,
      operations: draft.operations,
      inclusions: draft.inclusions,
      exclusions: draft.exclusions,
    }),
    reviewNotes: null,
    createdBy,
    createdAt: ts,
    updatedAt: ts,
  };
  bag.listingRevisions.push(revision);
  return { draft, revision };
}

export function listSubmittedRevisions(
  workspaceId: string,
): (ListingRevisionRecord & { draft: ListingDraftRecord | null })[] {
  const bag = getWorkspaceBag(workspaceId);
  return bag.listingRevisions
    .filter(
      (r) =>
        r.workspaceId === workspaceId &&
        (r.status === "submitted" || r.status === "changes-requested"),
    )
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .map((r) => ({
      ...r,
      draft:
        bag.listingDrafts.find((d) => d.id === r.listingDraftId) ?? null,
    }));
}

export function listModerationQueue(workspaceId: string): ListingDraftRecord[] {
  return listListingDrafts(workspaceId).filter(
    (d) => d.status === "submitted" || d.status === "changes-requested",
  );
}

export function getListingRevision(
  workspaceId: string,
  id: string,
): ListingRevisionRecord | null {
  return (
    getWorkspaceBag(workspaceId).listingRevisions.find(
      (r) => r.id === id && r.workspaceId === workspaceId,
    ) ?? null
  );
}

export function approveListingDraft(
  workspaceId: string,
  draftId: string,
  notes?: string,
): ListingDraftRecord {
  const bag = getWorkspaceBag(workspaceId);
  const draft = getListingDraft(workspaceId, draftId);
  if (!draft) throw new Error("Listing draft not found");
  if (draft.status !== "submitted") {
    throw new Error(`Cannot approve draft in status ${draft.status}`);
  }
  const ts = nowIso();
  draft.status = "active";
  draft.reviewNotes = notes ?? "Approved for demo catalogue (memory only).";
  draft.publicCode =
    draft.publicCode ??
    `NBH-D-${String(bag.listingDrafts.indexOf(draft) + 1).padStart(4, "0")}`;
  draft.slug =
    draft.slug ?? `${slugify(draft.title)}-${draft.id.slice(-6)}`;
  draft.updatedAt = ts;

  const latest = [...bag.listingRevisions]
    .filter((r) => r.listingDraftId === draftId)
    .sort((a, b) => b.version - a.version)[0];
  if (latest) {
    latest.status = "approved";
    latest.reviewNotes = draft.reviewNotes;
    latest.updatedAt = ts;
  }
  return draft;
}

export function requestListingChanges(
  workspaceId: string,
  draftId: string,
  notes: string,
): ListingDraftRecord {
  const bag = getWorkspaceBag(workspaceId);
  const draft = getListingDraft(workspaceId, draftId);
  if (!draft) throw new Error("Listing draft not found");
  if (draft.status !== "submitted") {
    throw new Error(`Cannot request changes in status ${draft.status}`);
  }
  const ts = nowIso();
  draft.status = "changes-requested";
  draft.reviewNotes = notes;
  draft.updatedAt = ts;

  const latest = [...bag.listingRevisions]
    .filter((r) => r.listingDraftId === draftId)
    .sort((a, b) => b.version - a.version)[0];
  if (latest) {
    latest.status = "changes-requested";
    latest.reviewNotes = notes;
    latest.updatedAt = ts;
  }
  return draft;
}
