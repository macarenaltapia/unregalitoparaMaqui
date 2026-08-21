"use client";

import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "filled" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  filled:
    "bg-[var(--color-rosa)] text-white hover:opacity-90",
  outline:
    "bg-transparent text-[var(--color-negro)] border-2 border-[var(--color-negro)] hover:bg-[var(--color-negro)] hover:text-white",
};

export default function Button({
  variant = "filled",
  fullWidth = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 disabled:opacity-50 ${variantStyles[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
