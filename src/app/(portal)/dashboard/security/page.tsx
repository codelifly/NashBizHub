import { WorkspacePage } from "@/components/layout/workspace-page";

export default function Page() {
  return (
    <WorkspacePage
      title="Security"
      purpose="Review sessions, password, and sign-in protections for this demo account."
      emptyTitle="Security checklist"
      emptyDescription="Rotate your demo password after shared walkthroughs."
      actionHref="/forgot-password"
      actionLabel="Reset password"
    />
  );
}
