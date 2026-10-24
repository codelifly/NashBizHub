import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Bookmark,
  Bell,
  Search,
  MessageSquare,
  MessagesSquare,
  CalendarDays,
  HandCoins,
  FileInput,
  BriefcaseBusiness,
  Store,
  PlusCircle,
  ClipboardList,
  FileSignature,
  ListChecks,
  Wrench,
  UserRound,
  BadgeCheck,
  Shield,
  CreditCard,
  LifeBuoy,
  Settings,
  Home,
} from "lucide-react";

export type PortalNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  badgeKey?: "favorites" | "inquiries" | "offers" | "notifications";
};

export type PortalNavGroup = {
  group: string;
  items: PortalNavItem[];
};

export const portalNavIconed: PortalNavGroup[] = [
  {
    group: "Workspace",
    items: [
      { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
      { href: "/dashboard/favorites", label: "Saved", icon: Bookmark, badgeKey: "favorites" },
      { href: "/dashboard/saved-searches", label: "Saved searches", icon: Search },
      {
        href: "/dashboard/notifications",
        label: "Notifications",
        icon: Bell,
        badgeKey: "notifications",
      },
    ],
  },
  {
    group: "Activity",
    items: [
      {
        href: "/dashboard/inquiries",
        label: "Inquiries",
        icon: MessageSquare,
        badgeKey: "inquiries",
      },
      { href: "/dashboard/messages", label: "Messages", icon: MessagesSquare },
      { href: "/dashboard/appointments", label: "Visits", icon: CalendarDays },
      { href: "/dashboard/offers", label: "Offers", icon: HandCoins, badgeKey: "offers" },
      { href: "/dashboard/applications", label: "Applications", icon: FileInput },
      { href: "/dashboard/deals", label: "Deals", icon: BriefcaseBusiness },
    ],
  },
  {
    group: "Listings & ops",
    items: [
      { href: "/dashboard/listings", label: "My listings", icon: Store },
      { href: "/dashboard/listings/new", label: "Post opportunity", icon: PlusCircle },
      { href: "/dashboard/requirements", label: "Requirements", icon: ClipboardList },
      { href: "/dashboard/agreements", label: "Agreements", icon: FileSignature },
      { href: "/dashboard/obligations", label: "Obligations", icon: ListChecks },
      { href: "/dashboard/maintenance", label: "Maintenance", icon: Wrench },
    ],
  },
  {
    group: "Account",
    items: [
      { href: "/", label: "Back to home", icon: Home },
      { href: "/dashboard/profile", label: "Profile", icon: UserRound },
      { href: "/dashboard/verification", label: "Verification", icon: BadgeCheck },
      { href: "/dashboard/security", label: "Security", icon: Shield },
      { href: "/dashboard/billing", label: "Membership", icon: CreditCard },
      { href: "/dashboard/support", label: "Support", icon: LifeBuoy },
      { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ],
  },
];
