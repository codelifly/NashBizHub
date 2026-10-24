import Link from "next/link";
import { WorkspacePage } from "@/components/layout/workspace-page";
import { Panel } from "@/components/dashboard/ui";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { contentFixtures } from "@/server/db/seeds/content-fixtures";

export default function Page() {
  return (
    <WorkspacePage
      eyebrow="Moderation"
      title="Content"
      purpose="Draft, preview and publish resource articles and help content inside the demo."
      actionHref="/resources"
      actionLabel="Public resources"
      secondaryHref="/help"
      secondaryLabel="Help center"
    >
      <Panel title="Published articles" description="Tennessee-oriented preparation guides.">
        <ul className="divide-y divide-[var(--border-subtle)]">
          {contentFixtures.map((article) => (
            <li key={article.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
              <div className="min-w-0">
                <p className="font-semibold text-[var(--text-heading)]">{article.title}</p>
                <p className="line-clamp-1 text-sm text-[var(--text-body)]">{article.summary}</p>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge label={article.status} tone="success" />
                <Button asChild size="sm" variant="outline">
                  <Link href={`/resources/${article.slug}`}>View</Link>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    </WorkspacePage>
  );
}
