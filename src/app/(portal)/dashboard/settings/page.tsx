"use client";

import { WorkspacePage } from "@/components/layout/workspace-page";
import { Panel } from "@/components/dashboard/ui";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <WorkspacePage
      title="Settings"
      purpose="Theme, contrast, notifications and workspace defaults for your customer panel."
      eyebrow="Account"
      actionHref="/dashboard/security"
      actionLabel="Security"
      secondaryHref="/dashboard/profile"
      secondaryLabel="Profile"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Appearance" description="Light, dark and high-contrast preferences.">
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-page)] px-4 py-3">
            <div>
              <p className="font-medium text-[var(--text-heading)]">Theme & contrast</p>
              <p className="text-sm text-[var(--text-body)]">
                Dark surfaces always use white text for readability.
              </p>
            </div>
            <ThemeToggle />
          </div>
        </Panel>

        <Panel title="Notifications" description="Demo digest preferences (local only).">
          <div className="space-y-3">
            {[
              "New inquiry replies",
              "Offer counters",
              "Appointment reminders",
              "Saved-search matches",
            ].map((label) => (
              <label
                key={label}
                className="flex items-center justify-between gap-3 rounded-xl border border-[var(--border-subtle)] px-4 py-3"
              >
                <span className="text-sm text-[var(--text-heading)]">{label}</span>
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-[var(--action-fill)]" />
              </label>
            ))}
          </div>
        </Panel>

        <Panel title="Workspace tools" description="Shortcuts into customer activity.">
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="secondary">
              <Link href="/dashboard/saved-searches">Saved searches</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/dashboard/notifications">Notifications</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/dashboard/billing">Membership</Link>
            </Button>
          </div>
        </Panel>

        <Panel dark title="Privacy reminder" description="Demo accounts and fictional inventory.">
          <p className="text-sm text-white/80">
            Do not upload real identity documents or payment cards. Simulated billing never charges a
            real card.
          </p>
          <Label className="mt-4 block text-white/70">
            Support: use Support in the sidebar for demo tickets.
          </Label>
        </Panel>
      </div>
    </WorkspacePage>
  );
}
