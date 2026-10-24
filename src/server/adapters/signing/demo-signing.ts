import { getEnv } from "@/lib/env";

export const demoSigningAdapter = {
  async acknowledge(input: {
    documentLabel: string;
    userId: string;
    version: number;
  }) {
    const env = getEnv();
    if (env.APP_ENV === "production") {
      throw new Error("Demo signing adapter is disabled in production");
    }

    return {
      simulated: true as const,
      nonbinding: true as const,
      acknowledgedAt: new Date().toISOString(),
      documentLabel: input.documentLabel,
      userId: input.userId,
      version: input.version,
      notice:
        "This is a nonbinding demonstration acknowledgement, not a production legal signature.",
    };
  },
};
