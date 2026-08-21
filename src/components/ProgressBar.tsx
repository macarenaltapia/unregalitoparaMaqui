"use client";

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

        <div className="flex justify-between mt-7">
          {milestones.map((milestone) => (
            <div
              key={milestone.id}
              className="flex flex-col items-center text-center transition-all duration-500"
              style={{
                opacity: milestone.isUnlocked ? 1 : 0.5,
                transform: milestone.isUnlocked ? "scale(1)" : "scale(0.9)",
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
                    : "var(--color-slate)",
                }}
              >
                {formatPrice(milestone.price)}
              </span>
              <span className="text-[var(--size-metadata)] mt-0.5 text-[var(--color-slate)]">
                {milestone.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
