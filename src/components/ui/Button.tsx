"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "success" | "danger" | "outline";
type Size = "sm" | "md" | "lg";

const base = "inline-flex items-center justify-center gap-2 font-bold rounded-2xl transition-all duration-150 select-none focus-ring disabled:opacity-50 disabled:cursor-not-allowed active:translate-y-[2px]";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white shadow-[0_5px_0_0_#4f34c9] hover:brightness-105 active:shadow-none",
  secondary: "bg-brand-soft text-brand-deep hover:bg-violet-soft",
  ghost: "bg-transparent text-ink-soft hover:bg-brand-soft/60",
  success: "bg-success text-white shadow-[0_5px_0_0_#15803d] active:shadow-none",
  danger: "bg-danger text-white shadow-[0_5px_0_0_#9f1239] active:shadow-none",
  outline: "bg-card border-2 border-line text-ink hover:border-brand",
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-3 py-2 min-h-[40px]",
  md: "text-base px-5 py-3 min-h-[48px]",
  lg: "text-lg px-7 py-4 min-h-[56px] w-full",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  children: ReactNode;
}

export function Button({ variant = "primary", size = "md", href, className = "", children, ...rest }: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}
