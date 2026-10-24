import { Suspense } from "react";
import { StaffShell } from "@/components/layout/staff-shell";

export default function AdminLayout({
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
      <StaffShell>{children}</StaffShell>
    </Suspense>
  );
}
