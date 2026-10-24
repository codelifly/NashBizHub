import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Users,
  Building2,
  Store,
  BadgeCheck,
  ContactRound,
  ListTodo,
  BriefcaseBusiness,
  FileSignature,
  LifeBuoy,
  Newspaper,
  Database,
  BarChart3,
  ScrollText,
  Settings,
  Home,
} from "lucide-react";

export type StaffNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  description?: string;
};

export type StaffNavGroup = {
  group: string;
  items: StaffNavItem[];
};

export const staffNavIconed: StaffNavGroup[] = [
  {
    group: "Overview",
    items: [
      {
        href: "/admin",
        label: "Dashboard",
        icon: LayoutDashboard,
        description: "Queues and KPIs",
      },
      {
        href: "/admin/reports",
        label: "Reports",
        icon: BarChart3,
        description: "Listing and lead stats",
      },
      {
        href: "/admin/audit",
        label: "Audit log",
        icon: ScrollText,
        description: "Staff action history",
      },
    ],
  },
  {
    group: "Moderation",
    items: [
      {
        href: "/admin/listings",
        label: "Listings queue",
        icon: Store,
        description: "Approve or request changes",
      },
      {
        href: "/admin/verifications",
        label: "Verifications",
        icon: BadgeCheck,
        description: "Identity evidence review",
      },
      {
        href: "/admin/content",
        label: "Content",
        icon: Newspaper,
        description: "Articles and FAQs",
      },
      {
        href: "/admin/masters",
        label: "Masters",
        icon: Database,
        description: "Cities and industries",
      },
    ],
  },
  {
    group: "Customers",
    items: [
      {
        href: "/admin/users",
        label: "Users",
        icon: Users,
        description: "Accounts and roles",
      },
      {
        href: "/admin/organizations",
        label: "Organizations",
        icon: Building2,
        description: "Owner and broker orgs",
      },
      {
        href: "/admin/crm",
        label: "CRM",
        icon: ContactRound,
        description: "Leads and pipeline",
      },
      {
        href: "/admin/support",
        label: "Support",
        icon: LifeBuoy,
        description: "Tickets and replies",
      },
    ],
  },
  {
    group: "Transactions",
    items: [
      {
        href: "/admin/deals",
        label: "Deals",
        icon: BriefcaseBusiness,
        description: "Negotiation workspaces",
      },
      {
        href: "/admin/contracts",
        label: "Contracts",
        icon: FileSignature,
        description: "Agreements register",
      },
      {
        href: "/admin/tasks",
        label: "Tasks",
        icon: ListTodo,
        description: "Staff follow-ups",
      },
    ],
  },
  {
    group: "System",
    items: [
      {
        href: "/admin/settings",
        label: "Settings",
        icon: Settings,
        description: "Demo console options",
      },
      {
        href: "/",
        label: "Back to home",
        icon: Home,
        description: "Public marketplace",
      },
    ],
  },
];
