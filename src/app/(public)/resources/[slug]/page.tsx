import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { StatusBadge } from "@/components/shared/status-badge";
import { MarkdownArticle } from "@/features/content/components/markdown-article";
import { getArticleBySlug, listArticles } from "@/server/repositories/sqlite/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) {
    return buildPageMetadata({
      title: "Resource not found",
      description: "Unknown resource article.",
      path: `/resources/${slug}`,
      noIndex: true,
    });
  }
  return buildPageMetadata({
    title: article.title,
    description: article.summary,
    path: `/resources/${article.slug}`,
  });
}

async function ResourceArticleBody({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const others = listArticles()
    .filter((item) => item.slug !== article.slug)
    .slice(0, 3);

  return (
    <>
      <article className="mx-auto max-w-3xl space-y-6">
        <p className="text-sm text-[var(--text-body)]">
          <Link href="/resources" className="hover:text-[var(--brand-blue-accessible-light)]">
            Resources
          </Link>{" "}
          / {article.title}
        </p>
        <StatusBadge label={`Audience: ${article.audience}`} tone="info" />
        <h1>{article.title}</h1>
        <p className="text-lg text-[var(--text-body)]">{article.summary}</p>
        <MarkdownArticle markdown={article.bodyMarkdown} />
      </article>

      {others.length > 0 ? (
        <aside className="mx-auto mt-14 max-w-3xl space-y-4 border-t border-[var(--border-subtle)] pt-8">
          <h2 className="text-xl">More resources</h2>
          <ul className="space-y-2">
            {others.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/resources/${item.slug}`}
                  className="text-[var(--brand-blue-accessible-light)] underline-offset-4 hover:underline"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      ) : null}
    </>
  );
}

export default function ResourceArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <div className="mx-auto max-w-[80rem] px-4 py-10">
      <Suspense
        fallback={
          <div className="mx-auto h-96 max-w-3xl animate-pulse rounded-[var(--radius-card)] bg-[var(--surface-subtle)]" />
        }
      >
        <ResourceArticleBody params={params} />
      </Suspense>
    </div>
  );
}
