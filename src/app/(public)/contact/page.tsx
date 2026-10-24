import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";

export const metadata = buildPageMetadata({
  title: "Contact",
  description: "Contact the NashBizHub demonstration team for product walkthrough questions.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[80rem] space-y-8 px-4 py-10">
      <header className="max-w-3xl space-y-3">
        <h1>Contact</h1>
        <p className="text-lg text-[var(--text-body)]">
          Reach the NashBizHub demo support inbox for product questions. Do not send personal
          financial documents—this environment is fictional.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6">
          <h2 className="text-xl">Email</h2>
          <p className="mt-2 text-[var(--text-body)]">
            <a
              href={`mailto:${siteConfig.supportEmail}`}
              className="font-medium text-[var(--brand-blue-accessible-light)] underline-offset-4 hover:underline"
            >
              {siteConfig.supportEmail}
            </a>
          </p>
          <p className="mt-3 text-sm text-[var(--text-body)]">
            Typical topics: demo access, walkthrough facilitation, and feedback on marketplace UI.
          </p>
        </div>
        <div className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6">
          <h2 className="text-xl">In-product support</h2>
          <p className="mt-2 text-[var(--text-body)]">
            Signed-in users can open a support thread from the dashboard when exercising sandbox
            workflows.
          </p>
          <Button asChild className="mt-4" variant="secondary">
            <Link href="/login?next=/dashboard/support">Go to support</Link>
          </Button>
        </div>
      </div>

      <Button asChild variant="outline">
        <Link href="/help">Visit help center</Link>
      </Button>
    </div>
  );
}
