import { describe, expect, it } from "vitest";
import {
  createApplication,
  decideApplication,
  listApplications,
} from "@/server/repositories/memory/applications";
import {
  createListingDraft,
  listModerationQueue,
  submitListingDraft,
  approveListingDraft,
  requestListingChanges,
} from "@/server/repositories/memory/listing-drafts";
import {
  listAgreements,
  listObligations,
  reportObligationPayment,
  createMaintenanceRequest,
} from "@/server/repositories/memory/agreements";
import { listCrmCustomers } from "@/server/repositories/memory/crm";
import { resetWorkspaceBag } from "@/server/repositories/memory/store";

describe("phase 3–5 memory flows", () => {
  it("listing draft submit → moderation → approve", () => {
    const ws = "ws_test_listing_wizard";
    resetWorkspaceBag(ws);

    const draft = createListingDraft({
      workspaceId: ws,
      createdBy: "user_harbor_owner",
      kind: "sale",
      title: "Demo bakery for sale",
      summary: "A fictional Middle Tennessee bakery listing.",
      description:
        "Longer description for the demo bakery listing used in unit tests.",
      citySlug: "nashville",
      industrySlug: "cafes-coffee",
      locationLabel: "East Nashville (demo)",
      commercial: {
        asking: {
          status: "disclosed",
          value: { minorUnits: 15000000, currency: "USD" },
        },
      },
    });

    submitListingDraft(ws, draft.id, "user_harbor_owner");
    expect(listModerationQueue(ws).map((d) => d.id)).toContain(draft.id);

    requestListingChanges(ws, draft.id, "Add earnings disclosure.");
    expect(listModerationQueue(ws)[0]?.status).toBe("changes-requested");

    submitListingDraft(ws, draft.id, "user_harbor_owner");
    const active = approveListingDraft(ws, draft.id);
    expect(active.status).toBe("active");
    expect(active.publicCode).toBeTruthy();
  });

  it("rental application award creates agreement stub", () => {
    const ws = "ws_test_applications";
    resetWorkspaceBag(ws);

    const app = createApplication({
      workspaceId: ws,
      listingId: "lst_nbh_r_2001",
      userId: "user_daniel_brooks",
      kind: "business-rental",
      payload: { message: "Ready to operate Cumberland Laundry (demo)." },
      submit: true,
    });

    expect(listApplications(ws)).toHaveLength(1);

    const before = listAgreements(ws).length;
    const result = decideApplication({
      workspaceId: ws,
      applicationId: app.id,
      decision: "award",
    });

    expect(result.application.status).toBe("awarded");
    expect(result.agreement).toBeTruthy();
    expect(listAgreements(ws).length).toBe(before + 1);
  });

  it("seeded obligations support manual payment report + maintenance", () => {
    const ws = "ws_test_ops";
    resetWorkspaceBag(ws);

    const obligations = listObligations(ws);
    const payment = obligations.find((o) => o.kind === "payment");
    expect(payment).toBeTruthy();

    const reported = reportObligationPayment(ws, payment!.id);
    expect(reported.status).toBe("reported");
    expect(reported.paymentVerification).toBe("manual-reported");

    const agreement = listAgreements(ws)[0]!;
    const mnt = createMaintenanceRequest({
      workspaceId: ws,
      createdBy: "user_daniel_brooks",
      agreementId: agreement.id,
      listingId: agreement.listingId,
      assetLabel: "Dryer 2",
      description: "Demo dryer overheating on cycle end.",
    });
    expect(mnt.status).toBe("reported");
  });

  it("CRM lists inquiry customers with stage", () => {
    const ws = "ws_test_crm";
    resetWorkspaceBag(ws);
    const customers = listCrmCustomers(ws);
    expect(customers.length).toBeGreaterThan(0);
    expect(customers[0]?.stage).toBeTruthy();
  });
});
