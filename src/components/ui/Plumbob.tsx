interface PlumbobProps {
  /** Alto del diamante en px. El ancho sale de la proporcion 5:7. */
  size?: number;
  /** spin = gira sobre su eje | float = flota | pulse = late el brillo */
  animation?: "none" | "spin" | "float" | "pulse";
  /** Version apagada, para hitos todavia no desbloqueados. */
  dimmed?: boolean;
  className?: string;
}

const animationClass = {
  none: "",
  spin: "animate-plumbob-spin",
  float: "animate-plumbob-float",
  pulse: "animate-plumbob-pulse",
};

/**
 * El diamante verde que flota sobre la cabeza de los Sims.
 * Se dibuja como un octaedro: cuatro caras planas con distinto tono
 * para simular el volumen, mas un destello blanco en la cara superior.
 */
export default function Plumbob({
  size = 40,
  animation = "none",
  dimmed = false,
  className = "",
}: PlumbobProps) {
  const width = (size * 5) / 7;

  return (
    <svg
      width={width}
      height={size}
      viewBox="0 0 100 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${animationClass[animation]} ${dimmed ? "" : "plumbob-glow"} ${className}`}
      style={dimmed ? { filter: "grayscale(1)", opacity: 0.45 } : undefined}
      aria-hidden="true"
    >
      {/* Cara superior izquierda (la mas clara: recibe la luz) */}
      <polygon points="50,4 8,52 50,52" fill="#8CF59B" />
      {/* Cara superior derecha */}
      <polygon points="50,4 92,52 50,52" fill="#3FE057" />
      {/* Cara inferior izquierda */}
      <polygon points="8,52 50,136 50,52" fill="#1FBF3F" />
      {/* Cara inferior derecha (la mas oscura: queda en sombra) */}
      <polygon points="92,52 50,136 50,52" fill="#0F8F32" />
      {/* Destello sobre la cara clara */}
      <polygon points="50,16 26,44 50,44" fill="#FFFFFF" opacity="0.45" />
    </svg>
  );
}
