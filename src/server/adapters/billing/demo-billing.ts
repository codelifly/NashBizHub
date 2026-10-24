import { getEnv } from "@/lib/env";

export const demoBillingAdapter = {
  async simulateCharge(input: { invoiceId: string; succeed?: boolean }) {
    const env = getEnv();
    if (env.APP_ENV === "production") {
      throw new Error("Demo billing adapter is disabled in production");
    }

    return {
      simulated: true as const,
      invoiceId: input.invoiceId,
      status: input.succeed === false ? ("failed" as const) : ("paid-simulated" as const),
      notice: "No real card was charged. This is a billing simulation only.",
    };
  },
};
