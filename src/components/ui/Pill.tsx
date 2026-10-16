import { Icon, type IconName } from "./Icon";

export function Pill({ icon, children, tone = "brand", className = "" }: { icon?: IconName; children: React.ReactNode; tone?: "brand" | "amber" | "coral" | "mint" | "sky"; className?: string }) {
  const tones = {
    brand: "bg-brand-soft text-brand-deep",
    amber: "bg-amber-soft text-amber-700",
    coral: "bg-coral-soft text-coral",
    mint: "bg-mint-soft text-emerald-700",
    sky: "bg-sky-soft text-sky-700",
  } as const;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold ${tones[tone]} ${className}`}>
      {icon && <Icon name={icon} size={16} />}
      {children}
    </span>
  );
}
