# NashBizHub Tennessee Website and Interactive Demo

## How to use this prompt

Save this file in the Cursor project as `docs/NASHBIZHUB_MASTER_PROMPT.md`. Ask Cursor Agent to read the complete file and implement the project in the phases below. Keep `docs/implementation-status.md` updated so later sessions can continue without rebuilding completed work. This is a build instruction, not merely a design brief.

This prompt extends the NashBizHub business proposal into an interactive client demonstration. The latest technology direction is **Next.js, React, TypeScript and a Node.js runtime**. This supersedes the previous proposal's no-Next.js implementation assumption for this demo. Keep a clean API boundary so a Laravel PHP backend can be connected later if selected; do not build a second Laravel application now.

Prepared 24 October 2026. All demonstration businesses, people, transactions and financial figures must be visibly fictional. Do not expose the demo as a live marketplace or claim real customer outcomes.

---

# BEGIN CURSOR BUILD INSTRUCTIONS

## 1 Your assignment and execution rules

Act as the senior product designer and full-stack implementation engineer for NashBizHub. Build a polished, usable Tennessee business opportunity marketplace and a complete client demonstration. Produce actual working pages, navigation, forms, state changes, protected areas and tests. A landing page with static dashboard screenshots does not meet the requirement.

Before coding, inspect the repository and existing instructions. Preserve useful existing work. If the repository is empty, scaffold the application. Confirm current package compatibility using official documentation and lock the chosen versions. Do not assume APIs from outdated tutorials. Use one package manager and commit its lockfile.

Maintain a checklist covering every route and interaction specified here. Work through the phases autonomously. Make ordinary implementation decisions and record assumptions. Do not stop after creating a folder tree or describing what should be built. If an external service is unavailable, provide a clearly labeled functional local simulation and document the integration boundary.

Use these four completion labels in the status document: `not started`, `in progress`, `implemented`, `verified`. Mark something verified only after actually checking it. Report failed or blocked checks honestly. Never invent Lighthouse scores, penetration-test results, transaction outcomes or Google rankings.

Do not deploy publicly, send external messages, create paid provider accounts or activate real payments as part of this demo. Local build and preview are expected. If deploying a private review environment is separately authorized, follow the deployment controls in this document.

## 2 Product definition

Brand: **NashBizHub**. Primary market: **Tennessee, United States**. Customer-facing language: US English. Default currency: USD. Dates display clearly with the applicable time zone; Tennessee spans more than one time zone, so use a city-level IANA zone from seed configuration rather than a single state-wide assumption.

Provide distinct opportunity types:

1. Business for sale: ownership or specified assets offered to a buyer.
2. Business for rent: an operating business and specified assets offered to an operator for a term.
3. Commercial premises for lease: property without an assumed operating business transfer.
4. Management contract: an owner invites an operator to manage an existing business.
5. Service contract or tender: an organization invites a supplier to deliver defined work.
6. Buyer or operator requirement: a customer publishes an approved description of what they seek.

Do not label an empty commercial unit as a running business. Do not equate an accepted offer, signed agreement and completed transaction. One business may have linked sale and rental alternatives; protect against conflicting exclusive outcomes.

Primary users: visitors, buyers, owners, rental operators, contractors, brokers, organization managers, staff advisers, moderators and administrators. One account can have multiple customer roles. Public registration never grants privileged staff or admin access.

## 3 Scope and demonstration honesty

Build the complete visible frontend and the minimum local server functionality needed for believable, persistent, permission-aware demonstrations. This is not a production financial settlement or legal-signature service.

Implement working local signup and login through an authentication library; implement persistent demo workflows through typed services and a local database. Use fictional fixtures throughout. Simulate provider-dependent email, SMS, signing, verification, billing and settlement through explicit demo adapters, not external live services.

Place a compact persistent banner: `Interactive demo · All businesses and transactions are fictional`. Add a `Demo Center` that explains the available personas, scenario progress, reset action and simulated services. Keep internal package names and database details out of normal customer screens.

All major buttons must perform a meaningful action: navigate, validate and save, open a working form, filter, create a record, change an authorized state or explain an unavailable external action. No `href="#"`, no inert primary buttons and no generic “coming soon” replacement for core modules.

## 4 Brand colours and design tokens

Use the user's exact supplied values as named brand tokens:

```css
:root {
  --brand-blue-light: #0088FF;       /* RGB 0 136 255 */
  --brand-blue-dark: #0091FF;        /* RGB 0 145 255 */
  --brand-blue-accessible-light: #1E6EF4; /* RGB 30 110 244 */
  --brand-blue-accessible-dark: #5CB8FF;  /* RGB 92 184 255 */
  --text-body: #3A3A3C;              /* RGB 58 58 60 */
  --text-heading: #3A3A3C;
  --text-on-dark: #F6F8FC;
  --ink-on-bright-blue: #081827;
  --surface-page: #F7F9FC;
  --surface-card: #FFFFFF;
  --surface-subtle: #EFF6FF;
  --border-subtle: #DCE4EE;
  --action-fill: #1E6EF4;
  --action-label: #FFFFFF;
  --radius-control: 10px;
  --radius-card: 16px;
  --radius-dialog: 20px;
}
```

Keep the primary brand recognizable through #0088FF accents, selected indicators and decorative details. Use #1E6EF4 for filled buttons with white normal-size text and accessible blue links on white backgrounds, subject to verification for all states. White on #0088FF is about 3.52:1; white on #1E6EF4 is about 4.57:1. Do not use the first combination for small button labels. Dark ink #081827 on #0088FF is about 5.10:1.

Provide light and dark themes, with light as the initial product design. Dark theme uses dark surfaces and light text; do not retain #3A3A3C body text on dark surfaces. Use #0091FF and #5CB8FF appropriately in dark mode and verify every text/background combination. Add a persistent high-contrast preference, with a tested colour set rather than merely increasing saturation.

Success, warning, error and information states need text and icons in addition to colour. Do not put white text on arbitrary status colours without checking contrast. Focus indicators must be visible against adjacent surfaces.

## 5 Typography and visual direction

Use **Inter** for body text, controls, tables, forms, navigation and supporting content. Use **Google Sans** for H1, H2, H3, H4 and H5; apply it consistently to H6 if used. Google Sans is the requested family, not Product Sans. Obtain it from the official Google Fonts family and preserve the applicable license. Use `next/font/google` only if the pinned version supports the exact family; otherwise use licensed local WOFF2 files through `next/font/local`. Do not silently substitute another font.

Font loading must be self-hosted or build-managed without a runtime Google CSS request. Load only necessary subsets and weights. Set fallback metrics to reduce layout shift and avoid fetching every variable axis. Body text generally starts at 16px with comfortable line height. Headings use fluid `clamp()` sizes and sensible line lengths. Never shrink dense dashboards into unreadable miniature text.

Design a professional business marketplace with an editorial home page, strong photography, useful data and calm whitespace. Use full-width colour sections selectively. Avoid repetitive generic cards on every screen, giant decorative gradients, excessive glass effects, emoji navigation or a page filled with meaningless metrics.

Use a consistent spacing scale and a maximum content width near 1280px, with wider dashboard layouts only where justified. Desktop header includes the brand, primary navigation, account actions and Post an Opportunity. Mobile navigation is a proper accessible drawer. Dashboard navigation has clear grouping and a visible active state.

