import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";

const documents = {
  privacy: {
    title: "Privacy (draft)",
    summary: "Draft privacy notice for the NashBizHub demonstration environment.",
    sections: [
      {
        heading: "What this covers",
        body: "This draft describes how the demo product may process account emails, workspace activity, and support messages. It is not a production legal policy.",
      },
      {
        heading: "Demo data",
        body: "Marketplace listings and broker profiles are fictional. Do not upload real personal data of third parties into the sandbox.",
      },
      {
        heading: "Contact",
        body: `Questions about this draft can be sent to ${siteConfig.supportEmail}.`,
      },
    ],
  },
  terms: {
    title: "Terms (draft)",
    summary: "Draft terms of use for accessing the NashBizHub interactive demonstration.",
    sections: [
      {
        heading: "Demonstration only",
        body: "NashBizHub content is fictional. Transactions, signatures, and billing adapters do not create real-world obligations.",
      },
      {
        heading: "Acceptable use",
        body: "Use the sandbox for product evaluation and training. Do not attempt to misuse accounts or treat demo inventory as live offerings.",
      },
      {
        heading: "Changes",
        body: "These draft terms may change as the product evolves. Continued use of the demo constitutes acknowledgement of the posted draft.",
      },
    ],
  },
  cookies: {
    title: "Cookies (draft)",
    summary: "Draft cookie notice for essential session and preference storage.",
    sections: [
      {
        heading: "Essential cookies",
        body: "Authentication and security cookies keep signed-in demo sessions working. Theme preference may be stored locally in the browser.",
      },
      {
        heading: "Analytics",
        body: "This draft environment does not enable third-party advertising cookies. Any future analytics would be disclosed here before activation.",
      },
    ],
  },
  accessibility: {
    title: "Accessibility (draft)",
    summary: "Draft accessibility statement for the NashBizHub public marketplace.",
    sections: [
      {
        heading: "Commitment",
        body: "We aim for clear structure, keyboard focus styles, skip links, and readable contrast using brand tokens. High-contrast mode is available via theme controls where enabled.",
      },
      {
        heading: "Feedback",
        body: `If you encounter a barrier in the demo UI, email ${siteConfig.supportEmail} with the page URL and a short description.`,
      },
    ],
  },
} as const;

type DocumentSlug = keyof typeof documents;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ document: string }>;
}) {
  const { document } = await params;
  const doc = documents[document as DocumentSlug];
  if (!doc) {
    return buildPageMetadata({
      title: "Legal document not found",
      description: "Unknown legal document.",
      path: `/legal/${document}`,
      noIndex: true,
    });
  }
  return buildPageMetadata({
    title: doc.title,
    description: doc.summary,
    path: `/legal/${document}`,
  });
}

async function LegalDocumentBody({
  params,
}: {
  params: Promise<{ document: string }>;
}) {
  const { document } = await params;
  const doc = documents[document as DocumentSlug];
  if (!doc) notFound();

  return (
    <article className="mx-auto max-w-3xl space-y-6">
      <p className="text-sm text-[var(--text-body)]">
        <Link href="/" className="hover:text-[var(--brand-blue-accessible-light)]">
          Home
        </Link>{" "}
        / Legal / {doc.title}
      </p>
      <h1>{doc.title}</h1>
      <p className="text-lg text-[var(--text-body)]">{doc.summary}</p>
      {doc.sections.map((section) => (
        <section key={section.heading} className="space-y-2">
          <h2 className="text-xl">{section.heading}</h2>
          <p className="text-[var(--text-body)]">{section.body}</p>
        </section>
      ))}
    </article>
  );
}

export default function LegalDocumentPage({
  params,
}: {
  params: Promise<{ document: string }>;
}) {
  return (
    <div className="mx-auto max-w-[80rem] px-4 py-10">
      <Suspense
        fallback={
          <div className="mx-auto h-64 max-w-3xl animate-pulse rounded-[var(--radius-card)] bg-[var(--surface-subtle)]" />
        }
      >
        <LegalDocumentBody params={params} />
      </Suspense>
    </div>
  );
}
