interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm bg-[var(--color-rosa)] animate-scale-in ${className}`}
    >
      {children}
    </div>
  );
}
