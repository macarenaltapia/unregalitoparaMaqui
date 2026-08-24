import { AvatarArt } from "@/types";

interface AvatarProps {
  unlocked: AvatarArt[];
  /** Punto del piso donde se para. */
  x: number;
  y: number;
  scale?: number;
}

/**
 * Maca, parada en la habitacion.
 *
 * Dos cosas que parecen la misma y no lo son:
 *
 *  1. La ORIENTACION va en diagonal, alineada a los ejes del cuarto. Mira
 *     hacia +b, asi que su hombro derecho cae mas abajo (mas cerca de la
 *     camara) y el izquierdo mas arriba, y los pies quedan escalonados.
 *
 *  2. El CUERPO va con curvas. En The Sims los personajes son mallas 3D
 *     organicas renderizadas desde el angulo isometrico: hombros redondeados,
 *     miembros que se afinan, volumen por degradado. Construir el cuerpo con
 *     cajas alineadas a la isometria da Lego, no Sims.
 *
 * Los puntos de anclaje salen de P(), que respeta la proyeccion del cuarto;
 * entre esos anclajes va todo dibujado con curvas.
 */

interface Pt {
  x: number;
  y: number;
}

/**
 * Punto del cuerpo en la proyeccion 2:1 del cuarto.
 * k = lateral (positivo hacia su izquierda), f = hacia adelante, h = altura.
 */
const P = (k: number, f: number, h: number): Pt => ({
  x: 2 * k + 2 * f,
  y: -h - k + f,
});

/** Tubo que se afina de a hacia c pasando por b, con panza hacia afuera. */
function tapered(a: Pt, b: Pt, c: Pt, w0: number, w1: number, w2: number) {
  return (
    `M ${a.x - w0},${a.y} ` +
    `C ${b.x - w1 - 0.5},${b.y - 2} ${b.x - w1},${b.y + 1} ${c.x - w2},${c.y} ` +
    `Q ${c.x},${c.y + w2 * 0.95} ${c.x + w2},${c.y} ` +
    `C ${b.x + w1},${b.y + 1} ${b.x + w1 - 0.5},${b.y - 2} ${a.x + w0},${a.y} Z`
  );
}

/** Pie: ovalo estirado hacia donde mira, o sea sobre el eje (2,1). */
function foot(p: Pt, len: number, wide: number, lift: number) {
  return (
    `M ${p.x - wide},${p.y - lift - 0.6} ` +
    `C ${p.x - wide - 0.9},${p.y - lift + 1} ${p.x - wide + 0.2},${p.y + 1.6} ${p.x + len * 0.35},${p.y + 2} ` +
    `C ${p.x + len},${p.y + 2.4} ${p.x + len + 1.1},${p.y + 0.4} ${p.x + len * 0.9},${p.y - lift - 0.5} ` +
    `C ${p.x + len * 0.6},${p.y - lift - 2} ${p.x - wide * 0.2},${p.y - lift - 2.2} ${p.x - wide},${p.y - lift - 0.6} Z`
  );
}

// ---------- Anclajes ----------

const LEG_K = 1.8;
const ARM_K = 3.3;

const R_HIP = P(-LEG_K, 0, 18);
const R_KNEE = P(-LEG_K - 0.1, 0, 9);
const R_ANKLE = P(-LEG_K, 0, 2.2);
const R_FOOT = P(-LEG_K, 0, 0);

const L_HIP = P(LEG_K, 0, 18);
const L_KNEE = P(LEG_K + 0.1, 0, 9);
const L_ANKLE = P(LEG_K, 0, 2.2);
const L_FOOT = P(LEG_K, 0, 0);

const R_SHO = P(-ARM_K, 0, 39.5);
const R_ELB = P(-ARM_K - 1.1, 0, 28);
const R_WRI = P(-ARM_K - 1, 0, 19.5);

