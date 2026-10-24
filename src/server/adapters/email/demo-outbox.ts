import { nanoid } from "nanoid";
import { getDb } from "@/server/db/client";
import { demoOutbox } from "@/server/db/schema";
import { getEnv } from "@/lib/env";

export type DemoEmail = {
  to: string;
  subject: string;
  body: string;
  kind: string;
  workspaceId?: string;
  meta?: Record<string, unknown>;
};

export const demoOutboxAdapter = {
  async send(email: DemoEmail) {
    const env = getEnv();
    if (env.APP_ENV === "production") {
      throw new Error("Demo outbox adapter is disabled in production");
    }

    const db = getDb();
    const id = nanoid();
    db.insert(demoOutbox)
      .values({
        id,
        workspaceId: email.workspaceId ?? "base",
        toEmail: email.to,
        subject: email.subject,
        body: email.body,
        kind: email.kind,
        metaJson: JSON.stringify(email.meta ?? {}),
      })
      .run();

    return { id, simulated: true as const };
  },
};
