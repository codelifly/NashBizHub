export type SeedContentArticle = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  bodyMarkdown: string;
  status: "published";
  audience: string;
};

/**
 * Fictional resource articles for the NashBizHub demonstration library.
 * Content is educational framing for the sandbox and is not legal, tax, or brokerage advice.
 */
export const contentFixtures: SeedContentArticle[] = [
  {
    id: "art_preparing_listing",
    slug: "preparing-a-listing",
    title: "Preparing a listing that buyers can trust",
    summary:
      "Fictional guide for sellers and advisers on assembling a clear NashBizHub demonstration listing before publication review.",
    audience: "sellers",
    status: "published",
    bodyMarkdown: `## Why preparation matters

A complete listing is the difference between curious browsers and serious conversations. On NashBizHub, every opportunity—sale, operating rental, premises lease, management contract, or service tender—uses a shared publication pipeline. This fictional resource walks sellers and advisers through the sandbox workflow so demo sessions feel realistic without implying live brokerage advice.

## Clarify the opportunity kind first

Start by confirming which commercial shape you intend to publish. A café asset sale needs asking price, revenue, and earnings disclosures. A laundromat operating rental needs rent, term, security, and handback language. Premises leases emphasize square footage and use. Management proposals emphasize decision rights and reporting. Tenders emphasize deadlines and eligibility. Mixing fields across kinds confuses buyers and breaks card layouts in the demonstration UI.

Write a one-sentence kind statement before you open the editor: “This is a fictional Middle Tennessee café sale with inventory billed separately.” That sentence becomes your north star for summaries, inclusions, and exclusions.

## Draft the public narrative

The public title should name the concept and city without leaking confidential landlord or employee details. The summary is one or two sentences that mark the inventory as fictional where natural and state the primary commercial hook—asking band, rent, room count, or tender duration.

The long description should run roughly two to four short paragraphs covering neighborhood context, operating pattern, what transfers, and what stays with the owner. Avoid filler. Prefer concrete demo details: seating count, machine count, dayparts, delivery access, or service windows. Readers skim; structured paragraphs beat walls of text.

## Assemble commercial disclosures

Decide which figures are disclosed on day one and which remain behind an NDA gate. NashBizHub models money as minor units with an explicit USD currency, so enter whole dollars carefully and verify formatting on the preview card. If you need an undisclosed asking example for training, set the disclosure status intentionally rather than leaving a blank field.

List conditions buyers should expect: proof of funds, diligence windows, assignment consents, or inventory true-ups. For rentals and leases, spell out responsibilities and outgoings so applicants are not surprised mid-demo.

## Operations, media, and broker assignment

Populate the operations object with a handful of structured facts the detail page can surface—employee counts, hours, room totals, site counts. Upload or select placeholder imagery that matches the industry so the gallery does not look generic across every card. Assign a fictional broker slug so inquiry routing and adviser dashboards have a clear owner.

## Review checklist before submit

1. Kind-specific commercial block validates without missing required keys.
2. City and industry slugs match the approved Tennessee and industry catalogs.
3. Time zone matches the city region (Chicago for most Midstate and West Tennessee cities; New York for Knoxville, Chattanooga, and Johnson City).
4. Confidential flag is deliberate, not accidental.
5. Inclusions and exclusions do not contradict each other.
6. Published and expiry timestamps make sense for the scenario you are teaching.

## After publication

Monitor inquiries, document requests, and status changes. Move listings to under-negotiation or completed as the demo story advances so trainers can show lifecycle banners. Treat every figure as illustrative. When the session ends, reset the workspace rather than editing production-like notes into seed data.

Preparing a listing well is mostly discipline: pick a kind, tell a coherent fictional story, disclose money carefully, and verify the public preview before you hit submit.`,
  },
  {
    id: "art_purchase_vs_rental",
    slug: "comparing-purchase-vs-operating-rental",
    title: "Comparing purchase vs operating rental",
    summary:
      "Fictional comparison of buying a Tennessee business versus renting an operating package in the NashBizHub demo marketplace.",
    audience: "buyers",
    status: "published",
    bodyMarkdown: `## Two paths into operations

Buyers exploring NashBizHub often ask whether they should pursue a sale listing or an operating rental. Both are fictional demonstration paths in this product, but the commercial logic they illustrate differs in cash timing, control, and exit flexibility. This article frames a practical comparison for sandbox walkthroughs—not personal financial advice.

## What a sale listing typically transfers

A sale opportunity usually packages goodwill, equipment, and transferable contracts under an asking price. Revenue and stated owner-benefit figures help buyers size returns, while inventory may be included or billed separately at closing. Transition training periods, property position notes, and condition lists show how diligence might unfold.

Capital is front-loaded. In the demo, buyers practice proof-of-funds messages, NDA acknowledgements, offers, and deal stages. Control after close is comparatively high: the operator owns the going concern subject to lease assignment and any franchise or licensing caveats called out in exclusions.

## What an operating rental emphasizes

An operating rental lists monthly rent, term length, security arrangements, responsibilities, handback expectations, and included assets. Instead of buying the enterprise, the applicant operates someone else’s packaged business for a defined period. Machine counts, POS systems, and manuals often travel with the rental; real property ownership usually does not.

Cash commitment looks more like working capital plus deposits than a full enterprise purchase. Decision rights may be narrower. Handback clauses matter: equipment condition, maintenance logs, and key return procedures appear repeatedly in seed rentals so facilitators can coach applicants through risk review.

## Decision lenses for demos

Use these lenses when comparing shortlists in a training session:

- **Horizon.** Multi-year ownership stories fit sales; twelve- to thirty-six-month operating experiments fit rentals.
- **Balance sheet.** Sales absorb more upfront capital; rentals trade ownership for lower entry cost and recurring rent.
- **Upside.** Sales capture enterprise appreciation and owner benefit; rentals capture operating margin after rent.
- **Flexibility.** Rentals may exit at term end; sales require a later exit process.
- **Complexity.** Sales diligence is broader (books, tax, contracts); rentals focus on operating capability and care of assets.

## How to use NashBizHub tools side by side

Save both a sale and a rental to favorites, then open the compare drawer (up to the product limit). Align fields that actually translate: monthly owner benefit versus rent-adjusted cash flow, employee counts, city, and industry. Ignore superficial title similarities—two laundromats can be entirely different structures.

When ready, draft separate inquiries. Sale inquiries may emphasize financing readiness; rental inquiries should emphasize operating experience and hours coverage. Keep messages clearly marked as demonstration activity if you are facilitating a classroom or investor education day.

## Hybrid and adjacent options

Premises leases give space without a full business. Management contracts give operating authority without ownership. Service tenders sell delivery capability rather than a storefront. Buyers who feel stuck between purchase and rental sometimes discover that a lease-plus-management story or a tender portfolio matches their skills better. Explore those kinds in the same city filter to keep geography constant while structure changes.

## Closing reminder

Every number in the seed catalog is fictional. Use the comparison to rehearse questions, not to underwrite a live deal. When the exercise ends, note which structure felt clearer for your goals, then reset or continue into document-request practice on the path you chose.`,
  },
  {
    id: "art_buyer_checklist",
    slug: "buyer-document-checklist",
    title: "Buyer document checklist for diligence",
    summary:
      "Fictional checklist of documents buyers commonly request after a confidential inquiry on NashBizHub demonstration listings.",
    audience: "buyers",
    status: "published",
    bodyMarkdown: `## Purpose of this checklist

Serious buyers progress from public cards to private files. NashBizHub simulates NDA acknowledgements, document grants, and deal-room tasks so teams can practice order and etiquette. This fictional checklist organizes what to request after an inquiry is accepted—without claiming completeness for any real transaction.

## Before you request anything

Confirm identity and readiness in the inquiry form: experience, timeframe, and funding posture. Sign or acknowledge the demonstration NDA when prompted. Do not ask for sensitive files in the first public message; advisers use that pattern to teach gated disclosure.

Prepare a short request note that lists priorities rather than dumping every possible artifact. Sellers respond faster to focused asks.

## Core financial package (sales)

For sale listings, typical demo requests include:

1. Trailing twenty-four months of profit and loss statements.
2. Balance sheet snapshots and debt schedule summaries.
3. Sales tax or POS export samples (anonymized in the sandbox).
4. Owner add-back schedule supporting stated owner benefit.
5. Inventory methodology if inventory is excluded from asking price.

Cross-check figures against the public commercial block. Material gaps become diligence tasks on the deal board.

## Operations and legal adjacent files

Regardless of kind, buyers often request:

- Lease or premises abstract with assignment language.
- Equipment list with ages and maintenance notes.
- Employee count and role outline (no personal data in demos).
- Vendor concentration summary.
- Insurance certificate examples.
- Any franchise, brand, or software license transfer notes.

For liquor, fuel, or licensed categories, the sandbox highlights permission-transfer questions as discussion prompts—not as legal determinations.

## Kind-specific additions

**Operating rentals.** Security deposit terms, handback inspection forms, and included-asset schedules.

**Premises leases.** Floor plans, CAM estimates, and use restriction summaries.

**Management contracts.** Draft management agreement outline, reporting calendar, and fee schedule illustrations.

**Service tenders.** Full scope of work, site maps, scoring rubric, and clarification Q&A log.

## Sequencing requests

Wave one: financials and lease abstract. Wave two: equipment and staffing. Wave three: contracts and insurance. Spreading waves keeps the seller engaged and mirrors how real processes avoid overwhelming day-one uploads. In the demo, create due-diligence tasks that map to each wave so status chips tell a story on the deal page.

## Evidence and blocking tasks

Mark tasks that truly block an offer—missing lease consent language, for example—as blocking. Non-blocking items can trail after a soft offer in training scenarios. Attach evidence notes when a PDF is “reviewed” so auditors of the demo workspace see a trail.

## Red flags to discuss in training

- Revenue that cannot be tied to POS or bank samples.
- Inventory stories that change between summary and exclusions.
- Expired equipment warranties on mission-critical machines.
- Confidential listings with overly public location detail.
- Tender deadlines that pass while documents remain ungated.

## Wrap-up

Use this checklist as a teaching script. Tick items inside the private document UI, grant and revoke access, and expire grants to show lifecycle. Remember: every file label in seed data is a prop. The skill you are practicing is disciplined asking—not downloading secrets from a live marketplace.`,
  },
  {
    id: "art_confidential_inquiry",
    slug: "planning-confidential-inquiry",
    title: "Planning a confidential inquiry",
    summary:
      "Fictional playbook for approaching confidential NashBizHub listings without oversharing or under-preparing.",
    audience: "buyers",
    status: "published",
    bodyMarkdown: `## Confidential does not mean invisible

Confidential listings still appear in search results, but sensitive commercial or location details stay muted until advisers trust the inquiry. Planning your approach improves response rates in the NashBizHub sandbox and teaches respectful messaging habits.

## Read the public surface carefully

Note what is already visible: kind, industry, city, summary tone, and whether asking or rent is disclosed. Confidential flags often pair with undisclosed amounts or broader location labels. Do not demand the street address in your first message; ask for a structured next step instead.

Check status. Active confidential listings welcome inquiries. Under-negotiation may still accept backups. Completed listings are for historical demo only.

## Prepare your buyer profile offline

Before clicking inquire, write three bullets:

1. Relevant operating or ownership experience.
2. Capital readiness in plain language (demo ranges are fine).
3. Preferred close or start timeframe.

Those bullets paste cleanly into the inquiry form fields for experience, readiness, and timeframe. Incomplete forms train advisers to send change requests; complete forms move to conversation faster.

## Draft a message that earns trust

A strong confidential inquiry:

- States you understand the listing is fictional demonstration inventory when you are in a training context.
- Names the public code or slug so routing is unambiguous.
- Explains why the industry and city fit your plan.
- Offers to execute the demo NDA immediately.
- Asks one or two precise questions, not ten.

Avoid fishing for employee names, landlord identities, or exact revenue when the commercial block already labels figures undisclosed. Signal patience for gated documents.

## Consent and compliance in the demo

Marketing and data consents appear as structured JSON in the product model. Tick only what you mean. Facilitators should show how consent records appear on adviser CRM screens so buyers see that “just checking a box” leaves an audit event.

## After you send

Watch notifications for acknowledgement, NDA prompts, and document grant updates. If the listing is confidential, expect a slower reveal: conversation first, files second, viewing third. Attempting to skip steps by asking for phone numbers in-app is a teachable anti-pattern—use the scheduled appointment flow instead.

If you receive a changes-requested style response (rare on public listings but common on seller drafts), revise and resubmit rather than opening parallel inquiries on the same code.

Keep a personal log of what you asked and what remains gated. That log becomes the agenda for the first adviser call and prevents repeat questions that erode trust.

## Coordinating with your team

When more than one partner reviews confidential inventory, designate a single inquiry author so the seller sees one thread. Share favorites internally, but do not spawn duplicate inquiries on the same public code. In classroom demos, assign a buyer lead and a note-taker to mirror that discipline.

If your organization uses the buyer-requirements board, link the confidential shortlist to a requirement record so advisers understand budget bands without forcing an early price reveal from the seller.

## Facilitator tips

Run two inquiries side by side: one vague, one structured. Compare adviser handling time and buyer satisfaction in the retro. Highlight how confidential inventory protects storytelling while still letting marketing pages show density across Tennessee cities.

Pause the demo after the NDA step and ask participants what they still do not know. That discussion reinforces why gated disclosure exists and what a high-quality follow-up message looks like.

## Closing thought

Confidential inquiry planning is mostly empathy plus preparation. Respect the gate, prove readiness, and ask crisp questions. The sandbox rewards that behavior with cleaner conversations and richer document-room practice.`,
  },
  {
    id: "art_management_opportunity",
    slug: "evaluating-management-opportunity",
    title: "Evaluating a management opportunity",
    summary:
      "Fictional framework for assessing lodging and multi-site management contracts published in the NashBizHub demo catalog.",
    audience: "operators",
    status: "published",
    bodyMarkdown: `## Management is a different product

Management contracts are not sales and not rentals. Owners keep equity; operators supply systems, people, and reporting for a fee—often with incentives. NashBizHub seeds several lodging examples so operators can practice evaluation without negotiating a live hotel deal.

## Start with term and decision rights

Read proposed term months first. Twenty-four and thirty-six month proposals dominate the demo set. Then inspect decision rights: staffing autonomy, vendor selection thresholds, and rate bands. Rights that look generous on paper but require owner countersignature for every schedule change are weaker than they appear.

Ask how disputes escalate. The sandbox commercial model text is illustrative; use it to prompt owner-interview questions in role-play.

## Duties and reporting cadence

Duties should map to the asset: front desk coverage, housekeeping quality, maintenance coordination, guest escalation. Reporting should match owner sophistication—weekly flash for hands-on owners, monthly packages for quieter investors. If reporting demands exceed staffing, fee math will break.

Performance measures—occupancy, ADR, guest scores, payroll ratios—need baselines. In demos, invent a baseline conversation even when seed data omits trailing metrics so applicants practice asking.

## Commercial model scrutiny

Base-plus-incentive structures are common in the fixtures. Clarify:

- What revenue or GOP definition feeds the incentive.
- Whether fees are capped.
- Who funds capital projects.
- How termination for convenience works.

Operators should model a downside month where occupancy slips and still covers payroll plus fee expectations. Spreadsheet that scenario during training.

## Asset fit and personal capacity

Room count, brand posture (independent vs. fictional flag), and geography matter. An operator strong in Clarksville midscale may not want a sixty-room Memphis asset without local leadership. Review operations fields for FTE hints and on-site housing notes.

Travel load across multi-property proposals deserves an honest calendar test. Management opportunities fail in demos when applicants over-commit hours they do not have.

## Application packet outline

1. Operator resume and relevant property list (fictional or anonymized).
2. Ninety-day mobilization plan.
3. Sample weekly flash report.
4. Fee proposal aligned to the listing’s commercial model language.
5. References or case snippets appropriate for a sandbox.

Submit through the management application kind so status chips and versions behave correctly.

## Risk themes to workshop

- Owners who retain rate control but blame operators for ADR.
- Deferred maintenance excluded from fee discussions.
- Reporting overload without analyst support.
- Incentive cliffs that encourage short-term discounting.

Role-play an owner call using the Volunteer Lodge anchor or similar seed records, then rewrite the application after feedback.

## Comparing multiple management seeds

When several lodging proposals appear in your city filter, normalize them on rooms per FTE, term length, and incentive clarity rather than title polish. A forty-eight-room Music Row extended-stay ops proposal is not automatically “better” than a thirty-two-room Knoxville lodge; capacity and autonomy differ. Use favorites and compare to keep the evaluation visual during facilitator sessions.

Document open questions per listing in a shared note so the team does not lose context between demos.

## Remember the frame

All management listings here are fictional. Use them to sharpen questions, packets, and negotiation instincts. When you graduate to live opportunities outside the demo, replace every assumption with verified owner documents and counsel. Treat fee illustrations as conversation starters, never as market quotes.`,
  },
  {
    id: "art_service_proposal",
    slug: "preparing-service-proposal",
    title: "Preparing a service proposal for tenders",
    summary:
      "Fictional how-to for vendors responding to commercial cleaning and facility service tenders in the NashBizHub demonstration board.",
    audience: "vendors",
    status: "published",
    bodyMarkdown: `## Tenders reward process discipline

Service tenders on NashBizHub expire. Deadlines, eligibility gates, clarification windows, and milestones are first-class fields. Vendors who treat a tender like a casual inquiry lose fictitious awards in training scenarios—and learn why process matters.

## Calendar the deadline immediately

The moment you favorite a tender, place the deadline on a shared calendar with a forty-eight-hour internal buffer. Some seed tenders intentionally expire soon so UI banners and digests can be demonstrated. Missing the clock is the fastest way to fail a demo scoring rubric.

Note the listing time zone. East Tennessee cities use America/New_York; many others use America/Chicago. Submitting at “11:59 local” against the wrong zone is a classic facilitator trap.

## Confirm eligibility before writing prose

Eligibility arrays list insurance, experience, and crew requirements. If you cannot meet a gate, ask a clarification question early or decline. Writing a beautiful proposal that fails eligibility wastes everyone’s time in the sandbox and teaches the wrong lesson.

## Use the clarification process

Tenders document how questions are accepted—usually through the demo tender desk until a cutoff. Bundle questions: site access hours, consumable ownership, penalty clauses, and holiday coverage. Publish answers (in training) to all vendors so scoring stays fair.

## Structure the proposal

A clean demo proposal includes:

1. **Cover letter** naming the public code and affirming fictional/demo context when appropriate.
2. **Understanding of scope** restating deliverables in your words.
3. **Method** covering staffing, supervision, quality audits, and escalation.
4. **Mobilization plan** mapped to milestones (kickoff, 30-day review, mid-term KPI, renewal memo).
5. **Pricing** with clear assumptions—never a single unexplained lump sum if the scope has multiple sites.
6. **Compliance** certificates and background-check attestations as allowed in the demo upload rules.

Keep uploads within size and extension limits enforced by the product.

## Multi-site logistics

Programs like the Five Store Cleaning anchor imply travel time, key control, and supply staging. Show a weekly route map and contingency for call-outs. Issuers in role-play score realism higher than aspirational language.

## Quality and KPI storytelling

Milestones often include quality reviews. Propose measurable KPIs: inspection scores, response times, complaint rates. Tie incentives or credits to those KPIs if the tender commercial model allows discussion. Even when pricing is fixed, KPI clarity builds trust.

## Submission hygiene

- Submit before the buffer deadline.
- Confirm the application kind is service-tender.
- Version the payload if you revise after clarification answers.
- Watch notifications for award, decline, or negotiation status.

If the listing moves under-negotiation, be ready for a best-and-final round with the same document discipline.

## Ethics in the sandbox

Do not invent fake insurance numbers that look real. Use clearly labeled demonstration certificate filenames. The goal is workflow mastery, not spoofing credentials.

## Final pass

Read the deliverables list aloud against your method section. Every deliverable should have an owner and a cadence. When that alignment is tight, your fictional proposal is ready—and the tender board demo will feel as rigorous as a live procurement exercise without leaving the NashBizHub training environment.`,
  },
];
