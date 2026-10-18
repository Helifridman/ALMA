import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";

export function PageHeader({ title, subtitle, backHref, action }: { title: string; subtitle?: string; backHref?: string; action?: { href: string; icon: IconName; label: string } }) {
  return (
    <header className="flex items-center gap-3 mb-5">
      {backHref && (
        <Link href={backHref} aria-label="חזרה" className="h-11 w-11 rounded-2xl bg-card border border-line flex items-center justify-center text-ink-soft focus-ring hover:text-brand">
          <Icon name="chevron" className="rotate-180" />
        </Link>
      )}
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl font-extrabold truncate">{title}</h1>
        {subtitle && <p className="text-ink-soft text-sm">{subtitle}</p>}
      </div>
      {action && (
        <Link href={action.href} aria-label={action.label} className="h-11 w-11 rounded-2xl bg-card border border-line flex items-center justify-center text-ink-soft focus-ring hover:text-brand">
          <Icon name={action.icon} />
        </Link>
      )}
    </header>
  );
}
