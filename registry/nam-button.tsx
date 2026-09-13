"use client";
import type { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export function NamButton({
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline";
}) {
  const variants = {
    primary: "bg-neutral-950 text-white hover:bg-neutral-800",
    secondary: "bg-neutral-100 text-neutral-900 hover:bg-neutral-200",
    outline:
      "border border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-50",
  };
  return (
    <button
      type={type}
      className={twMerge(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-700 disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
