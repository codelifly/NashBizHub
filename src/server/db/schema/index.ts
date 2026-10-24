import { sql } from "drizzle-orm";
import {
  integer,
  sqliteTable,
  text,
  real,
  index,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

const timestamps = {
  createdAt: text("created_at")
    .notNull()
    .default(sql`(datetime('now'))`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(datetime('now'))`),
};

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" }).notNull().default(false),
  image: text("image"),
  country: text("country").default("US"),
  primaryInterest: text("primary_interest"),
  marketingConsent: integer("marketing_consent", { mode: "boolean" }).notNull().default(false),
  rolesJson: text("roles_json").notNull().default('["buyer"]'),
  organizationId: text("organization_id"),
  ...timestamps,
});

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const accounts = sqliteTable("accounts", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", { mode: "timestamp" }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", { mode: "timestamp" }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const verifications = sqliteTable("verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
});

export const organizations = sqliteTable("organizations", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  kind: text("kind").notNull(),
  summary: text("summary"),
  ...timestamps,
});

export const organizationMembers = sqliteTable(
  "organization_members",
  {
    id: text("id").primaryKey(),
    organizationId: text("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    role: text("role").notNull(),
    ...timestamps,
  },
  (table) => [uniqueIndex("org_member_unique").on(table.organizationId, table.userId)],
);

export const demoWorkspaces = sqliteTable("demo_workspaces", {
  id: text("id").primaryKey(),
  label: text("label").notNull(),
  seedTimestamp: text("seed_timestamp").notNull(),
  presenterKey: text("presenter_key"),
  activePersonaKey: text("active_persona_key"),
  historyJson: text("history_json").notNull().default("[]"),
  ...timestamps,
});

export const businesses = sqliteTable("businesses", {
  id: text("id").primaryKey(),
  workspaceId: text("workspace_id").notNull().default("base"),
  organizationId: text("organization_id").references(() => organizations.id),
  name: text("name").notNull(),
  industrySlug: text("industry_slug").notNull(),
  citySlug: text("city_slug").notNull(),
  summary: text("summary"),
  ...timestamps,
});

export const listings = sqliteTable(
  "listings",
  {
    id: text("id").primaryKey(),
    publicCode: text("public_code").notNull().unique(),
    workspaceId: text("workspace_id").notNull().default("base"),
    businessId: text("business_id").references(() => businesses.id),
    organizationId: text("organization_id").references(() => organizations.id),
    createdBy: text("created_by"),
    kind: text("kind").notNull(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    summary: text("summary").notNull(),
    description: text("description").notNull(),
    status: text("status").notNull().default("draft"),
    citySlug: text("city_slug").notNull(),
    industrySlug: text("industry_slug").notNull(),
    timeZone: text("time_zone").notNull(),
    confidential: integer("confidential", { mode: "boolean" }).notNull().default(false),
    locationLabel: text("location_label").notNull(),
    heroImage: text("hero_image"),
    galleryJson: text("gallery_json").notNull().default("[]"),
    commercialJson: text("commercial_json").notNull().default("{}"),
    operationsJson: text("operations_json").notNull().default("{}"),
    inclusionsJson: text("inclusions_json").notNull().default("[]"),
    exclusionsJson: text("exclusions_json").notNull().default("[]"),
    brokerSlug: text("broker_slug"),
    version: integer("version").notNull().default(1),
    publishedAt: text("published_at"),
    expiresAt: text("expires_at"),
    ...timestamps,
  },
  (table) => [
    index("listings_kind_status_idx").on(table.kind, table.status),
    index("listings_city_idx").on(table.citySlug),
    index("listings_workspace_idx").on(table.workspaceId),
    uniqueIndex("listings_slug_workspace").on(table.slug, table.workspaceId),
  ],
);

export const listingRevisions = sqliteTable("listing_revisions", {
  id: text("id").primaryKey(),
  listingId: text("listing_id")
    .notNull()
    .references(() => listings.id, { onDelete: "cascade" }),
  workspaceId: text("workspace_id").notNull().default("base"),
  version: integer("version").notNull(),
  status: text("status").notNull(),
  payloadJson: text("payload_json").notNull(),
  reviewNotesJson: text("review_notes_json"),
  createdBy: text("created_by"),
  ...timestamps,
});

export const brokers = sqliteTable("brokers", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  firm: text("firm").notNull(),
  citySlug: text("city_slug").notNull(),
  summary: text("summary").notNull(),
  specialtiesJson: text("specialties_json").notNull().default("[]"),
  email: text("email").notNull(),
  image: text("image"),
  ...timestamps,
});

export const favorites = sqliteTable(
  "favorites",
  {
    id: text("id").primaryKey(),
    workspaceId: text("workspace_id").notNull().default("base"),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    listingId: text("listing_id")
      .notNull()
      .references(() => listings.id, { onDelete: "cascade" }),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("favorite_unique").on(table.workspaceId, table.userId, table.listingId),
  ],
);

export const savedSearches = sqliteTable("saved_searches", {
  id: text("id").primaryKey(),
  workspaceId: text("workspace_id").notNull().default("base"),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  filtersJson: text("filters_json").notNull(),
  digestFrequency: text("digest_frequency").notNull().default("none"),
  paused: integer("paused", { mode: "boolean" }).notNull().default(false),
  ...timestamps,
});

export const buyerRequirements = sqliteTable("buyer_requirements", {
  id: text("id").primaryKey(),
  workspaceId: text("workspace_id").notNull().default("base"),
  userId: text("user_id").references(() => users.id),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  status: text("status").notNull().default("draft"),
  citySlugsJson: text("city_slugs_json").notNull().default("[]"),
  industrySlugsJson: text("industry_slugs_json").notNull().default("[]"),
  budgetMinor: integer("budget_minor"),
  currency: text("currency").default("USD"),
  ...timestamps,
});

export const inquiries = sqliteTable(
  "inquiries",
  {
    id: text("id").primaryKey(),
    workspaceId: text("workspace_id").notNull().default("base"),
    listingId: text("listing_id")
      .notNull()
      .references(() => listings.id),
    fromUserId: text("from_user_id")
      .notNull()
      .references(() => users.id),
    organizationId: text("organization_id"),
    status: text("status").notNull().default("new"),
    message: text("message").notNull(),
    experience: text("experience"),
    timeframe: text("timeframe"),
    readiness: text("readiness"),
    consentJson: text("consent_json").notNull().default("{}"),
    idempotencyKey: text("idempotency_key").notNull(),
    assignedTo: text("assigned_to"),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("inquiry_idempotency").on(table.workspaceId, table.idempotencyKey),
  ],
);

export const conversations = sqliteTable("conversations", {
  id: text("id").primaryKey(),
  workspaceId: text("workspace_id").notNull().default("base"),
  inquiryId: text("inquiry_id").references(() => inquiries.id),
  listingId: text("listing_id").references(() => listings.id),
  subject: text("subject").notNull(),
  ...timestamps,
});

export const messages = sqliteTable("messages", {
  id: text("id").primaryKey(),
  workspaceId: text("workspace_id").notNull().default("base"),
  conversationId: text("conversation_id")
    .notNull()
    .references(() => conversations.id, { onDelete: "cascade" }),
  senderUserId: text("sender_user_id").notNull(),
  body: text("body").notNull(),
  isInternal: integer("is_internal", { mode: "boolean" }).notNull().default(false),
  readAt: text("read_at"),
  attachmentJson: text("attachment_json"),
  ...timestamps,
});

export const applications = sqliteTable("applications", {
  id: text("id").primaryKey(),
  workspaceId: text("workspace_id").notNull().default("base"),
  listingId: text("listing_id")
    .notNull()
    .references(() => listings.id),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  kind: text("kind").notNull(),
  status: text("status").notNull().default("draft"),
  payloadJson: text("payload_json").notNull().default("{}"),
  version: integer("version").notNull().default(1),
  ...timestamps,
});

export const appointments = sqliteTable("appointments", {
  id: text("id").primaryKey(),
  workspaceId: text("workspace_id").notNull().default("base"),
  listingId: text("listing_id")
    .notNull()
    .references(() => listings.id),
  organizerUserId: text("organizer_user_id").notNull(),
  participantUserId: text("participant_user_id").notNull(),
  type: text("type").notNull(),
  status: text("status").notNull().default("requested"),
  startsAtUtc: text("starts_at_utc").notNull(),
  endsAtUtc: text("ends_at_utc").notNull(),
  timeZone: text("time_zone").notNull(),
  locationOrLink: text("location_or_link"),
  notes: text("notes"),
  ...timestamps,
});

export const privateDocuments = sqliteTable("private_documents", {
  id: text("id").primaryKey(),
  workspaceId: text("workspace_id").notNull().default("base"),
  listingId: text("listing_id").references(() => listings.id),
  dealId: text("deal_id"),
  fileName: text("file_name").notNull(),
  category: text("category").notNull(),
  storageKey: text("storage_key").notNull(),
  version: integer("version").notNull().default(1),
  mimeType: text("mime_type").notNull(),
  sizeBytes: integer("size_bytes").notNull(),
  label: text("label").notNull(),
  ...timestamps,
});

export const ndaRecords = sqliteTable("nda_records", {
  id: text("id").primaryKey(),
  workspaceId: text("workspace_id").notNull().default("base"),
  listingId: text("listing_id")
    .notNull()
    .references(() => listings.id),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  status: text("status").notNull().default("pending"),
  acknowledgedAt: text("acknowledged_at"),
  simulationNote: text("simulation_note")
    .notNull()
    .default("Nonbinding demonstration acknowledgement"),
  ...timestamps,
});

export const documentGrants = sqliteTable("document_grants", {
  id: text("id").primaryKey(),
  workspaceId: text("workspace_id").notNull().default("base"),
  documentId: text("document_id")
    .notNull()
    .references(() => privateDocuments.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  status: text("status").notNull().default("requested"),
  expiresAt: text("expires_at"),
  grantedBy: text("granted_by"),
  ...timestamps,
});

export const offers = sqliteTable("offers", {
  id: text("id").primaryKey(),
  workspaceId: text("workspace_id").notNull().default("base"),
  listingId: text("listing_id")
    .notNull()
    .references(() => listings.id),
  fromUserId: text("from_user_id")
    .notNull()
    .references(() => users.id),
  status: text("status").notNull().default("draft"),
  currentVersion: integer("current_version").notNull().default(1),
  ...timestamps,
});

export const offerVersions = sqliteTable("offer_versions", {
  id: text("id").primaryKey(),
  offerId: text("offer_id")
    .notNull()
    .references(() => offers.id, { onDelete: "cascade" }),
  workspaceId: text("workspace_id").notNull().default("base"),
  version: integer("version").notNull(),
  amountMinor: integer("amount_minor"),
  currency: text("currency").default("USD"),
  termsJson: text("terms_json").notNull().default("{}"),
  message: text("message"),
  expiresAt: text("expires_at"),
  createdBy: text("created_by").notNull(),
  ...timestamps,
});

export const deals = sqliteTable("deals", {
  id: text("id").primaryKey(),
  workspaceId: text("workspace_id").notNull().default("base"),
  listingId: text("listing_id")
    .notNull()
    .references(() => listings.id),
  offerId: text("offer_id").references(() => offers.id),
  applicationId: text("application_id").references(() => applications.id),
  stage: text("stage").notNull().default("negotiation"),
  partiesJson: text("parties_json").notNull().default("[]"),
  acceptedTermsJson: text("accepted_terms_json").notNull().default("{}"),
  outcome: text("outcome"),
  completedAt: text("completed_at"),
  ...timestamps,
});

export const dueDiligenceTasks = sqliteTable("due_diligence_tasks", {
  id: text("id").primaryKey(),
  workspaceId: text("workspace_id").notNull().default("base"),
  dealId: text("deal_id")
    .notNull()
    .references(() => deals.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  ownerUserId: text("owner_user_id"),
  deadline: text("deadline"),
  status: text("status").notNull().default("open"),
  blocking: integer("blocking", { mode: "boolean" }).notNull().default(false),
  evidenceNote: text("evidence_note"),
  ...timestamps,
});

export const agreements = sqliteTable("agreements", {
  id: text("id").primaryKey(),
  workspaceId: text("workspace_id").notNull().default("base"),
  dealId: text("deal_id").references(() => deals.id),
  listingId: text("listing_id").references(() => listings.id),
  status: text("status").notNull().default("pending"),
  startDate: text("start_date"),
  endDate: text("end_date"),
  partiesJson: text("parties_json").notNull().default("[]"),
  responsibilityJson: text("responsibility_json").notNull().default("{}"),
  currentVersion: integer("current_version").notNull().default(1),
  ...timestamps,
});

export const obligations = sqliteTable("obligations", {
  id: text("id").primaryKey(),
  workspaceId: text("workspace_id").notNull().default("base"),
  agreementId: text("agreement_id")
    .notNull()
    .references(() => agreements.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  dueAt: text("due_at").notNull(),
  status: text("status").notNull().default("upcoming"),
  kind: text("kind").notNull(),
  amountMinor: integer("amount_minor"),
  currency: text("currency"),
  notes: text("notes"),
  ...timestamps,
});

export const maintenanceRequests = sqliteTable("maintenance_requests", {
  id: text("id").primaryKey(),
  workspaceId: text("workspace_id").notNull().default("base"),
  agreementId: text("agreement_id").references(() => agreements.id),
  listingId: text("listing_id").references(() => listings.id),
  assetLabel: text("asset_label").notNull(),
  description: text("description").notNull(),
  urgency: text("urgency").notNull().default("normal"),
  status: text("status").notNull().default("reported"),
  responsibleParty: text("responsible_party"),
  evidenceNote: text("evidence_note"),
  ...timestamps,
});

export const supportTickets = sqliteTable("support_tickets", {
  id: text("id").primaryKey(),
  workspaceId: text("workspace_id").notNull().default("base"),
  userId: text("user_id").references(() => users.id),
  subject: text("subject").notNull(),
  body: text("body").notNull(),
  status: text("status").notNull().default("open"),
  assignedTo: text("assigned_to"),
  ...timestamps,
});

export const notifications = sqliteTable("notifications", {
  id: text("id").primaryKey(),
  workspaceId: text("workspace_id").notNull().default("base"),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  category: text("category").notNull(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  href: text("href"),
  readAt: text("read_at"),
  ...timestamps,
});

export const demoInvoices = sqliteTable("demo_invoices", {
  id: text("id").primaryKey(),
  workspaceId: text("workspace_id").notNull().default("base"),
  userId: text("user_id").references(() => users.id),
  organizationId: text("organization_id"),
  label: text("label").notNull(),
  amountMinor: integer("amount_minor").notNull(),
  currency: text("currency").notNull().default("USD"),
  status: text("status").notNull().default("simulated"),
  ...timestamps,
});

export const demoOutbox = sqliteTable("demo_outbox", {
  id: text("id").primaryKey(),
  workspaceId: text("workspace_id").notNull().default("base"),
  toEmail: text("to_email").notNull(),
  subject: text("subject").notNull(),
  body: text("body").notNull(),
  kind: text("kind").notNull(),
  metaJson: text("meta_json").notNull().default("{}"),
  ...timestamps,
});

export const contentArticles = sqliteTable("content_articles", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  bodyMarkdown: text("body_markdown").notNull(),
  status: text("status").notNull().default("published"),
  audience: text("audience"),
  ...timestamps,
});

export const helpArticles = sqliteTable("help_articles", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  bodyMarkdown: text("body_markdown").notNull(),
  ...timestamps,
});

export const crmRecords = sqliteTable("crm_records", {
  id: text("id").primaryKey(),
  workspaceId: text("workspace_id").notNull().default("base"),
  customerUserId: text("customer_user_id").references(() => users.id),
  stage: text("stage").notNull().default("new"),
  priority: text("priority").notNull().default("normal"),
  assignedAdviserId: text("assigned_adviser_id"),
  nextAction: text("next_action"),
  notesJson: text("notes_json").notNull().default("[]"),
  ...timestamps,
});

export const auditEvents = sqliteTable("audit_events", {
  id: text("id").primaryKey(),
  workspaceId: text("workspace_id").notNull().default("base"),
  actorUserId: text("actor_user_id"),
  action: text("action").notNull(),
  entityType: text("entity_type").notNull(),
  entityId: text("entity_id").notNull(),
  detailsJson: text("details_json").notNull().default("{}"),
  ...timestamps,
});

export const verificationRequests = sqliteTable("verification_requests", {
  id: text("id").primaryKey(),
  workspaceId: text("workspace_id").notNull().default("base"),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  status: text("status").notNull().default("submitted"),
  evidenceLabel: text("evidence_label").notNull(),
  reviewNote: text("review_note"),
  ...timestamps,
});