const L_SHO = P(ARM_K, 0, 39.5);
const L_ELB = P(ARM_K + 1.1, 0, 28);
const L_WRI = P(ARM_K + 1, 0, 19.5);

const HEAD: Pt = { x: 0.8, y: -50.5 };
// La cara mira hacia +b: los rasgos se corren en esa direccion y el eje de los
// ojos sigue la linea de hombros, que baja 1 cada 2 de ancho.
const FACE: Pt = { x: HEAD.x + 1.9, y: HEAD.y + 1.1 };
const EYE: Pt = { x: 2.15, y: -1.07 };

// Contorno del torso: hombros redondeados y cintura marcada. La linea de la
// cadera baja hacia su derecha porque ese lado esta mas cerca de la camara.
const TORSO = `
  M -6.7,-36.4
  C -7.4,-42.6 -3.6,-45.6 0.7,-45.9
  C 5.1,-46.2 8.4,-43.4 8.1,-38
  C 7.9,-33.4 7.3,-28.4 6.4,-23.4
  C 6.2,-22.4 6.4,-20.6 6.6,-19.2
  C 4.6,-16.6 1.4,-14.9 -1.4,-14.7
  C -4,-14.6 -5.6,-15.7 -6.4,-16.9
  C -6.5,-19.6 -6.5,-22.8 -6.6,-26
  C -6.7,-30 -6.8,-33.6 -6.7,-36.4 Z`;

// ---------- Paleta ----------

const SKIN = "#F8DCC3";
const SKIN_MID = "#EFC7A6";
const SKIN_S = "#DBAF8C";
const HAIR = "#2E1C13";
const HAIR_HI = "#59392A";
const HAIR_S = "#170D08";
const EYE_C = "#5B3A20";
const MOUTH = "#C4736F";
const BLUSH = "#E9A895";

const TEE_S = "#CFD8E2";
const DENIM_S = "#3F5F91";
const SOCK_S = "#CFD6DE";

const LEATHER_HI = "#4C4C55";
const ZIP = "#9DA1A9";

const STRIPE = "#EFF2F5";

const LOAFER_S = "#08080A";
const LOAFER_HI = "#33333B";