Use a temporary typographic NashBizHub wordmark if no approved logo exists. Do not invent an official company address, license, team identity, testimonial, customer count, transaction total or business affiliation.

## 6 Chosen technology and addon responsibilities

Use supported stable package versions that are compatible at implementation time. Record actual versions in `docs/dependencies.md`. Prefer one good tool per purpose; the user wants a strong system, not unnecessary bundle weight.

| Purpose | Recommended choice | Implementation responsibility |
| Application framework | Next.js App Router with React and TypeScript | Server-render public content; small client islands |
| Styling | Tailwind CSS and CSS variables | Shared tokens, light/dark themes and responsive design |
| UI primitives | shadcn/ui using its supported accessible primitives | Buttons, dialogs, forms, menus, tables and drawers |
| Icons | lucide-react | Named imports, consistent stroke and accessible labels |
| Animation | Motion for React | Small transitions with reduced-motion support |
| Forms | React Hook Form and Zod | Client feedback plus authoritative server validation |
| Interactive server state | TanStack Query | Dashboard caching, invalidation and asynchronous UI |
| Complex data tables | TanStack Table | Sorting, pagination, visibility and selectable rows |
| Temporary UI state | Zustand when required | Compare tray or UI preferences only; no auth truth |
| Charts | Recharts | Lazy-loaded accessible dashboard charts and table alternatives |
| Dates | date-fns and a compatible IANA-aware time-zone package | Appointment and deadline formatting |
| Authentication | Better Auth | Library-managed signup, password hashing and sessions |
| Local demo persistence | SQLite, better-sqlite3 and Drizzle ORM | Migrations, seed records and scoped demo workspaces |
| Notifications | A single toast component such as Sonner | Nonblocking feedback; not sole error reporting |
| File selection | Native input first; react-dropzone if needed | Accessible upload experience and progress |
| Maps | Optional lazy-loaded Leaflet or MapLibre integration | Provider-approved tiles; list fallback without a key |
| Unit/component testing | Vitest and React Testing Library | Validation, policies, components and state transitions |
| Browser journeys | Playwright and axe-core integration | Full workflows and automated accessibility checks |
| Performance checks | Lighthouse CI, web-vitals and bundle analysis | Measured route reports and regression budgets |
| Formatting and quality | ESLint, Prettier and TypeScript strict mode | Consistent code and dependency hygiene |

Do not add React Router inside Next.js; use Next routing. Do not add Axios if fetch is sufficient. Do not install multiple carousel, animation, state, toast or form libraries. Add drag-and-drop tooling only for an implemented need; provide keyboard alternatives. Avoid putting charts, maps, rich editors or document viewers in the shared public bundle.

SQLite is for a local or single-instance Node demo with persistent storage. Do not deploy this file-backed database to an ephemeral/serverless filesystem and claim durability. For such hosting, change the repository adapter to a supported persistent database. Document the choice before deployment.

## 7 Repository organisation

Use feature-based modules with thin route files. Separate business rules, server repositories, validation, components and tests. Do not create one giant `page.tsx`, `Dashboard.tsx`, `utils.ts` or `mockData.ts` containing the whole platform. Separate meaningful components and operations; do not create a file for every trivial expression.

Use this directory specification; each indented item is a real file or folder, not a promise of future work:

```text
.cursor/rules/
  project.mdc
  architecture.mdc
  design-system.mdc
  security.mdc
  seo-performance.mdc
  testing.mdc
docs/
  NASHBIZHUB_MASTER_PROMPT.md
  architecture.md
  route-manifest.md
  implementation-status.md
  demo-script.md
  demo-credentials.md
  dependencies.md
  api-contracts.md
  seo-plan.md
  security-checklist.md
  performance-report.md
  accessibility-report.md
  production-readiness.md
  assets-and-licenses.md
public/
  images/listings/
  images/tennessee/
  images/team-demo/
  fonts/                        # only if local licensed font files are used
  icons/
scripts/
  setup-demo.ts
  migrate.ts
  seed-demo.ts
  validate-fixtures.ts
  validate-routes.ts
  validate-assets.ts
src/
  app/
    layout.tsx
    globals.css
    not-found.tsx
    global-error.tsx
    robots.ts
    sitemap.ts
    manifest.ts
    icon.tsx
    apple-icon.tsx
    opengraph-image.tsx
    (public)/
      layout.tsx
      page.tsx
      businesses-for-sale/page.tsx
      businesses-for-rent/page.tsx
      commercial-properties-for-lease/page.tsx
      management-contracts/page.tsx
      service-contracts/page.tsx
      listings/[slug]/page.tsx
      compare/page.tsx
      requirements/page.tsx
      requirements/[id]/page.tsx
      tennessee/page.tsx
      tennessee/[city]/page.tsx
      tennessee/[city]/[intent]/page.tsx
      industries/page.tsx
      industries/[industry]/page.tsx
      brokers/page.tsx
      brokers/[slug]/page.tsx
      sell-your-business/page.tsx
      rent-out-your-business/page.tsx
      post-a-contract/page.tsx
      how-it-works/page.tsx
      how-it-works/[audience]/page.tsx
      resources/page.tsx
      resources/[slug]/page.tsx
      about/page.tsx
      contact/page.tsx
      help/page.tsx
      help/[slug]/page.tsx
      membership/page.tsx
      sitemap/page.tsx
      legal/[document]/page.tsx
    (auth)/
      layout.tsx
      login/page.tsx
      signup/page.tsx
      verify-email/page.tsx
      forgot-password/page.tsx
      reset-password/page.tsx
      accept-invitation/page.tsx
    (portal)/
      dashboard/layout.tsx
      dashboard/page.tsx
      dashboard/profile/page.tsx
      dashboard/organization/page.tsx
      dashboard/team/page.tsx
      dashboard/security/page.tsx
      dashboard/verification/page.tsx
      dashboard/favorites/page.tsx
      dashboard/saved-searches/page.tsx
      dashboard/requirements/page.tsx
      dashboard/listings/page.tsx
      dashboard/listings/new/page.tsx
      dashboard/listings/[id]/page.tsx
      dashboard/listings/[id]/edit/page.tsx
      dashboard/inquiries/page.tsx
      dashboard/inquiries/[id]/page.tsx
      dashboard/messages/page.tsx
      dashboard/messages/[id]/page.tsx
      dashboard/applications/page.tsx
      dashboard/applications/[id]/page.tsx
      dashboard/appointments/page.tsx
      dashboard/offers/page.tsx
      dashboard/offers/[id]/page.tsx
      dashboard/deals/page.tsx
      dashboard/deals/[id]/page.tsx
      dashboard/document-rooms/[dealId]/page.tsx
      dashboard/agreements/page.tsx
      dashboard/agreements/[id]/page.tsx
      dashboard/obligations/page.tsx
      dashboard/billing/page.tsx
      dashboard/notifications/page.tsx
      dashboard/support/page.tsx
      dashboard/support/[id]/page.tsx
      dashboard/settings/page.tsx
    (staff)/
      admin/layout.tsx
      admin/page.tsx
      admin/users/page.tsx
      admin/organizations/page.tsx
      admin/listings/page.tsx
      admin/listings/[id]/page.tsx
      admin/verifications/page.tsx
      admin/crm/page.tsx
      admin/crm/[id]/page.tsx
      admin/tasks/page.tsx
      admin/deals/page.tsx
      admin/contracts/page.tsx
      admin/support/page.tsx
      admin/content/page.tsx
      admin/masters/page.tsx
      admin/reports/page.tsx
      admin/audit/page.tsx
      admin/settings/page.tsx
    (demo)/
      demo/page.tsx
      demo/scenarios/[scenario]/page.tsx
      demo/outbox/page.tsx
    api/
      auth/[...all]/route.ts
      demo/workspaces/route.ts
      demo/persona/route.ts
      demo/reset/route.ts
      listings/route.ts
      listings/[id]/route.ts
      inquiries/route.ts
      offers/route.ts
      appointments/route.ts
      documents/[id]/download/route.ts
  components/
    ui/
    layout/
      site-header.tsx
      site-footer.tsx
      mobile-navigation.tsx
      portal-shell.tsx
      staff-shell.tsx
      breadcrumbs.tsx
    shared/
      empty-state.tsx
      error-state.tsx
      loading-skeleton.tsx
      status-badge.tsx
      money.tsx
      timezone-label.tsx
      confirm-dialog.tsx
      accessible-data-table.tsx
      demo-banner.tsx
      theme-toggle.tsx
  features/
    auth/
    accounts/
    organizations/
    verification/
    listings/
    search/
    favorites/
    requirements/
    inquiries/
    messaging/
    applications/
    appointments/
    documents/
    offers/
    deals/
    agreements/
    obligations/
    brokers/
    crm/
    support/
    billing/
    notifications/
    content/
    reporting/
    administration/
    demo/
  server/
    auth/
      auth.ts
      session.ts
      authorization.ts
      demo-persona.ts
    db/
      client.ts
      schema/
      migrations/
      seeds/
    repositories/
      contracts/
      sqlite/
    services/
    adapters/
      email/demo-outbox.ts
      signing/demo-signing.ts
      verification/demo-verification.ts
      billing/demo-billing.ts
      storage/private-files.ts
    security/
      rate-limit.ts
      origin-check.ts
      file-policy.ts
      audit.ts
      redaction.ts
  lib/
    env.ts
    constants.ts
    money.ts
    dates.ts
    result.ts
    errors.ts
    pagination.ts
    seo/
      metadata.ts
      canonical.ts
      jsonld.ts
      indexing-policy.ts
      public-route-manifest.ts
  config/
    site.ts
    navigation.ts
    roles.ts
    permissions.ts
    themes.ts
    tennessee-locations.ts
    industries.ts
  styles/
    tokens.css
    typography.css
    animations.css
tests/
  unit/
  integration/
  e2e/
  accessibility/
  fixtures/
storage/                         # gitignored; outside public
  demo.sqlite
  private/
.env.example
README.md
next.config.ts
tsconfig.json
eslint.config.mjs
playwright.config.ts
vitest.config.ts
lighthouserc.cjs
package.json
```

