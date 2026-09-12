"use client";
import type { ButtonHTMLAttributes } from "react";

export function NamButton({
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline";
}) {
  const variants = {
    primary: "bg-violet-700 text-white hover:bg-violet-800",
    secondary: "bg-violet-100 text-violet-900 hover:bg-violet-200",
    outline:
      "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50",
  };
  return (
    <button
      type={type}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-700 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
