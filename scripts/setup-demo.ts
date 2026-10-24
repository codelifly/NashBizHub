/**
 * migrate + seed for local demo SQLite.
 */
import "dotenv/config";
import { execSync } from "node:child_process";

async function main() {
  if (process.env.APP_ENV === "production") {
    throw new Error("setup-demo refused in production");
  }

  console.log("[setup-demo] Running migrate…");
  execSync("npx tsx scripts/migrate.ts", { stdio: "inherit" });
  console.log("[setup-demo] Running seed…");
  execSync("npx tsx scripts/seed-demo.ts", { stdio: "inherit" });
  console.log("[setup-demo] Demo database ready.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
