import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";

export const metadata = buildPageMetadata({
  title: "About NashBizHub",
  description: siteConfig.description,
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[80rem] space-y-8 px-4 py-10">
      <header className="max-w-3xl space-y-4">
        <h1>About {siteConfig.name}</h1>
        <p className="text-lg text-[var(--text-body)]">{siteConfig.description}</p>
      </header>
      <div className="max-w-3xl space-y-4 text-[var(--text-body)]">
        <p>
          NashBizHub focuses on Tennessee business opportunities across five commercial shapes:
          businesses for sale, operating rentals, commercial premises leases, management contracts,
          and service tenders. The public marketplace is designed for discovery; authenticated
          workspaces handle inquiries, documents, and deal progression.
        </p>
        <p>
          This deployment runs as an interactive demonstration. Names, figures, square footage,
          deadlines, and broker contacts are invented for product walkthroughs and training. Nothing
          here is a live offering or professional advice.
        </p>
        <p>
          Questions about the demo experience can be sent through the contact page. For account help
          inside the sandbox, visit Help after you sign in.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/contact">Contact</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/how-it-works">How it works</Link>
        </Button>
      </div>
    </div>
  );
}
