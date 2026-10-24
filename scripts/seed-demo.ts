/**
 * Seed SQLite catalog + write private demo documents.
 *
 * Demo personas are inserted as users without better-auth password hashes.
 * Use the Demo Center persona switcher when DEMO_MODE=true, or sign up a new
 * account (email/password works via better-auth). Shared password documented
 * as DemoPass123! for future auth wiring — not verified by seed.
 */
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { demoPersonas } from "../src/config/roles";
import { imagesForListing } from "../src/config/listing-images";
import { listingFixtures } from "../src/server/db/seeds/listing-fixtures";
import { brokerFixtures } from "../src/server/db/seeds/broker-fixtures";
import { contentFixtures } from "../src/server/db/seeds/content-fixtures";
import * as schema from "../src/server/db/schema";

const DEMO_PASSWORD_NOTE = "DemoPass123!";

function resolveDbPath(databaseUrl: string): string {
  const filePath = databaseUrl.startsWith("file:")
    ? databaseUrl.slice("file:".length)
    : databaseUrl;
  return path.isAbsolute(filePath)
    ? filePath
    : path.join(process.cwd(), filePath);
}

async function main() {
  if (process.env.APP_ENV === "production") {
    throw new Error("seed-demo refused in production");
  }

  const dbUrl = process.env.DATABASE_URL ?? "file:./storage/demo.sqlite";
  const dbPath = resolveDbPath(dbUrl);
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });

  const sqlite = new Database(dbPath);
  sqlite.pragma("journal_mode = WAL");
  sqlite.pragma("foreign_keys = ON");
  const db = drizzle(sqlite, { schema });

  const now = new Date().toISOString();
  console.log(`[seed-demo] Seeding ${dbPath}`);
  console.log(
    `[seed-demo] Persona password note: ${DEMO_PASSWORD_NOTE} (use persona switcher; hashes not stored)`,
  );

  // Organizations
  const orgs = [
    {
      id: "org_harbor_foods",
      name: "Harbor Foods Demo",
      slug: "harbor-foods-demo",
      kind: "seller",
      summary: "Fictional Nashville foodservice operator for demo listings.",
    },
    {
      id: "org_summit_partners",
      name: "Summit Business Partners Demo",
      slug: "summit-partners-demo",
      kind: "brokerage",
      summary: "Fictional brokerage firm for adviser walkthroughs.",
    },
    {
      id: "org_brightcare",
      name: "BrightCare Services Demo",
      slug: "brightcare-demo",
      kind: "contractor",
      summary: "Fictional contractor bidding on service tenders.",
    },
  ] as const;

  for (const org of orgs) {
    db.insert(schema.organizations)
      .values({ ...org, createdAt: now, updatedAt: now })
      .onConflictDoNothing()
      .run();
  }

  // Users (no password accounts — persona switcher / signup)
  const personaOrg: Record<string, string | null> = {
    "maya-chen": null,
    "harbor-owner": "org_harbor_foods",
    "daniel-brooks": null,
    "summit-broker": "org_summit_partners",
    brightcare: "org_brightcare",
    admin: null,
  };

  for (const persona of demoPersonas) {
    const id = `user_${persona.key.replace(/-/g, "_")}`;
    db.insert(schema.users)
      .values({
        id,
        name: persona.label,
        email: persona.email,
        emailVerified: true,
        rolesJson: JSON.stringify(persona.roles),
        organizationId: personaOrg[persona.key] ?? null,
        createdAt: now,
        updatedAt: now,
      })
      .onConflictDoNothing()
      .run();

    const orgId = personaOrg[persona.key];
    if (orgId) {
      db.insert(schema.organizationMembers)
        .values({
          id: `om_${persona.key}`,
          organizationId: orgId,
          userId: id,
          role: persona.roles[0] ?? "member",
          createdAt: now,
          updatedAt: now,
        })
        .onConflictDoNothing()
        .run();
    }
  }

  db.insert(schema.demoWorkspaces)
    .values({
      id: "base",
      label: "Base demo workspace",
      seedTimestamp: now,
      presenterKey: null,
      activePersonaKey: "maya-chen",
      historyJson: "[]",
      createdAt: now,
      updatedAt: now,
    })
    .onConflictDoNothing()
    .run();

  for (const broker of brokerFixtures) {
    db.insert(schema.brokers)
      .values({
        id: broker.id,
        slug: broker.slug,
        name: broker.name,
        firm: broker.firm,
        citySlug: broker.citySlug,
        summary: broker.summary,
        specialtiesJson: JSON.stringify(broker.specialties),
        email: broker.email,
        image: broker.image,
        createdAt: now,
        updatedAt: now,
      })
      .onConflictDoNothing()
      .run();
  }

  for (const listing of listingFixtures) {
    const photos = imagesForListing({
      industrySlug: listing.industrySlug,
      kind: listing.kind,
      publicCode: listing.publicCode,
    });

    db.insert(schema.listings)
      .values({
        id: listing.id,
        publicCode: listing.publicCode,
        workspaceId: listing.workspaceId,
        kind: listing.kind,
        slug: listing.slug,
        title: listing.title,
        summary: listing.summary,
        description: listing.description,
        status: listing.status,
        citySlug: listing.citySlug,
        industrySlug: listing.industrySlug,
        timeZone: listing.timeZone,
        confidential: listing.confidential,
        locationLabel: listing.locationLabel,
        heroImage: photos.heroImage,
        galleryJson: JSON.stringify(photos.gallery),
        commercialJson: JSON.stringify(listing.commercial),
        operationsJson: JSON.stringify(listing.operations),
        inclusionsJson: JSON.stringify(listing.inclusions),
        exclusionsJson: JSON.stringify(listing.exclusions),
        brokerSlug: listing.brokerSlug ?? null,
        publishedAt: listing.publishedAt,
        expiresAt: listing.expiresAt ?? null,
        createdAt: now,
        updatedAt: now,
      })
      .onConflictDoNothing()
      .run();
  }

  for (const article of contentFixtures) {
    db.insert(schema.contentArticles)
      .values({
        id: article.id,
        slug: article.slug,
        title: article.title,
        summary: article.summary,
        bodyMarkdown: article.bodyMarkdown,
        status: article.status,
        audience: article.audience,
        createdAt: now,
        updatedAt: now,
      })
      .onConflictDoNothing()
      .run();
  }

  // Sample inquiry / offer / deal anchors (SQLite mirror; runtime uses memory repos)
  const riversideId = "lst_nbh_s_1001";
  const mayaId = "user_maya_chen";
  const ownerId = "user_harbor_owner";

  const inquiryId = "inq_seed_riverside";
  db.insert(schema.inquiries)
    .values({
      id: inquiryId,
      workspaceId: "base",
      listingId: riversideId,
      fromUserId: mayaId,
      status: "open",
      message:
        "Interested in a diligence call for Riverside Café. Demo inquiry only.",
      experience: "First-time buyer exploring Middle Tennessee cafés.",
      timeframe: "60-90 days",
      readiness: "proof-of-funds pending",
      consentJson: JSON.stringify({ marketing: false, demoAck: true }),
      idempotencyKey: "seed-riverside-inquiry",
      assignedTo: ownerId,
      createdAt: now,
      updatedAt: now,
    })
    .onConflictDoNothing()
    .run();

  const conversationId = "conv_seed_riverside";
  db.insert(schema.conversations)
    .values({
      id: conversationId,
      workspaceId: "base",
      inquiryId,
      listingId: riversideId,
      subject: "Riverside Café inquiry",
      createdAt: now,
      updatedAt: now,
    })
    .onConflictDoNothing()
    .run();

  db.insert(schema.messages)
    .values({
      id: "msg_seed_1",
      workspaceId: "base",
      conversationId,
      senderUserId: mayaId,
      body: "Thanks for publishing this demo listing — happy to schedule a walkthrough.",
      createdAt: now,
      updatedAt: now,
    })
    .onConflictDoNothing()
    .run();

  const offerId = "off_seed_riverside";
  db.insert(schema.offers)
    .values({
      id: offerId,
      workspaceId: "base",
      listingId: riversideId,
      fromUserId: mayaId,
      status: "submitted",
      currentVersion: 1,
      createdAt: now,
      updatedAt: now,
    })
    .onConflictDoNothing()
    .run();

  db.insert(schema.offerVersions)
    .values({
      id: "offv_seed_riverside_1",
      offerId,
      workspaceId: "base",
      version: 1,
      amountMinor: 40000000,
      currency: "USD",
      termsJson: JSON.stringify({
        closingDays: 45,
        inventory: "valued at closing",
      }),
      message: "Nonbinding demo offer at $400,000.",
      createdBy: mayaId,
      createdAt: now,
      updatedAt: now,
    })
    .onConflictDoNothing()
    .run();

  db.insert(schema.deals)
    .values({
      id: "deal_seed_riverside",
      workspaceId: "base",
      listingId: riversideId,
      offerId,
      stage: "negotiation",
      partiesJson: JSON.stringify([
        { userId: mayaId, role: "buyer" },
        { userId: ownerId, role: "owner" },
      ]),
      acceptedTermsJson: "{}",
      createdAt: now,
      updatedAt: now,
    })
    .onConflictDoNothing()
    .run();

  db.insert(schema.appointments)
    .values({
      id: "appt_seed_riverside",
      workspaceId: "base",
      listingId: riversideId,
      organizerUserId: mayaId,
      participantUserId: ownerId,
      type: "site-visit",
      status: "requested",
      startsAtUtc: "2026-11-05T15:00:00.000Z",
      endsAtUtc: "2026-11-05T16:00:00.000Z",
      timeZone: "America/Chicago",
      locationOrLink: "Riverside corridor, Nashville (demo)",
      notes: "Seeded demo visit request.",
      createdAt: now,
      updatedAt: now,
    })
    .onConflictDoNothing()
    .run();

  // Private demonstration documents
  const privateRoot =
    process.env.PRIVATE_STORAGE_PATH ?? "./storage/private";
  const privateAbs = path.isAbsolute(privateRoot)
    ? privateRoot
    : path.join(process.cwd(), privateRoot);
  fs.mkdirSync(privateAbs, { recursive: true });

  const docs = [
    {
      id: "doc_riverside_pfs",
      fileName: "riverside-cafe-pfs.txt",
      category: "financial",
      label: "Riverside Café — fictional PFS summary",
      body: "Demonstration Document\n\nNashBizHub fictional Profit & Loss summary for Riverside Café (NBH-S-1001).\nFigures are invented for product demos and are not real financials.\n",
    },
    {
      id: "doc_riverside_lease",
      fileName: "riverside-cafe-lease-excerpt.txt",
      category: "legal",
      label: "Riverside Café — fictional lease excerpt",
      body: "Demonstration Document\n\nNashBizHub fictional lease excerpt for Riverside Café premises.\nNonbinding sandbox content only.\n",
    },
    {
      id: "doc_nda_template",
      fileName: "nda-acknowledgement.txt",
      category: "nda",
      label: "Demo NDA acknowledgement text",
      body: "Demonstration Document\n\nBy acknowledging this NDA simulation you confirm you understand this is a nonbinding demo gate for private files.\n",
    },
  ];

  for (const doc of docs) {
    const storageKey = `${doc.id}/${doc.fileName}`;
    const dir = path.join(privateAbs, doc.id);
    fs.mkdirSync(dir, { recursive: true });
    const filePath = path.join(dir, doc.fileName);
    fs.writeFileSync(filePath, doc.body, "utf8");
    const sizeBytes = Buffer.byteLength(doc.body, "utf8");

    db.insert(schema.privateDocuments)
      .values({
        id: doc.id,
        workspaceId: "base",
        listingId: riversideId,
        fileName: doc.fileName,
        category: doc.category,
        storageKey,
        mimeType: "text/plain",
        sizeBytes,
        label: doc.label,
        createdAt: now,
        updatedAt: now,
      })
      .onConflictDoNothing()
      .run();

    db.insert(schema.documentGrants)
      .values({
        id: `grant_${doc.id}_maya`,
        workspaceId: "base",
        documentId: doc.id,
        userId: mayaId,
        status: "granted",
        grantedBy: ownerId,
        createdAt: now,
        updatedAt: now,
      })
      .onConflictDoNothing()
      .run();
  }

  db.insert(schema.ndaRecords)
    .values({
      id: "nda_seed_maya_riverside",
      workspaceId: "base",
      listingId: riversideId,
      userId: mayaId,
      status: "acknowledged",
      acknowledgedAt: now,
      simulationNote: "Nonbinding demonstration acknowledgement",
      createdAt: now,
      updatedAt: now,
    })
    .onConflictDoNothing()
    .run();

  db.insert(schema.favorites)
    .values({
      id: "fav_seed_maya_riverside",
      workspaceId: "base",
      userId: mayaId,
      listingId: riversideId,
      createdAt: now,
      updatedAt: now,
    })
    .onConflictDoNothing()
    .run();

  sqlite.close();
  console.log("[seed-demo] Complete.");
  console.log(
    "[seed-demo] Tip: npm run demo:setup seeds SQLite; runtime transaction APIs also hydrate an in-memory workspace bag from the same anchors.",
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
