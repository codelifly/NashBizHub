import {
  getWorkspaceBag,
  newId,
  nowIso,
  type AppointmentRecord,
} from "./store";

export function listAppointments(
  workspaceId: string,
  opts?: { userId?: string },
): AppointmentRecord[] {
  return getWorkspaceBag(workspaceId).appointments.filter((a) => {
    if (a.workspaceId !== workspaceId) return false;
    if (!opts?.userId) return true;
    return (
      a.organizerUserId === opts.userId ||
      a.participantUserId === opts.userId
    );
  });
}

export function requestAppointment(input: {
  workspaceId: string;
  listingId: string;
  organizerUserId: string;
  participantUserId: string;
  type: string;
  startsAtUtc: string;
  endsAtUtc: string;
  timeZone: string;
  locationOrLink?: string;
  notes?: string;
}): AppointmentRecord {
  const bag = getWorkspaceBag(input.workspaceId);
  const ts = nowIso();
  const record: AppointmentRecord = {
    id: newId("appt"),
    workspaceId: input.workspaceId,
    listingId: input.listingId,
    organizerUserId: input.organizerUserId,
    participantUserId: input.participantUserId,
    type: input.type,
    status: "requested",
    startsAtUtc: input.startsAtUtc,
    endsAtUtc: input.endsAtUtc,
    timeZone: input.timeZone,
    locationOrLink: input.locationOrLink ?? null,
    notes: input.notes ?? null,
    createdAt: ts,
    updatedAt: ts,
  };
  bag.appointments.push(record);
  return record;
}

export function confirmAppointment(
  workspaceId: string,
  appointmentId: string,
): AppointmentRecord {
  const bag = getWorkspaceBag(workspaceId);
  const appt = bag.appointments.find(
    (a) => a.id === appointmentId && a.workspaceId === workspaceId,
  );
  if (!appt) throw new Error("Appointment not found");
  if (appt.status !== "requested") {
    throw new Error(`Cannot confirm appointment in status ${appt.status}`);
  }
  appt.status = "confirmed";
  appt.updatedAt = nowIso();
  return appt;
}
