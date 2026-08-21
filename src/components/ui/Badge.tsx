import Plumbob from "./Plumbob";

interface BadgeProps {
  /** Si no le pasas nada, muestra un plumbob (el indicador de "desbloqueado"). */
  children?: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <div
      className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold bg-[image:var(--gradient-cta-green)] border-2 border-white shadow-[0_3px_10px_-2px_rgba(18,163,58,0.7)] animate-scale-in ${className}`}
    >
      {children ?? <Plumbob size={18} />}
    </div>
  );
}
