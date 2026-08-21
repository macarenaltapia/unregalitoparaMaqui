interface LabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function Label({ children, className = "" }: LabelProps) {
  return (
    <p
      className={`text-[var(--size-label)] uppercase tracking-[var(--tracking-label)] text-[var(--color-gris)] ${className}`}
    >
      {children}
    </p>
  );
}
