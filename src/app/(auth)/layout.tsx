import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Shield, Sparkles } from "lucide-react";
import { DemoBanner } from "@/components/shared/demo-banner";
import { SiteLogo } from "@/components/brand/site-logo";
import { siteHeroImage } from "@/config/listing-images";

const highlights = [
  "One account for buy, sell, rent, manage or bid",
  "Save, compare and inquire from any listing",
  "Demo-only data — no real payments",
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--surface-page)]">
      <DemoBanner />
      <div className="grid min-h-[calc(100vh-2.5rem)] lg:grid-cols-2">
        <div className="on-dark relative hidden overflow-hidden lg:block">
          <Image
            src={siteHeroImage}
            alt=""
            fill
            className="object-cover"
            sizes="50vw"
            priority
          />
          <div className="absolute inset-0 bg-[linear-gradient(165deg,rgba(3,9,20,0.92)_0%,rgba(8,24,39,0.86)_45%,rgba(30,110,244,0.72)_100%)]" />
          <div className="relative z-10 flex h-full flex-col justify-between p-10 xl:p-14">
            <SiteLogo variant="on-dark" />

            <div className="max-w-lg space-y-6">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] !text-[#5CB8FF] ring-1 ring-white/20">
                <Sparkles className="h-3.5 w-3.5" aria-hidden />
                Customer access
              </p>
              <h1 className="font-[family-name:var(--font-google-sans)] text-4xl font-bold leading-tight !text-white xl:text-5xl">
                Your Tennessee business journey in one account
              </h1>
              <p className="text-lg !text-white/85">
                Sign in to manage favorites, inquiries, offers, applications and listings —
                fictional demo inventory only.
              </p>
              <ul className="space-y-3">
                {highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 !text-white">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 !text-[#5CB8FF]" aria-hidden />
                    <span className="!text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="inline-flex items-center gap-2 text-sm !text-white/70">
              <Shield className="h-4 w-4 !text-[#5CB8FF]" aria-hidden />
              Passwords are handled by Better Auth · demo email is simulated
            </p>
          </div>
        </div>

        <div className="relative flex flex-col justify-center px-4 py-10 sm:px-8 lg:px-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(30,110,244,0.08),transparent_55%)]" />
          <div className="relative mx-auto w-full max-w-[40rem]">
            <div className="mb-8 lg:hidden">
              <SiteLogo />
            </div>
            <div className="rounded-[1.25rem] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6 shadow-[0_28px_80px_-48px_rgba(8,24,39,0.55)] sm:p-8">
              {children}
            </div>
            <p className="mt-6 text-center text-sm text-[var(--text-body)]">
              <Link
                href="/"
                className="font-medium text-[var(--brand-blue-accessible-light)] hover:underline"
              >
                ← Back to marketplace
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
