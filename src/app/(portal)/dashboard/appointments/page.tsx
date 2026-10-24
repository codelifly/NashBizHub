import { WorkspacePage } from "@/components/layout/workspace-page";
import { AppointmentActions } from "@/features/appointments/components/appointment-actions";
import { getDemoActor } from "@/server/demo/actor";
import { getOrCreateWorkspace } from "@/server/demo/workspace";
import { listAppointments } from "@/server/repositories/memory/appointments";
import { getListingById } from "@/server/repositories/sqlite/listings";

export default async function Page() {
  const { workspaceId } = await getOrCreateWorkspace();
  const actor = await getDemoActor();
  const appointments = listAppointments(workspaceId);

  return (
    <WorkspacePage
      title="Appointments"
      purpose="Site visits and video diligence calls (demo scheduling)."
      demoNote={`Workspace ${workspaceId} · persona ${actor.label}`}
      emptyTitle={appointments.length ? undefined : "No appointments scheduled"}
      emptyDescription={
        appointments.length
          ? undefined
          : "Propose a visit from an active inquiry or deal."
      }
      actionHref="/dashboard/inquiries"
      actionLabel="Open inquiries"
    >
      <div className="space-y-6">
        {appointments.length > 0 ? (
          <ul className="space-y-3">
            {appointments.map((appt) => {
              const listing = getListingById(appt.listingId);
              return (
                <li
                  key={appt.id}
                  className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-4"
                >
                  <p className="font-medium text-[var(--text-heading)]">
                    {listing?.title ?? appt.listingId} · {appt.type}
                  </p>
                  <p className="text-sm text-[var(--text-body)]">
                    {appt.status} · {new Date(appt.startsAtUtc).toLocaleString()}{" "}
                    ({appt.timeZone})
                  </p>
                  {appt.status === "requested" ? (
                    <div className="mt-3">
                      <AppointmentActions
                        mode="confirm"
                        appointmentId={appt.id}
                      />
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        ) : null}
        <AppointmentActions
          mode="request"
          listingId="lst_nbh_s_1001"
        />
      </div>
    </WorkspacePage>
  );
}
