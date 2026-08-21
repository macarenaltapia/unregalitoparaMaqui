"use client";

import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  prefix?: string;
}

export default function Input({
  label,
  hint,
  prefix,
  className = "",
  id,
  ...props
}: InputProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div>
      <label
        htmlFor={inputId}
        className="block text-sm font-semibold mb-1.5 text-[var(--color-navy)]"
        style={{ fontFamily: "var(--font-fredoka)" }}
      >
        {label}
        {hint && (
          <span className="text-[var(--color-slate)] font-normal"> {hint}</span>
        )}
      </label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[var(--color-cyan-deep)] z-10">
            {prefix}
          </span>
        )}
        <input
          id={inputId}
          className={`w-full px-4 py-3 rounded-[var(--radius-input)] text-sm outline-none transition-all duration-200 bg-white/85 border-2 border-[var(--color-border)] shadow-[inset_0_2px_4px_rgba(10,42,64,0.06)] placeholder:text-[var(--color-slate)]/60 focus:border-[var(--color-cyan)] focus:bg-white focus:shadow-[0_0_0_4px_rgba(22,182,232,0.18)] text-[var(--color-navy)] ${prefix ? "pl-9" : ""} ${className}`}
          {...props}
        />
      </div>
    </div>
  );
}
