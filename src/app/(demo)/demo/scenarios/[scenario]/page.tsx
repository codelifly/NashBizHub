import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { demoScenarios, type DemoScenarioSlug } from "@/config/demo-scenarios";
import { Button } from "@/components/ui/button";

async function DemoScenarioBody({
  params,
}: {
  params: Promise<{ scenario: string }>;
}) {
  const { scenario } = await params;
  const data = demoScenarios[scenario as DemoScenarioSlug];
  if (!data) notFound();

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <p className="text-sm text-[var(--color-warning)]" role="note">
        Guided demo scenario — all actions are fictional.
      </p>
      <header className="space-y-2">
        <h1 className="font-[family-name:var(--font-google-sans)] text-3xl font-bold text-[var(--text-heading)]">
          {data.title}
        </h1>
        <p className="text-[var(--text-body)]">{data.summary}</p>
      </header>
      <ol className="list-decimal space-y-3 pl-5 text-[var(--text-body)]">
        {data.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href={data.startHref}>{data.startLabel}</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/demo">Back to Demo Center</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/demo/outbox">Outbox</Link>
        </Button>
      </div>
    </div>
  );
}

export default function DemoScenarioPage({
  params,
}: {
  params: Promise<{ scenario: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto h-64 max-w-2xl animate-pulse rounded-[var(--radius-card)] bg-[var(--surface-subtle)]" />
      }
    >
      <DemoScenarioBody params={params} />
    </Suspense>
  );
}
