import Link from "next/link";
import { WorkspacePage } from "@/components/layout/workspace-page";
import { ReportPaymentButton } from "@/features/agreements/components/report-payment-button";
import { formatMoney } from "@/lib/money";
import { getDemoActor } from "@/server/demo/actor";
import { getOrCreateWorkspace } from "@/server/demo/workspace";
import {
  getAgreement,
  listObligations,
} from "@/server/repositories/memory/agreements";

export default async function Page() {
  const { workspaceId } = await getOrCreateWorkspace();
  const actor = await getDemoActor();
  const obligations = listObligations(workspaceId);

  return (
    <WorkspacePage
      title="Obligations"
      purpose="Post-close tasks, reporting, and payment schedules (demo only)."
      demoNote={`Workspace ${workspaceId} · persona ${actor.label}`}
      emptyTitle={obligations.length ? undefined : "Nothing due"}
      emptyDescription={
        obligations.length
          ? undefined
          : "Obligations appear after agreements are signed in the sandbox."
      }
      actionHref="/dashboard/agreements"
      actionLabel="Agreements"
    >
      {obligations.length > 0 ? (
        <ul className="space-y-3">
          {obligations.map((obl) => {
            const agreement = getAgreement(workspaceId, obl.agreementId);
            return (
              <li
                key={obl.id}
                className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-[var(--text-heading)]">
                      {obl.title}
                    </p>
                    <p className="text-sm text-[var(--text-body)]">
                      {obl.kind} · {obl.status} ·{" "}
                      {obl.amountMinor != null
                        ? formatMoney({
                            minorUnits: obl.amountMinor,
                            currency: "USD",
                          })
                        : "No amount"}{" "}
                      · verify: {obl.paymentVerification}
                    </p>
                    {agreement ? (
                      <Link
                        href={`/dashboard/agreements/${agreement.id}`}
                        className="text-sm text-[var(--brand-blue-accessible-light)] underline-offset-4 hover:underline"
                      >
                        {agreement.title}
                      </Link>
                    ) : null}
                  </div>
                  {obl.kind === "payment" &&
                  obl.status !== "reported" &&
                  obl.status !== "completed" ? (
                    <ReportPaymentButton obligationId={obl.id} />
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      ) : null}
    </WorkspacePage>
  );
}
