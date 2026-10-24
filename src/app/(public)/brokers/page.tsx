import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { listBrokers } from "@/server/repositories/sqlite/brokers";

export const metadata = buildPageMetadata({
  title: "Brokers",
  description:
    "Meet fictional Tennessee advisers in the NashBizHub demonstration marketplace.",
  path: "/brokers",
});

export default function BrokersPage() {
  const brokers = listBrokers();

  return (
    <div className="mx-auto max-w-[80rem] space-y-8 px-4 py-10">
      <header className="space-y-3">
        <h1>Brokers</h1>
        <p className="max-w-3xl text-[var(--text-body)]">
          Fictional demonstration advisers assigned to seed listings. Contacts use .example emails
          and are not real brokerage professionals.
        </p>
      </header>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {brokers.map((broker) => (
          <li key={broker.id}>
            <Link
              href={`/brokers/${broker.slug}`}
              className="block h-full rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-5 hover:border-[var(--brand-blue-accessible-light)]"
            >
              <h2 className="text-xl">{broker.name}</h2>
              <p className="mt-1 text-sm font-medium text-[var(--brand-blue-accessible-light)]">
                {broker.firm}
              </p>
              <p className="mt-1 text-sm text-[var(--text-body)]">
                {broker.cityName}, TN
              </p>
              <p className="mt-3 text-sm text-[var(--text-body)]">{broker.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
