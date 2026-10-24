import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, Google_Sans } from "next/font/google";
import { siteConfig } from "@/config/site";
import { isDemoMode, isIndexingEnabled } from "@/lib/env";
import { ScrollToTop } from "@/components/shared/scroll-to-top";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const googleSans = Google_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-google-sans",
  display: "swap",
  adjustFontFallback: false,
});

const indexing = isIndexingEnabled() && !isDemoMode();

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  icons: {
    icon: [{ url: "/brand/nashbizhub-mark.svg", type: "image/svg+xml" }],
    apple: [{ url: "/brand/nashbizhub-mark.svg" }],
  },
  robots: indexing
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${googleSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-[family-name:var(--font-inter)]">
        <Suspense fallback={null}>
          <ScrollToTop />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
