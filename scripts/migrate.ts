/**
 * Apply Drizzle schema to storage/demo.sqlite via drizzle-kit push.
 */
import "dotenv/config";
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

async function main() {
  if (process.env.APP_ENV === "production") {
    throw new Error("migrate refused in production");
  }

  const dbUrl = process.env.DATABASE_URL ?? "file:./storage/demo.sqlite";
  const filePath = dbUrl.startsWith("file:") ? dbUrl.slice("file:".length) : dbUrl;
  const absolute = path.isAbsolute(filePath)
    ? filePath
    : path.join(process.cwd(), filePath);

  fs.mkdirSync(path.dirname(absolute), { recursive: true });

  console.log(`[migrate] Pushing schema to ${absolute}`);
  execSync("npx drizzle-kit push --force --config drizzle.config.ts", {
    stdio: "inherit",
    env: { ...process.env, DATABASE_URL: dbUrl },
  });
  console.log("[migrate] Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
