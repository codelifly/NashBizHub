# Demo script (12–15 minutes)

Local walkthrough of working NashBizHub transaction flows. Assumes `npm run demo:setup` and `npm run dev` on `http://localhost:3000`.

## 0. Prep (1 min)

1. `cd c:\xampp\htdocs\NashBizHub`
2. `npm run demo:setup` — migrates `storage/demo.sqlite` and seeds fixtures + private docs under `storage/private/`
3. `npm run dev`
4. Open [http://localhost:3000/demo](http://localhost:3000/demo)

## 1. Marketplace discovery (2 min)

1. Home → [Businesses for sale](http://localhost:3000/businesses-for-sale)
2. Open anchor listing [Riverside Café](http://localhost:3000/listings/riverside-cafe-nashville) (`NBH-S-1001`)
3. Point out kind-specific commercial terms, inclusions, fictional disclaimer

## 2. Persona switch (1 min)

1. Return to [Demo Center](http://localhost:3000/demo)
2. Click **Continue as Buyer** (Maya Chen) — sets `nbh_demo_persona` + `nbh_workspace`
3. Or use [Login](http://localhost:3000/login) → Quick demo login buttons

> Seeded personas are not password-authenticated. New accounts can still sign up via better-auth. Documented password for future wiring: `DemoPass123!`.

## 3. Favorites (1 min)

1. On Riverside detail, click **Save listing**
2. Open [Dashboard → Favorites](http://localhost:3000/dashboard/favorites)
3. Confirm Riverside appears; toggle again to remove if desired

## 4. Inquiry (2–3 min)

1. On Riverside, click **Inquire about this listing**, send the form
2. Open [Dashboard → Inquiries](http://localhost:3000/dashboard/inquiries) → open the thread
3. Switch persona to Harbor Owner via Demo Center
4. Reply on the same inquiry URL — thread updates in the workspace bag

## 5. Sale offer → deal (3 min)

1. Switch back to Maya (Buyer)
2. On Riverside, submit the **Draft sale offer** panel (~$400,000)
3. Open [Dashboard → Offers](http://localhost:3000/dashboard/offers) → open the offer
4. As Owner, send a **counter**; as Buyer, **Accept current version**
5. Optional: check “Try non-current version” to show the acceptance guard failure
6. Land in [Dashboard → Deals](http://localhost:3000/dashboard/deals)

## 6. Documents (1–2 min)

1. From the deal page (or directly) open  
   [PFS download](http://localhost:3000/api/documents/doc_riverside_pfs/download)
2. File should download with “Demonstration Document” content when Maya has a grant
3. Mention NDA simulation: `POST /api/documents/nda` with `{ "listingId": "lst_nbh_s_1001" }`

## 7. Appointments (1 min)

1. Open [Dashboard → Appointments](http://localhost:3000/dashboard/appointments)
2. Confirm the seeded request or click **Request Riverside visit**
3. Confirm as owner persona

## 8. Isolation check (1 min)

1. Note workspace id shown in dashboard demo notes
2. Hit [Workspaces API](http://localhost:3000/api/demo/workspaces)
3. Explain: a second browser without the cookie gets a different bag after first API assign

## Close

- Simulated services: outbox [Demo outbox](http://localhost:3000/demo/outbox), no SMTP/payments
- Status honesty: [docs/implementation-status.md](./implementation-status.md)
- Credentials: [docs/demo-credentials.md](./demo-credentials.md)
