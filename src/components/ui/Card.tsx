import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** default = panel de vidrio | glass = panel con borde degrade plumbob→cyan */
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
  const variantClass =
    variant === "glass"
      ? "panel-border rounded-[var(--radius-glass)]"
      : "sims-panel";

  return (
    <div
      className={`${variantClass} ${paddings[padding]} ${className}`}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}
