/**
 * Geometria de la habitacion isometrica.
 *
 * El piso es un rombo de N x N baldosas. En vez de escribir las coordenadas de
 * cada mueble a mano (que fue como se colo una biblioteca atravesando el piso),
 * todo se ubica en coordenadas de baldosa (a, b) y esto las traduce a pixeles.
 *
 *                    BACK (a=N, b=0)
 *                       /\
 *          pared izq   /  \   pared der
 *                     /    \
 *     LEFT (0,0)     <      >    RIGHT (a=N, b=N)
 *                     \    /
 *                      \  /
 *                       \/
 *                    FRONT (a=0, b=N)
 *
 * El eje `a` corre hacia el fondo pegado a la pared izquierda y el eje `b`
 * hacia adelante pegado a la derecha. Proyeccion 2:1 clasica: cada baldosa
 * avanza 20px en x y sube o baja 10px en y.
 */

export const N = 7; // baldosas por lado

const ORIGIN = { x: 20, y: 130 }; // esquina izquierda del piso
const A_STEP = { x: 20, y: -10 }; // una baldosa hacia el fondo
const B_STEP = { x: 20, y: 10 }; // una baldosa hacia adelante

export interface Pt {
  x: number;
  y: number;
}

/** Punto del piso en coordenadas de baldosa. Fuera de [0,N] queda afuera del cuarto. */
export function floorPos(a: number, b: number): Pt {
  return {
    x: ORIGIN.x + a * A_STEP.x + b * B_STEP.x,
    y: ORIGIN.y + a * A_STEP.y + b * B_STEP.y,
  };
}

/** Punto de la pared izquierda: t de 0 (esquina izquierda) a 1 (fondo), h = alto. */
export function wallLeft(t: number, h: number): Pt {
  const p = floorPos(t * N, 0);
  return { x: p.x, y: p.y - h };
}

/** Punto de la pared derecha: t de 0 (fondo) a 1 (esquina derecha), h = alto. */
export function wallRight(t: number, h: number): Pt {
  const p = floorPos(N, t * N);
  return { x: p.x, y: p.y - h };
}

export const points = (...pts: Pt[]) =>
  pts.map((p) => `${p.x},${p.y}`).join(" ");

export interface Box {
  /** Las cuatro esquinas apoyadas en el piso. */
  p00: Pt;
  p10: Pt;
  p11: Pt;
  p01: Pt;
  /** Las mismas, levantadas la altura de la caja. */
  t00: Pt;
  t10: Pt;
  t11: Pt;
  t01: Pt;
}

/**
 * Una caja rectangular apoyada en el piso, dada por su huella en baldosas.
 * Desde esta camara la esquina mas cercana es (a0, b1), asi que las unicas
 * caras visibles son la tapa y las dos que salen de esa esquina.
 */
export function isoBox(
  a0: number,
  b0: number,
  a1: number,
  b1: number,
  h: number,
): Box {
  const up = (p: Pt): Pt => ({ x: p.x, y: p.y - h });
  const p00 = floorPos(a0, b0);
  const p10 = floorPos(a1, b0);
  const p11 = floorPos(a1, b1);
  const p01 = floorPos(a0, b1);

  return {
    p00,
    p10,
    p11,
    p01,
    t00: up(p00),
    t10: up(p10),
    t11: up(p11),
    t01: up(p01),
  };
}

/** Centro de la tapa de una caja, para apoyarle cosas encima. */
export function boxTopCenter(box: Box): Pt {
  return {
    x: (box.t00.x + box.t10.x + box.t11.x + box.t01.x) / 4,
    y: (box.t00.y + box.t10.y + box.t11.y + box.t01.y) / 4,
  };
}
