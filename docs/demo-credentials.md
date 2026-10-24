# Demo credentials

Fictional accounts for the NashBizHub interactive demo. These addresses use `.example` domains and are not real mailboxes.

**Documented shared password:** `DemoPass123!`

| Persona | Email | Roles |
| --- | --- | --- |
| Maya Chen (Buyer) | `maya.chen@example.com` | buyer |
| Harbor Foods Demo (Owner) | `owner@harborfoods.example` | owner, organization-manager |
| Daniel Brooks (Operator) | `daniel.brooks@example.com` | operator |
| Summit Business Partners Demo (Broker) | `broker@summitpartners.example` | broker |
| BrightCare Services Demo (Contractor) | `bids@brightcare.example` | contractor |
| Demo Administrator | `admin@nashbizhub.example` | administrator, moderator, adviser |

## How to sign in today

1. **Preferred (DEMO_MODE):** use Demo Center or Login “Quick demo login” buttons. They call `POST /api/demo/persona` and set `nbh_demo_persona` (and `nbh_workspace`). No password hash is required.
2. **New users:** `/signup` + `/login` via better-auth works for freshly created accounts (email verification is simulated to the demo outbox).
3. Seeded persona rows in SQLite **do not** include better-auth password hashes. Do not expect `DemoPass123!` email login until hashes are wired.

## Notes

- Run `npm run demo:setup` to migrate + seed SQLite and write private demo documents.
- Email delivery is simulated via the private demo outbox (`EMAIL_ADAPTER=demo-outbox`). No SMTP.
- Never use these passwords outside the local sandbox.
- No real payments are processed (`BILLING_ADAPTER=demo`).
