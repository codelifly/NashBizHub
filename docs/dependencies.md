# Dependencies

Package purposes for NashBizHub (demo marketplace).

## Runtime

| Package | Purpose |
| --- | --- |
| `next` | App Router UI and API routes |
| `react` / `react-dom` | UI |
| `better-auth` | Email/password auth, sessions, verification hooks |
| `drizzle-orm` | Typed SQLite access |
| `better-sqlite3` | Local SQLite driver for demo |
| `zod` | Env and form validation |
| `nanoid` | IDs for demos and outbox rows |
| `@tanstack/react-query` | Client data fetching |
| `@tanstack/react-table` | Admin/portal tables |
| `react-hook-form` + `@hookform/resolvers` | Forms |
| `class-variance-authority` / `clsx` / `tailwind-merge` | UI class composition |
| `@radix-ui/*` | Accessible primitives (dialog, label, etc.) |
| `lucide-react` | Icons |
| `motion` | Intentional UI motion |
| `date-fns` / `date-fns-tz` | Dates and America/Chicago display |
| `recharts` | Demo reports charts |
| `sonner` | Toasts |
| `zustand` | Lightweight client state (compare, wizards) |

## Dev / quality

| Package | Purpose |
| --- | --- |
| `typescript` | Types |
| `eslint` / `eslint-config-next` / `eslint-config-prettier` | Lint |
| `prettier` | Format |
| `tailwindcss` / `@tailwindcss/turbopack` | Styling |
| `drizzle-kit` | Migrations |
| `tsx` | Run seed/validate scripts |
| `vitest` + Testing Library + `jsdom` | Unit/component tests |
| `@playwright/test` / `@axe-core/playwright` | E2E and a11y |
| `dotenv` | Load env in scripts |

## Explicitly not included

- Real payment SDKs (Stripe, etc.) — billing is demo-only
- Real email SMTP providers — outbox adapter only
- Production hosted DB clients — SQLite file for local demo
