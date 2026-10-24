import { describe, expect, it } from "vitest";
import { createInquiry, listInquiries } from "@/server/repositories/memory/inquiries";
import {
  ensureWorkspaceBag,
  resetWorkspaceBag,
} from "@/server/repositories/memory/store";

describe("workspace isolation", () => {
  it("keeps inquiries scoped to their workspace", () => {
    resetWorkspaceBag("ws_test_a");
    resetWorkspaceBag("ws_test_b");
    ensureWorkspaceBag("ws_test_a");
    ensureWorkspaceBag("ws_test_b");

    createInquiry({
      workspaceId: "ws_test_a",
      listingId: "lst_nbh_s_1001",
      fromUserId: "user_maya_chen",
      message: "Workspace A only inquiry for isolation test.",
      idempotencyKey: "iso-a-1",
    });

    const a = listInquiries("ws_test_a").map((i) => i.idempotencyKey);
    const b = listInquiries("ws_test_b").map((i) => i.idempotencyKey);

    expect(a).toContain("iso-a-1");
    expect(b).not.toContain("iso-a-1");
  });
});