Route groups must not accidentally create duplicate URLs. Add route-specific `loading.tsx`, `error.tsx` and `not-found.tsx` where helpful. Use dynamic route parameters only from validated allowlists or existing records. Implement additional mutation handlers as needed and document them; the API list above is the minimum starting surface.

### Feature folder contract

For each substantial module use `components/`, `schemas/`, `types.ts`, `constants.ts`, `queries/`, `mutations/`, `policies/`, `tests/` and a narrow public `index.ts` where appropriate. Keep server-only queries and mutations marked and imported through the server boundary. UI files must not import the database client.

Example listing files: `listing-card.tsx`, `listing-gallery.tsx`, `listing-financial-summary.tsx`, `listing-contact-panel.tsx`, `listing-wizard.tsx`, `sale-fields.tsx`, `rental-fields.tsx`, `premises-fields.tsx`, `management-fields.tsx`, `tender-fields.tsx`, `listing-preview.tsx`, `listing.schema.ts`, `publication.policy.ts`, `create-listing.ts`, `submit-listing.ts`, `moderate-listing.ts` and `listing.test.ts`.

Separate CRUD and business transitions when their validation differs. `updateListing` must not bypass `approveListing` or `completeDeal`.

## 8 Public route inventory and page content

Implement every named route with meaningful demo content. Reuse page templates, not duplicated markup. Add all valid public URLs to a route manifest used for navigation tests and production sitemap eligibility.

| Route or group | Required purpose and working actions |
| `/` | Tennessee discovery, intent search, featured opportunities and clear entry paths |
| `/businesses-for-sale` | Sale filters, sorting, pagination, save and compare |
| `/businesses-for-rent` | Operating rental filters, rent period and term comparisons |
| `/commercial-properties-for-lease` | Property-specific area, use and lease search |
| `/management-contracts` | Operator opportunities and application entry |
| `/service-contracts` | Tender deadlines, scope filters and bid entry |
| `/listings/[slug]` | Type-specific details, advertiser, privacy and relevant actions |
| `/compare` | Up to four opportunities with consistent currency and period labels |
| `/requirements` | Approved buyer/operator requirements and matching submission |
| `/tennessee` | State hub linking substantive city and industry content |
| `/tennessee/[city]` | Useful city content, real demo inventory and related resources |
| `/tennessee/[city]/[intent]` | Approved intent landing page, not every possible combination |
| `/industries/[industry]` | Industry-specific guidance, filters and listing inventory |
| `/brokers` and profile | Fictional broker directory and contact workflow |
| `/sell-your-business` | Plain-language seller steps and listing wizard start |
| `/rent-out-your-business` | Explain operating rental and start the correct wizard |
| `/post-a-contract` | Choose management versus service contract |
| `/how-it-works/[audience]` | Buyer, seller, operator, contractor and broker walkthroughs |
| `/resources` and articles | Useful Tennessee-oriented business preparation content |
| `/about` | Proposed platform purpose, without fabricated corporate history |
| `/contact` | Validated form saving a demo support inquiry |
| `/help` and article | Searchable help and support actions |
| `/membership` | Demo entitlement comparison; no actual charge or checkout |
| `/sitemap` | Human-readable navigation with grouped public links |
| `/legal/[document]` | Clearly marked draft privacy, terms, cookies and accessibility pages |

### Homepage layout

Create a strong first screen with the heading `Find your next business opportunity in Tennessee`, a concise explanation, intent tabs and a working location/category search. Use one optimized hero photograph or editorial collage with intentional cropping, not an autoplay video or a carousel hiding the main message.

Below it show selected demo opportunities, separate sale/rental/contract entry sections, Tennessee city discovery, industry categories, a clear three-step explanation, a broker assistance section, useful guides and a closing seller CTA. The footer includes navigation, help, legal links and the demo notice. Do not invent trust logos or “thousands of successful deals” counters.

### Tennessee locations and categories

Seed Nashville, Memphis, Knoxville, Chattanooga, Clarksville, Murfreesboro, Franklin, Hendersonville, Johnson City and Jackson. Store correct region, state and time-zone data in configuration. Do not create fictional offices in these cities.

Categories include restaurants/cafés, convenience stores, gas stations, laundromats, hotels/motels, retail, automotive services, manufacturing, professional services, ecommerce and commercial cleaning. Include liquor-store examples only with clearly described permission-transfer questions; do not make unsupported legal claims.

Create six completed resource articles, approximately 500–900 useful words each, with demo editorial labels, sensible headings and related actions. Topics: preparing a listing, comparing a purchase with an operating rental, buyer document checklist, planning a confidential inquiry, evaluating a management opportunity, and preparing a service proposal. Keep legal and financial instruction general and identify items that require professional confirmation.

