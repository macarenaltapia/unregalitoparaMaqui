import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass";
  padding?: "sm" | "md" | "lg";
}

const paddings = {
  sm: "p-4",
  md: "p-5",
  lg: "p-6",
};

export default function Card({
  variant = "default",
  padding = "md",
  className = "",
  children,
  ...props
}: CardProps) {
  const base = `rounded-[var(--radius-card)] ${paddings[padding]}`;

  const variantClass =
    variant === "glass"
      ? "bg-[var(--glass-bg)] backdrop-blur-[16px] border-[1.5px] border-transparent glass-border"
      : "bg-white border border-[var(--color-border)]";

  return (
    <div className={`${base} ${variantClass} ${className}`} {...props}>
      {children}
    </div>
  );
}
