import { AvatarArt } from "@/types";
import { PERSON_NAME } from "@/data/config";
import Avatar from "./Avatar";
import PixelSprite from "./PixelSprite";
import { props as propArt } from "./art";

interface SimsRoomProps {
  unlocked: AvatarArt[];
}

/**
 * Habitacion isometrica, con la camara en diagonal desde arriba como en el
 * juego. El cuarto es un rombo con dos paredes que suben desde los bordes
 * de atras.
 *
 *              (160,0)  alto de la esquina
 *                 /\
 *      (20,70)  /    \  (300,70)
 *              |  /\  |
 *              | /  \ |
 *      (20,130) \    / (300,130)   <- borde del piso
 *                 \/
 *              (160,200)
 *
 * Todo se dibuja con shapeRendering="crispEdges": sin antialias, las
 * diagonales quedan escalonadas y es justo lo que da el aspecto de la epoca.
 */

const BACK = { x: 160, y: 60 };
const LEFT = { x: 20, y: 130 };
const RIGHT = { x: 300, y: 130 };
const FRONT = { x: 160, y: 200 };

const WALL_H = 60; // alto de las paredes
const WAINSCOT_H = 40; // alto del revestimiento de madera

// Paleta de la habitacion: maderas y beige, como el cuarto de la referencia.
const WOOD_DARK = "#A9743F";
const WOOD = "#C89A5E";
const WOOD_LIGHT = "#DDB57B";
const RAIL = "#8A5F38";
const CARPET = "#DCCDAF";
const CARPET_SHADE = "#CDBC99";

/** Punto sobre el borde inferior de una pared, con t de 0 a 1. */
function onWall(
  from: { x: number; y: number },
  to: { x: number; y: number },
  t: number,
) {
  return { x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t };
}

const points = (...pts: Array<[number, number]>) =>
  pts.map(([x, y]) => `${x},${y}`).join(" ");

// Listones verticales del revestimiento
const panelTs = [0.12, 0.26, 0.4, 0.54, 0.68, 0.82];

