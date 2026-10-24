import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getDb } from "@/server/db/client";
import * as schema from "@/server/db/schema";
import { getEnv } from "@/lib/env";
import { demoOutboxAdapter } from "@/server/adapters/email/demo-outbox";

export function createAuth() {
  const env = getEnv();

  return betterAuth({
    database: drizzleAdapter(getDb(), {
      provider: "sqlite",
      schema: {
        user: schema.users,
        session: schema.sessions,
        account: schema.accounts,
        verification: schema.verifications,
      },
    }),
    baseURL: env.BETTER_AUTH_URL,
    secret: env.BETTER_AUTH_SECRET,
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,
      sendResetPassword: async ({ user, url }) => {
        await demoOutboxAdapter.send({
          to: user.email,
          subject: "Reset your NashBizHub password (simulated)",
          body: `Simulated password reset link for ${user.email}: ${url}`,
          kind: "password-reset",
          meta: { userId: user.id },
        });
      },
    },
    emailVerification: {
      sendVerificationEmail: async ({ user, url }) => {
        await demoOutboxAdapter.send({
          to: user.email,
          subject: "Verify your NashBizHub email (simulated)",
          body: `Simulated verification link for ${user.email}: ${url}`,
          kind: "email-verification",
          meta: { userId: user.id },
        });
      },
    },
    user: {
      additionalFields: {
        country: { type: "string", required: false },
        primaryInterest: { type: "string", required: false },
        marketingConsent: { type: "boolean", required: false },
        rolesJson: { type: "string", required: false },
        organizationId: { type: "string", required: false },
      },
    },
    trustedOrigins: [env.NEXT_PUBLIC_SITE_URL],
  });
}

export type Auth = ReturnType<typeof createAuth>;

let authSingleton: Auth | null = null;

export function getAuth() {
  if (!authSingleton) {
    authSingleton = createAuth();
  }
  return authSingleton;
}
