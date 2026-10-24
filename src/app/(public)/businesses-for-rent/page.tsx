import { Suspense } from "react";
import {
  KindSearchFallback,
  KindSearchPage,
} from "@/features/listings/components/kind-search-page";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Businesses for rent in Tennessee",
  description:
    "Explore fictional operating rental packages—laundromats, retail concepts, and more—across Tennessee.",
  path: "/businesses-for-rent",
});

const title = "Businesses for rent";
const description =
  "Operating rental packages with rent, term, security, and handback terms for demo walkthroughs.";

export default function BusinessesForRentPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <Suspense fallback={<KindSearchFallback title={title} description={description} />}>
      <KindSearchPage
        kind="business-rental"
        path="/businesses-for-rent"
        title={title}
        description={description}
        searchParams={searchParams}
      />
    </Suspense>
  );
}
