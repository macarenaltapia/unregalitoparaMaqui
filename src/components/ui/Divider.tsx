import Plumbob from "./Plumbob";

interface DividerProps {
  className?: string;
}

export default function Divider({ className = "" }: DividerProps) {
  return (
    <div
      className={`flex items-center gap-3 max-w-lg mx-auto my-6 ${className}`}
    >
      <span className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-[var(--color-border)]" />
      <Plumbob size={20} />
      <span className="h-[2px] flex-1 bg-gradient-to-l from-transparent to-[var(--color-border)]" />
    </div>
  );
}
