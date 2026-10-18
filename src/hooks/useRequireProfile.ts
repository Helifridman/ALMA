"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";

/** Redirects to onboarding when there is no local profile yet. Returns true when a profile exists. */
export function useRequireProfile(): boolean {
  const router = useRouter();
  const hydrated = useAppStore((s) => s.hydrated);
  const profile = useAppStore((s) => s.profile);
  useEffect(() => {
    if (hydrated && !profile) router.replace("/welcome");
  }, [hydrated, profile, router]);
  return Boolean(hydrated && profile);
}
