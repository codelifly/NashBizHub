import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { listArticles } from "@/server/repositories/sqlite/content";
import { StatusBadge } from "@/components/shared/status-badge";

export const metadata = buildPageMetadata({
  title: "Resources",
  description:
    "Educational articles for NashBizHub sandbox walkthroughs. Not legal, tax, or brokerage advice.",
  path: "/resources",
});

export default function ResourcesPage() {
  const articles = listArticles();

  return (
    <div className="mx-auto max-w-[80rem] space-y-8 px-4 py-10">
      <header className="space-y-3">
        <h1>Resources</h1>
        <p className="max-w-3xl text-[var(--text-body)]">
          Guides written for demonstration sessions. Treat every example as fictional framing for
          product training.
        </p>
      </header>
      <ul className="grid gap-4 md:grid-cols-2">
        {articles.map((article) => (
          <li key={article.id}>
            <Link
              href={`/resources/${article.slug}`}
              className="block h-full rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6 hover:border-[var(--brand-blue-accessible-light)]"
            >
              <StatusBadge label={article.audience} tone="info" />
              <h2 className="mt-3 text-xl">{article.title}</h2>
              <p className="mt-2 text-sm text-[var(--text-body)]">{article.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
