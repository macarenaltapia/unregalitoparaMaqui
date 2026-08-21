"use client";

import { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: string;
}

export default function Textarea({
  label,
  hint,
  className = "",
  id,
  ...props
}: TextareaProps) {
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
      <textarea
        id={inputId}
        className={`w-full px-4 py-3 rounded-[var(--radius-input)] text-sm outline-none resize-none transition-all duration-200 bg-white/85 border-2 border-[var(--color-border)] shadow-[inset_0_2px_4px_rgba(10,42,64,0.06)] placeholder:text-[var(--color-slate)]/60 focus:border-[var(--color-cyan)] focus:bg-white focus:shadow-[0_0_0_4px_rgba(22,182,232,0.18)] text-[var(--color-navy)] ${className}`}
        {...props}
      />
    </div>
  );
}