## 9 Search and results behaviour

Search must work against the actual seeded dataset, not just animate controls. Store shareable filter state in validated URL search parameters. Back/forward navigation restores the selected filters. Use server-rendered initial results and progressively enhanced controls without a hydration mismatch.

Shared filters: query, location, category, opportunity type, currency, disclosure state and date added. Sale filters include asking range, revenue band and earnings type. Rental filters include rent range and period, agreement term and available date. Premises filters include area, property use and fit-out. Contract filters include type, deadline, duration and capability.

Filters specific to one type must clear or be ignored with an explanation when switching type. Reset pagination when criteria change. Debounce free-text requests, cancel obsolete requests and show correct empty/error/loading states. Unknown amounts are not zero. Do not compare weekly and monthly rentals without a clearly labeled normalization.

Cards show image, fictional listing badge, opportunity type, city, concise title, correctly labeled commercial figures, selected facts and save/compare controls. Sorting works. Count, list and optional map agree. Confidential locations display only an approximate area.

Provide a mobile filter drawer with selected-filter count, clear action and Apply action. Keep desktop filters visible without obscuring content. Maps load only when requested. If tiles are unavailable, show a deliberate list view or labeled static schematic, never a broken map or fabricated satellite image.

## 10 Listing detail templates

Provide distinct sections for each transaction type. Shared parts: breadcrumbs, gallery, title, status, public location, summary, commercial information, operations, inclusions/exclusions, advertiser, questions, next action, report action and related listings.

Sales show asking amount, revenue period, earnings label, inventory treatment, property position, transition/training and conditions. Rental listings show included business assets, payment basis, responsibilities, duration, security arrangement, application requirements and handback expectations. Premises show area, permitted/proposed use, outgoings, fit-out and viewing. Management opportunities show decision rights, duties, reporting and performance measures. Tenders show deliverables, submission deadline, eligibility, clarification process and milestones.

The gallery supports keyboard navigation and sensible image previews. Contact panel is sticky on wide screens and becomes an unobtrusive mobile action bar that respects safe-area insets. Save and Compare work after login where required. A removed listing stops accepting new actions but existing authorized participants can still access their deal.

Private addresses, broker notes, financial attachments and identities must not be serialized into public HTML, JSON-LD, React Server Component payloads or a public listing API. A hidden UI field is not confidential if it exists in the page data.

## 11 Signup login and onboarding

Implement working signup, login, logout, protected routes, forgot-password, reset-password, verification and invitation screens. Use Better Auth with a supported SQLite adapter for the local demonstration. Do not hand-roll password hashing or store credentials in browser storage. Use library-managed server sessions and HttpOnly cookies with secure settings appropriate to the environment.

Signup fields: name, email, password, confirmation where useful, country, primary interest, terms acceptance and optional marketing consent. Validate on server and client. Marketing consent is not preselected and is separate from account terms. Do not let customers select administrator at signup. Preserve the intended listing and action through authentication using a validated same-origin return URL.

Onboarding captures additional interests, preferred locations, categories, experience and timing. Buyers can add seller/operator interests later. Company setup and broker applications are separate approval flows.

Demo email delivery uses a private outbox, clearly marked `Simulated email`. Verification/reset links remain one-time and expiring. An outbox entry is visible only to its corresponding account or the authorized isolated demo presenter; there is no public password-reset inbox. Production mode must disable this adapter and require a real provider configuration.

Add security settings for password change, active sessions and account recovery. Any two-factor flow included must either actually work through the auth library or be prominently described as a guided simulation. Do not show “2FA enabled” without a completed confirmation step.

## 12 Demo Center and scenario isolation

The Demo Center is essential to presenting the system. Offer clear cards: Explore as Buyer, Explore as Owner, Explore as Operator, Explore as Broker and Explore as Administrator. Include an explanation of what each role can demonstrate.

Use isolated workspaces per presenter/session. Seed a copy of mutable sample records into that workspace; keep the base catalogue read-only. All mutable records and repository queries include workspace scope. A second browser must not see the first browser's newly created inquiry or uploaded file.

The demo role switch is a special simulation capability, not an ordinary user permission editor. It is enabled only when server-side `DEMO_MODE=true`, after a valid demo session is established, and is limited to predefined fixture personas in the same workspace. It must be unavailable in production and cannot assign arbitrary user IDs or organizations. Public signup follows normal role rules.

Role switching should preserve scenario progress so the presenter can send an inquiry as a buyer and then answer it as the owner. Record simulated actor changes in the workspace history. Reset requires confirmation and affects only that workspace. Do not implement a public global reset endpoint or expose a shared admin password on an indexed page.

Show scenario completion steps and a presenter guide. The customer experience itself should remain realistic; the extra demonstration controls live in a small separate panel or route.

## 13 Typed domain models

Define explicit TypeScript models and Zod schemas. Use a discriminated union for listing types and a separate public DTO. Do not represent every listing as one object with dozens of optional ambiguous fields.

Required entities: User, Session, Organization, OrganizationMember, DemoWorkspace, Business, Listing, ListingRevision, Asset, PublicMedia, PrivateDocument, VerificationRequest, Favorite, SavedSearch, BuyerRequirement, Inquiry, Conversation, Message, Application, Appointment, NDARecord, DocumentGrant, Offer, OfferVersion, Deal, DueDiligenceTask, Agreement, Amendment, Obligation, MaintenanceRequest, SupportTicket, Notification, DemoInvoice and AuditEvent.

Every persisted record needs a stable ID and timestamps. Relevant records also need workspaceId, organizationId, createdBy and a version or concurrency marker. Store monetary values in integer minor units with currency and period metadata. Store instants in UTC and preserve event time zone. Store null and disclosure status separately from numeric values.

Example types:

```ts
type OpportunityKind =
  | 'sale' | 'business-rental' | 'premises-lease'
  | 'management-contract' | 'service-tender';

type Disclosure<T> =
  | { status: 'disclosed'; value: T }
  | { status: 'undisclosed' | 'not-applicable' };

type Money = { minorUnits: number; currency: 'USD' };
type RecurringMoney = Money & { period: 'week' | 'month' | 'year' };

type ListingPublicationStatus =
  | 'draft' | 'submitted' | 'changes-requested' | 'approved'
  | 'active' | 'paused' | 'under-negotiation' | 'completed'
  | 'expired' | 'withdrawn' | 'suspended';
```

Financial field examples: `revenue.amount`, `revenue.periodStart`, `revenue.periodEnd`, `earnings.measure`, `earnings.adjustmentNote`, `inventory.included`. A public mapper explicitly selects permitted properties; do not spread private repository objects into client props.

## 14 Fictional data requirements

Seed **at least 40 complete opportunities**: 16 sales, 8 operating rentals, 6 premises leases, 5 management contracts and 5 service tenders. Distribute them across the ten Tennessee cities; avoid forty copies of the same record. Include active, confidential, under-negotiation and completed examples, as well as an expiring deadline and an undisclosed amount.

Seed 8 fictional broker profiles, 12 customer personas, 4 organizations, 8 buyer requirements, 16 inquiries, 8 conversations with messages, 8 appointments, 6 offer threads, 4 deals, 4 agreements, recurring obligations, maintenance cases, tickets and notifications. Provide coherent relationships and chronological timestamps rather than random disconnected totals. Generate dashboard counts from records.

Five anchor records:

