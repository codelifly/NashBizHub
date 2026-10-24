"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OPPORTUNITY_KINDS, type OpportunityKind } from "@/lib/constants";
import { kindLabels } from "@/features/listings/lib/kind-labels";
import { dollarsToMinor } from "@/lib/money";

const STEPS = ["type", "basics", "commercial", "review"] as const;
type Step = (typeof STEPS)[number];

const KIND_BLURBS: Record<OpportunityKind, string> = {
  sale: "Ownership of a business or specified assets — inquiry or purchase offer.",
  "business-rental":
    "Time-limited operation of a business and included assets — apply to rent.",
  "premises-lease":
    "Commercial property without assumed business transfer — viewing or lease application.",
  "management-contract":
    "Appointment to operate an owner's business — submit an operator proposal.",
  "service-tender":
    "Defined scope of work for a supplier — submit a bid or quotation.",
};

const KIND_ACTIONS: Record<OpportunityKind, string> = {
  sale: "Primary action: offer",
  "business-rental": "Primary action: apply",
  "premises-lease": "Primary action: viewing",
  "management-contract": "Primary action: proposal",
  "service-tender": "Primary action: bid",
};

const CITIES = [
  { slug: "nashville", label: "Nashville" },
  { slug: "clarksville", label: "Clarksville" },
  { slug: "chattanooga", label: "Chattanooga" },
  { slug: "knoxville", label: "Knoxville" },
  { slug: "memphis", label: "Memphis" },
] as const;

const INDUSTRIES = [
  { slug: "restaurants-cafes", label: "Restaurants & cafés" },
  { slug: "laundromats", label: "Laundromats" },
  { slug: "commercial-cleaning", label: "Commercial cleaning" },
  { slug: "retail", label: "Retail" },
  { slug: "automotive-services", label: "Automotive services" },
  { slug: "gas-stations", label: "Gas stations" },
  { slug: "hotels-motels", label: "Hotels & motels" },
  { slug: "professional-services", label: "Professional services" },
  { slug: "manufacturing", label: "Manufacturing" },
  { slug: "ecommerce", label: "Online / ecommerce" },
] as const;

type WizardState = {
  draftId: string | null;
  kind: OpportunityKind;
  title: string;
  summary: string;
  description: string;
  citySlug: string;
  industrySlug: string;
  locationLabel: string;
  confidential: boolean;
  // sale
  askingDollars: string;
  // rental
  rentDollars: string;
  termMonths: string;
  securityArrangement: string;
  // premises
  baseRentDollars: string;
  areaSqFt: string;
  propertyUse: string;
  // management
  proposedTermMonths: string;
  commercialModel: string;
  // tender
  deadlineAt: string;
  durationMonths: string;
  deliverables: string;
};

const initialState: WizardState = {
  draftId: null,
  kind: "sale",
  title: "",
  summary: "",
  description: "",
  citySlug: "nashville",
  industrySlug: "restaurants-cafes",
  locationLabel: "Middle Tennessee (demo)",
  confidential: false,
  askingDollars: "250000",
  rentDollars: "4500",
  termMonths: "24",
  securityArrangement: "Two months security deposit (demo)",
  baseRentDollars: "3200",
  areaSqFt: "1800",
  propertyUse: "Retail / light commercial",
  proposedTermMonths: "12",
  commercialModel: "Fixed fee plus performance bonus (demo)",
  deadlineAt: "2026-12-01",
  durationMonths: "12",
  deliverables: "Monthly service report; SLA compliance",
};

