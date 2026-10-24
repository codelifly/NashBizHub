/**
 * Pure offer-version acceptance guard.
 * Only the current version of an offer may be accepted.
 */
export type AcceptOfferInput = {
  offerStatus: string;
  currentVersion: number;
  requestedVersion: number;
};

export type AcceptOfferResult =
  | { ok: true }
  | { ok: false; reason: string };

export function canAcceptOfferVersion(
  input: AcceptOfferInput,
): AcceptOfferResult {
  if (input.offerStatus === "accepted") {
    return { ok: false, reason: "Offer is already accepted" };
  }
  if (input.offerStatus === "withdrawn" || input.offerStatus === "expired") {
    return { ok: false, reason: `Offer cannot be accepted while ${input.offerStatus}` };
  }
  if (input.offerStatus === "draft") {
    return { ok: false, reason: "Draft offers must be submitted before acceptance" };
  }
  if (input.requestedVersion !== input.currentVersion) {
    return {
      ok: false,
      reason: `Cannot accept version ${input.requestedVersion}; current version is ${input.currentVersion}`,
    };
  }
  return { ok: true };
}
