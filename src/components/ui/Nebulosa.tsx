interface NebulosaProps {
  color: "plumbob" | "cyan";
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const colorMap = {
  plumbob: "var(--color-plumbob)",
  cyan: "var(--color-cyan)",
};

const positionMap = {
  "top-left": "-top-20 -left-20",
  "top-right": "-top-20 -right-20",
  "bottom-left": "-bottom-20 -left-20",
  "bottom-right": "-bottom-20 -right-20",
  center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
};

const sizeMap = {
  sm: "w-56 h-56",
  md: "w-80 h-80",
  lg: "w-[28rem] h-[28rem]",
};

export default function Nebulosa({
  color,
  position,
  size = "md",
  className = "",
}: NebulosaProps) {
  return (
    <div
      className={`absolute rounded-full pointer-events-none ${positionMap[position]} ${sizeMap[size]} ${className}`}
      style={{
        background: colorMap[color],
        filter: "blur(70px)",
        opacity: 0.22,
      }}
      aria-hidden="true"
    />
  );
}
