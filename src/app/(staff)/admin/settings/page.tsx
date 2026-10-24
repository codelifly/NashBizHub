import Link from "next/link";
import { WorkspacePage } from "@/components/layout/workspace-page";
import { Panel } from "@/components/dashboard/ui";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <WorkspacePage
      eyebrow="System"
      title="Admin settings"
      purpose="Demo console options. Production must disable persona switching and reset routes."
      actionHref="/demo"
      actionLabel="Demo Center"
      secondaryHref="/admin/audit"
      secondaryLabel="Audit"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Environment" description="Current sandbox flags.">
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between gap-3 border-b border-[var(--border-subtle)] pb-2">
              <dt className="text-[var(--text-body)]">APP_ENV</dt>
              <dd className="font-semibold text-[var(--text-heading)]">demo</dd>
            </div>
            <div className="flex justify-between gap-3 border-b border-[var(--border-subtle)] pb-2">
              <dt className="text-[var(--text-body)]">DEMO_MODE</dt>
              <dd className="font-semibold text-[var(--brand-blue-accessible-light)]">true</dd>
            </div>
            <div className="flex justify-between gap-3 border-b border-[var(--border-subtle)] pb-2">
              <dt className="text-[var(--text-body)]">INDEXING_ENABLED</dt>
              <dd className="font-semibold text-[var(--text-heading)]">false</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-[var(--text-body)]">Adapters</dt>
              <dd className="font-semibold text-[var(--text-heading)]">email / signing / billing = demo</dd>
            </div>
          </dl>
        </Panel>
        <Panel dark title="Danger zone" description="Workspace reset is presenter-only.">
          <p className="text-sm !text-white/85">
            Use Demo Center to reset the current workspace. Never expose a global reset without
            confirmation.
          </p>
          <Button asChild className="mt-4 w-full !text-white">
            <Link href="/demo">Open Demo Center</Link>
          </Button>
        </Panel>
      </div>
    </WorkspacePage>
  );
}
