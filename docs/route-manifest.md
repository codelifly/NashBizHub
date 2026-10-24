# Public route manifest

Generated from `src/lib/seo/public-route-manifest.ts` plus known listing/broker/content patterns. Indexing is gated by `INDEXING_ENABLED` (default false in demo).

## Core public

| Path | Title | Indexable in production |
| --- | --- | --- |
| `/` | Home | yes |
| `/businesses-for-sale` | Businesses for sale | yes |
| `/businesses-for-rent` | Businesses for rent | yes |
| `/commercial-properties-for-lease` | Commercial properties for lease | yes |
| `/management-contracts` | Management contracts | yes |
| `/service-contracts` | Service contracts | yes |
| `/compare` | Compare | no |
| `/requirements` | Buyer requirements | yes |
| `/tennessee` | Tennessee hub | yes |
| `/industries` | Industries | yes |
| `/brokers` | Brokers | yes |
| `/sell-your-business` | Sell your business | yes |
| `/rent-out-your-business` | Rent out your business | yes |
| `/post-a-contract` | Post a contract | yes |
| `/how-it-works` | How it works | yes |
| `/resources` | Resources | yes |
| `/about` | About | yes |
| `/contact` | Contact | yes |
| `/help` | Help | yes |
| `/membership` | Membership | yes |
| `/sitemap` | Sitemap | yes |
| `/legal/privacy` | Privacy | yes |
| `/legal/terms` | Terms | yes |
| `/legal/cookies` | Cookies | yes |
| `/legal/accessibility` | Accessibility | yes |

## Dynamic public

- `/tennessee/[city]` — city hubs from `tennesseeCities`
- `/industries/[industry]` — industry hubs from `industries`
- `/how-it-works/[audience]` — buyers, sellers, operators, contractors, brokers
- `/listings/[slug]` — fixture listings (e.g. `/listings/riverside-cafe-nashville`)
- `/brokers/[slug]` — fixture brokers
- `/resources/[slug]` — content fixtures

## Auth

| Path | Notes |
| --- | --- |
| `/login` | Email/password + quick demo persona buttons |
| `/signup` | better-auth signup |
| `/forgot-password` | Simulated outbox reset |
| `/reset-password` | |
| `/verify-email` | |
| `/accept-invitation` | |

## Portal (authenticated / demo persona)

| Path | Notes |
| --- | --- |
| `/dashboard` | Role-oriented landing (shell) |
| `/dashboard/favorites` | Live memory data |
| `/dashboard/inquiries` | Live memory data |
| `/dashboard/inquiries/[id]` | Thread + reply |
| `/dashboard/offers` | Live memory data |
| `/dashboard/offers/[id]` | Accept/counter actions |
| `/dashboard/deals` | Live memory data |
| `/dashboard/deals/[id]` | Deal room |
| `/dashboard/appointments` | Request/confirm |
| `/dashboard/listings` … | Mostly shells |
| `/dashboard/applications` … | Shells |
| `/dashboard/messages` … | Shells |
| `/dashboard/agreements` … | Shells |
| `/dashboard/document-rooms/[dealId]` | Shell |

## Staff

| Path | Notes |
| --- | --- |
| `/admin` … | Shell pages for moderation, CRM, content, audit |

## Demo

| Path | Notes |
| --- | --- |
| `/demo` | Demo Center + persona switch |
| `/demo/outbox` | Simulated email outbox |
| `/demo/scenarios/[scenario]` | Guided scenario shells |

## Transaction APIs

| Path | Purpose |
| --- | --- |
| `/api/favorites` | Toggle / list |
| `/api/inquiries` | Create / list |
| `/api/inquiries/[id]/reply` | Reply |
| `/api/offers` | Draft/submit |
| `/api/offers/[id]` | Submit/counter/accept |
| `/api/deals` | List |
| `/api/appointments` | Request/confirm |
| `/api/documents/[id]/download` | Grant-checked download |
| `/api/documents/nda` | NDA simulation |
| `/api/documents/grants` | Request/grant |
| `/api/demo/persona` | Persona cookie (DEMO_MODE) |
| `/api/demo/workspaces` | Workspace listing |
| `/api/listings` | Public listing JSON |
| `/api/auth/[...all]` | better-auth |
