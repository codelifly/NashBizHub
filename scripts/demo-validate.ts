/**
 * Demo validation — sanity-check fixtures and env for local walkthroughs.
 */
import "dotenv/config";
import { demoPersonas } from "../src/config/roles";

async function main() {
  console.log("[demo:validate] Checking demo personas…");
  if (demoPersonas.length < 5) {
    throw new Error("Expected at least five demo personas");
  }
  for (const p of demoPersonas) {
    if (!/@(?:[\w.-]+\.)?example(?:\.com)?$/.test(p.email)) {
      console.warn(`[demo:validate] Persona ${p.key} email should use an example domain`);
    }
  }
  console.log(`[demo:validate] OK — ${demoPersonas.length} personas listed`);
  console.log("[demo:validate] Credentials documented in docs/demo-credentials.md");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
