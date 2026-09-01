"use client";

import { useState } from "react";
import { AvatarArt } from "@/types";
import { PERSON_NAME } from "@/data/config";
import { gifts } from "@/data/gifts";
import Avatar from "./Avatar";
import { roomProps } from "./art";
import { rackArt } from "./rack";
import {
  Box,
  N,
  Pt,
  boxTopCenter,
  floorPos,
  isoBox,
  points,
  wallLeft,
  wallRight,
} from "./geometry";

interface SimsRoomProps {
  unlocked: AvatarArt[];
}

/**
 * Habitacion isometrica con la camara en diagonal desde arriba, como en el
 * juego. Ver geometry.ts para el sistema de coordenadas.
 *
 * A diferencia de la primera version, esto NO es pixel art: The Sims era 3D
 * pre-renderizado, o sea bordes suavizados, degradados en cada superficie y
 * sombra de contacto abajo de cada objeto. Se ve "pixelado" en las capturas de
 * la epoca solo porque el juego corria en 800x600.
 */

const WALL_H = 82;
const WAINSCOT_H = 30;

/** Caras de una caja apoyada en el piso. La tapa es la mas clara y la cara
 *  que mira al frente-izquierda es la que menos luz recibe. */
function IsoBox({
  box,
  top,
  right,
  left,
}: {
  box: Box;
  top: string;
  right: string;
  left: string;
}) {
  return (
    <>
      <polygon points={points(box.p00, box.p01, box.t01, box.t00)} fill={left} />
      <polygon points={points(box.p01, box.p11, box.t11, box.t01)} fill={right} />
      <polygon points={points(box.t00, box.t10, box.t11, box.t01)} fill={top} />
    </>
  );
}

/** Mancha oscura abajo de un mueble, para que no parezca flotar. */
function ContactShadow({ box }: { box: Box }) {
  const c = {
    x: (box.p00.x + box.p10.x + box.p11.x + box.p01.x) / 4,
    y: (box.p00.y + box.p10.y + box.p11.y + box.p01.y) / 4,
  };
  const rx = Math.abs(box.p11.x - box.p00.x) / 2 + 3;

  return <ellipse cx={c.x} cy={c.y} rx={rx} ry={rx / 2.6} fill="url(#gContact)" />;
}

// Muebles, ubicados en coordenadas de baldosa: garantiza que no se salgan
// del piso, que es lo que pasaba cuando estaban puestos a ojo en pixeles.
const SHELF = isoBox(1.2, 0.2, 2.6, 1.1, 34);
const DRESSER = isoBox(5.4, 1.8, 6.8, 3.2, 26);

// Perchero: dos parantes y un riel, contra la pared izquierda
const RACK_B = 0.55;
const RACK_H = 44;
const RACK_LEFT = floorPos(3.1, RACK_B);
const RACK_RIGHT = floorPos(5.85, RACK_B);

// Cada prenda tiene su lugar fijo en el riel, asi no saltan de posicion
// cuando se saca una. Los mocasines van en el piso, a los pies del perchero.
const RACK_SLOT: Partial<Record<AvatarArt, number>> = {
  "pantalon-adidas": 3.45,
  "campera-cuero": 4.1,
  "camisa-blanca": 4.75,
  "vestido-negro": 5.4,
};

// El vestido y el conjunto camisa+pantalon no pueden convivir: ponerse uno
// devuelve el otro al perchero, como cuando cambiabas de ropa en el juego.
const EXCLUYE: Partial<Record<AvatarArt, AvatarArt[]>> = {
  "vestido-negro": ["camisa-blanca", "pantalon-adidas"],
  "camisa-blanca": ["vestido-negro"],
  "pantalon-adidas": ["vestido-negro"],
};
const SHOES_AT = floorPos(4.15, 1.5);

// Donde se para el avatar y donde se apoyan los regalos
const STAND = floorPos(3.2, 3.8);
const DRESSER_TOP = boxTopCenter(DRESSER);

