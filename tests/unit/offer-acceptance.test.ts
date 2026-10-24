import { describe, expect, it } from "vitest";
import { canAcceptOfferVersion } from "@/lib/offers/acceptance";

describe("canAcceptOfferVersion", () => {
  it("allows accepting the current submitted version", () => {
    expect(
      canAcceptOfferVersion({
        offerStatus: "submitted",
        currentVersion: 2,
        requestedVersion: 2,
      }),
    ).toEqual({ ok: true });
  });

  it("rejects non-current version", () => {
    const result = canAcceptOfferVersion({
      offerStatus: "submitted",
      currentVersion: 2,
      requestedVersion: 1,
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toMatch(/current version is 2/i);
    }
  });

  it("rejects draft and already-accepted offers", () => {
    expect(
      canAcceptOfferVersion({
        offerStatus: "draft",
        currentVersion: 1,
        requestedVersion: 1,
      }).ok,
    ).toBe(false);
    expect(
      canAcceptOfferVersion({
        offerStatus: "accepted",
        currentVersion: 1,
        requestedVersion: 1,
      }).ok,
    ).toBe(false);
  });
});
