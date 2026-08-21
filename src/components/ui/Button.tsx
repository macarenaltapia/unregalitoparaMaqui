"use client";

import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "filled" | "green" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  // Cyan: acciones principales, como los botones del HUD
  filled: "text-white bg-[image:var(--gradient-cta)]",
  // Verde plumbob: confirmaciones y estados logrados
  green: "text-white bg-[image:var(--gradient-cta-green)]",
  // Contorno: acciones secundarias
  outline:
    "bg-white/80 text-[var(--color-cyan-deep)] border-2 border-[var(--color-cyan)] hover:bg-white",
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
      className={`sims-button px-7 py-3 text-sm font-semibold tracking-wide disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      style={{ fontFamily: "var(--font-fredoka)" }}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}