export default function Avatar({ unlocked, x, y, scale = 1 }: AvatarProps) {
  const jacket = unlocked.includes("campera-cuero");
  const pants = unlocked.includes("pantalon-adidas");
  const loafers = unlocked.includes("mocasines");

  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <defs>
        <radialGradient id="avShadow">
          <stop offset="0%" stopColor="#3A2A18" stopOpacity="0.38" />
          <stop offset="65%" stopColor="#3A2A18" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#3A2A18" stopOpacity="0" />
        </radialGradient>

        {/* El volumen sale del degradado, no de facetas: claro del lado al que
            mira, que es el mismo lado iluminado que la pared izquierda. */}
        <linearGradient id="avSkin" x1="0.1" y1="0" x2="0.95" y2="0.3">
          <stop offset="0%" stopColor={SKIN_S} />
          <stop offset="42%" stopColor={SKIN_MID} />
          <stop offset="100%" stopColor={SKIN} />
        </linearGradient>
        <linearGradient id="avSkinLimb" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={SKIN_S} />
          <stop offset="55%" stopColor={SKIN} />
          <stop offset="100%" stopColor={SKIN_MID} />
        </linearGradient>
        <linearGradient id="avHair" x1="0.05" y1="0.1" x2="0.9" y2="0.6">
          <stop offset="0%" stopColor={HAIR_S} />
          <stop offset="45%" stopColor={HAIR} />
          <stop offset="72%" stopColor={HAIR_HI} />
          <stop offset="100%" stopColor={HAIR} />
        </linearGradient>
        <linearGradient id="avTee" x1="0" y1="0.1" x2="1" y2="0.4">
          <stop offset="0%" stopColor={TEE_S} />
          <stop offset="45%" stopColor="#F2F5F8" />
          <stop offset="100%" stopColor="#FFFFFF" />
        </linearGradient>
        <linearGradient id="avDenim" x1="0" y1="0" x2="1" y2="0.2">
          <stop offset="0%" stopColor={DENIM_S} />
          <stop offset="60%" stopColor="#6289BE" />
          <stop offset="100%" stopColor="#7BA0D0" />
        </linearGradient>
        <linearGradient id="avSock" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={SOCK_S} />
          <stop offset="60%" stopColor="#F4F6F9" />
          <stop offset="100%" stopColor="#FFFFFF" />
        </linearGradient>
        <linearGradient id="avLeather" x1="0" y1="0.05" x2="1" y2="0.45">
          <stop offset="0%" stopColor="#0A0A0C" />
          <stop offset="42%" stopColor="#1F1F24" />
          <stop offset="78%" stopColor="#48484F" />
          <stop offset="100%" stopColor="#2B2B31" />
        </linearGradient>
        <linearGradient id="avTrack" x1="0" y1="0" x2="1" y2="0.2">
          <stop offset="0%" stopColor="#101116" />
          <stop offset="55%" stopColor="#26272D" />
          <stop offset="100%" stopColor="#3B3D45" />
        </linearGradient>
        <linearGradient id="avLoafer" x1="0" y1="0" x2="0.9" y2="0.5">
          <stop offset="0%" stopColor="#0B0B0D" />
          <stop offset="55%" stopColor="#212126" />
          <stop offset="100%" stopColor="#3E3E47" />
        </linearGradient>
      </defs>

      {/* Sombra en el piso, con la proporcion 2:1 de las baldosas */}
      <ellipse cx="0" cy="0.4" rx="11.5" ry="5.8" fill="url(#avShadow)" />

      {/* ---------- Pelo: melena de atras, largo de long bob ---------- */}
      <path
        d={`M ${HEAD.x - 8.8},${HEAD.y - 0.6}
            C ${HEAD.x - 10},${HEAD.y - 9.4} ${HEAD.x - 5},${HEAD.y - 13.6} ${HEAD.x + 1.4},${HEAD.y - 13.6}
            C ${HEAD.x + 7.8},${HEAD.y - 13.6} ${HEAD.x + 10.8},${HEAD.y - 9} ${HEAD.x + 9.6},${HEAD.y - 0.4}
            C ${HEAD.x + 9.4},${HEAD.y + 5} ${HEAD.x + 9.6},${HEAD.y + 11} ${HEAD.x + 8.8},${HEAD.y + 15.4}
            Q ${HEAD.x + 8.1},${HEAD.y + 17.6} ${HEAD.x + 6.4},${HEAD.y + 15.8}
            C ${HEAD.x + 6.4},${HEAD.y + 11} ${HEAD.x + 5.6},${HEAD.y + 5} ${HEAD.x + 4.4},${HEAD.y + 2}
            C ${HEAD.x + 1.4},${HEAD.y + 4.2} ${HEAD.x - 2.4},${HEAD.y + 4.2} ${HEAD.x - 5.4},${HEAD.y + 2}
            C ${HEAD.x - 6.6},${HEAD.y + 5.4} ${HEAD.x - 7.4},${HEAD.y + 11.4} ${HEAD.x - 7.4},${HEAD.y + 16.6}
            Q ${HEAD.x - 7.6},${HEAD.y + 18.8} ${HEAD.x - 9.4},${HEAD.y + 17}
            C ${HEAD.x - 9.8},${HEAD.y + 11} ${HEAD.x - 9.4},${HEAD.y + 5} ${HEAD.x - 8.8},${HEAD.y - 0.6} Z`}
        fill="url(#avHair)"
      />

      {/* ---------- Brazo izquierdo (lejano, detras del torso) ---------- */}
      <Arm sho={L_SHO} elb={L_ELB} wri={L_WRI} jacket={jacket} far />

      {/* ---------- Piernas ---------- */}
      <Leg hip={L_HIP} knee={L_KNEE} ankle={L_ANKLE} pants={pants} loafers={loafers} far />
      <Leg hip={R_HIP} knee={R_KNEE} ankle={R_ANKLE} pants={pants} loafers={loafers} />

      {/* ---------- Pies ---------- */}
      <Foot at={L_FOOT} loafers={loafers} far />
      <Foot at={R_FOOT} loafers={loafers} />

      {/* ---------- Cuello ---------- */}
      <path
        d="M -2.4,-40.6 C -2.6,-44.4 -2.4,-46.6 -2,-48.4
           C 0.4,-47 3,-47.2 4.8,-48.6
           C 5.2,-46 5.2,-43.4 5,-40.8
           C 2.6,-39.4 -0.2,-39.4 -2.4,-40.6 Z"
        fill={SKIN_S}
      />

      {/* ---------- Torso, con la remera blanca ---------- */}
      <path d={TORSO} fill="url(#avTee)" />
      {/* Pliegue del costado, para que el blanco no quede una mancha plana */}
      <path
        d="M -6.6,-35.4 C -5.4,-30 -5,-23.4 -5.2,-16.2
           C -6,-19 -6.4,-25.6 -6.6,-35.4 Z"
        fill={TEE_S}
        opacity="0.75"
      />
      {/* Escote */}
      <path
        d="M -1.8,-45.2 C 0.4,-43.2 3.4,-43.4 5.2,-45.6
           C 4.4,-42.6 0.6,-41.6 -1.8,-45.2 Z"
        fill={TEE_S}
      />

      {/* ---------- La campera de cuero ---------- */}
      {jacket && (
        <g className="room-item">
          {/* Delantero derecho, el que queda mas cerca de la camara */}
          <path
            d="M -6.8,-36.6 C -7.5,-42.8 -3.8,-45.8 0.5,-46.1
               C 1.2,-42.6 0.8,-38 0.1,-33.4
               C -0.6,-28.4 -1.4,-21.4 -1.8,-15.4
               C -3.6,-15.2 -5.2,-15.9 -6.3,-16.9
               C -6.4,-19.6 -6.5,-22.6 -6.6,-26.1
               C -6.8,-30.1 -6.9,-33.8 -6.8,-36.6 Z"
            fill="url(#avLeather)"
          />
          {/* Delantero izquierdo */}
          <path
            d="M 2.4,-45.8 C 5.9,-45.4 8.5,-42.8 8.2,-38.1
               C 8,-33.5 7.4,-28.5 6.6,-23.5
               C 6.5,-22.2 6.6,-20.6 6.7,-19.2
               C 4.6,-17 2.2,-15.7 0.2,-15.4
               C 1.2,-22 2,-29.2 2.4,-34.4
               C 2.7,-38.4 2.7,-42.4 2.4,-45.8 Z"
            fill="url(#avLeather)"
          />
          {/* Solapas */}
          <path
            d="M -6.8,-36.6 C -7.5,-42.8 -3.8,-45.8 0.5,-46.1
               C 0.7,-44 0.6,-42 0.3,-40
               C -2.4,-39.6 -5,-38.4 -6.8,-36.6 Z"
            fill={LEATHER_HI}
          />
          <path
            d="M 2.4,-45.8 C 5.9,-45.4 8.5,-42.8 8.2,-38.1
               C 6.4,-39.4 4.2,-40 2.2,-40 C 2.5,-42 2.6,-44 2.4,-45.8 Z"
            fill={LEATHER_HI}
            opacity="0.75"
          />
          {/* Cierre, siguiendo la abertura */}
          <path
            d="M 0.5,-46.1 C 1.2,-42.6 0.8,-38 0.1,-33.4
               C -0.6,-28.4 -1.4,-21.4 -1.8,-15.4
               L -1.15,-15.45 C -0.75,-21.5 0.75,-28.75 1.4,-33.55
               C 1.75,-38.25 1.85,-42.7 1.15,-46 Z"
            fill={ZIP}
            opacity="0.7"
          />
        </g>
      )}

      {/* ---------- Brazo derecho (cercano, delante) ---------- */}
      <Arm sho={R_SHO} elb={R_ELB} wri={R_WRI} jacket={jacket} />

      {/* ---------- Cara ---------- */}
      <path
        d={`M ${HEAD.x - 6.7},${HEAD.y - 0.6}
            C ${HEAD.x - 7},${HEAD.y - 6} ${HEAD.x - 3.8},${HEAD.y - 9.2} ${HEAD.x + 0.4},${HEAD.y - 9.2}
            C ${HEAD.x + 4.8},${HEAD.y - 9.2} ${HEAD.x + 7.3},${HEAD.y - 5.8} ${HEAD.x + 7.1},${HEAD.y - 0.4}
            C ${HEAD.x + 7},${HEAD.y + 3.8} ${HEAD.x + 5.4},${HEAD.y + 7.2} ${HEAD.x + 2.6},${HEAD.y + 8.4}
            C ${HEAD.x + 0.6},${HEAD.y + 9.2} ${HEAD.x - 1.8},${HEAD.y + 8.6} ${HEAD.x - 3.4},${HEAD.y + 6.8}
            C ${HEAD.x - 5.6},${HEAD.y + 4.4} ${HEAD.x - 6.6},${HEAD.y + 1.8} ${HEAD.x - 6.7},${HEAD.y - 0.6} Z`}
        fill="url(#avSkin)"
      />

      {/* Naricita sobre el borde hacia el que mira */}
      <path
        d={`M ${FACE.x + 3.6},${FACE.y - 0.8} Q ${FACE.x + 5.3},${FACE.y + 0.3} ${FACE.x + 3.4},${FACE.y + 1.2}`}
        fill="none"
        stroke={SKIN_S}
        strokeWidth="0.85"
        strokeLinecap="round"
      />

      <ellipse cx={FACE.x - 3.4} cy={FACE.y + 2.6} rx="1.7" ry="1.15" fill={BLUSH} opacity="0.4" />
      <ellipse cx={FACE.x + 2.4} cy={FACE.y + 1.4} rx="1.6" ry="1.05" fill={BLUSH} opacity="0.45" />

      {/* Ojos marrones, alineados con la linea de hombros */}
      <Eye at={{ x: FACE.x + EYE.x, y: FACE.y + EYE.y - 1.5 }} r={1.2} />
      <Eye at={{ x: FACE.x - EYE.x, y: FACE.y - EYE.y - 1.5 }} r={1.08} />

      {/* Boca */}
      <path
        d={`M ${FACE.x - 1.6},${FACE.y + 4.2} Q ${FACE.x + 0.2},${FACE.y + 5.8} ${FACE.x + 1.9},${FACE.y + 3.9}
            Q ${FACE.x + 0.2},${FACE.y + 4.9} ${FACE.x - 1.6},${FACE.y + 4.2} Z`}
        fill={MOUTH}
      />

      {/* ---------- Pelo de adelante ----------
           Estilo long bob con raya al medio. Lo importante: el nacimiento va
           sobre la frente, unas 3 unidades arriba de los ojos. Antes arrancaba
           a 8 y por eso parecia que el craneo estaba adelante y el pelo atras.
           La raya es apenas una muesca en el centro, no una cuna pelada. */}
      <path
        d={`M ${HEAD.x - 7.6},${HEAD.y + 1.2}
            C ${HEAD.x - 8.6},${HEAD.y - 7.4} ${HEAD.x - 4.6},${HEAD.y - 12.6} ${HEAD.x + 1.2},${HEAD.y - 12.6}
            C ${HEAD.x + 7.2},${HEAD.y - 12.6} ${HEAD.x + 10},${HEAD.y - 7.2} ${HEAD.x + 9.2},${HEAD.y + 1.2}
            C ${HEAD.x + 8.6},${HEAD.y - 2.4} ${HEAD.x + 7},${HEAD.y - 4.4} ${HEAD.x + 4.6},${HEAD.y - 5}
            C ${HEAD.x + 3},${HEAD.y - 5.4} ${HEAD.x + 2},${HEAD.y - 6} ${HEAD.x + 1.3},${HEAD.y - 6.5}
            C ${HEAD.x + 0.6},${HEAD.y - 6} ${HEAD.x - 1},${HEAD.y - 5.4} ${HEAD.x - 2.8},${HEAD.y - 5}
            C ${HEAD.x - 5},${HEAD.y - 4.2} ${HEAD.x - 6.8},${HEAD.y - 2.2} ${HEAD.x - 7.6},${HEAD.y + 1.2} Z`}
        fill="url(#avHair)"
      />
      {/* Brillo siguiendo la caida hacia cada costado */}
      <path
        d={`M ${HEAD.x + 0.4},${HEAD.y - 11.4} C ${HEAD.x - 3},${HEAD.y - 10.4} ${HEAD.x - 5.8},${HEAD.y - 7.4} ${HEAD.x - 6.9},${HEAD.y - 2.6}`}
        fill="none"
        stroke={HAIR_HI}
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d={`M ${HEAD.x + 2.2},${HEAD.y - 11.4} C ${HEAD.x + 5.6},${HEAD.y - 10.4} ${HEAD.x + 8},${HEAD.y - 7.4} ${HEAD.x + 8.8},${HEAD.y - 2.6}`}
        fill="none"
        stroke={HAIR_HI}
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.38"
      />

      {/* Los dos lados que enmarcan la cara, largo de long bob */}
      <path
        d={`M ${HEAD.x - 7.6},${HEAD.y + 0.4}
            C ${HEAD.x - 9},${HEAD.y + 5} ${HEAD.x - 8.9},${HEAD.y + 10} ${HEAD.x - 7.9},${HEAD.y + 14.2}
            Q ${HEAD.x - 7.3},${HEAD.y + 15.9} ${HEAD.x - 6.5},${HEAD.y + 14.4}
            C ${HEAD.x - 6},${HEAD.y + 10} ${HEAD.x - 5.3},${HEAD.y + 5} ${HEAD.x - 4.6},${HEAD.y + 0.8} Z`}
        fill={HAIR}
      />
      <path
        d={`M ${HEAD.x + 9.2},${HEAD.y + 0.4}
            C ${HEAD.x + 10.4},${HEAD.y + 4.6} ${HEAD.x + 10.3},${HEAD.y + 9} ${HEAD.x + 9.3},${HEAD.y + 12.8}
            Q ${HEAD.x + 8.7},${HEAD.y + 14.5} ${HEAD.x + 7.9},${HEAD.y + 13}
            C ${HEAD.x + 7.5},${HEAD.y + 9} ${HEAD.x + 7},${HEAD.y + 4.6} ${HEAD.x + 6.2},${HEAD.y + 0.8} Z`}
        fill={HAIR_S}
      />
    </g>
  );
}

