# NashBizHub Implementation Status

Updated: 24 October 2026

Labels: `not started` | `in progress` | `implemented` | `verified` | `stub`

## Phase overview

| Phase | Scope | Status |
| --- | --- | --- |
| 1 Foundation | App, tokens, auth, DB, configs, listing template | `implemented` |
| 2 Public marketplace | Home, search intents, hubs, resources, compare | `implemented` |
| 3 Customer workspace | Signup/login, dashboards, wizard, favorites | `implemented` |
| 4 Connected transactions | Inquiries, docs, offers, deals, appointments, applications | `implemented` |
| 5 Continuing operations | Agreements, obligations, maintenance, CRM, admin moderation | `implemented` (demo memory) |
| 6 Presentation and verification | Demo Center, tests, polish, measurements | `in progress` |

## Working end-to-end (local demo)

| Flow | Status | Notes |
| --- | --- | --- |
| Public listing browse/detail | `implemented` | Fixture-backed sqlite repo |
| Favorites toggle + dashboard list | `implemented` | Memory repo + `/api/favorites` |
| Inquiry create / list / reply | `implemented` | Listing contact form → `/api/inquiries` |
| Sale offer draft/submit/counter/accept | `implemented` | Riverside Café form + offer actions; version guard |
| Deal materialization on accept | `implemented` | Memory deals + dashboard |
| Appointments request/confirm | `implemented` | `/api/appointments` + dashboard |
| Document grant check + download | `implemented` | `/api/documents/[id]/download` |
| NDA simulation | `implemented` | `/api/documents/nda` |
| Listing publish wizard | `implemented` | `/dashboard/listings/new` multi-step; memory `listingDrafts` |
| Listing moderation queue | `implemented` | `/admin/listings` approve / request-changes |
| Rental / tender applications | `implemented` | Forms on rental & tender detail; `/api/applications` |
| Application award → agreement stub | `implemented` | Decision API creates agreement + obligation |
| Agreements / obligations | `implemented` | Seeded laundry agreement; manual payment report |
| Maintenance requests | `implemented` | Create from agreement detail → `/api/maintenance` |
| Admin CRM (inquiry pipeline) | `implemented` | `/admin/crm` stages from memory inquiries |
| Demo persona cookie switch | `implemented` | `/api/demo/persona` when `DEMO_MODE=true` |
| Demo workspace reset | `implemented` | `/api/demo/reset` + Demo Center confirm button |
| Workspace cookie isolation | `implemented` | `nbh_workspace`; in-memory bags |
| SQLite migrate + seed | `implemented` | `npm run demo:setup` |

## Still stubbed / partial

| Area | Status | Notes |
| --- | --- | --- |
| Better-auth password for seeded personas | `stub` | Users seeded without hashes; use persona switcher or signup |
| Messages inbox (beyond inquiry thread) | `partial` | Inquiry replies only |
| Admin billing, reports, audit UIs | `stub` | WorkspacePage empty shells |
| Approved drafts in public catalogue | `partial` | Approve sets memory draft `active`; does not mutate fixture feed |
| Email/signing/billing adapters | `implemented` (demo) | Simulated only |
| Playwright / Lighthouse verification | `not started` | |

## Phase 1 checklist

| Item | Status | Notes |
| --- | --- | --- |
| Next.js App Router + TypeScript | `implemented` | Next 16.4.x |
| Brand tokens + themes | `implemented` | |
| Inter + Google Sans | `implemented` | |
| shadcn/ui primitives | `implemented` | |
| Layout shells | `implemented` | |
| Better Auth + SQLite sessions | `implemented` | Signup/login for new users |
| Drizzle schema + migrate/seed | `implemented` | `scripts/migrate.ts`, `seed-demo.ts` |
| Env validation | `implemented` | |
| Route manifest docs | `implemented` | `docs/route-manifest.md` |
| Demo banner / Demo Center | `implemented` | Persona switch + workspace reset |
| Anchor listing template (Riverside) | `implemented` | Inquiry + offer + docs |

## Assumptions recorded

1. Local demo uses SQLite at `storage/demo.sqlite` for catalog seed; mutable transactions use in-memory workspace bags (survives for process lifetime).
2. `DEMO_MODE=true` and `INDEXING_ENABLED=false` by default.
3. Seeded demo personas rely on persona switcher; documented password `DemoPass123!` is not hashed into `accounts`.
4. Maps provider defaults to `none`.
5. Email, signing, verification and billing use demo adapters only.
6. Wizard-approved listings stay in the workspace memory bag (`status: active`); public browse remains fixture-backed.

## Verification log

| Check | Result | When |
| --- | --- | --- |
| `npm run demo:setup` | passed | 24 Oct 2026 |
| `npm run typecheck` | passed | 24 Oct 2026 |
| `npm test` | passed (19) | 24 Oct 2026 |
| `npm run build` | passed | 24 Oct 2026 |
| Playwright journeys | not started | |
| Lighthouse public routes | not started | |

## Remaining production integration (not part of demo)

- Real email provider
- Real document signing
- Real payment processor
- Persistent hosted database adapter for all transaction tables
- Legal copy review
- Production indexing gate
