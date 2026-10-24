import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { Button } from "@/components/ui/button";

const audienceContent = {
  buyers: {
    title: "How it works for buyers",
    summary:
      "Buyers explore Tennessee sale inventory, compare shortlists, and practice inquiries without real capital at risk.",
    steps: [
      "Filter businesses for sale by city and industry.",
      "Open a listing to review commercial disclosures and inclusions.",
      "Sign in to send an inquiry or request documents in the demo.",
      "Advance fictional offers and deal stages from your dashboard.",
    ],
    cta: { href: "/businesses-for-sale", label: "Browse businesses for sale" },
  },
  sellers: {
    title: "How it works for sellers",
    summary:
      "Sellers package a fictional sale listing, submit it for publication review, and respond to demo buyer interest.",
    steps: [
      "Draft title, summary, commercial fields, and media.",
      "Submit for demonstration publication review.",
      "Respond to inquiries and document requests.",
      "Move status through negotiation and completion for training scenarios.",
    ],
    cta: { href: "/sell-your-business", label: "Sell your business" },
  },
  operators: {
    title: "How it works for operators",
    summary:
      "Operators evaluate operating rentals, premises leases, and management proposals across Tennessee demo markets.",
    steps: [
      "Browse rentals, premises, or management contracts.",
      "Review rent, term, duties, and handback language.",
      "Compare packages side by side.",
      "Apply or inquire after signing into the workspace.",
    ],
    cta: { href: "/businesses-for-rent", label: "Browse businesses for rent" },
  },
  contractors: {
    title: "How it works for contractors",
    summary:
      "Contractors respond to fictional service tenders with eligibility checks, clarifications, and proposals.",
    steps: [
      "Open the service contracts catalog.",
      "Review deadline, deliverables, and eligibility.",
      "Use resources to draft a demo proposal.",
      "Submit through the authenticated contractor flow.",
    ],
    cta: { href: "/service-contracts", label: "Browse service contracts" },
  },
  brokers: {
    title: "How it works for brokers",
    summary:
      "Demo brokers are assigned to seed listings so advisers can practice inquiry routing and client communication.",
    steps: [
      "Review your public profile and specialties.",
      "Open assigned listings from the broker page.",
      "Sign in to manage inquiries in the adviser workspace.",
      "Coordinate fictional document and deal activity.",
    ],
    cta: { href: "/brokers", label: "Browse brokers" },
  },
} as const;

type Audience = keyof typeof audienceContent;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ audience: string }>;
}) {
  const { audience } = await params;
  const content = audienceContent[audience as Audience];
  if (!content) {
    return buildPageMetadata({
      title: "Audience not found",
      description: "Unknown how-it-works audience.",
      path: `/how-it-works/${audience}`,
      noIndex: true,
    });
  }
  return buildPageMetadata({
    title: content.title,
    description: content.summary,
    path: `/how-it-works/${audience}`,
  });
}

async function AudienceBody({
  params,
}: {
  params: Promise<{ audience: string }>;
}) {
  const { audience } = await params;
  const content = audienceContent[audience as Audience];
  if (!content) notFound();

  return (
    <>
      <p className="text-sm text-[var(--text-body)]">
        <Link href="/how-it-works" className="hover:text-[var(--brand-blue-accessible-light)]">
          How it works
        </Link>{" "}
        / {audience}
      </p>
      <header className="max-w-3xl space-y-3">
        <h1>{content.title}</h1>
        <p className="text-lg text-[var(--text-body)]">{content.summary}</p>
      </header>
      <ol className="max-w-2xl list-decimal space-y-3 pl-5 text-[var(--text-body)]">
        {content.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <Button asChild>
        <Link href={content.cta.href}>{content.cta.label}</Link>
      </Button>
    </>
  );
}

export default function HowItWorksAudiencePage({
  params,
}: {
  params: Promise<{ audience: string }>;
}) {
  return (
    <div className="mx-auto max-w-[80rem] space-y-8 px-4 py-10">
      <Suspense
        fallback={
          <div className="h-64 animate-pulse rounded-[var(--radius-card)] bg-[var(--surface-subtle)]" />
        }
      >
        <AudienceBody params={params} />
      </Suspense>
    </div>
  );
}