/** Ojo con iris marron y un brillito. */
function Eye({ at, r }: { at: Pt; r: number }) {
  return (
    <>
      <ellipse cx={at.x} cy={at.y} rx={r} ry={r * 1.3} fill={EYE_C} />
      <circle cx={at.x + r * 0.34} cy={at.y - r * 0.5} r={r * 0.36} fill="#FFFFFF" opacity="0.9" />
    </>
  );
}

/** Brazo: manga corta y antebrazo al aire, o manga de cuero hasta la muneca. */
function Arm({
  sho,
  elb,
  wri,
  jacket,
  far = false,
}: {
  sho: Pt;
  elb: Pt;
  wri: Pt;
  jacket: boolean;
  far?: boolean;
}) {
  const mid: Pt = { x: (sho.x + elb.x) / 2, y: (sho.y + elb.y) / 2 };
  const cuff: Pt = jacket ? wri : mid;

  return (
    <g opacity={far ? 0.94 : 1}>
      {/* El brazo de piel va entero: la manga lo tapa desde arriba */}
      <path d={tapered(sho, elb, wri, 2.4, 2.1, 1.7)} fill="url(#avSkinLimb)" />
      <ellipse cx={wri.x} cy={wri.y + 1.7} rx="1.9" ry="2.2" fill={far ? SKIN_MID : SKIN} />

      <g className={jacket ? "room-item" : undefined}>
        {jacket ? (
          <path d={tapered(sho, elb, cuff, 2.85, 2.4, 2.05)} fill="url(#avLeather)" />
        ) : (
          /* Manga corta: una tapa redondeada sobre el hombro. Con tapered()
             quedaba una solapa despegada del cuerpo, porque el tubo es mas
             ancho que el brazo y arranca por debajo de la linea de hombros. */
          <path
            d={`M ${sho.x - 2.85},${sho.y + 0.4}
                C ${sho.x - 3.05},${sho.y - 3.6} ${sho.x + 3.05},${sho.y - 3.6} ${sho.x + 2.85},${sho.y + 0.4}
                C ${sho.x + 2.7},${sho.y + 4.6} ${sho.x + 2.3},${sho.y + 6.4} ${sho.x + 2.1},${sho.y + 6.8}
                Q ${sho.x},${sho.y + 7.6} ${sho.x - 2.1},${sho.y + 6.8}
                C ${sho.x - 2.3},${sho.y + 6.4} ${sho.x - 2.7},${sho.y + 4.6} ${sho.x - 2.85},${sho.y + 0.4} Z`}
            fill="url(#avTee)"
          />
        )}
        {jacket && (
          <path
            d={`M ${cuff.x - 2.2},${cuff.y - 1.4} Q ${cuff.x},${cuff.y - 0.6} ${cuff.x + 2.2},${cuff.y - 1.4}
                L ${cuff.x + 2.2},${cuff.y + 0.4} Q ${cuff.x},${cuff.y + 1.2} ${cuff.x - 2.2},${cuff.y + 0.4} Z`}
            fill={LEATHER_HI}
            opacity={far ? 0.55 : 0.85}
          />
        )}
      </g>
    </g>
  );
}

