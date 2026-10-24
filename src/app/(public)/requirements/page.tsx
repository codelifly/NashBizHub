import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { Button } from "@/components/ui/button";

export const metadata = buildPageMetadata({
  title: "Buyer requirements",
  description:
    "Publish fictional buyer requirements so sellers and advisers can practice matching in NashBizHub.",
  path: "/requirements",
});

export default function RequirementsPage() {
  return (
    <div className="mx-auto max-w-[80rem] space-y-8 px-4 py-10">
      <header className="max-w-3xl space-y-4">
        <h1>Buyer requirements</h1>
        <p className="text-lg text-[var(--text-body)]">
          Requirements let buyers describe target industries, cities, budget bands, and opportunity
          kinds. In the demonstration, advisers and sellers can practice matching inventory against
          those preferences.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/login?next=/dashboard/requirements">Create a requirement</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/businesses-for-sale">Browse inventory instead</Link>
          </Button>
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Define the fit",
            body: "Choose opportunity kinds, Tennessee cities, industries, and commercial preferences for the demo story you want to rehearse.",
          },
          {
            title: "Share with advisers",
            body: "Signed-in brokers can review assigned requirements alongside listing shortlists during training sessions.",
          },
          {
            title: "Stay fictional",
            body: "Do not include real personal financial details. Use illustrative budget ranges suitable for sandbox narratives.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-5"
          >
            <h2 className="text-xl">{item.title}</h2>
            <p className="mt-2 text-sm text-[var(--text-body)]">{item.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
