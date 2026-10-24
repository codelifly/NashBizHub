"use client";

import { useEffect, useState } from "react";
import { WorkspacePage } from "@/components/layout/workspace-page";
import { Panel } from "@/components/dashboard/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { tennesseeCities } from "@/config/tennessee-locations";
import { industries } from "@/config/industries";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("buy");
  const [city, setCity] = useState("nashville");
  const [industry, setIndustry] = useState("restaurants-cafes");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    authClient.getSession().then((result) => {
      setName(result.data?.user?.name ?? "");
      setEmail(result.data?.user?.email ?? "");
    });
  }, []);

  return (
    <WorkspacePage
      title="Profile & interests"
      purpose="Tell NashBizHub what you are looking for so recommendations and inquiries stay relevant."
      eyebrow="Account"
      actionHref="/dashboard/verification"
      actionLabel="Verification"
      secondaryHref="/dashboard/security"
      secondaryLabel="Security"
    >
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Panel title="Identity" description="Shown on inquiries and applications you send.">
          <form
            className="grid gap-4 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              setSaved(true);
            }}
          >
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} readOnly className="opacity-80" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interest">Primary interest</Label>
              <select
                id="interest"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="flex h-11 w-full rounded-[var(--radius-control)] border border-[var(--border-subtle)] bg-[var(--surface-card)] px-3 text-sm"
              >
                <option value="buy">Buy a business</option>
                <option value="sell">Sell a business</option>
                <option value="rent">Rent / operate</option>
                <option value="contract">Service contracts</option>
                <option value="broker">Broker representation</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Preferred city</Label>
              <select
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="flex h-11 w-full rounded-[var(--radius-control)] border border-[var(--border-subtle)] bg-[var(--surface-card)] px-3 text-sm"
              >
                {tennesseeCities.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="industry">Preferred industry</Label>
              <select
                id="industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="flex h-11 w-full rounded-[var(--radius-control)] border border-[var(--border-subtle)] bg-[var(--surface-card)] px-3 text-sm"
              >
                {industries.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <Button type="submit">Save profile preferences</Button>
              {saved ? (
                <p className="mt-2 text-sm text-[var(--color-success)]" role="status">
                  Preferences saved in this browser session (demo).
                </p>
              ) : null}
            </div>
          </form>
        </Panel>

        <Panel
          dark
          title="Why this matters"
          description="Owners and brokers see your interest context with each inquiry."
        >
          <ul className="space-y-3 text-sm text-white/85">
            <li>• Preferred city shapes suggested inventory on your dashboard.</li>
            <li>• Industry focus improves qualification questions.</li>
            <li>• You can add more interests later without a new account.</li>
          </ul>
        </Panel>
      </div>
    </WorkspacePage>
  );
}
