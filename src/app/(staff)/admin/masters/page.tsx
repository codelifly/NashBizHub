import Link from "next/link";
import { WorkspacePage } from "@/components/layout/workspace-page";
import { Panel } from "@/components/dashboard/ui";
import { Button } from "@/components/ui/button";
import { tennesseeCities } from "@/config/tennessee-locations";
import { industries } from "@/config/industries";

export default function Page() {
  return (
    <WorkspacePage
      eyebrow="Moderation"
      title="Masters"
      purpose="Cities and industries used by listings. Archive or reassign — do not hard-delete live references."
      actionHref="/tennessee"
      actionLabel="Tennessee hub"
      secondaryHref="/industries"
      secondaryLabel="Industries"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title={`${tennesseeCities.length} cities`} description="Region and time-zone aware.">
          <ul className="max-h-96 space-y-2 overflow-y-auto">
            {tennesseeCities.map((city) => (
              <li
                key={city.slug}
                className="flex items-center justify-between gap-2 rounded-xl border border-[var(--border-subtle)] px-3 py-2"
              >
                <div>
                  <p className="font-semibold text-[var(--brand-blue-accessible-light)]">
                    {city.name}
                  </p>
                  <p className="text-xs text-[var(--text-body)]">
                    {city.region} · {city.timeZone}
                  </p>
                </div>
                <Button asChild size="sm" variant="ghost">
                  <Link href={`/tennessee/${city.slug}`}>Open</Link>
                </Button>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title={`${industries.length} industries`} description="Category masters for filters.">
          <ul className="max-h-96 space-y-2 overflow-y-auto">
            {industries.map((industry) => (
              <li
                key={industry.slug}
                className="flex items-center justify-between gap-2 rounded-xl border border-[var(--border-subtle)] px-3 py-2"
              >
                <div>
                  <p className="font-semibold text-[var(--text-heading)]">{industry.name}</p>
                  <p className="text-xs text-[var(--text-body)]">{industry.summary}</p>
                </div>
                <Button asChild size="sm" variant="ghost">
                  <Link href={`/industries/${industry.slug}`}>Open</Link>
                </Button>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </WorkspacePage>
  );
}