export default function SimsRoom({ unlocked }: SimsRoomProps) {
  const onDresser = unlocked.filter((art) => art in propArt);

  return (
    <div className="sims-panel mx-auto max-w-md p-2">
      <div className="relative z-10 overflow-hidden rounded-[calc(var(--radius-card)-8px)]">
        <svg
          viewBox="0 0 320 240"
          className="w-full h-auto block"
          shapeRendering="crispEdges"
          role="img"
          aria-label={`Habitacion de ${PERSON_NAME} con los regalos desbloqueados`}
        >
          {/* Fondo, lo que se ve mas alla del cuarto */}
          <rect x="0" y="0" width="320" height="240" fill="#4E7A3E" />

          {/* ---------- Pared izquierda ---------- */}
          <polygon
            points={points(
              [LEFT.x, LEFT.y - WAINSCOT_H],
              [BACK.x, BACK.y - WAINSCOT_H],
              [BACK.x, BACK.y - WALL_H],
              [LEFT.x, LEFT.y - WALL_H],
            )}
            fill={WOOD_LIGHT}
          />
          <polygon
            points={points(
              [LEFT.x, LEFT.y],
              [BACK.x, BACK.y],
              [BACK.x, BACK.y - WAINSCOT_H],
              [LEFT.x, LEFT.y - WAINSCOT_H],
            )}
            fill={WOOD}
          />

          {/* ---------- Pared derecha (un tono mas oscura, recibe menos luz) ---------- */}
          <polygon
            points={points(
              [BACK.x, BACK.y - WAINSCOT_H],
              [RIGHT.x, RIGHT.y - WAINSCOT_H],
              [RIGHT.x, RIGHT.y - WALL_H],
              [BACK.x, BACK.y - WALL_H],
            )}
            fill={WOOD}
          />
          <polygon
            points={points(
              [BACK.x, BACK.y],
              [RIGHT.x, RIGHT.y],
              [RIGHT.x, RIGHT.y - WAINSCOT_H],
              [BACK.x, BACK.y - WAINSCOT_H],
            )}
            fill={WOOD_DARK}
          />

          {/* Listones verticales */}
          {panelTs.map((t) => {
            const l = onWall(LEFT, BACK, t);
            const r = onWall(BACK, RIGHT, t);

            return (
              <g key={t}>
                <line
                  x1={l.x}
                  y1={l.y}
                  x2={l.x}
                  y2={l.y - WAINSCOT_H}
                  stroke={RAIL}
                  strokeWidth="1"
                  opacity="0.45"
                />
                <line
                  x1={r.x}
                  y1={r.y}
                  x2={r.x}
                  y2={r.y - WAINSCOT_H}
                  stroke="#6F4A2B"
                  strokeWidth="1"
                  opacity="0.45"
                />
              </g>
            );
          })}

          {/* Moldura que separa revestimiento de pared */}
          <polyline
            points={points(
              [LEFT.x, LEFT.y - WAINSCOT_H],
              [BACK.x, BACK.y - WAINSCOT_H],
              [RIGHT.x, RIGHT.y - WAINSCOT_H],
            )}
            fill="none"
            stroke={RAIL}
            strokeWidth="2.5"
          />

          {/* ---------- Ventanas ---------- */}
          {/* Izquierda */}
          <polygon
            points={points([49, 105], [81, 89], [81, 61], [49, 77])}
            fill="#FFFFFF"
          />
          <polygon
            points={points([52, 102], [78, 89], [78, 65], [52, 78])}
            fill="#9FD8F2"
          />
          <polygon
            points={points([52, 102], [78, 89], [78, 83], [52, 96])}
            fill="#79C2E4"
          />
          <line x1="65" y1="95.5" x2="65" y2="71.5" stroke="#FFFFFF" strokeWidth="2" />
          <line x1="52" y1="90" x2="78" y2="77" stroke="#FFFFFF" strokeWidth="2" />

          {/* Derecha */}
          <polygon
            points={points([239, 89], [271, 105], [271, 77], [239, 61])}
            fill="#FFFFFF"
          />
          <polygon
            points={points([242, 89], [268, 102], [268, 78], [242, 65])}
            fill="#8FCDE8"
          />
          <polygon
            points={points([242, 89], [268, 102], [268, 96], [242, 83])}
            fill="#6FB6D8"
          />
          <line x1="255" y1="95.5" x2="255" y2="71.5" stroke="#FFFFFF" strokeWidth="2" />
          <line x1="242" y1="77" x2="268" y2="90" stroke="#FFFFFF" strokeWidth="2" />

          {/* ---------- Cuadro en la pared izquierda ---------- */}
          <polygon
            points={points([100, 78], [126, 65], [126, 43], [100, 56])}
            fill="#8A5F38"
          />
          <polygon
            points={points([103, 76], [123, 66], [123, 47], [103, 57])}
            fill="#E8DFC6"
          />
          <polygon
            points={points([103, 76], [123, 66], [123, 60], [103, 70])}
            fill="#7FB98A"
          />
          <circle cx="117" cy="55" r="3" fill="#F0C862" />

          {/* ---------- Piso ---------- */}
          <polygon
            points={points(
              [BACK.x, BACK.y],
              [RIGHT.x, RIGHT.y],
              [FRONT.x, FRONT.y],
              [LEFT.x, LEFT.y],
            )}
            fill={CARPET}
          />

          {/* ---------- Alfombra ---------- */}
          <polygon
            points={points([155, 130], [215, 160], [155, 190], [95, 160])}
            fill="#C98B9E"
          />
          <polygon
            points={points([155, 139], [197, 160], [155, 181], [113, 160])}
            fill="#E0AABA"
          />
          <polygon
            points={points([155, 149], [178, 160], [155, 171], [132, 160])}
            fill="#C98B9E"
          />

          {/* ---------- Biblioteca (pared izquierda) ---------- */}
          <polygon
            points={points([95, 127], [119, 115], [119, 161], [95, 173])}
            fill={WOOD_DARK}
          />
          <polygon
            points={points([71, 115], [95, 127], [95, 173], [71, 161])}
            fill="#8A5F38"
          />
          <polygon
            points={points([71, 115], [95, 103], [119, 115], [95, 127])}
            fill={WOOD_LIGHT}
          />
          {/* Estantes y libros */}
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <polygon
                points={points(
                  [97, 129 + i * 15],
                  [117, 119 + i * 15],
                  [117, 123 + i * 15],
                  [97, 133 + i * 15],
                )}
                fill="#5E3F24"
              />
              <polygon
                points={points(
                  [99, 133 + i * 15],
                  [107, 129 + i * 15],
                  [107, 139 + i * 15],
                  [99, 143 + i * 15],
                )}
                fill={i === 1 ? "#C0553F" : "#3F6B93"}
              />
              <polygon
                points={points(
                  [108, 128 + i * 15],
                  [115, 125 + i * 15],
                  [115, 135 + i * 15],
                  [108, 138 + i * 15],
                )}
                fill={i === 2 ? "#5E9A63" : "#C8A24A"}
              />
            </g>
          ))}

          {/* ---------- Comoda (pared derecha) ---------- */}
          <polygon
            points={points([199, 118], [225, 131], [225, 155], [199, 142])}
            fill="#8A5F38"
          />
          <polygon
            points={points([225, 131], [251, 118], [251, 142], [225, 155])}
            fill={WOOD_DARK}
          />
          <polygon
            points={points([199, 118], [225, 105], [251, 118], [225, 131])}
            fill={WOOD_LIGHT}
          />
          {/* Cajones */}
          <polygon
            points={points([203, 122], [222, 132], [222, 140], [203, 130])}
            fill="#75492A"
          />
          <polygon
            points={points([228, 132], [247, 122], [247, 130], [228, 140])}
            fill="#96603A"
          />
          <circle cx="212" cy="132" r="1.6" fill="#E4C08A" />
          <circle cx="238" cy="132" r="1.6" fill="#E4C08A" />

          {/* ---------- Regalos sobre la comoda ---------- */}
          {onDresser.map((art, i) => {
            const piece = propArt[art]!;
            const baseX = 218 + i * 18;
            const baseY = 106 + i * 9;

            return (
              <PixelSprite
                key={art}
                map={piece.map}
                palette={piece.palette}
                x={baseX - piece.cols}
                y={baseY - piece.map.length * 2}
                size={2}
                className="room-item"
              />
            );
          })}

          {/* ---------- Plumbob flotando ---------- */}
          <g className="animate-plumbob-float">
            <polygon points={points([160, 78], [152, 90], [160, 90])} fill="#8CF59B" />
            <polygon points={points([160, 78], [168, 90], [160, 90])} fill="#3FE057" />
            <polygon points={points([152, 90], [160, 102], [160, 90])} fill="#1FBF3F" />
            <polygon points={points([168, 90], [160, 102], [160, 90])} fill="#0F8F32" />
          </g>

          {/* ---------- El avatar, parado sobre la alfombra ---------- */}
          <Avatar unlocked={unlocked} x={144} y={104} size={2} />
        </svg>
      </div>
    </div>
  );
}
