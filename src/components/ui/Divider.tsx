interface DividerProps {
  className?: string;
}

export default function Divider({ className = "" }: DividerProps) {
  return (
    <div
      className={`w-full h-[1px] max-w-lg mx-auto my-4 bg-[var(--color-border)] ${className}`}
    />
  );
}