function buildCommercial(state: WizardState): Record<string, unknown> {
  switch (state.kind) {
    case "sale":
      return {
        kind: "sale",
        asking: {
          status: "disclosed",
          value: {
            minorUnits: dollarsToMinor(Number(state.askingDollars) || 0),
            currency: "USD",
          },
        },
        revenue: { status: "undisclosed" },
        earnings: { status: "undisclosed" },
        inventoryIncluded: true,
        propertyPosition: "Leased premises — demo disclosure",
        transitionTraining: "Two weeks owner transition (demo)",
        conditions: ["Subject to diligence", "Demo only — nonbinding"],
      };
    case "business-rental":
      return {
        kind: "business-rental",
        rent: {
          status: "disclosed",
          value: {
            minorUnits: dollarsToMinor(Number(state.rentDollars) || 0),
            currency: "USD",
            period: "month",
          },
        },
        termMonths: Number(state.termMonths) || 12,
        securityArrangement: state.securityArrangement,
        responsibilities: ["Day-to-day operations", "Routine maintenance"],
        handbackExpectations: "Return equipment in working order (demo)",
        includedAssets: ["Operating equipment as listed"],
      };
    case "premises-lease":
      return {
        kind: "premises-lease",
        baseRent: {
          status: "disclosed",
          value: {
            minorUnits: dollarsToMinor(Number(state.baseRentDollars) || 0),
            currency: "USD",
            period: "month",
          },
        },
        areaSqFt: Number(state.areaSqFt) || 0,
        propertyUse: state.propertyUse,
        fitOut: "As-is shell with demo fixtures",
        outgoings: "NNN-style demo estimate",
        viewingNotes: "Schedule via appointments demo flow",
      };
    case "management-contract":
      return {
        kind: "management-contract",
        proposedTermMonths: Number(state.proposedTermMonths) || 12,
        decisionRights: ["Staffing within budget", "Vendor selection"],
        duties: ["Operations oversight", "Monthly reporting"],
        reporting: ["P&L summary", "KPI dashboard"],
        performanceMeasures: ["Revenue vs plan", "Guest satisfaction"],
        commercialModel: state.commercialModel,
      };
    case "service-tender":
      return {
        kind: "service-tender",
        deadlineAt: new Date(`${state.deadlineAt}T17:00:00.000Z`).toISOString(),
        durationMonths: Number(state.durationMonths) || 12,
        deliverables: state.deliverables
          .split(";")
          .map((s) => s.trim())
          .filter(Boolean),
        eligibility: ["Tennessee licensed operator (demo)", "Insurance on file"],
        clarificationProcess: "Email clarifications via inquiry thread",
        milestones: ["Kickoff", "Mid-term review", "Closeout"],
      };
  }
}

