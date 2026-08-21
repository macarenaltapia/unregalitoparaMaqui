import { AvatarArt } from "@/types";

/**
 * Dibujos de los regalos, en pixel art.
 *
 * - `wearables`: se superponen al avatar usando SU MISMA grilla de 16x32, asi
 *   que las filas coinciden una a una con las del sprite base. La fila 15 son
 *   los hombros, la 24 la cadera.
 * - `props`: sprites sueltos que se apoyan sobre la comoda. Cada uno declara
 *   su propio tamaño en pixeles.
 *
 * Para sumar un regalo: agregar el id en `AvatarArt` (src/types), dibujarlo
 * aca y referenciarlo desde src/data/gifts.ts.
 */

export interface PixelPiece {
  map: string[];
  palette: Record<string, string>;
  /** Ancho en pixeles, para poder centrar los props. */
  cols: number;
}

/* ============================================
   WEARABLES — grilla de 16x32, la del avatar
   ============================================ */

/**
 * Campera de cuero: hombros, mangas largas y el frente abierto dejando ver
 * la remera blanca por el medio (columnas 7 y 8 quedan transparentes).
 */
const camperaCuero: PixelPiece = {
  cols: 16,
  palette: {
    L: "#3E2C23", // cuero
    l: "#241A15", // cuero en sombra
    k: "#6B4E3D", // brillo del cuero
    Z: "#C8A87C", // cierre
  },
  map: [
    "................", //  0
    "................", //  1
    "................", //  2
    "................", //  3
    "................", //  4
    "................", //  5
    "................", //  6
    "................", //  7
    "................", //  8
    "................", //  9
    "................", // 10
    "................", // 11
    "................", // 12
    "................", // 13
    "................", // 14
    "....kkkkkkkk....", // 15  cuello de la campera
    "...LLLkZZkLLL...", // 16  solapas y cierre
    ".LLLLLkZZkLLLLL.", // 17  nacen las mangas
    ".LLLLLLZZLLLLLL.", // 18
    ".LL..LLZZLL..LL.", // 19  se separan mangas y cuerpo
    ".LL..LLZZLL..LL.", // 20
    ".LL..LLZZLL..LL.", // 21
    ".LL..LLZZLL..LL.", // 22
    ".ll..llllll..ll.", // 23  puños y ruedo
    "................", // 24
    "................", // 25
    "................", // 26
    "................", // 27
    "................", // 28
    "................", // 29
    "................", // 30
    "................", // 31
  ],
};

export const wearables: Partial<Record<AvatarArt, PixelPiece>> = {
  "campera-cuero": camperaCuero,
};

/* ============================================
   PROPS — se apoyan sobre la comoda
   ============================================ */

const perfume: PixelPiece = {
  cols: 7,
  palette: {
    G: "#D9A441", // tapa dorada
    g: "#F0CE93", // brillo de la tapa
    N: "#E4C08A", // cuello
    P: "#F0A8C6", // vidrio rosa
    p: "#DE7FA8", // liquido
    o: "#FFFFFF", // reflejo
  },
  map: [
    "..ggg..",
    "..GGG..",
    "...N...",
    ".PPPPP.",
    "PoPPPPP",
    "PoPPPPP",
    "PppppPP",
    "PppppPP",
    "PppppPP",
    ".PPPPP.",
  ],
};

export const props: Partial<Record<AvatarArt, PixelPiece>> = {
  perfume,
};
