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


function CamisaColgada({ x, y }: RackPlacement) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <defs>
        {/* El satin se nota por el contraste del degradado, no por el color */}
        <linearGradient id="rkSatin" x1="0" y1="0" x2="1" y2="0.35">
          <stop offset="0%" stopColor="#C9D2DD" />
          <stop offset="35%" stopColor="#FFFFFF" />
          <stop offset="62%" stopColor="#EDF1F6" />
          <stop offset="100%" stopColor="#D6DEE7" />
        </linearGradient>
        <linearGradient id="rkSatinS" x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0%" stopColor="#BAC4D1" />
          <stop offset="70%" stopColor="#EAEFF5" />
          <stop offset="100%" stopColor="#CDD6E0" />
        </linearGradient>
      </defs>

      {/* Gancho y percha */}
      <path d="M -0.2,0 Q 1.5,-2.3 2.9,-0.6" fill="none" stroke="#9AA0A8" strokeWidth="0.7" strokeLinecap="round" />
      <path d="M 0,0.3 L -5,3.8 L 5,3.8 Z" fill="none" stroke="#8A6B4A" strokeWidth="0.9" strokeLinejoin="round" />

      {/* Mangas largas, mas sueltas que las de la campera */}
      <path d="M -4.7,3.4 C -6.6,4.8 -7.2,7.4 -6.8,10.8 L -6.1,16.2 L -3.9,15.8 L -4.2,10.4 C -4.2,7.9 -3.9,5.6 -3.1,4.2 Z" fill="url(#rkSatinS)" />
      <path d="M 4.7,3.4 C 6.6,4.8 7.2,7.4 6.8,10.8 L 6.1,16.2 L 3.9,15.8 L 4.2,10.4 C 4.2,7.9 3.9,5.6 3.1,4.2 Z" fill="url(#rkSatinS)" />

      {/* Cuerpo */}
      <path
        d="M -4.1,3.6 C -5.1,5.8 -5.3,8.8 -5.1,11.9 L -4.7,17
           C -1.6,18 1.6,18 4.7,17 L 5.1,11.9
           C 5.3,8.8 5.1,5.8 4.1,3.6 C 2.4,5 -2.4,5 -4.1,3.6 Z"
        fill="url(#rkSatin)"
      />
      {/* Cuello camisero: dos puntas abiertas */}
      <path d="M -2.5,4 L -0.1,6.6 L -3.1,6.2 Z" fill="#D3DBE4" />
      <path d="M 2.5,4 L 0.1,6.6 L 3.1,6.2 Z" fill="#C4CEDA" />

      {/* Alamares: los cordones cruzados del frente */}
      {[8.2, 10.6, 13, 15.4].map((cy) => (
        <g key={cy}>
          <path d={`M -1.9,${cy} Q 0,${cy - 1} 1.9,${cy}`} fill="none" stroke="#AEB9C6" strokeWidth="0.42" strokeLinecap="round" />
          <circle cx="-1.9" cy={cy} r="0.5" fill="#B7C2CE" />
          <circle cx="1.9" cy={cy} r="0.5" fill="#B7C2CE" />
        </g>
      ))}
    </g>
  );
}

function VestidoColgado({ x, y }: RackPlacement) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <defs>
        <linearGradient id="rkDress" x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0%" stopColor="#0C0C10" />
          <stop offset="55%" stopColor="#23232A" />
          <stop offset="100%" stopColor="#3A3A43" />
        </linearGradient>
      </defs>

      {/* Gancho y percha */}
      <path d="M -0.2,0 Q 1.5,-2.3 2.9,-0.6" fill="none" stroke="#9AA0A8" strokeWidth="0.7" strokeLinecap="round" />
      <path d="M 0,0.3 L -4.4,3.6 L 4.4,3.6 Z" fill="none" stroke="#8A6B4A" strokeWidth="0.9" strokeLinejoin="round" />

      {/* Tirantes finitos, de la percha al escote */}
      <path d="M -3.4,3.5 L -2.4,6.2" stroke="#2A2A31" strokeWidth="0.7" strokeLinecap="round" />
      <path d="M 3.4,3.5 L 2.4,6.2" stroke="#2A2A31" strokeWidth="0.7" strokeLinecap="round" />

      {/* Cuerpo entallado que se abre en la pollera, largo midi */}
      <path
        d="M -2.6,5.9 C -3.2,8 -3.4,9.6 -3.3,11.2
           C -4.6,14.6 -5.4,18.4 -5.6,21.8
           C -1.9,23.1 1.9,23.1 5.6,21.8
           C 5.4,18.4 4.6,14.6 3.3,11.2
           C 3.4,9.6 3.2,8 2.6,5.9
           C 0.9,6.8 -0.9,6.8 -2.6,5.9 Z"
        fill="url(#rkDress)"
      />
      {/* Cinturon, que es lo que define este vestido */}
      <path d="M -3.35,10.6 C -1.1,11.4 1.1,11.4 3.35,10.6 L 3.3,12.2 C 1.1,13 -1.1,13 -3.3,12.2 Z" fill="#08080B" />
      <rect x="-0.85" y="10.7" width="1.7" height="1.7" rx="0.35" fill="#C9A227" />

      {/* Caida de la pollera */}
      <path d="M -1.4,13.4 C -2,16.4 -2.6,19.2 -3,21.9" fill="none" stroke="#0A0A0D" strokeWidth="0.4" strokeLinecap="round" opacity="0.8" />
      <path d="M 1.6,13.4 C 2.2,16.4 2.8,19.2 3.2,21.9" fill="none" stroke="#46464F" strokeWidth="0.4" strokeLinecap="round" opacity="0.7" />
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
  "camisa-blanca": CamisaColgada,
  "vestido-negro": VestidoColgado,
};
