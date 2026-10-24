export const demoScenarios = {
  "buyer-inquiry": {
    title: "Buyer inquiry",
    summary: "Browse a sale listing, send an inquiry, and watch the simulated email land in the outbox.",
    steps: [
      "Log in as Maya Chen (buyer).",
      "Open businesses for sale and pick Riverside Café (NBH-S-1001).",
      "Submit an inquiry from the listing detail flow.",
      "Confirm the owner notification in /demo/outbox.",
      "Reply from the owner persona to continue the thread.",
    ],
    startHref: "/login?returnUrl=/businesses-for-sale",
    startLabel: "Start as buyer",
  },
  "sale-offer": {
    title: "Sale offer",
    summary: "Move from shortlist to a simulated sale offer and deal workspace.",
    steps: [
      "Log in as Maya Chen.",
      "Open a favorite or inquiry for a sale listing.",
      "Draft an offer with contingencies (demo only).",
      "Switch to the owner persona to accept or counter.",
      "Open the resulting deal and document room shells.",
    ],
    startHref: "/login?returnUrl=/dashboard/offers",
    startLabel: "Open offers",
  },
  "rental-application": {
    title: "Rental application",
    summary: "Apply to operate a business rental with a fictional packet.",
    steps: [
      "Log in as Daniel Brooks (operator).",
      "Browse businesses for rent.",
      "Start an application and upload placeholder documents.",
      "Owner reviews the packet under Applications.",
      "Accepted applications can open a deal shell.",
    ],
    startHref: "/login?returnUrl=/businesses-for-rent",
    startLabel: "Browse rentals",
  },
  "tender-bid": {
    title: "Tender bid",
    summary: "Respond to a service tender deadline with a contractor bid.",
    steps: [
      "Log in as BrightCare Services (contractor).",
      "Open service contracts / tender listings.",
      "Submit a bid before the demo deadline.",
      "Issuer reviews offers under Offers.",
      "Awarding a bid creates a continuing agreement stub.",
    ],
    startHref: "/login?returnUrl=/service-contracts",
    startLabel: "View tenders",
  },
  "admin-moderation": {
    title: "Admin moderation",
    summary: "Review a submitted listing and request changes or approve.",
    steps: [
      "Log in as Demo Administrator.",
      "Open /admin/listings moderation queue.",
      "Inspect commercial disclosures and confidential flags.",
      "Request changes or approve (simulated).",
      "Confirm the audit trail entry under /admin/audit.",
    ],
    startHref: "/login?returnUrl=/admin/listings",
    startLabel: "Open moderation",
  },
} as const;

export type DemoScenarioSlug = keyof typeof demoScenarios;
