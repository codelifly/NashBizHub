# NashBizHub

Interactive Tennessee business opportunity marketplace demonstration.

**Interactive demo · All businesses and transactions are fictional.**

Stack: Next.js (App Router), React, TypeScript, Tailwind CSS, Better Auth, SQLite + Drizzle, Vitest.

## Quick start

```bash
cp .env.example .env.local
npm install
npm run demo:setup
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Demo Center: [http://localhost:3000/demo](http://localhost:3000/demo).

## Useful commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local development server |
| `npm run build` / `npm start` | Production build and serve |
| `npm run typecheck` | TypeScript check |
| `npm test` | Unit tests (Vitest) |
| `npm run demo:setup` | Migrate SQLite + seed demo fixtures |
| `npm run demo:validate` | Validate seed fixtures |

## Demo credentials

See [`docs/demo-credentials.md`](docs/demo-credentials.md). Prefer the **Demo Center persona switcher** for buyer / owner / operator / broker / admin walks. New accounts can sign up normally (customer roles only).

## Documentation

| Doc | Contents |
| --- | --- |
| [`docs/NASHBIZHUB_MASTER_PROMPT.md`](docs/NASHBIZHUB_MASTER_PROMPT.md) | Full build specification |
| [`docs/implementation-status.md`](docs/implementation-status.md) | Phase status and honesty log |
| [`docs/demo-script.md`](docs/demo-script.md) | Client walkthrough |
| [`docs/route-manifest.md`](docs/route-manifest.md) | Public routes |
| [`docs/dependencies.md`](docs/dependencies.md) | Package choices |

## Environment

Copy `.env.example` to `.env.local`. Defaults keep `DEMO_MODE=true` and `INDEXING_ENABLED=false`. Production refuses to start with demo mode enabled.

## Scope notes

This is a local client demonstration, not a live marketplace or settlement service. Email, signing, verification and billing use clearly labeled demo adapters. SQLite is for single-instance local persistence only.
