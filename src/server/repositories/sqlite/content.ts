import {
  contentFixtures,
  type SeedContentArticle,
} from "@/server/db/seeds/content-fixtures";

export type PublicArticle = SeedContentArticle;

export function listArticles(): PublicArticle[] {
  return contentFixtures.filter((article) => article.status === "published");
}

export function getArticleBySlug(slug: string): PublicArticle | null {
  return listArticles().find((article) => article.slug === slug) ?? null;
}
