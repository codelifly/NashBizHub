import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { Button } from "@/components/ui/button";

export const metadata = buildPageMetadata({
  title: "Help",
  description: "Help topics for browsing and using the NashBizHub demonstration marketplace.",
  path: "/help",
});

const faqs = [
  {
    q: "Are these real businesses?",
    a: "No. Every listing, broker, figure, and transaction in this deployment is fictional demonstration data.",
  },
  {
    q: "Why do I need to log in to inquire?",
    a: "Public pages are for discovery. Inquiries, messages, and deals live in authenticated workspaces so demo sessions can show gated workflows.",
  },
  {
    q: "Can I publish a listing?",
    a: "Yes inside the sandbox. Start from Sell your business, Rent out your business, or Post a contract, then sign in to open the listing editor.",
  },
  {
    q: "How does compare work?",
    a: "Open a listing and choose Add to compare, or pass up to four listing ids with ?ids= on the compare page.",
  },
] as const;

export default function HelpPage() {
  return (
    <div className="mx-auto max-w-[80rem] space-y-8 px-4 py-10">
      <header className="max-w-3xl space-y-3">
        <h1>Help</h1>
        <p className="text-lg text-[var(--text-body)]">
          Quick answers for navigating the public marketplace and demo workspace.
        </p>
      </header>
      <ul className="max-w-3xl space-y-4">
        {faqs.map((item) => (
          <li
            key={item.q}
            className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-5"
          >
            <h2 className="text-lg">{item.q}</h2>
            <p className="mt-2 text-[var(--text-body)]">{item.a}</p>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/contact">Contact support</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/resources">Browse resources</Link>
        </Button>
      </div>
    </div>
  );
}