export function ListingWizard() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [state, setState] = useState<WizardState>(initialState);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedNote, setSavedNote] = useState<string | null>(null);

  const step = STEPS[stepIndex]!;
  const cityLabel = useMemo(
    () => CITIES.find((c) => c.slug === state.citySlug)?.label ?? state.citySlug,
    [state.citySlug],
  );

  function patch(partial: Partial<WizardState>) {
    setState((prev) => ({ ...prev, ...partial }));
  }

  async function persist(submit: boolean) {
    setPending(true);
    setError(null);
    setSavedNote(null);
    try {
      const res = await fetch("/api/listing-drafts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: state.draftId ?? undefined,
          kind: state.kind,
          title: state.title,
          summary: state.summary,
          description: state.description,
          citySlug: state.citySlug,
          industrySlug: state.industrySlug,
          locationLabel: state.locationLabel || `${cityLabel}, TN (demo)`,
          confidential: state.confidential,
          commercial: buildCommercial(state),
          operations: { demoWizard: true },
          inclusions: ["Demo inclusions placeholder"],
          exclusions: ["Real-world legal advice"],
          submit,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unable to save draft");
      patch({ draftId: data.draft.id });
      if (submit) {
        setSavedNote("Submitted for moderation.");
        router.push("/dashboard/listings");
        router.refresh();
      } else {
        setSavedNote(`Draft saved (${data.draft.status}).`);
      }
      return data.draft as { id: string };
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save draft");
      return null;
    } finally {
      setPending(false);
    }
  }

  async function onNext() {
    if (step === "type" || step === "basics" || step === "commercial") {
      const draft = await persist(false);
      if (!draft) return;
      setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
      return;
    }
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    await persist(true);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <ol className="flex flex-wrap gap-2 text-sm" aria-label="Wizard steps">
        {STEPS.map((s, i) => {
          const active = i === stepIndex;
          const done = i < stepIndex;
          return (
            <li key={s}>
              <button
                type="button"
                onClick={() => {
                  if (i <= stepIndex) setStepIndex(i);
                }}
                className={`inline-flex min-h-9 items-center rounded-[var(--radius-control)] px-3.5 py-1.5 text-sm font-semibold transition ${
                  active
                    ? "bg-[var(--action-fill)] !text-white shadow-sm"
                    : done
                      ? "bg-[var(--surface-subtle)] text-[var(--text-heading)] ring-1 ring-[var(--brand-blue-accessible-light)]/30"
                      : "border border-[var(--border-subtle)] bg-[var(--surface-card)] text-[var(--text-body)]"
                }`}
                aria-current={active ? "step" : undefined}
              >
                {i + 1}. {s}
              </button>
            </li>
          );
        })}
      </ol>

      {step === "type" ? (
        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold text-[var(--text-heading)]">
            Opportunity type
          </legend>
          <p className="text-sm text-[var(--text-body)]">
            Choose the commercial subject first so the rest of the form, search
            filters, and agreement path stay distinct (proposal §2).
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {OPPORTUNITY_KINDS.map((kind) => {
              const selected = state.kind === kind;
              return (
                <button
                  key={kind}
                  type="button"
                  onClick={() => patch({ kind })}
                  aria-pressed={selected}
                  className={`rounded-[var(--radius-card)] border p-4 text-left transition ${
                    selected
                      ? "border-[var(--action-fill)] bg-[var(--action-fill)] !text-white shadow-[0_12px_28px_-18px_rgba(30,110,244,0.7)]"
                      : "border-[var(--border-subtle)] bg-[var(--surface-card)] text-[var(--text-heading)] hover:border-[var(--brand-blue-accessible-light)]"
                  }`}
                >
                  <span
                    className={`block font-[family-name:var(--font-google-sans)] text-base font-semibold ${
                      selected ? "!text-white" : "text-[var(--text-heading)]"
                    }`}
                  >
                    {kindLabels[kind]}
                  </span>
                  <span
                    className={`mt-1.5 block text-sm leading-relaxed ${
                      selected ? "!text-white/85" : "text-[var(--text-body)]"
                    }`}
                  >
                    {KIND_BLURBS[kind]}
                  </span>
                  <span
                    className={`mt-3 inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      selected
                        ? "bg-white/18 !text-white"
                        : "bg-[var(--surface-subtle)] text-[var(--brand-blue-accessible-light)]"
                    }`}
                  >
                    {KIND_ACTIONS[kind]}
                  </span>
                </button>
              );
            })}
          </div>
          <ul className="space-y-1.5 rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-subtle)] px-4 py-3 text-sm text-[var(--text-body)]">
            <li>
              · Linked sale + rental alternatives stay under one business record —
              not duplicate unrelated listings.
            </li>
            <li>
              · Management appointments and service tenders share messaging but
              use separate applications and award records.
            </li>
            <li>
              · Publication needs moderation approval; paid placement never
              bypasses review.
            </li>
          </ul>
        </fieldset>
      ) : null}

      {step === "basics" ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1 sm:col-span-2">
            <Label htmlFor="wiz-title">Title</Label>
            <Input
              id="wiz-title"
              required
              minLength={3}
              value={state.title}
              onChange={(e) => patch({ title: e.target.value })}
              placeholder="e.g. East Nashville Demo Café"
            />
          </div>
          <div className="space-y-1 sm:col-span-2">
            <Label htmlFor="wiz-summary">Summary</Label>
            <textarea
              id="wiz-summary"
              required
              minLength={10}
              rows={2}
              value={state.summary}
              onChange={(e) => patch({ summary: e.target.value })}
              className="w-full rounded-[var(--radius-control)] border border-[var(--border-subtle)] bg-[var(--surface-card)] px-3 py-2 text-sm"
            />
          </div>
          <div className="space-y-1 sm:col-span-2">
            <Label htmlFor="wiz-description">Description</Label>
            <textarea
              id="wiz-description"
              required
              minLength={20}
              rows={5}
              value={state.description}
              onChange={(e) => patch({ description: e.target.value })}
              className="w-full rounded-[var(--radius-control)] border border-[var(--border-subtle)] bg-[var(--surface-card)] px-3 py-2 text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="wiz-city">City</Label>
            <select
              id="wiz-city"
              value={state.citySlug}
              onChange={(e) => patch({ citySlug: e.target.value })}
              className="w-full rounded-[var(--radius-control)] border border-[var(--border-subtle)] bg-[var(--surface-card)] px-3 py-2 text-sm"
            >
              {CITIES.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <Label htmlFor="wiz-industry">Industry</Label>
            <select
              id="wiz-industry"
              value={state.industrySlug}
              onChange={(e) => patch({ industrySlug: e.target.value })}
              className="w-full rounded-[var(--radius-control)] border border-[var(--border-subtle)] bg-[var(--surface-card)] px-3 py-2 text-sm"
            >
              {INDUSTRIES.map((i) => (
                <option key={i.slug} value={i.slug}>
                  {i.label}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1 sm:col-span-2">
            <Label htmlFor="wiz-location">Location label</Label>
            <Input
              id="wiz-location"
              value={state.locationLabel}
              onChange={(e) => patch({ locationLabel: e.target.value })}
            />
          </div>
          <label className="flex items-center gap-2 text-sm sm:col-span-2">
            <input
              type="checkbox"
              checked={state.confidential}
              onChange={(e) => patch({ confidential: e.target.checked })}
            />
            Mark financials as confidential (demo flag)
          </label>
        </div>
      ) : null}

      {step === "commercial" ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {state.kind === "sale" ? (
            <div className="space-y-1">
              <Label htmlFor="wiz-asking">Asking price (USD)</Label>
              <Input
                id="wiz-asking"
                type="number"
                min={1}
                value={state.askingDollars}
                onChange={(e) => patch({ askingDollars: e.target.value })}
              />
            </div>
          ) : null}
          {state.kind === "business-rental" ? (
            <>
              <div className="space-y-1">
                <Label htmlFor="wiz-rent">Monthly rent (USD)</Label>
                <Input
                  id="wiz-rent"
                  type="number"
                  min={1}
                  value={state.rentDollars}
                  onChange={(e) => patch({ rentDollars: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="wiz-term">Term (months)</Label>
                <Input
                  id="wiz-term"
                  type="number"
                  min={1}
                  value={state.termMonths}
                  onChange={(e) => patch({ termMonths: e.target.value })}
                />
              </div>
              <div className="space-y-1 sm:col-span-2">
                <Label htmlFor="wiz-security">Security arrangement</Label>
                <Input
                  id="wiz-security"
                  value={state.securityArrangement}
                  onChange={(e) =>
                    patch({ securityArrangement: e.target.value })
                  }
                />
              </div>
            </>
          ) : null}
          {state.kind === "premises-lease" ? (
            <>
              <div className="space-y-1">
                <Label htmlFor="wiz-base">Base rent / month (USD)</Label>
                <Input
                  id="wiz-base"
                  type="number"
                  value={state.baseRentDollars}
                  onChange={(e) => patch({ baseRentDollars: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="wiz-sqft">Area (sq ft)</Label>
                <Input
                  id="wiz-sqft"
                  type="number"
                  value={state.areaSqFt}
                  onChange={(e) => patch({ areaSqFt: e.target.value })}
                />
              </div>
              <div className="space-y-1 sm:col-span-2">
                <Label htmlFor="wiz-use">Property use</Label>
                <Input
                  id="wiz-use"
                  value={state.propertyUse}
                  onChange={(e) => patch({ propertyUse: e.target.value })}
                />
              </div>
            </>
          ) : null}
          {state.kind === "management-contract" ? (
            <>
              <div className="space-y-1">
                <Label htmlFor="wiz-mterm">Proposed term (months)</Label>
                <Input
                  id="wiz-mterm"
                  type="number"
                  value={state.proposedTermMonths}
                  onChange={(e) =>
                    patch({ proposedTermMonths: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1 sm:col-span-2">
                <Label htmlFor="wiz-model">Commercial model</Label>
                <Input
                  id="wiz-model"
                  value={state.commercialModel}
                  onChange={(e) => patch({ commercialModel: e.target.value })}
                />
              </div>
            </>
          ) : null}
          {state.kind === "service-tender" ? (
            <>
              <div className="space-y-1">
                <Label htmlFor="wiz-deadline">Bid deadline</Label>
                <Input
                  id="wiz-deadline"
                  type="date"
                  value={state.deadlineAt}
                  onChange={(e) => patch({ deadlineAt: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="wiz-duration">Duration (months)</Label>
                <Input
                  id="wiz-duration"
                  type="number"
                  value={state.durationMonths}
                  onChange={(e) => patch({ durationMonths: e.target.value })}
                />
              </div>
              <div className="space-y-1 sm:col-span-2">
                <Label htmlFor="wiz-deliv">Deliverables (semicolon-separated)</Label>
                <Input
                  id="wiz-deliv"
                  value={state.deliverables}
                  onChange={(e) => patch({ deliverables: e.target.value })}
                />
              </div>
            </>
          ) : null}
        </div>
      ) : null}

      {step === "review" ? (
        <div className="space-y-4 rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-5 text-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand-blue-accessible-light)]">
              Public preview (demo)
            </p>
            <h3 className="mt-1 font-[family-name:var(--font-google-sans)] text-xl font-semibold text-[var(--text-heading)]">
              {state.title || "Untitled opportunity"}
            </h3>
          </div>
          <dl className="grid gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-[var(--text-body)]">
                Type
              </dt>
              <dd className="mt-0.5 font-medium text-[var(--text-heading)]">
                {kindLabels[state.kind]}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-[var(--text-body)]">
                Location
              </dt>
              <dd className="mt-0.5 font-medium text-[var(--text-heading)]">
                {state.locationLabel} · {cityLabel}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs font-semibold uppercase tracking-wide text-[var(--text-body)]">
                Summary
              </dt>
              <dd className="mt-0.5 text-[var(--text-heading)]">
                {state.summary || "—"}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-[var(--text-body)]">
                Confidentiality
              </dt>
              <dd className="mt-0.5 font-medium text-[var(--text-heading)]">
                {state.confidential ? "Financials marked confidential" : "Standard disclosure"}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-[var(--text-body)]">
                Primary action
              </dt>
              <dd className="mt-0.5 font-medium text-[var(--text-heading)]">
                {KIND_ACTIONS[state.kind]}
              </dd>
            </div>
          </dl>
          <div className="rounded-[var(--radius-control)] bg-[var(--surface-subtle)] px-4 py-3">
            <p className="font-semibold text-[var(--text-heading)]">
              Publication pipeline
            </p>
            <p className="mt-1 text-[var(--text-body)]">
              Draft → Submitted → Under review → Changes / Reject / Approve →
              Active, Paused, Under negotiation, Completed, Expired, Withdrawn or
              Suspended. Paid placement never bypasses moderation.
            </p>
          </div>
          <p className="text-[var(--text-body)]">
            Submit creates a <code>submitted</code> revision in the workspace
            memory bag. Admins review it at{" "}
            <code>/admin/listings</code>. Nothing is published to the public
            fixture catalogue until approved (memory-only active draft).
          </p>
        </div>
      ) : null}

      {error ? (
        <p className="text-sm text-[var(--color-error)]" role="alert">
          {error}
        </p>
      ) : null}
      {savedNote ? (
        <p className="text-sm text-[var(--text-body)]" role="status">
          {savedNote}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          variant="outline"
          disabled={pending || stepIndex === 0}
          onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
        >
          Back
        </Button>
        {step !== "review" ? (
          <Button type="button" disabled={pending} onClick={onNext}>
            {pending ? "Saving…" : "Save & continue"}
          </Button>
        ) : (
          <Button type="submit" disabled={pending}>
            {pending ? "Submitting…" : "Submit for moderation"}
          </Button>
        )}
        {state.draftId ? (
          <Button
            type="button"
            variant="secondary"
            disabled={pending}
            onClick={() => void persist(false)}
          >
            Save draft
          </Button>
        ) : null}
      </div>
    </form>
  );
}