| ID | Fictional opportunity | Example details |
| NBH-S-1001 | Riverside Café, Nashville | USD 420,000 asking; USD 780,000 annual revenue; USD 135,000 stated owner benefit; inventory separate |
| NBH-R-2001 | Cumberland Laundry, Clarksville | 24 machines; USD 4,500/month; 24-month operating term |
| NBH-L-2101 | Market Square Retail Suite, Murfreesboro | 1,800 sq ft; USD 3,200/month base rent; clearly separate from a trading business |
| NBH-M-3001 | Volunteer Lodge Operations, Knoxville | 32-room fictional motel; 36-month management proposal |
| NBH-T-4001 | Five Store Cleaning Program, Chattanooga | 12-month service tender with a clear scope and deadline |

Buyer: Maya Chen. Owner organization: Harbor Foods Demo. Operator: Daniel Brooks. Broker: Summit Business Partners Demo. Contractor: BrightCare Services Demo. Use `.example` emails, no real identities or working customer contact details. Photos are illustrative and never proof that a real pictured business is for sale.

Dates should remain usable after the build date. Derive future deadlines from the workspace seed timestamp and freeze a demo clock for deterministic tests. Reset restores the same scenario baseline relative to that reset date.

Provide listing descriptions of roughly 150–300 specific useful words, complete inclusions and exclusions, three or more suitable gallery images for anchor listings, plausible operational details and appropriate disclaimer text. Private documents must be generated fictional samples clearly labeled Demonstration Document.

## 15 Customer dashboards and profile functions

The dashboard landing page adapts to selected role and shows actual next actions, not decorative charts. Buyers see favorites, saved searches, inquiries, upcoming visits and offers. Owners see listing status, new interest, overdue responses and negotiations. Operators see applications, agreements and obligations. Brokers see assigned portfolios and follow-up work.

Account pages support profile editing, avatar selection, interests, communication preferences, theme, organization details and team invitations. Team changes follow role rules. Verification allows submission of a fictional evidence record, review status, request-for-correction and approval simulation with a precise badge meaning.

Favorites toggle and persist. Saved searches can be named, edited, paused, deleted and assigned a digest frequency. Requirements can be drafted, submitted, moderated, published and answered with a matching opportunity. Provide helpful empty states with actions and never display another customer's data.

## 16 Listing wizard and moderation

Implement a multi-step wizard: type, authority, basic information, type-specific terms, operations/assets, public media, private documents, confidentiality, contact, review and submit. Save progress to the scoped repository. Show saving/saved/failed states. Navigation back to a completed step must preserve input.

Each field has a real label, hint, requirement, validation and inline error. Conditional fields appear based on type. Validate end dates after start dates, amounts and periods, category membership, URL format and permitted file types. Persist drafts before step changes and prevent accidental loss.

Preview exactly mirrors the public listing DTO. Show confidential elements as hidden rather than displaying them with a small lock icon. Submit creates a review item. An administrator can approve, request changes with field-level notes or reject with reason. The owner sees the decision and can resubmit.

Material edits to a live listing create a revision requiring review. The approved public version stays live unless the listing is explicitly paused or suspended. Paid promotion cannot override moderation. Completing a listing uses a deal outcome, not an arbitrary unchecked status toggle.

## 17 Inquiries messaging and qualification

Implement an inquiry form linked to the listing and logged-in customer. Fields: message, relevant experience, proposed timeframe, funding or operating readiness where appropriate, and specific consent choices. Submission creates one inquiry, one initial conversation message and a recipient notification.

The owner/broker sees the lead in their inbox and CRM. They can assign it, reply, request qualification, set a follow-up, decline with reason or progress to a meeting. Internal notes are separated from public messages at the data and component levels.

Messages support thread display, sent timestamps, unread state, basic attachments, loading/error states and a retry action. A polling or refresh-based demo is acceptable if accurate; do not claim a live WebSocket capability without implementing it. Sending a message must update the other persona's view within the same workspace.

Implement report/block actions. Attachments obey the private file policy. Limit duplicate inquiries through an idempotency key or uniqueness rule and provide an understandable message when a thread already exists.

## 18 Confidential documents and NDA simulation

Document access workflow: requested → qualification pending → NDA simulation pending → owner approval pending → granted → expired/revoked. Keep NDA completion and document permission separate. A signed NDA simulation alone does not give every document to the customer.

Use a read-only fictional NDA preview, an explicit acknowledgement/signing simulation and a recorded demo completion event. Label it as nonbinding demonstration; do not present a typed name as a production legal signature service.

Owner grants access by document or folder with expiry. List file name, version, category, updated date, status and permitted actions. Authorized download routes must check the session, organization, workspace and grant on every request. Private files live outside `/public`, have unpredictable identifiers and are not exposed through static paths.

Generate a few sample text/PDF documents with fictional data. Support version upload and revocation. Do not claim download prevention makes screenshots impossible. Display a clear access denied state and provide a request-access action where appropriate.

## 19 Appointments and calendar

Provide calendar and list views with booking, rescheduling, cancellation, attendance and notes. Fields: listing, appointment type, participants, location or demo video link, local date, local time, IANA time zone, duration and notes.

Confirming an exclusive slot checks conflicts on the server. Show requested versus confirmed states. Rescheduling cancels old reminders and updates the same appointment. Calendar downloads can produce a real `.ics` file with correct times; no external invitation should be sent from the demo.

Use a deliberate daylight-saving strategy: reject nonexistent local times, disambiguate repeated times and store UTC plus the original zone. A Nashville appointment and Knoxville appointment must display correctly for a customer viewing from another zone.

## 20 Offers applications and negotiation

Sale offers include amount, inclusions, conditions, completion target, expiry and message. Rental applications include experience, proposed start date, term, operating plan and references. Management proposals include duties, staffing, commercial model and reporting. Service bids include scope, milestones, exclusions and delivery assumptions.

Save drafts; submit immutable versions; support clarification, counteroffer, decline, withdrawal and expiry. Accept only the exact current eligible version. Preserve previous versions and highlight changed terms. A late or withdrawn offer cannot be accepted by replaying an old request.

Owner comparison pages show only authorized submissions. Competing bidders cannot view each other's terms. Optional sealed-tender mode must enforce the opening time on the server. Awards create a deal/agreement workspace; they do not automatically mark payments settled.

## 21 Deal agreements and handover

Provide a deal overview with parties, listing, current stage, accepted terms, task list, documents, questions, timeline and next action. Support due-diligence tasks with owner, deadline, evidence, status and review decision.

Agreement drafts are versioned. Simulation signing refers to the exact version. Handover includes assets, stock, keys, account-transfer tasks, training and condition records. Blocking tasks prevent ordinary completion. A privileged exception requires a recorded reason and remains visible in the audit trail.

On completion, record the final outcome and date, update the public listing status, stop accepting conflicting new actions and preserve private authorized records. Failed deals can be closed and the listing reopened with owner confirmation. Do not delete unsuccessful negotiation history.

## 22 Recurring rentals and contract operations

Agreement register fields: start/end dates, parties, responsibility matrix, notice deadlines, renewal options and assigned manager. Display upcoming obligations, overdue items, maintenance and amendments.

Implement recurring report submission, inspection tasks, manually recorded payments, partial-payment states and maintenance requests. Label manual payments as reported or confirmed by a party, not bank verified. A rental payment and a platform membership invoice are separate entities.

