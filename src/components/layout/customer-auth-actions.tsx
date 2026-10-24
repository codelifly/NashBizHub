"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { UserRound, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

type SessionUser = { name?: string | null; email?: string | null };

export function CustomerAuthActions() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    authClient.getSession().then((result) => {
      if (cancelled) return;
      setUser(result.data?.user ?? null);
      setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        },
      },
    });
  }

  if (!ready) {
    return (
      <div className="hidden h-9 w-24 animate-pulse rounded-[var(--radius-control)] bg-[var(--surface-subtle)] lg:block lg:h-11 lg:w-36" />
    );
  }

  if (user) {
    return (
      <div className="hidden shrink-0 items-center gap-1 lg:flex">
        <Button asChild variant="ghost" size="sm" className="sm:min-h-11">
          <Link href="/dashboard" className="gap-2">
            <UserRound className="h-4 w-4 shrink-0" aria-hidden />
            <span className="max-w-[7rem] truncate xl:max-w-[9rem]">
              {user.name || "My account"}
            </span>
          </Link>
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={signOut}
          className="gap-2 sm:min-h-11"
        >
          <LogOut className="h-4 w-4 shrink-0" aria-hidden />
          <span className="hidden xl:inline">Log out</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="hidden shrink-0 items-center gap-1 lg:flex">
      <Button asChild variant="ghost" size="sm" className="sm:min-h-11">
        <Link href="/login">Sign in</Link>
      </Button>
      <Button asChild size="sm" className="!text-white sm:min-h-11">
        <Link href="/signup">Register</Link>
      </Button>
    </div>
  );
}
