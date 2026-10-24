export const siteConfig = {
  name: "NashBizHub",
  tagline: "Tennessee business opportunity marketplace",
  description:
    "Find businesses for sale, operating rentals, commercial premises, management contracts and service tenders across Tennessee. Interactive demonstration with fictional inventory.",
  locale: "en-US",
  defaultCurrency: "USD" as const,
  defaultTimeZone: "America/Chicago",
  maxContentWidth: "80rem",
  demoBanner: "Interactive demo · All businesses and transactions are fictional",
  supportEmail: "support@nashbizhub.example",
};

export type SiteConfig = typeof siteConfig;