Create a maintenance workflow with asset, description, photos, urgency, responsible party, status and completion evidence. Renewal/termination are deliberate actions, not automatic effects of a reminder. End-of-term handback includes asset condition and access removal.

## 23 Staff broker CRM and admin functions

Build a usable staff area with independent permission checks. Administrator pages are not ordinary public pages hidden only by a sidebar.

Broker/team workspace: assigned listings, owners, leads, visits, deals, follow-ups, performance and reassignment. An organization manager can invite members, assign permitted portfolios and revoke future access without erasing history.

CRM: customer record, linked inquiries, stage, priority, assigned adviser, next action, communication timeline, internal notes and tasks. Support list and board views with accessible alternatives. A single customer can have several active inquiries. Closing one inquiry does not close the customer.

Admin controls: account restrictions, organizations, listing review, verification queue, category/location masters, content drafts, support cases, reports and audit. Master-data changes used by existing records require archive or reassignment, not destructive deletion.

Support: create ticket, assign, reply, request information, resolve, reopen and close. Reported misconduct remains an allegation until reviewed. Reviews, if demonstrated, require an eligible interaction and moderation; they must not reveal confidential business details.

Bulk import can demonstrate CSV preview, row validation and duplicate detection using a provided fictional template. Bulk exports must obey permissions and redact confidential fields. Neutralize spreadsheet formula injection when exporting customer-controlled text.

## 24 Notifications billing and content

In-app notifications persist and link to relevant records. Support read/unread, category filters and preference settings. Demo outbox events support listing approval, inquiry, document grant, appointment, offer and obligation scenarios. Deduplicate retries and stop obsolete reminders after cancellation.

Billing is a clearly labeled simulation: show membership entitlements, demo invoices, renewal state and simulated failure/refund transitions. No real card entry and no real business funds. An unsuccessful billing simulation does not create duplicate entitlements. No development costs or real subscription prices are required.

Content editor manages articles, FAQs, category introductions and banners. Draft/preview/publish actions work within the demo workspace. Sanitize any rich content. Use structured fields or safe Markdown rather than arbitrary executable HTML. Approved legal documents remain demo drafts until replaced before production.

Reports compute listing counts, inquiries, qualified leads, response times, deals and overdue obligations from records. Chart components must include text or table equivalents. Do not sum asking prices and call the total platform revenue.

## 25 State transitions and consistency rules

Implement transition functions with explicit allowed predecessors, actor permissions and side effects. Avoid freely writable status fields.

| Entity | Main transition sequence | Important guard |
| Listing | Draft → Submitted → Approved → Active | Authority and required information present |
| Revision | Draft → Review → Approved | Approved public version remains distinct |
| Inquiry | New → Assigned → Responded → Qualified → Progressed/Closed | Only authorized receiving team changes qualification |
| Document grant | Requested → Approved → Active → Expired/Revoked | NDA and qualification rules checked separately |
| Appointment | Requested → Confirmed → Completed/Cancelled | Check slot conflict and participant access |
| Offer | Draft → Submitted → Countered/Accepted/Declined/Expired | Exact version and current expiry |
| Deal | Negotiation → Review → Agreement → Handover → Completed | Blocking conditions resolved |
| Tender | Open → Closed → Evaluation → Awarded | Deadline, privacy and authorized award |
| Agreement | Pending → Active → Renewal/Notice → Ended | Listing expiry does not end agreement |
| Maintenance | Reported → Assigned → In Progress → Resolved | Responsible party and evidence |
| Ticket | Open → Assigned → Waiting/Resolved → Closed | Authorized participants only |

Use transactions and concurrency checks for exclusive acceptance, appointment slots and workspace reset. Include idempotency for repeated submissions. One failed side effect should not create a misleading success state; persist the business event and track notification retry separately.

## 26 SEO architecture and Tennessee content strategy

Build **SEO-ready production architecture**, while ensuring the fictional demonstration is not indexed. These are separate deployment modes.

### Demo and staging

Default `APP_ENV=demo`, `DEMO_MODE=true`, `INDEXING_ENABLED=false`. Set sitewide noindex/nofollow metadata and an appropriate X-Robots-Tag on demo pages and downloadable demo files. Do not advertise demo URLs in a production sitemap or submit them to Search Console. Private pages require authentication regardless of robots rules.

Do not rely on robots.txt alone to remove a URL from the index. If a crawler must see noindex, do not block the same public demo URL from crawling and then assume it observed the directive. A private preview can use hosting-level access control. Robots.txt is neither authorization nor a confidentiality mechanism.

### Production release

Production indexing is explicit and gated: approved domain, genuine content, demo fixtures removed from public routes, legal text reviewed and no demo-role endpoints. Use a production route manifest to generate sitemap.xml from actual canonical eligible pages. Add a human sitemap too. Exclude auth, dashboard, admin, demo, API, internal search combinations, comparison sessions, document rooms and personal records.

Public pages use server-rendered or prerendered meaningful HTML, correct titles, descriptions, headings, canonical URLs, social metadata and breadcrumbs. Use the current Next metadata APIs in server components. Handle missing slugs with true 404 responses, intentional redirects and a clear withdrawn/completed listing policy. Do not silently redirect every missing listing to the homepage.

Initial title patterns:
- `Businesses for Sale in Tennessee | NashBizHub`
- `Businesses for Rent in Tennessee | NashBizHub`
- `Business Opportunities in Nashville, TN | NashBizHub`
- `[Listing title] in [City], TN | NashBizHub`

Treat title and description lengths as editorial guidance, not rigid ranking factors. Write distinctive useful content; do not repeat keywords in every sentence. Use meaningful link text and genuine relationships between city hubs, industries, opportunities and guides.

Create substantive pages for the ten named cities. Only create city-intent combinations where there is worthwhile inventory or original relevant content. Do not generate thousands of thin city/category doorway pages. Do not manufacture local offices, local phone numbers, reviews or credentials to improve relevance.

### Structured data

Use accurate JSON-LD for the actual organization, website and breadcrumb structure. Use ItemList for genuine listing collections where appropriate. Evaluate listing-specific schema against current schema definitions and actual content; do not force every business-for-sale opportunity into Product, JobPosting or LocalBusiness. If LocalBusiness appears, it must refer to a real appropriate entity with permitted accurate details, not an invented NashBizHub office.

Do not create fake AggregateRating or Review markup, unsupported prices or guaranteed rich-result claims. Escape JSON-LD safely, including `<`, and ensure it matches visible content. FAQ content can be useful without promising FAQ rich results.

### Filter and pagination policy

Use clean landing URLs for curated indexable pages. Sort-only variants can canonicalize to the equivalent base; internal combinations should normally be noindex and outside the sitemap. Do not canonicalize substantively different content indiscriminately. Paginated indexable collections have coherent crawlable links and page-specific canonicals; do not point every page to page 1 while claiming unique inventory is represented.

### Ongoing SEO plan

Provide a production launch checklist for Search Console verification, sitemap submission, crawl checks, image accessibility, content review and measurement. Explain that Google Business Profile is only appropriate if the actual business qualifies; do not create fake locations. Track query impressions, clicks, qualified inquiries and conversions after launch. Rankings depend on competition, relevance, content and other signals; neither coding nor a Lighthouse score guarantees page-one placement.

## 27 Performance requirements and measurement

Aim for excellent mobile and desktop results. Treat scores as measured results from specific routes and conditions, not a universal guarantee.