// Ventanas y cuadro, en fraccion de pared y altura
const WIN_L = { t0: 0.58, t1: 0.8, h0: 40, h1: 68 };
const WIN_R = { t0: 0.62, t1: 0.84, h0: 40, h1: 68 };
const PIC = { t0: 0.4, t1: 0.53, h0: 44, h1: 66 };

const panelTs = [0.14, 0.28, 0.42, 0.56, 0.7, 0.84];

export default function SimsRoom({ unlocked }: SimsRoomProps) {
  // Las prendas desbloqueadas arrancan colgadas del perchero; se le ponen al
  // avatar recien cuando alguien las clickea.
  const [worn, setWorn] = useState<AvatarArt[]>([]);
  const onDresser = unlocked.filter((art) => art in roomProps);
  const onRack = unlocked.filter(
    (art) => art in rackArt && !worn.includes(art),
  );
  const wear = (art: AvatarArt) =>
    setWorn((w) => {
      if (w.includes(art)) return w;
      const fuera = EXCLUYE[art] ?? [];
      return [...w.filter((a) => !fuera.includes(a)), art];
    });

  return (
    <div className="sims-panel mx-auto max-w-md p-2">
      <div className="relative z-10 overflow-hidden rounded-[calc(var(--radius-card)-8px)]">
        <svg
          viewBox="12 -30 296 236"
          className="w-full h-auto block"
          role="img"
          aria-label={`Habitacion de ${PERSON_NAME} con los regalos desbloqueados`}
        >
          <defs>
            {/* Pared pintada: la izquierda recibe la luz, la derecha queda en sombra */}
            <linearGradient id="gWallL" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F6EBD6" />
              <stop offset="100%" stopColor="#E2CFB2" />
            </linearGradient>
            <linearGradient id="gWallR" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#DCC7A8" />
              <stop offset="100%" stopColor="#C6AE8D" />
            </linearGradient>
            <linearGradient id="gWainL" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#CFA269" />
              <stop offset="100%" stopColor="#B98A50" />
            </linearGradient>
            <linearGradient id="gWainR" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#AE7B45" />
              <stop offset="100%" stopColor="#96632F" />
            </linearGradient>

            {/* Piso: mas claro al fondo, se apaga hacia adelante */}
            <linearGradient id="gFloor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EBD3AC" />
              <stop offset="100%" stopColor="#CFAF83" />
            </linearGradient>

            {/* Maderas de los muebles */}
            <linearGradient id="gWoodTop" x1="0" y1="0" x2="1" y2="0.4">
              <stop offset="0%" stopColor="#E5BC84" />
              <stop offset="100%" stopColor="#CE9F63" />
            </linearGradient>
            <linearGradient id="gWoodR" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#BE8A4E" />
              <stop offset="100%" stopColor="#A0703A" />
            </linearGradient>
            <linearGradient id="gWoodL" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8E6234" />
              <stop offset="100%" stopColor="#734C27" />
            </linearGradient>

            {/* Vidrio de las ventanas */}
            <linearGradient id="gGlass" x1="0" y1="0" x2="0.3" y2="1">
              <stop offset="0%" stopColor="#CFEEFB" />
              <stop offset="55%" stopColor="#93D3EF" />
              <stop offset="100%" stopColor="#6FB6D8" />
            </linearGradient>

            {/* Afuera del cuarto */}
            <linearGradient id="gOutside" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6E9E57" />
              <stop offset="100%" stopColor="#43703A" />
            </linearGradient>

            {/* Aureola de las prendas clickeables */}
            <radialGradient id="gGlow">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="45%" stopColor="#9BF7A4" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#2FD44A" stopOpacity="0" />
            </radialGradient>

            {/* Sombra de contacto reutilizable */}
            <radialGradient id="gContact">
              <stop offset="0%" stopColor="#3A2A18" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#3A2A18" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* ---------- Lo que se ve mas alla del cuarto ---------- */}
          <rect x="12" y="-30" width="296" height="236" fill="url(#gOutside)" />

          {/* ---------- Pared izquierda ---------- */}
          <polygon
            points={points(
              wallLeft(0, WAINSCOT_H),
              wallLeft(1, WAINSCOT_H),
              wallLeft(1, WALL_H),
              wallLeft(0, WALL_H),
            )}
            fill="url(#gWallL)"
          />
          <polygon
            points={points(
              wallLeft(0, 0),
              wallLeft(1, 0),
              wallLeft(1, WAINSCOT_H),
              wallLeft(0, WAINSCOT_H),
            )}
            fill="url(#gWainL)"
          />

          {/* ---------- Pared derecha ---------- */}
          <polygon
            points={points(
              wallRight(0, WAINSCOT_H),
              wallRight(1, WAINSCOT_H),
              wallRight(1, WALL_H),
              wallRight(0, WALL_H),
            )}
            fill="url(#gWallR)"
          />
          <polygon
            points={points(
              wallRight(0, 0),
              wallRight(1, 0),
              wallRight(1, WAINSCOT_H),
              wallRight(0, WAINSCOT_H),
            )}
            fill="url(#gWainR)"
          />

          {/* Listones del revestimiento */}
          {panelTs.map((t) => (
            <g key={t} opacity="0.3">
              <line
                x1={wallLeft(t, 0).x}
                y1={wallLeft(t, 0).y}
                x2={wallLeft(t, WAINSCOT_H).x}
                y2={wallLeft(t, WAINSCOT_H).y}
                stroke="#6F4A2B"
                strokeWidth="0.8"
              />
              <line
                x1={wallRight(t, 0).x}
                y1={wallRight(t, 0).y}
                x2={wallRight(t, WAINSCOT_H).x}
                y2={wallRight(t, WAINSCOT_H).y}
                stroke="#54371F"
                strokeWidth="0.8"
              />
            </g>
          ))}

          {/* Moldura que separa revestimiento de pared */}
          <polyline
            points={points(
              wallLeft(0, WAINSCOT_H),
              wallLeft(1, WAINSCOT_H),
              wallRight(1, WAINSCOT_H),
            )}
            fill="none"
            stroke="#8A5F38"
            strokeWidth="2"
          />
          {/* Cornisa arriba */}
          <polyline
            points={points(
              wallLeft(0, WALL_H),
              wallLeft(1, WALL_H),
              wallRight(1, WALL_H),
            )}
            fill="none"
            stroke="#FBF3E4"
            strokeWidth="2.5"
          />

          {/* ---------- Ventanas ---------- */}
          <Window corner="left" spec={WIN_L} />
          <Window corner="right" spec={WIN_R} />

          {/* ---------- Cuadro en la pared izquierda ---------- */}
          <polygon
            points={points(
              wallLeft(PIC.t0, PIC.h0),
              wallLeft(PIC.t1, PIC.h0),
              wallLeft(PIC.t1, PIC.h1),
              wallLeft(PIC.t0, PIC.h1),
            )}
            fill="#8A5F38"
          />
          <polygon
            points={points(
              wallLeft(PIC.t0 + 0.015, PIC.h0 + 2.5),
              wallLeft(PIC.t1 - 0.015, PIC.h0 + 2.5),
              wallLeft(PIC.t1 - 0.015, PIC.h1 - 2.5),
              wallLeft(PIC.t0 + 0.015, PIC.h1 - 2.5),
            )}
            fill="#EFE7D2"
          />
          <polygon
            points={points(
              wallLeft(PIC.t0 + 0.015, PIC.h0 + 2.5),
              wallLeft(PIC.t1 - 0.015, PIC.h0 + 2.5),
              wallLeft(PIC.t1 - 0.015, PIC.h0 + 8),
              wallLeft(PIC.t0 + 0.015, PIC.h0 + 8),
            )}
            fill="#84BC8E"
          />
          <circle
            cx={wallLeft(PIC.t1 - 0.04, PIC.h1 - 6).x}
            cy={wallLeft(PIC.t1 - 0.04, PIC.h1 - 6).y}
            r="2.6"
            fill="#F2CE72"
          />

          {/* ---------- Piso ---------- */}
          <polygon
            points={points(
              floorPos(N, 0),
              floorPos(N, N),
              floorPos(0, N),
              floorPos(0, 0),
            )}
            fill="url(#gFloor)"
          />
          {/* Baldosas */}
          {Array.from({ length: N - 1 }, (_, i) => i + 1).map((i) => (
            <g key={i} stroke="#B58F5F" strokeWidth="0.5" opacity="0.45">
              <line
                x1={floorPos(i, 0).x}
                y1={floorPos(i, 0).y}
                x2={floorPos(i, N).x}
                y2={floorPos(i, N).y}
              />
              <line
                x1={floorPos(0, i).x}
                y1={floorPos(0, i).y}
                x2={floorPos(N, i).x}
                y2={floorPos(N, i).y}
              />
            </g>
          ))}

          {/* ---------- Alfombra ---------- */}
          <polygon
            points={points(
              floorPos(2.1, 2.1),
              floorPos(4.9, 2.1),
              floorPos(4.9, 4.9),
              floorPos(2.1, 4.9),
            )}
            fill="#C98B9E"
          />
          <polygon
            points={points(
              floorPos(2.5, 2.5),
              floorPos(4.5, 2.5),
              floorPos(4.5, 4.5),
              floorPos(2.5, 4.5),
            )}
            fill="#E6B6C5"
          />
          <polygon
            points={points(
              floorPos(3.05, 3.05),
              floorPos(3.95, 3.05),
              floorPos(3.95, 3.95),
              floorPos(3.05, 3.95),
            )}
            fill="#C98B9E"
          />

          {/* ---------- Biblioteca ---------- */}
          <ContactShadow box={SHELF} />
          <IsoBox box={SHELF} top="url(#gWoodTop)" right="url(#gWoodR)" left="url(#gWoodL)" />
          {/* Hueco oscuro: sin esto los libros parecen pegados por fuera */}
          <polygon
            points={points(
              { x: floorPos(1.32, 1.1).x, y: floorPos(1.32, 1.1).y - 3 },
              { x: floorPos(2.48, 1.1).x, y: floorPos(2.48, 1.1).y - 3 },
              { x: floorPos(2.48, 1.1).x, y: floorPos(2.48, 1.1).y - 31 },
              { x: floorPos(1.32, 1.1).x, y: floorPos(1.32, 1.1).y - 31 },
            )}
            fill="#4A3117"
          />
          {/* Estantes con libros, sobre la cara que mira al frente-derecha.
              Los libros se ensanchan siguiendo el eje `a` de la pared, o sea
              (+x, -y): con (+x, +y) quedan tumbados para el lado equivocado. */}
          {[0, 1, 2].map((i) => {
            const h = 4 + i * 9;
            const a = floorPos(1.32, 1.1);
            const b = floorPos(2.48, 1.1);

            return (
              <g key={i}>
                <polygon
                  points={points(
                    { x: a.x, y: a.y - h },
                    { x: b.x, y: b.y - h },
                    { x: b.x, y: b.y - h - 1.4 },
                    { x: a.x, y: a.y - h - 1.4 },
                  )}
                  fill="#8E6234"
                />
                {[0, 1, 2].map((j) => {
                  const p = floorPos(1.42 + j * 0.36, 1.1);
                  const w = 6.4;
                  const bh = 5.6 + ((i + j) % 3) * 0.8;
                  const color = ["#3F6B93", "#C0553F", "#C8A24A", "#5E9A63"][
                    (i * 3 + j) % 4
                  ];

                  return (
                    <polygon
                      key={j}
                      points={points(
                        { x: p.x, y: p.y - h - 1.4 },
                        { x: p.x + w, y: p.y - h - 1.4 - w / 2 },
                        { x: p.x + w, y: p.y - h - 1.4 - w / 2 - bh },
                        { x: p.x, y: p.y - h - 1.4 - bh },
                      )}
                      fill={color}
                    />
                  );
                })}
              </g>
            );
          })}

          {/* ---------- Comoda ---------- */}
          <ContactShadow box={DRESSER} />
          <IsoBox box={DRESSER} top="url(#gWoodTop)" right="url(#gWoodR)" left="url(#gWoodL)" />
          {/* Cajones sobre la cara frente-derecha */}
          {[0, 1].map((i) => {
            const h = 5 + i * 10;
            const a = floorPos(5.55, 3.2);
            const b = floorPos(6.65, 3.2);

            return (
              <g key={i}>
                <polygon
                  points={points(
                    { x: a.x, y: a.y - h },
                    { x: b.x, y: b.y - h },
                    { x: b.x, y: b.y - h - 7 },
                    { x: a.x, y: a.y - h - 7 },
                  )}
                  fill="#8E6234"
                  stroke="#6B4726"
                  strokeWidth="0.6"
                />
                <circle
                  cx={(a.x + b.x) / 2}
                  cy={(a.y + b.y) / 2 - h - 3.5}
                  r="1.3"
                  fill="#E9CE9A"
                />
              </g>
            );
          })}

          {/* ---------- Regalos sobre la comoda ---------- */}
          {onDresser.map((art, i) => {
            const Piece = roomProps[art]!;

            return (
              <g key={art} transform={`translate(${-8 + i * 16} ${i * 4})`}>
                <g className="room-item">
                  <Piece x={DRESSER_TOP.x} y={DRESSER_TOP.y} />
                </g>
              </g>
            );
          })}

          {/* ---------- Perchero ---------- */}
          <ellipse
            cx={(RACK_LEFT.x + RACK_RIGHT.x) / 2}
            cy={(RACK_LEFT.y + RACK_RIGHT.y) / 2}
            rx="33"
            ry="12"
            fill="url(#gContact)"
          />
          <RackPost at={RACK_LEFT} />
          <RackPost at={RACK_RIGHT} />
          <line
            x1={RACK_LEFT.x}
            y1={RACK_LEFT.y - RACK_H}
            x2={RACK_RIGHT.x}
            y2={RACK_RIGHT.y - RACK_H}
            stroke="#8A5F38"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1={RACK_LEFT.x}
            y1={RACK_LEFT.y - RACK_H - 0.7}
            x2={RACK_RIGHT.x}
            y2={RACK_RIGHT.y - RACK_H - 0.7}
            stroke="#C89A5E"
            strokeWidth="0.7"
            strokeLinecap="round"
          />

          {/* ---------- Prendas colgadas, clickeables ---------- */}
          {onRack.map((art) => {
            const Piece = rackArt[art]!;
            const slot = RACK_SLOT[art];
            const at: Pt = slot
              ? {
                  x: floorPos(slot, RACK_B).x,
                  y: floorPos(slot, RACK_B).y - RACK_H + 2.4,
                }
              : SHOES_AT;
            const label = gifts.find((g) => g.avatar?.art === art)?.name ?? art;
            const glow = slot ? { cy: at.y + 10, r: 13 } : { cy: at.y, r: 10 };

            return (
              <g
                key={art}
                className="rack-item"
                role="button"
                tabIndex={0}
                aria-label={`Ponerle ${label} a ${PERSON_NAME}`}
                onClick={() => wear(art)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    wear(art);
                  }
                }}
              >
                {/* Aureola: avisa que se puede clickear */}
                <circle
                  className="rack-glow"
                  cx={at.x}
                  cy={glow.cy}
                  r={glow.r}
                  fill="url(#gGlow)"
                />
                <Piece x={at.x} y={at.y} />
              </g>
            );
          })}

          {/* ---------- Plumbob flotando sobre la cabeza ---------- */}
          <g className="animate-plumbob-float">
            <polygon
              points={points(
                { x: STAND.x, y: STAND.y - 104 },
                { x: STAND.x - 7, y: STAND.y - 92 },
                { x: STAND.x, y: STAND.y - 92 },
              )}
              fill="#9BF7A4"
            />
            <polygon
              points={points(
                { x: STAND.x, y: STAND.y - 104 },
                { x: STAND.x + 7, y: STAND.y - 92 },
                { x: STAND.x, y: STAND.y - 92 },
              )}
              fill="#3FE057"
            />
            <polygon
              points={points(
                { x: STAND.x - 7, y: STAND.y - 92 },
                { x: STAND.x, y: STAND.y - 80 },
                { x: STAND.x, y: STAND.y - 92 },
              )}
              fill="#2FD44A"
            />
            <polygon
              points={points(
                { x: STAND.x + 7, y: STAND.y - 92 },
                { x: STAND.x, y: STAND.y - 80 },
                { x: STAND.x, y: STAND.y - 92 },
              )}
              fill="#12A33A"
            />
          </g>

          {/* ---------- El avatar ---------- */}
          <Avatar unlocked={worn} x={STAND.x} y={STAND.y} scale={1.16} />
        </svg>
      </div>
    </div>
  );
}