/** Pierna: bermuda de jean + pierna al aire + media, o pantalon largo. */
function Leg({
  hip,
  knee,
  ankle,
  pants,
  loafers,
  far = false,
}: {
  hip: Pt;
  knee: Pt;
  ankle: Pt;
  pants: boolean;
  loafers: boolean;
  far?: boolean;
}) {
  const thigh: Pt = { x: (hip.x + knee.x) / 2 - 0.1, y: (hip.y + knee.y) / 2 + 1.4 };
  const sockTop: Pt = { x: ankle.x, y: ankle.y - 2.8 };

  return (
    <g opacity={far ? 0.95 : 1}>
      {/* La pierna de piel va entera: encima se le van poniendo las prendas */}
      <path d={tapered(hip, knee, ankle, 2.9, 2.3, 1.75)} fill="url(#avSkinLimb)" />

      {pants ? (
        <g className="room-item">
          <path
            d={tapered(hip, knee, { x: ankle.x, y: ankle.y + 1.2 }, 3.6, 3.2, 2.5)}
            fill="url(#avTrack)"
          />
          {/* Las tres tiras son trazos paralelos al borde externo de la
              pierna, no un bloque. Solo se ven en la pierna derecha, que es
              la que muestra esa costura desde esta rotacion. */}
          {!far &&
            [0, 0.8, 1.6].map((off) => (
              <path
                key={off}
                d={`M ${hip.x - 3.35 + off},${hip.y + 0.8}
                    C ${knee.x - 3.05 + off},${knee.y - 2} ${knee.x - 2.95 + off},${knee.y + 1} ${ankle.x - 2.3 + off},${ankle.y + 0.9}`}
                fill="none"
                stroke={STRIPE}
                strokeWidth="0.4"
                strokeLinecap="round"
                opacity="0.92"
              />
            ))}
        </g>
      ) : (
        <>
          {/* Bermuda de jean, hasta media pierna */}
          <path
            d={tapered(hip, thigh, { x: thigh.x, y: thigh.y + 1.6 }, 3.5, 3.3, 3.1)}
            fill="url(#avDenim)"
          />
          <path
            d={`M ${thigh.x - 3.1},${thigh.y + 1.6} Q ${thigh.x},${thigh.y + 2.8} ${thigh.x + 3.1},${thigh.y + 1.6}
                L ${thigh.x + 3.1},${thigh.y + 0.5} Q ${thigh.x},${thigh.y + 1.7} ${thigh.x - 3.1},${thigh.y + 0.5} Z`}
            fill={DENIM_S}
          />
          {!loafers && (
            <path
              d={tapered(
                sockTop,
                { x: ankle.x, y: ankle.y - 1 },
                { x: ankle.x, y: ankle.y + 1 },
                2,
                1.9,
                1.85,
              )}
              fill="url(#avSock)"
            />
          )}
        </>
      )}
    </g>
  );
}

