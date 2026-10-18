"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { Icon, type IconName } from "@/components/ui/Icon";

const NAV: { href: string; label: string; icon: IconName }[] = [
  { href: "/", label: "בית", icon: "home" },
  { href: "/learn", label: "מסלול", icon: "map" },
  { href: "/review", label: "חזרה", icon: "repeat" },
  { href: "/achievements", label: "הישגים", icon: "trophy" },
  { href: "/parents", label: "הורים", icon: "parents" },
];

const FULLSCREEN = [/^\/lesson\//, /^\/placement/, /^\/welcome/, /^\/review\/session/];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hydrated = useAppStore((s) => s.hydrated);
  const reduceMotion = useAppStore((s) => s.settings.reduceMotion);
  const profile = useAppStore((s) => s.profile);

  useEffect(() => {
    document.documentElement.dataset.reduceMotion = String(reduceMotion);
  }, [reduceMotion]);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => {});
  }, []);

  const fullscreen = FULLSCREEN.some((re) => re.test(pathname));
  const showNav = hydrated && profile && !fullscreen;

  return (
    <div className="min-h-dvh flex flex-col">
      <main className={`flex-1 w-full max-w-2xl mx-auto px-4 pt-4 ${showNav ? "safe-bottom" : "pb-8"}`}>
        {hydrated ? children : <LoadingScreen />}
      </main>
      {showNav && (
        <nav aria-label="ניווט ראשי" className="fixed bottom-0 inset-x-0 z-40 bg-card/95 backdrop-blur border-t border-line" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
          <ul className="max-w-2xl mx-auto grid grid-cols-5">
            {NAV.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex flex-col items-center gap-0.5 py-2.5 text-xs font-bold focus-ring rounded-xl transition-colors ${active ? "text-brand" : "text-ink-soft hover:text-ink"}`}
                  >
                    <span className={`rounded-xl px-3 py-1 ${active ? "bg-brand-soft" : ""}`}>
                      <Icon name={item.icon} size={22} />
                    </span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
}

export function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-ink-soft" role="status" aria-live="polite">
      <div className="h-12 w-12 rounded-full border-4 border-brand-soft border-t-brand animate-spin" />
      <p className="font-bold">טוענים...</p>
    </div>
  );
}
