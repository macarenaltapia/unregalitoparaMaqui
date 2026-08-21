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
        className="block text-[var(--size-body)] font-medium mb-1.5 text-[var(--color-negro)]"
      >
        {label}
        {hint && (
          <span className="text-[var(--color-gris)] font-normal"> {hint}</span>
        )}
      </label>
      <textarea
        id={inputId}
        className={`w-full px-4 py-3 rounded-[var(--radius-input)] text-sm outline-none resize-none transition-all duration-200 bg-white border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-rosa)] text-[var(--color-negro)] ${className}`}
        {...props}
      />
    </div>
  );
}
