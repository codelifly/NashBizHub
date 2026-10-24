import { WorkspacePage } from "@/components/layout/workspace-page";
import { MaintenanceRequestForm } from "@/features/agreements/components/maintenance-request-form";
import { ReportPaymentButton } from "@/features/agreements/components/report-payment-button";
import { formatMoney } from "@/lib/money";
import { getDemoActor } from "@/server/demo/actor";
import { getOrCreateWorkspace } from "@/server/demo/workspace";
import {
  getAgreement,
  listMaintenanceRequests,
  listObligations,
} from "@/server/repositories/memory/agreements";
import { getListingById } from "@/server/repositories/sqlite/listings";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { workspaceId } = await getOrCreateWorkspace();
  const actor = await getDemoActor();
  const agreement = getAgreement(workspaceId, id);

  if (!agreement) {
    return (
      <WorkspacePage
        title={`Agreement ${id}`}
        purpose="Contract shell for continuing operations."
        emptyTitle="Not found"
        emptyDescription="Agreement missing from this workspace bag."
        actionHref="/dashboard/agreements"
        actionLabel="All agreements"
      />
    );
  }

  const listing = agreement.listingId
    ? getListingById(agreement.listingId)
    : null;
  const obligations = listObligations(workspaceId, {
    agreementId: agreement.id,
  });
  const maintenance = listMaintenanceRequests(workspaceId, {
    agreementId: agreement.id,
  });

  return (
    <WorkspacePage
      title={agreement.title}
      purpose={`${agreement.status}${listing ? ` · ${listing.title}` : ""}`}
      demoNote={`Workspace ${workspaceId} · persona ${actor.label}`}
      actionHref="/dashboard/agreements"
      actionLabel="All agreements"
    >
      <div className="space-y-8">
        <section className="space-y-2 text-sm">
          <p>
            Term: {agreement.startDate ?? "TBD"} → {agreement.endDate ?? "TBD"}
          </p>
          <p className="text-[var(--text-body)]">
            Responsibilities are demo stubs — not legal instruments.
          </p>
        </section>

        <section className="space-y-3" aria-labelledby="obl-heading">
          <h2 id="obl-heading" className="text-xl font-semibold">
            Obligations
          </h2>
          <ul className="space-y-3">
            {obligations.map((obl) => (
              <li
                key={obl.id}
                className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{obl.title}</p>
                    <p className="text-sm text-[var(--text-body)]">
                      {obl.kind} · {obl.status} · due{" "}
                      {new Date(obl.dueAt).toLocaleDateString("en-US")}
                      {obl.amountMinor != null
                        ? ` · ${formatMoney({
                            minorUnits: obl.amountMinor,
                            currency: "USD",
                          })}`
                        : ""}
                    </p>
                    <p className="text-xs text-[var(--text-body)]/80">
                      Payment verification: {obl.paymentVerification}
                    </p>
                  </div>
                  {obl.kind === "payment" &&
                  obl.status !== "reported" &&
                  obl.status !== "completed" ? (
                    <ReportPaymentButton obligationId={obl.id} />
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-3" aria-labelledby="mnt-heading">
          <h2 id="mnt-heading" className="text-xl font-semibold">
            Maintenance
          </h2>
          {maintenance.length > 0 ? (
            <ul className="space-y-2 text-sm">
              {maintenance.map((m) => (
                <li
                  key={m.id}
                  className="rounded-[var(--radius-control)] border border-[var(--border-subtle)] px-3 py-2"
                >
                  {m.assetLabel} · {m.urgency} · {m.status}
                  <span className="block text-[var(--text-body)]">
                    {m.description}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-[var(--text-body)]">
              No maintenance requests yet.
            </p>
          )}
          <MaintenanceRequestForm
            agreementId={agreement.id}
            listingId={agreement.listingId}
          />
        </section>
      </div>
    </WorkspacePage>
  );
}
