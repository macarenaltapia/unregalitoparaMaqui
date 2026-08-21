interface PixelSpriteProps {
  /** Filas del dibujo. Cada caracter es un pixel; "." es transparente. */
  map: string[];
  /** Caracter -> color. */
  palette: Record<string, string>;
  /** Esquina superior izquierda, en unidades del viewBox. */
  x: number;
  y: number;
  /** Lado de cada pixel, en unidades del viewBox. */
  size?: number;
  className?: string;
}

/**
 * Dibuja un sprite a partir de un mapa de caracteres.
 *
 * Los pixeles iguales y contiguos de una misma fila se juntan en un solo
 * <rect>, asi un sprite de 16x32 no termina siendo 512 nodos.
 *
 * `shapeRendering="crispEdges"` apaga el antialias: los bordes quedan duros,
 * que es justo lo que da el aspecto pixelado.
 */
export default function PixelSprite({
  map,
  palette,
  x,
  y,
  size = 2,
  className,
}: PixelSpriteProps) {
  const rects: React.JSX.Element[] = [];

  map.forEach((row, r) => {
    let c = 0;

    while (c < row.length) {
      const char = row[c];

      if (!palette[char]) {
        c++;
        continue;
      }

      let run = 1;
      while (c + run < row.length && row[c + run] === char) run++;

      rects.push(
        <rect
          key={`${r}-${c}`}
          x={x + c * size}
          y={y + r * size}
          width={run * size}
          height={size}
          fill={palette[char]}
        />,
      );

      c += run;
    }
  });

  return (
    <g className={className} shapeRendering="crispEdges">
      {rects}
    </g>
  );
}
