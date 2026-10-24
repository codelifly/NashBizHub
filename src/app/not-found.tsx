import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-[40rem] flex-col items-start justify-center gap-4 px-4 py-16">
      <p className="text-sm font-semibold text-[var(--brand-blue-accessible-light)]">404</p>
      <h1>Page not found</h1>
      <p className="text-[var(--text-body)]">
        That route is not part of the NashBizHub public marketplace, or the listing slug does not
        exist in the demonstration inventory.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/">Go home</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/businesses-for-sale">Browse listings</Link>
        </Button>
      </div>
    </div>
  );
}