/** Pie: en media o en mocasin. */
function Foot({ at, loafers, far = false }: { at: Pt; loafers: boolean; far?: boolean }) {
  if (loafers) {
    return (
      <g className="room-item" opacity={far ? 0.95 : 1}>
        <path d={foot(at, 4.6, 2.2, 1.8)} fill="url(#avLoafer)" />
        {/* Antifaz del mocasin */}
        <path
          d={`M ${at.x + 0.2},${at.y - 2.4} C ${at.x + 1.8},${at.y - 3.2} ${at.x + 3.4},${at.y - 2.2} ${at.x + 3.6},${at.y - 0.9}
              C ${at.x + 2.4},${at.y - 1.4} ${at.x + 1},${at.y - 1.6} ${at.x + 0.2},${at.y - 2.4} Z`}
          fill={LOAFER_HI}
        />
        {/* Herraje plateado del empeine */}
        <path
          d={`M ${at.x + 1},${at.y - 2.5} L ${at.x + 3.2},${at.y - 1.9}`}
          stroke="#C6CAD2"
          strokeWidth="0.55"
          strokeLinecap="round"
        />
        {/* Suela: en la foto es una plataforma gruesa con tacos */}
        <path
          d={`M ${at.x - 2.4},${at.y + 0.4} C ${at.x - 1.4},${at.y + 2.2} ${at.x + 2.6},${at.y + 3} ${at.x + 4.2},${at.y + 1.6}
              C ${at.x + 2.6},${at.y + 2.6} ${at.x - 1},${at.y + 1.8} ${at.x - 2.4},${at.y + 0.4} Z`}
          fill={LOAFER_S}
        />
      </g>
    );
  }

  return (
    <g opacity={far ? 0.95 : 1}>
      <path d={foot(at, 3.8, 2, 1.5)} fill="url(#avSock)" />
      <path
        d={`M ${at.x - 2},${at.y + 0.2} C ${at.x - 1},${at.y + 1.8} ${at.x + 2.2},${at.y + 2.6} ${at.x + 3.5},${at.y + 1.3}
            C ${at.x + 2.2},${at.y + 2.2} ${at.x - 0.8},${at.y + 1.5} ${at.x - 2},${at.y + 0.2} Z`}
        fill={SOCK_S}
      />
    </g>
  );
}
