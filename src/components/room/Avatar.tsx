import { AvatarArt } from "@/types";
import PixelSprite from "./PixelSprite";
import { wearables } from "./art";

interface AvatarProps {
  unlocked: AvatarArt[];
  /** Esquina superior izquierda del sprite en el viewBox de la habitacion. */
  x: number;
  y: number;
  /** Lado del pixel. */
  size: number;
}

/** El sprite mide 16 pixeles de ancho por 32 de alto. */
export const AVATAR_COLS = 16;
export const AVATAR_ROWS = 32;

/**
 * Paleta del personaje: morocha de pelo lacio, ojos marrones, tez blanca.
 * Pocos colores a proposito — los sprites de la epoca trabajaban con paletas
 * chicas y eso es parte del look.
 */
export const avatarPalette: Record<string, string> = {
  H: "#2A1A14", // pelo
  h: "#4A2E22", // brillo del pelo
  S: "#F2D2B6", // piel
  s: "#DDB393", // piel en sombra
  E: "#5B3A20", // ojos marrones
  M: "#C4736F", // boca
  W: "#FFFFFF", // remera
  w: "#D9DFE5", // sombra de la remera
  J: "#3E5F86", // jean
  j: "#2F4A6B", // jean en sombra
  B: "#2B2B33", // zapatillas
};

/**
 * Sprite base: remera blanca y jean, sin ningun regalo puesto.
 * Cada fila tiene exactamente AVATAR_COLS caracteres (lo verifica el test
 * de abajo en tiempo de desarrollo).
 */
const base = [
  "......HHHH......", //  0  alto de la cabeza
  "....HHHHHHHH....", //  1
  "...HHHHHHHHHH...", //  2
  "..HHHHHHHHHHHH..", //  3
  "..HHHSSSSSSHHH..", //  4  nace la cara
  "..HHSSSSSSSSHH..", //  5
  "..HHSSSSSSSSHH..", //  6
  "..HHSEESSEESHH..", //  7  ojos
  "..HHSEESSEESHH..", //  8
  "..HHSSSSSSSSHH..", //  9
  "..HHSSSMMSSSHH..", // 10  boca
  "..HHSSSSSSSSHH..", // 11
  "..HHHSSSSSSHHH..", // 12  menton
  "..HHHHSSSSHHHH..", // 13
  "..HHHHHSSHHHHH..", // 14  cuello
  "..HHHHWWWWHHHH..", // 15  hombros
  "..HHHWWWWWWHHH..", // 16
  ".SHHHWWWWWWHHHS.", // 17  nacen los brazos
  ".SSHHWWWWWWHHSS.", // 18
  ".SS.HWWWWWWH.SS.", // 19
  ".SS.HWWWWWWH.SS.", // 20
  ".SS..WWWWWW..SS.", // 21
  ".SS..WWWWWW..SS.", // 22
  ".SS..wwwwww..SS.", // 23  ruedo de la remera
  ".....JJJJJJ.....", // 24  cadera
  ".....JJJJJJ.....", // 25
  ".....JJ..JJ.....", // 26  se separan las piernas
  ".....JJ..JJ.....", // 27
  ".....jJ..Jj.....", // 28
  ".....jJ..Jj.....", // 29
  "....BBB..BBB....", // 30  zapatillas
  "....BBB..BBB....", // 31
];

export default function Avatar({ unlocked, x, y, size }: AvatarProps) {
  const worn = unlocked.filter((art) => art in wearables);

  return (
    <g>
      <PixelSprite map={base} palette={avatarPalette} x={x} y={y} size={size} />

      {/* Los regalos ponibles se dibujan encima, en la misma grilla */}
      {worn.map((art) => {
        const piece = wearables[art]!;

        return (
          <PixelSprite
            key={art}
            map={piece.map}
            palette={piece.palette}
            x={x}
            y={y}
            size={size}
            className="room-item"
          />
        );
      })}
    </g>
  );
}
