import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";

/**
 * Private demo outbox UI.
 * Messages are written by demoOutboxAdapter into SQLite — never sent via SMTP.
 */
export default function DemoOutboxPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="font-[family-name:var(--font-google-sans)] text-3xl font-bold text-[var(--text-heading)]">
          Demo outbox
        </h1>
        <p className="max-w-2xl text-[var(--text-body)]">
          NashBizHub demo mode captures verification, password reset, invitation, and notification
          emails in a private local outbox. Nothing is delivered to a real inbox.
        </p>
        <p className="text-sm text-[var(--color-warning)]" role="note">
          Simulated email only · EMAIL_ADAPTER=demo-outbox
        </p>
      </header>

      <EmptyState
        title="Outbox is quiet"
        description="Trigger verify-email, forgot-password, or marketplace notifications to populate rows in storage. After demo:seed, fixture messages may appear here when the reader is wired to the database."
        actionHref="/verify-email"
        actionLabel="Send verification (simulated)"
      />

      <div className="flex flex-wrap gap-3">
        <Button asChild variant="secondary">
          <Link href="/forgot-password">Simulate password reset</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/demo">Demo Center</Link>
        </Button>
      </div>
    </div>
  );
}
