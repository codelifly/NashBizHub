import { tennesseeCities } from "@/config/tennessee-locations";
import { industries } from "@/config/industries";

export type PublicRouteEntry = {
  path: string;
  title: string;
  indexableInProduction: boolean;
};

export function getPublicRouteManifest(): PublicRouteEntry[] {
  const base: PublicRouteEntry[] = [
    { path: "/", title: "Home", indexableInProduction: true },
    {
      path: "/operate-and-manage",
      title: "Operate & Manage",
      indexableInProduction: true,
    },
    {
      path: "/operate-and-manage/hire-an-operator",
      title: "Hire an operator",
      indexableInProduction: true,
    },
    {
      path: "/operate-and-manage/become-an-operator",
      title: "Become an operator",
      indexableInProduction: true,
    },
    {
      path: "/operate-and-manage/rent-to-operate",
      title: "Rent to operate",
      indexableInProduction: true,
    },
    {
      path: "/operate-and-manage/lease-premises",
      title: "Lease premises",
      indexableInProduction: true,
    },
    { path: "/businesses-for-sale", title: "Businesses for sale", indexableInProduction: true },
    { path: "/businesses-for-rent", title: "Businesses for rent", indexableInProduction: true },
    {
      path: "/commercial-properties-for-lease",
      title: "Commercial properties for lease",
      indexableInProduction: true,
    },
    { path: "/contracts", title: "Contracts hub", indexableInProduction: true },
    { path: "/management-contracts", title: "Management contracts", indexableInProduction: true },
    { path: "/service-contracts", title: "Service contracts", indexableInProduction: true },
    { path: "/tours", title: "Video tours", indexableInProduction: true },
    { path: "/glossary", title: "Glossary", indexableInProduction: true },
    { path: "/compare", title: "Compare", indexableInProduction: false },
    { path: "/requirements", title: "Buyer requirements", indexableInProduction: true },
    { path: "/tennessee", title: "Tennessee hub", indexableInProduction: true },
    { path: "/industries", title: "Industries", indexableInProduction: true },
    { path: "/brokers", title: "Brokers", indexableInProduction: true },
    { path: "/sell-your-business", title: "Sell your business", indexableInProduction: true },
    {
      path: "/rent-out-your-business",
      title: "Rent out your business",
      indexableInProduction: true,
    },
    { path: "/post-a-contract", title: "Post a contract", indexableInProduction: true },
    { path: "/how-it-works", title: "How it works", indexableInProduction: true },
    { path: "/resources", title: "Resources", indexableInProduction: true },
    { path: "/about", title: "About", indexableInProduction: true },
    { path: "/contact", title: "Contact", indexableInProduction: true },
    { path: "/help", title: "Help", indexableInProduction: true },
    { path: "/membership", title: "Membership", indexableInProduction: true },
    { path: "/sitemap", title: "Sitemap", indexableInProduction: true },
    { path: "/legal/privacy", title: "Privacy", indexableInProduction: true },
    { path: "/legal/terms", title: "Terms", indexableInProduction: true },
    { path: "/legal/cookies", title: "Cookies", indexableInProduction: true },
    { path: "/legal/accessibility", title: "Accessibility", indexableInProduction: true },
  ];

  for (const city of tennesseeCities) {
    base.push({
      path: `/tennessee/${city.slug}`,
      title: `${city.name}, TN`,
      indexableInProduction: true,
    });
  }

  for (const industry of industries) {
    base.push({
      path: `/industries/${industry.slug}`,
      title: industry.name,
      indexableInProduction: true,
    });
  }

  for (const audience of ["buyers", "sellers", "operators", "contractors", "brokers"]) {
    base.push({
      path: `/how-it-works/${audience}`,
      title: `How it works for ${audience}`,
      indexableInProduction: true,
    });
  }

  return base;
}
