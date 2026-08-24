import { AvatarArt } from "@/types";

/**
 * Los regalos que se apoyan sobre un mueble.
 *
 * Cada uno se dibuja con el origen en su base, asi para ubicarlo alcanza con
 * darle el punto de apoyo sobre la tapa del mueble. Van en la misma proyeccion
 * que el resto de la escena: se estiran hacia +b, o sea (+2,+1) en pantalla.
 */

export interface PropPlacement {
  x: number;
  y: number;
}

function Arqueador({ x, y }: PropPlacement) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <defs>
        <linearGradient id="aqMetal" x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0%" stopColor="#9AA0A8" />
          <stop offset="45%" stopColor="#5A6068" />
          <stop offset="100%" stopColor="#2B2F35" />
        </linearGradient>
      </defs>

      {/* Sombra sobre la tapa del mueble */}
      <ellipse cx="1" cy="-0.3" rx="5.4" ry="2.2" fill="#3A2A18" opacity="0.24" />

      {/* Apoyado de costado, como queda de verdad en una mesa de luz.
          Aros del mango */}
      <ellipse cx="-2.6" cy="-1.9" rx="2.1" ry="1.5" fill="none" stroke="url(#aqMetal)" strokeWidth="1.1" />
      <ellipse cx="-0.4" cy="-3" rx="2.1" ry="1.5" fill="none" stroke="url(#aqMetal)" strokeWidth="1.1" />

      {/* Brazos hacia la cabeza */}
      <path d="M -1,-2.2 L 4.2,-4.6" stroke="url(#aqMetal)" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M 1.2,-3.3 L 4.6,-5" stroke="url(#aqMetal)" strokeWidth="1.1" strokeLinecap="round" />

      {/* Cabeza curvadora */}
      <path
        d="M 3.6,-3.8 Q 6.2,-5.6 7.4,-4.4 Q 6.4,-2.8 4.2,-2.6 Z"
        fill="url(#aqMetal)"
      />
      {/* Almohadilla de goma */}
      <path d="M 4.4,-4.4 Q 6,-5.4 6.8,-4.6" fill="none" stroke="#E8A0B4" strokeWidth="0.9" strokeLinecap="round" />
    </g>
  );
}

/** Los regalos que van apoyados en un mueble, por id de arte. */
export const roomProps: Partial<
  Record<AvatarArt, (p: PropPlacement) => React.JSX.Element>
> = {
  arqueador: Arqueador,
};
