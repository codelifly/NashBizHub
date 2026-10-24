import { Suspense } from "react";
import { PortalShell } from "@/components/layout/portal-shell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[var(--surface-page)]" aria-busy="true" />
      }
    >
      <PortalShell>{children}</PortalShell>
    </Suspense>
  );
}
