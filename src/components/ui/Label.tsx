interface LabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function Label({ children, className = "" }: LabelProps) {
  return (
    <p
      className={`text-[var(--size-label)] font-semibold uppercase tracking-[var(--tracking-label)] text-[var(--color-cyan-deep)] ${className}`}
      style={{ fontFamily: "var(--font-fredoka)" }}
    >
      {children}
    </p>
  );
}
