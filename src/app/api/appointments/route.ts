import { NextResponse } from "next/server";
import { z } from "zod";
import { getDemoActor } from "@/server/demo/actor";
import { assignWorkspaceCookieIfMissing } from "@/server/demo/workspace";
import {
  confirmAppointment,
  listAppointments,
  requestAppointment,
} from "@/server/repositories/memory/appointments";
import { getListingById } from "@/server/repositories/sqlite/listings";

export async function GET() {
  const { workspaceId } = await assignWorkspaceCookieIfMissing();
  const actor = await getDemoActor();
  const appointments = listAppointments(workspaceId).map((a) => ({
    ...a,
    listing: getListingById(a.listingId),
    mine:
      a.organizerUserId === actor.userId ||
      a.participantUserId === actor.userId,
  }));
  return NextResponse.json({ workspaceId, actor, appointments });
}

const bodySchema = z.discriminatedUnion("action", [
  z.object({
    action: z.literal("request"),
    listingId: z.string().min(1),
    participantUserId: z.string().min(1).optional(),
    type: z.string().min(1).default("site-visit"),
    startsAtUtc: z.string().min(1),
    endsAtUtc: z.string().min(1),
    timeZone: z.string().min(1).default("America/Chicago"),
    locationOrLink: z.string().optional(),
    notes: z.string().optional(),
  }),
  z.object({
    action: z.literal("confirm"),
    appointmentId: z.string().min(1),
  }),
]);

export async function POST(request: Request) {
  const { workspaceId } = await assignWorkspaceCookieIfMissing();
  const actor = await getDemoActor();
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.message }, { status: 400 });
  }

  try {
    if (parsed.data.action === "confirm") {
      const appointment = confirmAppointment(
        workspaceId,
        parsed.data.appointmentId,
      );
      return NextResponse.json({ workspaceId, appointment });
    }
    if (!getListingById(parsed.data.listingId)) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }
    const appointment = requestAppointment({
      workspaceId,
      listingId: parsed.data.listingId,
      organizerUserId: actor.userId,
      participantUserId:
        parsed.data.participantUserId ?? "user_harbor_owner",
      type: parsed.data.type,
      startsAtUtc: parsed.data.startsAtUtc,
      endsAtUtc: parsed.data.endsAtUtc,
      timeZone: parsed.data.timeZone,
      locationOrLink: parsed.data.locationOrLink,
      notes: parsed.data.notes,
    });
    return NextResponse.json({ workspaceId, appointment }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed" },
      { status: 400 },
    );
  }
}
