"use client";

import { gifts, getTotalGoal, getUnlockedGifts } from "@/data/gifts";
import { formatPrice } from "@/lib/utils";

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
      <div className="text-center mb-6">
        <p
          className="text-4xl md:text-5xl text-[#D94F8A]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {formatPrice(total)}
        </p>
        <p className="text-base mt-2 text-[#8A7E72]">
          recaudados de {formatPrice(goal)}
        </p>
      </div>

      <div className="relative">
        <div className="h-3 rounded-full overflow-hidden bg-[var(--color-border)]">
          <div
            className="h-full rounded-full animate-fill-bar transition-all duration-1000"
            style={{
              width: `${percentage}%`,
              background: "var(--gradient-bar)",
            }}
          />
        </div>

        <div className="flex justify-between mt-6">
          {milestones.map((milestone) => (
            <div
              key={milestone.id}
              className="flex flex-col items-center text-center transition-all duration-500"
              style={{
                opacity: milestone.isUnlocked ? 1 : 0.4,
                transform: milestone.isUnlocked ? "scale(1)" : "scale(0.9)",
              }}
            >
              <span
                className="text-2xl mb-1"
                style={{
                  filter: milestone.isUnlocked ? "none" : "grayscale(1)",
                }}
              >
                {milestone.emoji}
              </span>
              <span
                className="text-xs font-medium"
                style={{
                  color: milestone.isUnlocked
                    ? "var(--color-rosa)"
                    : "var(--color-gris)",
                }}
              >
                {formatPrice(milestone.price)}
              </span>
              <span className="text-[var(--size-metadata)] mt-0.5 text-[var(--color-gris)]">
                {milestone.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
