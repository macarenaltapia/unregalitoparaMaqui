"use client";

import { Fragment } from "react";

import {
  gifts,
  getTotalGoal,
  getUnlockedGifts,
  getUnlockedArt,
} from "@/data/gifts";
import { formatPrice } from "@/lib/utils";
import { Plumbob } from "@/components/ui";
import SimsRoom from "@/components/room/SimsRoom";

interface ProgressBarProps {
  total: number;
}

export default function ProgressBar({ total }: ProgressBarProps) {
  const goal = getTotalGoal();
  const percentage = Math.min((total / goal) * 100, 100);
  const unlocked = getUnlockedGifts(total);
  let accumulated = 0;
  const milestones = gifts.map((gift) => {
    accumulated += gift.price;
    return {
      ...gift,
      threshold: accumulated,
      position: (accumulated / goal) * 100,
      isUnlocked: unlocked.includes(gift.id),
    };
  });

  // El proximo regalo por desbloquear: se marca rayado sobre la barra y
  // abajo se dice cuanto falta. Si ya estan todos, next queda undefined.
  const next = milestones.find((m) => !m.isUnlocked);

  return (
    <section className="px-6 py-12 max-w-2xl mx-auto w-full animate-fade-in-up">
      {/* La habitacion, fija arriba de la barra */}
      <div className="mb-8">
        <SimsRoom unlocked={getUnlockedArt(total)} />
      </div>

      <div className="text-center mb-6">
        <p
          className="text-5xl md:text-6xl font-semibold text-[var(--color-plumbob-deep)]"
          style={{
            fontFamily: "var(--font-fredoka)",
            textShadow: "0 3px 14px rgba(47, 212, 74, 0.4)",
          }}
        >
          {formatPrice(total)}
        </p>
        <p className="text-base mt-2 text-[var(--color-slate)]">
          recaudados de{" "}
          <span className="font-semibold text-[var(--color-navy)]">
            {formatPrice(goal)}
          </span>
        </p>
      </div>

      {/* Barra de necesidades: segmentada y con relleno verde, como en el juego */}
      <div className="relative">
        <div className="need-bar h-6 rounded-full overflow-hidden bg-[var(--color-sky-deep)]">
          <div
            className="need-bar-fill h-full rounded-full animate-fill-bar transition-all duration-1000"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Cada regalo cae sobre la barra en la posicion de su umbral acumulado,
            para que se vea cuanta barra falta para llegar a cada uno.

            Dos detalles que hacen falta si o si:
            - Van alternados en dos alturas. Los ultimos dos hitos quedan a 15%
              de distancia y los nombres se pisarian, sobre todo en celular.
            - El ultimo cae en el 100%, o sea justo en el borde. Centrar ahi la
              etiqueta la deja media afuera, asi que segun donde caiga se ancla
              por la izquierda, por el centro o por la derecha, y la guia va
              siempre pegada a ese mismo borde. */}
        <div className="relative mt-1 h-[236px] [--hito-w:88px] sm:h-[212px] sm:[--hito-w:128px]">
          {milestones.map((milestone, i) => {
            const isNext = next?.id === milestone.id;
            const bajo = i % 2 === 1;
            const guia = bajo ? 122 : 12;

            // 0 = pegada a la izquierda, 0.5 = centrada, 1 = a la derecha
            const ancla =
              milestone.position <= 8 ? 0 : milestone.position >= 92 ? 1 : 0.5;

            return (
              <Fragment key={milestone.id}>
                <span
                  className="absolute top-0 w-px"
                  style={{
                    left: `calc(${milestone.position}% - ${ancla}px)`,
                    height: guia,
                    background: milestone.isUnlocked
                      ? "var(--color-plumbob)"
                      : "var(--color-border)",
                  }}
                  aria-hidden="true"
                />

                <div
                  className={`absolute flex w-[var(--hito-w)] flex-col transition-all duration-500 ${
                    ancla === 0
                      ? "items-start text-left"
                      : ancla === 1
                        ? "items-end text-right"
                        : "items-center text-center"
                  }`}
                  style={{
                    top: guia,
                    left: `calc(${milestone.position}% - ${ancla} * var(--hito-w))`,
                    opacity: milestone.isUnlocked ? 1 : isNext ? 0.9 : 0.45,
                    transform:
                      milestone.isUnlocked || isNext ? "scale(1)" : "scale(0.9)",
                    transformOrigin: `${ancla * 100}% 0`,
                  }}
                >
                  <Plumbob
                    size={26}
                    dimmed={!milestone.isUnlocked}
                    animation={milestone.isUnlocked ? "float" : "none"}
                  />
                  <span
                    className="text-xl mt-1"
                    style={{
                      filter: milestone.isUnlocked ? "none" : "grayscale(1)",
                    }}
                  >
                    {milestone.emoji}
                  </span>
                  <span
                    className="text-xs font-bold mt-0.5"
                    style={{
                      fontFamily: "var(--font-fredoka)",
                      color: milestone.isUnlocked
                        ? "var(--color-plumbob-deep)"
                        : isNext
                          ? "var(--color-navy)"
                          : "var(--color-slate)",
                    }}
                  >
                    {formatPrice(milestone.price)}
                  </span>
                  <span className="text-[var(--size-metadata)] mt-0.5 leading-tight text-[var(--color-slate)]">
                    {milestone.name}
                  </span>
                </div>
              </Fragment>
            );
          })}
        </div>

        {next ? (
          <p className="mt-7 text-center text-sm font-semibold text-[var(--color-navy)]">
            Faltan{" "}
            <span className="text-[var(--color-plumbob-deep)]">
              {formatPrice(next.threshold - total)}
            </span>{" "}
            para desbloquear {next.emoji} {next.name}
          </p>
        ) : (
          <p className="mt-7 text-center text-sm font-semibold text-[var(--color-plumbob-deep)]">
            Se desbloquearon todos los regalos 🎉
          </p>
        )}
      </div>
    </section>
  );
}
