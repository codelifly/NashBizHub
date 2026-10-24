"use client";

import Link from "next/link";
import { useId } from "react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type SiteLogoProps = {
  href?: string;
  /** Compact mark + wordmark for header; stacked for footer */
  variant?: "header" | "footer" | "mark" | "on-dark";
  className?: string;
  showTagline?: boolean;
};

/** Classic NashBizHub “N” mark with hub node. */
function LogoMark({ className }: { className?: string }) {
  const gradId = `nbhN${useId().replace(/:/g, "")}`;

  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("shrink-0", className)}
      aria-hidden
    >
      <defs>
        <linearGradient
          id={gradId}
          x1="8"
          y1="4"
          x2="56"
          y2="60"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#5CB8FF" />
          <stop offset="55%" stopColor="#1E6EF4" />
          <stop offset="100%" stopColor="#0B3D91" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill={`url(#${gradId})`} />
      <rect
        x="2.5"
        y="2.5"
        width="59"
        height="59"
        rx="14"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.18"
        strokeWidth="1.5"
      />
      <path
        d="M18 44V20.5c0-1.2.9-2.1 2.1-2.1h3.2c.7 0 1.3.3 1.7.9L36.8 36.8V20.5c0-1.2.9-2.1 2.1-2.1h3c1.2 0 2.1.9 2.1 2.1V44c0 1.2-.9 2.1-2.1 2.1h-3.1c-.7 0-1.4-.4-1.7-1L27.2 27.4V44c0 1.2-.9 2.1-2.1 2.1h-3c-1.2 0-2.1-.9-2.1-2.1z"
        fill="#ffffff"
      />
      <circle cx="46.5" cy="17.5" r="3.2" fill="#ffffff" />
      <path
        d="M43.8 19.6 38.2 24.2"
        stroke="#ffffff"
        strokeOpacity="0.55"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SiteLogo({
  href = "/",
  variant = "header",
  className,
  showTagline = false,
}: SiteLogoProps) {
  const onDark = variant === "on-dark";
  const markOnly = variant === "mark";
  const footer = variant === "footer";

  const content = (
    <span
      className={cn(
        "inline-flex items-center gap-2.5",
        footer && "items-start gap-3",
        className,
      )}
    >
      <LogoMark
        className={cn(
          footer ? "h-11 w-11" : "h-9 w-9",
          markOnly && "h-8 w-8",
        )}
      />
      {!markOnly ? (
        <span className="min-w-0 leading-none">
          {/* Company wordmark — single lockup, professional spacing */}
          <span
            className={cn(
              "block font-[family-name:var(--font-google-sans)] font-bold tracking-[-0.03em]",
              footer ? "text-[1.4rem]" : "text-[1.2rem]",
              onDark ? "!text-white" : "text-[var(--text-heading)]",
            )}
          >
            NashBizHub
          </span>
          {showTagline || footer ? (
            <span
              className={cn(
                "mt-1.5 block text-[0.68rem] font-medium tracking-[0.02em]",
                onDark ? "!text-white/65" : "text-[var(--text-body)]",
              )}
            >
              Tennessee Business Marketplace
            </span>
          ) : (
            <span className="sr-only">{siteConfig.tagline}</span>
          )}
        </span>
      ) : (
        <span className="sr-only">{siteConfig.name}</span>
      )}
    </span>
  );

  if (!href) return content;

  return (
    <Link
      href={href}
      className="inline-flex rounded-[var(--radius-control)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
      aria-label={siteConfig.name}
    >
      {content}
    </Link>
  );
}

export { LogoMark };
