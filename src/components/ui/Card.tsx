import type { HTMLAttributes } from "react";

export function Card({ className = "", ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`bg-card rounded-2xl border border-line shadow-card p-4 ${className}`} {...rest} />;
}