Production field goals at the 75th percentile: LCP at or below 2.5 seconds, INP at or below 200 milliseconds and CLS at or below 0.1. A new demo normally has no representative field data. Lighthouse lab results do not prove field INP or long-term Core Web Vitals performance.

Initial engineering budgets, to be measured and adjusted only with a recorded reason:
- Target Lighthouse Performance at least 95 for key public routes; aim for 100 when realistically achievable.
- Target automated Accessibility, Best Practices and SEO scores of 100, plus manual checks; 100 is not a guarantee of full compliance or ranking.
- Run at least three production-build tests per representative route/device profile and report the median plus configuration.
- Target route-specific added compressed client JavaScript below 150 KB for homepage/listing pages, excluding unavoidable framework baseline; also report total transfer and do not hide framework weight.
- Target a mobile hero image around 200 KB or less where visual quality permits, and first-view page transfer around 1 MB or less.
- No heavy chart, map, rich-editor or document-viewer code in the public homepage bundle.

Use Server Components for initial content, explicit caching for public data, dynamic private pages and small client islands. Do not mark the root layout `use client`. Avoid duplicate server/client requests for the same first-screen content. Never cache personalized data into a shared public cache key.

Use `next/image` with dimensions, accurate `sizes`, suitable formats and the current supported LCP-image preload strategy. Lazy-load below-fold images, not the hero. Avoid CSS backgrounds for meaningful images that need alt text. Limit remote image domains and do not allow arbitrary server image fetching.

Use built-in font optimization, component-level dynamic imports, memoization where measured useful, efficient database indexes and server pagination. Use CSS for simple hover/focus transitions. Avoid scroll listeners that continuously update React state. Load maps after intent, not on initial page load. Do not add third-party analytics to the demo just to show a script badge.

Report mobile and desktop checks on home, sales search, a city page, a listing detail and a resource article. Test private dashboard responsiveness separately using authenticated local browser scenarios; do not expose protected data just to run a public PageSpeed test.

## 28 Accessibility mobile and interaction standards

Target WCAG 2.2 AA through automated and manual evaluation. Use semantic landmarks, one meaningful H1 per page, ordered headings, a skip link and descriptive page titles. Normal text contrast is at least 4.5:1; large text and relevant UI boundaries follow their applicable criteria.

Every control must be keyboard usable. Dialogs trap focus, restore it on close and support Escape where appropriate. Accordions use buttons. Tabs expose correct relationships. Do not make a clickable card contain invalid nested interactive elements. Form errors are associated with their fields, and submission errors provide an accessible summary.

Use at least 44px comfortable interactive targets where practical, respecting the applicable WCAG target-size rules. Maintain visible focus. Icon-only buttons require accessible names. Status must not rely on colour. Announce important asynchronous changes appropriately without reading every keystroke or toast.

Test at 320, 375, 390, 768, 1024, 1280 and 1440 CSS pixels and at 200% zoom. No horizontal page overflow; wide tables can have a labeled contained scroll region or mobile card alternative. Do not hide critical financial labels on mobile. Respect safe areas, touch input and the on-screen keyboard.

Animation: 120–220ms for controls, modest page/section transitions, opacity/transform primarily. Respect prefers-reduced-motion using Motion's supported hook. No forced parallax, infinite spinning decoration, autoplay hero video or custom smooth scrolling that breaks native navigation. Content must remain visible if animation JavaScript fails.

## 29 Security requirements

Implement security boundaries in server code, not merely in route navigation. Follow the current Next.js security guidance and the auth library's recommended integration.

Authentication identifies the user. Authorization separately checks role, organization, workspace, record ownership and specific grants. Every server action and route handler performs its own relevant check. A protected layout or request proxy is not sufficient authorization for mutations.

Use schema validation on the server and explicit allowed fields to prevent mass assignment. Reject unauthorized role, owner, workspace and status changes even if hidden inputs are modified. Use parameterized database access through the repository/ORM. Never trust a submitted ownerId simply because it came from the UI.

Use secure session cookies, CSRF/origin protections appropriate to cookie-based requests, allowlisted return URLs, sensible rate limits, request-size limits and generic sensitive-account errors. Configure CSP, frame restrictions, content-type protections and referrer policy according to the actual architecture. Account for framework hydration and font/image sources; do not disable protections wholesale to remove errors. Use HSTS only in an appropriate HTTPS deployment.

Never put secrets in NEXT_PUBLIC variables. Keep session data, passwords, private documents and signing tokens out of localStorage, analytics, console logs and error messages. Browser persistence is acceptable for theme or a nonconfidential compare preference; it is not an authorization source.

Uploads: allowlisted extensions and actual content checks, size/count limits, randomized private names, no executable rendering and no user-supplied file paths. Reject user-uploaded SVG/HTML unless a properly reviewed sanitization path exists. Keep pending uploads quarantined. If a malware scanner is not configured, state that scanning is unavailable; restrict the demo to generated safe sample documents rather than claiming files were scanned.

Private downloads require permission checks and non-cacheable appropriate responses. Prevent path traversal and cross-workspace IDs. Redact sensitive fields in audit logs and exports. Sanitize rich text and escape untrusted output. Validate external links and use safe new-tab attributes.

Public demo endpoints never grant production roles. Production startup fails closed if unsafe demo features are enabled. Turn off demo outbox, persona switching, fixture credentials and reset routes in production. Third-party test keys cannot be mistaken for live settlement.

Add dependency audit and secret scanning to the verification workflow. Document unresolved findings rather than claiming the application is unhackable or completely secure.

## 30 Assets and content requirements

Use licensed, relevant stock imagery from approved sources, downloaded into the project when permitted. Record source URL, creator/license where applicable, local filename and intended use. Do not hotlink random search results or copy competitor listing photos and content.

Include restaurant, laundry, retail, manufacturing, motel and commercial-cleaning imagery with appropriate crops. Avoid recognizable real business signage where the image could imply an actual business is listed. Alt text describes the image honestly; it should not be a list of Tennessee keywords.

Anchor listings need working galleries with no broken images. Use deterministic local placeholder artwork only if licensed images are unavailable, and identify it as illustrative. Do not let missing API keys or external image failures break the client presentation.

Use realistic useful copy throughout. No lorem ipsum, duplicated placeholder names or false review quotes. Demo figures and identities remain marked as fictional. No real contact details or uploaded identity documents are needed for presentation.

## 31 Environment configuration and production boundary

Provide a complete `.env.example` with placeholders, explanations and no secrets:

```dotenv
APP_ENV=demo
DEMO_MODE=true
INDEXING_ENABLED=false
NEXT_PUBLIC_SITE_URL=http://localhost:3000
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=replace-with-a-generated-secret
DATABASE_URL=file:./storage/demo.sqlite
PRIVATE_STORAGE_PATH=./storage/private
EMAIL_ADAPTER=demo-outbox
SIGNING_ADAPTER=demo
BILLING_ADAPTER=demo
MAP_PROVIDER=none
```

Names may be adapted to the library's actual requirements; document any changes. Parse and validate environment variables centrally, including booleans as actual booleans rather than truthy strings. The site URL must be absolute and used consistently for metadata. Never hard-code an unconfirmed production domain.

Implement typed repository interfaces so later production APIs can replace local demo adapters. Describe the mapping to a potential Laravel backend in `docs/api-contracts.md`, but avoid duplicated business logic across two backends. Database/auth migrations must be reproducible and not rely on a developer manually editing tables.