/** Ventana con marco blanco, apoyada sobre una de las dos paredes. */
function Window({
  corner,
  spec,
}: {
  corner: "left" | "right";
  spec: { t0: number; t1: number; h0: number; h1: number };
}) {
  const at = corner === "left" ? wallLeft : wallRight;
  const { t0, t1, h0, h1 } = spec;
  const inset = 0.016;

  return (
    <g>
      <polygon
        points={points(at(t0, h0), at(t1, h0), at(t1, h1), at(t0, h1))}
        fill="#FBFDFE"
      />
      <polygon
        points={points(
          at(t0 + inset, h0 + 2.5),
          at(t1 - inset, h0 + 2.5),
          at(t1 - inset, h1 - 2.5),
          at(t0 + inset, h1 - 2.5),
        )}
        fill="url(#gGlass)"
      />
      {/* Travesanos */}
      <line
        x1={at((t0 + t1) / 2, h0 + 2.5).x}
        y1={at((t0 + t1) / 2, h0 + 2.5).y}
        x2={at((t0 + t1) / 2, h1 - 2.5).x}
        y2={at((t0 + t1) / 2, h1 - 2.5).y}
        stroke="#FBFDFE"
        strokeWidth="1.8"
      />
      <line
        x1={at(t0 + inset, (h0 + h1) / 2).x}
        y1={at(t0 + inset, (h0 + h1) / 2).y}
        x2={at(t1 - inset, (h0 + h1) / 2).x}
        y2={at(t1 - inset, (h0 + h1) / 2).y}
        stroke="#FBFDFE"
        strokeWidth="1.8"
      />
    </g>
  );
}

/** Un parante del perchero, con su pie. */
function RackPost({ at }: { at: Pt }) {
  return (
    <g>
      <ellipse cx={at.x} cy={at.y} rx="3.4" ry="1.7" fill="#7A5330" />
      <polygon
        points={points(
          { x: at.x - 0.9, y: at.y },
          { x: at.x + 0.9, y: at.y },
          { x: at.x + 0.9, y: at.y - RACK_H },
          { x: at.x - 0.9, y: at.y - RACK_H },
        )}
        fill="#8A5F38"
      />
      <polygon
        points={points(
          { x: at.x - 0.9, y: at.y },
          { x: at.x - 0.2, y: at.y },
          { x: at.x - 0.2, y: at.y - RACK_H },
          { x: at.x - 0.9, y: at.y - RACK_H },
        )}
        fill="#C89A5E"
      />
    </g>
  );
}
