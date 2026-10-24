import fs from "node:fs";
import path from "node:path";
import { getEnv } from "@/lib/env";
import {
  getWorkspaceBag,
  newId,
  nowIso,
  type DocumentRecord,
  type GrantRecord,
  type NdaRecord,
} from "./store";

export function listDocuments(
  workspaceId: string,
  listingId?: string,
): DocumentRecord[] {
  return getWorkspaceBag(workspaceId).documents.filter((d) => {
    if (d.workspaceId !== workspaceId) return false;
    if (listingId && d.listingId !== listingId) return false;
    return true;
  });
}

export function getDocument(
  workspaceId: string,
  documentId: string,
): DocumentRecord | null {
  return (
    getWorkspaceBag(workspaceId).documents.find(
      (d) => d.id === documentId && d.workspaceId === workspaceId,
    ) ?? null
  );
}

export function hasActiveGrant(
  workspaceId: string,
  documentId: string,
  userId: string,
): boolean {
  const grant = getWorkspaceBag(workspaceId).grants.find(
    (g) =>
      g.workspaceId === workspaceId &&
      g.documentId === documentId &&
      g.userId === userId &&
      g.status === "granted",
  );
  if (!grant) return false;
  if (grant.expiresAt && Date.parse(grant.expiresAt) < Date.now()) {
    return false;
  }
  return true;
}

export function acknowledgeNda(input: {
  workspaceId: string;
  listingId: string;
  userId: string;
}): NdaRecord {
  const bag = getWorkspaceBag(input.workspaceId);
  const existing = bag.ndas.find(
    (n) =>
      n.workspaceId === input.workspaceId &&
      n.listingId === input.listingId &&
      n.userId === input.userId,
  );
  const ts = nowIso();
  if (existing) {
    existing.status = "acknowledged";
    existing.acknowledgedAt = ts;
    return existing;
  }
  const record: NdaRecord = {
    id: newId("nda"),
    workspaceId: input.workspaceId,
    listingId: input.listingId,
    userId: input.userId,
    status: "acknowledged",
    acknowledgedAt: ts,
    simulationNote: "Nonbinding demonstration acknowledgement",
    createdAt: ts,
  };
  bag.ndas.push(record);
  return record;
}

export function requestGrant(input: {
  workspaceId: string;
  documentId: string;
  userId: string;
}): GrantRecord {
  const bag = getWorkspaceBag(input.workspaceId);
  const existing = bag.grants.find(
    (g) =>
      g.documentId === input.documentId &&
      g.userId === input.userId &&
      g.workspaceId === input.workspaceId,
  );
  if (existing) return existing;
  const ts = nowIso();
  const grant: GrantRecord = {
    id: newId("grant"),
    workspaceId: input.workspaceId,
    documentId: input.documentId,
    userId: input.userId,
    status: "requested",
    expiresAt: null,
    grantedBy: null,
    createdAt: ts,
    updatedAt: ts,
  };
  bag.grants.push(grant);
  return grant;
}

export function grantAccess(input: {
  workspaceId: string;
  grantId: string;
  grantedBy: string;
}): GrantRecord {
  const bag = getWorkspaceBag(input.workspaceId);
  const grant = bag.grants.find(
    (g) => g.id === input.grantId && g.workspaceId === input.workspaceId,
  );
  if (!grant) throw new Error("Grant not found");
  grant.status = "granted";
  grant.grantedBy = input.grantedBy;
  grant.updatedAt = nowIso();
  return grant;
}

export function resolvePrivateFilePath(storageKey: string): string {
  const root = getEnv().PRIVATE_STORAGE_PATH;
  const absRoot = path.isAbsolute(root)
    ? root
    : path.join(/*turbopackIgnore: true*/ process.cwd(), root);
  const resolved = path.normalize(path.join(absRoot, storageKey));
  if (!resolved.startsWith(path.normalize(absRoot))) {
    throw new Error("Invalid storage key");
  }
  return resolved;
}

export function readPrivateDocumentBytes(
  workspaceId: string,
  documentId: string,
  userId: string,
): { bytes: Buffer; document: DocumentRecord } {
  const document = getDocument(workspaceId, documentId);
  if (!document) throw new Error("Document not found");
  if (!hasActiveGrant(workspaceId, documentId, userId)) {
    throw new Error("No active document grant");
  }
  const filePath = resolvePrivateFilePath(document.storageKey);
  if (!fs.existsSync(filePath)) {
    // Fallback demonstration content if seed files missing
    const fallback = Buffer.from(
      `Demonstration Document\n\nMissing file for ${document.label}; regenerated fallback.\n`,
      "utf8",
    );
    return { bytes: fallback, document };
  }
  return { bytes: fs.readFileSync(filePath), document };
}
