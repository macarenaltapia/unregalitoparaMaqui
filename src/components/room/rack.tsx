import { AvatarArt } from "@/types";

/**
 * Las prendas como se ven colgadas del perchero, antes de que se las pongan.
 *
 * Cada una se dibuja con el origen en su punto de colgado (el gancho), salvo
 * los mocasines que van apoyados en el piso a los pies del perchero.
 */

export interface RackPlacement {
  x: number;
  y: number;
}

function CamperaColgada({ x, y }: RackPlacement) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <defs>
        <linearGradient id="rkLeather" x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0%" stopColor="#131317" />
          <stop offset="55%" stopColor="#26262C" />
          <stop offset="100%" stopColor="#43434B" />
        </linearGradient>
        <linearGradient id="rkLeatherS" x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0%" stopColor="#0B0B0D" />
          <stop offset="100%" stopColor="#232329" />
        </linearGradient>
      </defs>

      {/* Gancho y percha */}
      <path d="M -0.2,0 Q 1.5,-2.3 2.9,-0.6" fill="none" stroke="#9AA0A8" strokeWidth="0.7" strokeLinecap="round" />
      <path d="M 0,0.3 L -5.2,3.9 L 5.2,3.9 Z" fill="none" stroke="#8A6B4A" strokeWidth="0.9" strokeLinejoin="round" />

      {/* Mangas */}
      <path d="M -4.9,3.5 C -6.9,4.7 -7.5,7.1 -7.1,10.5 L -6.5,15 L -4.3,14.6 L -4.5,10.1 C -4.5,7.7 -4.1,5.5 -3.3,4.3 Z" fill="url(#rkLeatherS)" />
      <path d="M 4.9,3.5 C 6.9,4.7 7.5,7.1 7.1,10.5 L 6.5,15 L 4.3,14.6 L 4.5,10.1 C 4.5,7.7 4.1,5.5 3.3,4.3 Z" fill="url(#rkLeatherS)" />

      {/* Cuerpo */}
      <path
        d="M -4.3,3.7 C -5.3,5.7 -5.5,8.7 -5.3,11.7 L -4.9,16.4
           C -1.7,17.4 1.7,17.4 4.9,16.4 L 5.3,11.7
           C 5.5,8.7 5.3,5.7 4.3,3.7 C 2.5,5.1 -2.5,5.1 -4.3,3.7 Z"
        fill="url(#rkLeather)"
      />
      {/* Cuello */}
      <path d="M -2.6,4.3 C -1.4,5.1 1.4,5.1 2.6,4.3 L 1.5,6.5 C 0.5,6.9 -0.5,6.9 -1.5,6.5 Z" fill="#4C4C55" />
      {/* Cierre */}
      <path d="M -0.35,5.7 L 0.35,5.7 L 0.35,17 L -0.35,17 Z" fill="#9DA1A9" opacity="0.75" />
    </g>
  );
}

function PantalonColgado({ x, y }: RackPlacement) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <defs>
        <linearGradient id="rkTrack" x1="0" y1="0" x2="1" y2="0.2">
          <stop offset="0%" stopColor="#101116" />
          <stop offset="60%" stopColor="#26272D" />
          <stop offset="100%" stopColor="#3B3D45" />
        </linearGradient>
      </defs>

      {/* Gancho y barra de la percha: el pantalon va doblado encima */}
      <path d="M -0.2,0 Q 1.5,-2.3 2.9,-0.6" fill="none" stroke="#9AA0A8" strokeWidth="0.7" strokeLinecap="round" />
      <path d="M -4.8,3.4 L 4.8,3.4" stroke="#8A6B4A" strokeWidth="0.9" strokeLinecap="round" />
      <path d="M 0,0.3 L 0,3.4" stroke="#8A6B4A" strokeWidth="0.8" />

      {/* Las dos piernas */}
      <path d="M -4.3,3.2 C -4.6,8 -4.5,13 -4.1,17.4 L -1.1,17.4 C -0.8,12.6 -0.7,7.8 -0.5,3.2 Z" fill="url(#rkTrack)" />
      <path d="M 0.5,3.2 C 0.7,7.8 0.8,12.6 1.1,17.4 L 4.1,17.4 C 4.5,13 4.6,8 4.3,3.2 Z" fill="url(#rkTrack)" />

      {/* Las tres tiras, sobre la costura externa */}
      {[0, 0.7, 1.4].map((off) => (
        <path
          key={off}
          d={`M ${-3.9 + off},3.4 C ${-4.1 + off},8.2 ${-4 + off},12.8 ${-3.7 + off},17.2`}
          fill="none"
          stroke="#EFF2F5"
          strokeWidth="0.38"
          strokeLinecap="round"
          opacity="0.92"
        />
      ))}
    </g>
  );
}

function MocasinesEnElPiso({ x, y }: RackPlacement) {
  const shoe = (dx: number, dy: number) => (
    <g transform={`translate(${dx} ${dy})`}>
      {/* Se estiran hacia +b, el mismo eje que mira el avatar */}
      <path
        d="M -2.2,-2.4 C -3.1,-1.2 -2.3,0.8 -0.5,1.4
           C 1.8,2 3.8,1 3.7,-0.6 C 3.6,-2 1.4,-3.2 -0.4,-3
           C -1.2,-2.9 -1.8,-2.7 -2.2,-2.4 Z"
        fill="url(#rkLoafer)"
      />
      <path d="M 0,-2.6 C 1.2,-3.2 2.6,-2.4 2.9,-1.4 C 1.9,-1.8 0.7,-2.1 0,-2.6 Z" fill="#33333B" />
      <path d="M -2.6,-0.9 C -1.8,0.6 1.4,1.5 3.6,0.4 C 2.2,1.6 -0.8,1.2 -2.6,-0.9 Z" fill="#08080A" />
    </g>
  );

  return (
    <g transform={`translate(${x} ${y})`}>
      <defs>
        <linearGradient id="rkLoafer" x1="0" y1="0" x2="0.9" y2="0.5">
          <stop offset="0%" stopColor="#0B0B0D" />
          <stop offset="55%" stopColor="#212126" />
          <stop offset="100%" stopColor="#3E3E47" />
        </linearGradient>
      </defs>
      <ellipse cx="1.6" cy="0.6" rx="7.6" ry="3.2" fill="#3A2A18" opacity="0.2" />
      {shoe(-2.4, 1.2)}
      {shoe(2.6, -1.3)}
    </g>
  );
}

/** Las prendas que cuelgan del perchero, por id de arte. */
export const rackArt: Partial<
  Record<AvatarArt, (p: RackPlacement) => React.JSX.Element>
> = {
  "campera-cuero": CamperaColgada,
  "pantalon-adidas": PantalonColgado,
  mocasines: MocasinesEnElPiso,
};
