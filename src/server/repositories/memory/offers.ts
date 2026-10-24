import { canAcceptOfferVersion } from "@/lib/offers/acceptance";
import {
  getWorkspaceBag,
  newId,
  nowIso,
  type DealRecord,
  type OfferRecord,
  type OfferVersionRecord,
} from "./store";

export function listOffers(
  workspaceId: string,
  opts?: { userId?: string; listingId?: string },
): (OfferRecord & { versions: OfferVersionRecord[] })[] {
  const bag = getWorkspaceBag(workspaceId);
  return bag.offers
    .filter((o) => {
      if (o.workspaceId !== workspaceId) return false;
      if (opts?.listingId && o.listingId !== opts.listingId) return false;
      if (opts?.userId && o.fromUserId !== opts.userId) return false;
      return true;
    })
    .map((o) => ({
      ...o,
      versions: bag.offerVersions
        .filter((v) => v.offerId === o.id)
        .sort((a, b) => a.version - b.version),
    }));
}

export function getOffer(workspaceId: string, offerId: string) {
  const bag = getWorkspaceBag(workspaceId);
  const offer = bag.offers.find(
    (o) => o.id === offerId && o.workspaceId === workspaceId,
  );
  if (!offer) return null;
  return {
    ...offer,
    versions: bag.offerVersions
      .filter((v) => v.offerId === offer.id)
      .sort((a, b) => a.version - b.version),
  };
}

export function draftOffer(input: {
  workspaceId: string;
  listingId: string;
  fromUserId: string;
  amountMinor: number;
  message?: string;
  terms?: Record<string, unknown>;
}): OfferRecord & { versions: OfferVersionRecord[] } {
  const bag = getWorkspaceBag(input.workspaceId);
  const ts = nowIso();
  const offer: OfferRecord = {
    id: newId("off"),
    workspaceId: input.workspaceId,
    listingId: input.listingId,
    fromUserId: input.fromUserId,
    status: "draft",
    currentVersion: 1,
    createdAt: ts,
    updatedAt: ts,
  };
  const version: OfferVersionRecord = {
    id: newId("offv"),
    offerId: offer.id,
    workspaceId: input.workspaceId,
    version: 1,
    amountMinor: input.amountMinor,
    currency: "USD",
    termsJson: JSON.stringify(input.terms ?? {}),
    message: input.message ?? null,
    expiresAt: null,
    createdBy: input.fromUserId,
    createdAt: ts,
  };
  bag.offers.push(offer);
  bag.offerVersions.push(version);
  return { ...offer, versions: [version] };
}

export function submitOffer(
  workspaceId: string,
  offerId: string,
): OfferRecord {
  const offer = getWorkspaceBag(workspaceId).offers.find(
    (o) => o.id === offerId && o.workspaceId === workspaceId,
  );
  if (!offer) throw new Error("Offer not found");
  if (offer.status !== "draft" && offer.status !== "countered") {
    throw new Error(`Cannot submit offer in status ${offer.status}`);
  }
  offer.status = "submitted";
  offer.updatedAt = nowIso();
  return offer;
}

export function counterOffer(input: {
  workspaceId: string;
  offerId: string;
  createdBy: string;
  amountMinor: number;
  message?: string;
  terms?: Record<string, unknown>;
}): OfferRecord & { versions: OfferVersionRecord[] } {
  const bag = getWorkspaceBag(input.workspaceId);
  const offer = bag.offers.find(
    (o) => o.id === input.offerId && o.workspaceId === input.workspaceId,
  );
  if (!offer) throw new Error("Offer not found");
  if (offer.status !== "submitted" && offer.status !== "countered") {
    throw new Error(`Cannot counter offer in status ${offer.status}`);
  }
  const nextVersion = offer.currentVersion + 1;
  const ts = nowIso();
  const version: OfferVersionRecord = {
    id: newId("offv"),
    offerId: offer.id,
    workspaceId: input.workspaceId,
    version: nextVersion,
    amountMinor: input.amountMinor,
    currency: "USD",
    termsJson: JSON.stringify(input.terms ?? {}),
    message: input.message ?? null,
    expiresAt: null,
    createdBy: input.createdBy,
    createdAt: ts,
  };
  bag.offerVersions.push(version);
  offer.currentVersion = nextVersion;
  offer.status = "countered";
  offer.updatedAt = ts;
  return getOffer(input.workspaceId, offer.id)!;
}

export function acceptOffer(input: {
  workspaceId: string;
  offerId: string;
  version: number;
}): { offer: OfferRecord; deal: DealRecord } {
  const bag = getWorkspaceBag(input.workspaceId);
  const offer = bag.offers.find(
    (o) => o.id === input.offerId && o.workspaceId === input.workspaceId,
  );
  if (!offer) throw new Error("Offer not found");

  const guard = canAcceptOfferVersion({
    offerStatus: offer.status,
    currentVersion: offer.currentVersion,
    requestedVersion: input.version,
  });
  if (!guard.ok) throw new Error(guard.reason);

  const current = bag.offerVersions.find(
    (v) => v.offerId === offer.id && v.version === offer.currentVersion,
  );
  const ts = nowIso();
  offer.status = "accepted";
  offer.updatedAt = ts;

  const deal: DealRecord = {
    id: newId("deal"),
    workspaceId: input.workspaceId,
    listingId: offer.listingId,
    offerId: offer.id,
    stage: "accepted",
    partiesJson: JSON.stringify([
      { userId: offer.fromUserId, role: "buyer" },
      { userId: "user_harbor_owner", role: "owner" },
    ]),
    acceptedTermsJson: current?.termsJson ?? "{}",
    createdAt: ts,
    updatedAt: ts,
  };
  bag.deals.push(deal);
  return { offer, deal };
}

export function listDeals(workspaceId: string): DealRecord[] {
  return getWorkspaceBag(workspaceId).deals.filter(
    (d) => d.workspaceId === workspaceId,
  );
}
