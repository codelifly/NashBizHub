import { getEnv } from "@/lib/env";

export const demoVerificationAdapter = {
  async review(input: {
    requestId: string;
    decision: "approved" | "changes-requested" | "rejected";
    note?: string;
  }) {
    const env = getEnv();
    if (env.APP_ENV === "production") {
      throw new Error("Demo verification adapter is disabled in production");
    }

    return {
      simulated: true as const,
      requestId: input.requestId,
      decision: input.decision,
      note: input.note ?? null,
      badgeMeaning:
        input.decision === "approved"
          ? "Demo verification badge: fictional evidence accepted for presentation only"
          : "Demo verification incomplete",
    };
  },
};
