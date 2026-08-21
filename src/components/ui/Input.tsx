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
        className="block text-[var(--size-body)] font-medium mb-1.5 text-[var(--color-negro)]"
      >
        {label}
        {hint && (
          <span className="text-[var(--color-gris)] font-normal"> {hint}</span>
        )}
      </label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[var(--color-gris)]">
            {prefix}
          </span>
        )}
        <input
          id={inputId}
          className={`w-full px-4 py-3 rounded-[var(--radius-input)] text-sm outline-none transition-all duration-200 bg-white border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-rosa)] text-[var(--color-negro)] ${prefix ? "pl-8" : ""} ${className}`}
          {...props}
        />
      </div>
    </div>
  );
}
