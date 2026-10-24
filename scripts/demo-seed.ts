/**
 * Demo seed entrypoint.
 * Loads fictional personas, listings, and content into SQLite.
 * Marked clearly as a simulation — never touches production systems.
 */
import "dotenv/config";

async function main() {
  console.log("[demo:seed] Simulated seed runner");
  console.log("[demo:seed] Wire Drizzle inserts for personas, listings, and content fixtures.");
  console.log("[demo:seed] DEMO_MODE guard: refuse when APP_ENV=production.");
  if (process.env.APP_ENV === "production") {
    throw new Error("demo:seed refused in production");
  }
  console.log("[demo:seed] No-op complete. See src/server/db/seeds/ for fixture sources.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
