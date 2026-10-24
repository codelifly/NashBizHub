import { z } from "zod";

const booleanFromString = z
  .union([z.boolean(), z.enum(["true", "false", "1", "0"])])
  .transform((value) => value === true || value === "true" || value === "1");

const envSchema = z.object({
  APP_ENV: z.enum(["demo", "staging", "production"]).default("demo"),
  DEMO_MODE: booleanFromString.default(true),
  INDEXING_ENABLED: booleanFromString.default(false),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  BETTER_AUTH_URL: z.string().url().default("http://localhost:3000"),
  BETTER_AUTH_SECRET: z.string().min(16).default("replace-with-a-generated-secret"),
  DATABASE_URL: z.string().default("file:./storage/demo.sqlite"),
  PRIVATE_STORAGE_PATH: z.string().default("./storage/private"),
  EMAIL_ADAPTER: z.enum(["demo-outbox"]).default("demo-outbox"),
  SIGNING_ADAPTER: z.enum(["demo"]).default("demo"),
  BILLING_ADAPTER: z.enum(["demo"]).default("demo"),
  MAP_PROVIDER: z.enum(["none", "leaflet", "maplibre"]).default("none"),
});

export type Env = z.infer<typeof envSchema>;

function readEnv(): Env {
  const parsed = envSchema.safeParse({
    APP_ENV: process.env.APP_ENV,
    DEMO_MODE: process.env.DEMO_MODE,
    INDEXING_ENABLED: process.env.INDEXING_ENABLED,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    PRIVATE_STORAGE_PATH: process.env.PRIVATE_STORAGE_PATH,
    EMAIL_ADAPTER: process.env.EMAIL_ADAPTER,
    SIGNING_ADAPTER: process.env.SIGNING_ADAPTER,
    BILLING_ADAPTER: process.env.BILLING_ADAPTER,
    MAP_PROVIDER: process.env.MAP_PROVIDER,
  });

  if (!parsed.success) {
    throw new Error(`Invalid environment configuration: ${parsed.error.message}`);
  }

  const env = parsed.data;

  if (env.APP_ENV === "production" && env.DEMO_MODE) {
    throw new Error("Production startup refused: DEMO_MODE must be false");
  }

  if (
    env.APP_ENV === "production" &&
    env.BETTER_AUTH_SECRET === "replace-with-a-generated-secret"
  ) {
    throw new Error("Production startup refused: set a real BETTER_AUTH_SECRET");
  }

  return env;
}

let cached: Env | null = null;

export function getEnv(): Env {
  if (!cached) {
    cached = readEnv();
  }
  return cached;
}

export function isDemoMode(): boolean {
  return getEnv().DEMO_MODE;
}

export function isIndexingEnabled(): boolean {
  return getEnv().INDEXING_ENABLED;
}