Provide scripts equivalent to: `dev`, `build`, `start`, `lint`, `typecheck`, `test`, `test:e2e`, `test:a11y`, `db:migrate`, `demo:seed`, `demo:validate` and `perf:public`. Destructive global development reset commands require an explicit local-only flag and are never exposed as public unauthenticated actions.

## 32 Essential acceptance scenarios

Implement browser tests for the following. Use deterministic fixtures and validate data outcomes, not just that a toast appeared.

1. Visitor searches cafés in Nashville, changes filters, opens a listing and uses browser back without losing search state.
2. Signup validates input, creates a normal customer, verifies through the private demo outbox, logs in and returns to the intended listing.
3. Buyer saves a listing, compares two suitable opportunities and creates a saved-search preference that survives reload.
4. Buyer sends one inquiry; owner sees it, replies and requests qualification; buyer sees the response.
5. Buyer completes a simulated NDA, owner grants specific document access, buyer downloads a sample, owner revokes access and a replayed download fails.
6. Buyer requests a visit, owner confirms, customer reschedules and the previous reminder becomes obsolete.
7. Buyer offers USD 395,000, owner counters at USD 405,000, buyer accepts the exact version and a deal is created without marking the business sold.
8. A blocking handover condition prevents completion; completing the approved task allows an authorized completion action and updates the listing.
9. Owner drafts a rental listing, reloads, resumes, submits it; moderator requests a change and later approves the revision.
10. Operator applies for the laundromat, is selected, completes the agreement simulation and reports a machine maintenance issue.
11. Contractor submits a tender before closing; a late submission fails; competitors cannot retrieve another bid by changing an ID.
12. Staff creates and completes a follow-up task; dashboard totals reconcile with the underlying records.
13. Customer raises a support ticket, staff replies and the customer reopens it after a proposed resolution.
14. Role and organization permissions reject another company's private records even through direct API calls.
15. Two separate demo workspaces remain isolated; resetting one does not alter the other.
16. A duplicate mutation does not create two inquiries, two accepted awards or overlapping exclusive appointments.
17. A signed/accepted version cannot be replaced through a generic update endpoint.
18. Production configuration rejects demo persona and reset requests; public signup cannot obtain admin.
19. Demo responses include noindex and no public sitemap exposure; production manifest excludes fictional/private records.
20. Public server-rendered HTML contains meaningful listing content and metadata with no private data leakage.

Also verify mobile navigation, focus management, high-contrast theme, reduced motion, empty results, expired sessions, invalid slugs, failed saves, unavailable map provider and missing image fallback. Test an unexpected exception path without exposing stack traces to users.

## 33 Delivery phases

### Phase 1 — Foundation
Create the app, tokens, fonts, base layouts, reusable UI primitives, auth integration, database migrations, configuration validation, fixture schema and route manifest. Build one complete listing template before multiplying routes. Deliver a runnable application, not just scaffolding.

### Phase 2 — Public marketplace
Complete home, five search intents, listing details, location/category hubs, broker pages, resources and explanatory pages. Implement filters, sorting, comparison and responsive navigation. Add metadata and demo indexing protection from the start.

### Phase 3 — Customer workspace
Complete signup/login, profiles, dashboards, favorites, saved searches, listing wizard and requirements. Save state through repositories. Implement owner/moderator publication flow.

### Phase 4 — Connected transactions
Complete inquiries, messaging, qualification, document room, appointment, offers, applications, tenders, deals and handover. Make the five anchor scenarios presentable from start to finish through role switching.

### Phase 5 — Continuing operations
Complete agreements, obligations, maintenance, broker teams, CRM, admin, support, notifications, simulated billing and reports. Ensure reports derive from records.

### Phase 6 — Presentation and verification
Complete the Demo Center, presenter script, asset polish, accessibility checks, production builds, automated journeys, permission tests and performance measurement. Fix discovered defects and update the implementation-status document. Leave a short, explicit list of provider-dependent production work.

After every phase run relevant type, lint, build and focused test checks. Do not repeatedly run every expensive test when nothing affecting it changed. Before final delivery run the agreed end-to-end suite and representative performance checks once against the completed build.

## 34 Client demonstration script

Prepare `docs/demo-script.md` with a 12–15 minute walkthrough and clickable local paths:

1. Show the Tennessee homepage, intent selection, Nashville filtering and listing details.
2. Enter the buyer persona; save, compare and inquire about Riverside Café.
3. Switch to the owner/broker persona; reply and request qualification.
4. Return to buyer; complete the simulated NDA. Owner grants document access.
5. Arrange a visit and demonstrate one counteroffer with preserved version history.
6. Open the deal checklist and explain why accepted terms are not yet a completed sale.
7. Demonstrate the laundromat operator application and maintenance obligation.
8. Show the tender submission/evaluation workflow with private competing bids.
9. Open admin moderation and staff CRM, then show reports updating from the actions.
10. Demonstrate mobile layout, reset only this workspace and show the production-readiness checklist.

Provide a shorter five-minute path using the same coherent records. No step should require editing source code, restarting the app or manually changing database records during the presentation.

## 35 Definition of done

The deliverable is complete when:
- The application runs from documented setup commands with deterministic demo data.
- All listed core routes render meaningful content and reachable actions.
- Signup/login and access controls work; provider simulations are clearly identified.
- The five anchor opportunity types have distinct fields and complete demonstration journeys.
- Actions persist, related roles see the same scoped records and reset is isolated.
- Public pages have metadata and server-readable content; demo/private data remains nonindexable and protected.
- Responsive and accessibility checks have been performed with results recorded.
- Builds, type checks and relevant tests pass, or remaining failures are explicitly disclosed.
- Performance results name the tested routes, device conditions and actual measured scores.
- No real payment, email, customer evidence or unsupported ranking claim is presented.
- Source files are modular, secrets are absent, and production integration boundaries are documented.

Final Cursor response should give setup/run commands, the demonstration entry URL, where to find private demo credentials if used, completed modules, tests actually run and remaining integration requirements. Do not describe an unimplemented feature as delivered. Do not finish by saying only that the project could be built.

# END CURSOR BUILD INSTRUCTIONS

---

## Reference notes for the project owner

These sources informed the technical instructions; they are not external dependencies the demo must call at runtime. Check the current documentation when choosing package versions.

- Next.js metadata: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
- Next.js metadata files: https://nextjs.org/docs/app/api-reference/file-conventions/metadata
- Next.js authentication: https://nextjs.org/docs/app/guides/authentication
- Next.js data security: https://nextjs.org/docs/app/guides/data-security
- Google Sans: https://fonts.google.com/specimen/Google+Sans
- Google SEO starter guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google guidance on ranking promises: https://developers.google.com/search/docs/fundamentals/do-i-need-seo
- Core Web Vitals: https://developers.google.com/search/docs/appearance/core-web-vitals
- PageSpeed Insights measurement: https://developers.google.com/speed/docs/insights/v5/about
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- shadcn/ui with Next.js: https://ui.shadcn.com/docs/installation/next
- Better Auth installation: https://better-auth.com/docs/installation
- Better Auth SQLite support: https://better-auth.com/docs/adapters/sqlite
- Motion reduced-motion support: https://motion.dev/docs/react-use-reduced-motion

No developer can guarantee a first-page Google ranking or a permanent 100 score across every device and network. The prompt therefore requires measurable performance, accessibility, indexing and content work, with honest results and a separate production launch gate.
