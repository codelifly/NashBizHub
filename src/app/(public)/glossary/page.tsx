import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { BackToHome } from "@/components/shared/back-to-home";

export const metadata = buildPageMetadata({
  title: `Glossary | ${siteConfig.name}`,
  description:
    "Plain-language definitions for opportunity types, verification badges and transaction terms used on NashBizHub.",
  path: "/glossary",
});

const terms = [
  {
    term: "Business for sale",
    definition:
      "Ownership of a business or specified assets. Primary actions are inquire and submit a purchase offer.",
  },
  {
    term: "Operating rental",
    definition:
      "Time-limited right to run an existing business and agreed assets while ownership stays with the owner.",
  },
  {
    term: "Premises lease",
    definition:
      "Commercial space without an assumed trading business, brand, staff or customer base.",
  },
  {
    term: "Management contract",
    definition:
      "Appointment to operate or manage an owner's business under defined duties and reporting.",
  },
  {
    term: "Service tender",
    definition:
      "Request for proposals to complete defined work — deliverables, milestones and evaluation criteria.",
  },
  {
    term: "Requirement",
    definition:
      "A buyer or operator's published need so owners can respond with matching opportunities.",
  },
  {
    term: "Confidential listing",
    definition:
      "Public page shows approximate location and limited identity; exact address stays restricted.",
  },
  {
    term: "Document room",
    definition:
      "Private workspace for approved participants after qualification and any confidentiality step.",
  },
  {
    term: "Verification badge",
    definition:
      "Demo label such as email verified or identity checked — never a guarantee of profitability.",
  },
  {
    term: "Under negotiation",
    definition:
      "Listing status showing active deal progress; new offers may be limited depending on policy.",
  },
  {
    term: "Handover",
    definition:
      "Recorded transfer of keys, inventory, condition evidence and contacts when an agreement starts or ends.",
  },
  {
    term: "Sponsored / Featured",
    definition:
      "Paid placement label. Sponsored results are visually distinct from ordinary search ranking.",
  },
] as const;

export default function GlossaryPage() {
  return (
    <div className="mx-auto max-w-[52rem] px-4 py-12 sm:py-16">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--brand-blue-accessible-light)]">
            Resources
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-google-sans)] text-4xl font-bold text-[var(--text-heading)]">
            Glossary
          </h1>
          <p className="mt-3 text-lg text-[var(--text-body)]">
            Short definitions aligned with the NashBizHub business proposal — fictional demo language
            only.
          </p>
        </div>
        <BackToHome />
      </div>

      <dl className="mt-10 space-y-6">
        {terms.map((item, index) => (
          <div
            key={item.term}
            className="rise-in rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-5"
            style={{ animationDelay: `${index * 30}ms` }}
          >
            <dt className="font-[family-name:var(--font-google-sans)] text-xl font-semibold text-[var(--text-heading)]">
              {item.term}
            </dt>
            <dd className="mt-2 text-[var(--text-body)]">{item.definition}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-10 flex flex-wrap gap-3">
        <Button asChild className="!text-white">
          <Link href="/resources">Guides & articles</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/help">Help center</Link>
        </Button>
        <BackToHome />
      </div>
    </div>
  );
}
