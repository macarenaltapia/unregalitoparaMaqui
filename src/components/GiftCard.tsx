"use client";

import { Gift } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui";

interface GiftCardProps {
  gift: Gift;
  isUnlocked: boolean;
  index: number;
}

export default function GiftCard({ gift, isUnlocked, index }: GiftCardProps) {
  return (
    <a
      href={gift.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`group sims-panel block transition-all duration-300 hover:-translate-y-1 opacity-0 animate-fade-in-up stagger-${index + 1}`}
      style={{
        borderColor: isUnlocked
          ? "var(--color-plumbob)"
          : "rgba(255, 255, 255, 0.9)",
        boxShadow: isUnlocked
          ? "0 10px 30px -8px rgba(47, 212, 74, 0.55)"
          : "var(--panel-shadow)",
      }}
    >
      <div className="relative z-10">
        <div className="relative aspect-square overflow-hidden rounded-[calc(var(--radius-card)-6px)] m-1">
          <img
            src={gift.image}
            alt={gift.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ filter: isUnlocked ? "none" : "grayscale(0.85)" }}
          />
          {isUnlocked && (
            <div className="absolute top-2 right-2">
              <Badge />
            </div>
          )}
        </div>

        <div className="p-5 pt-3">
          <h3
            className="text-lg font-semibold mb-1 text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            <span className="mr-1.5">{gift.emoji}</span>
            {gift.name}
          </h3>
          <p
            className="text-xl font-bold"
            style={{
              fontFamily: "var(--font-fredoka)",
              color: isUnlocked
                ? "var(--color-plumbob-deep)"
                : "var(--color-cyan-deep)",
            }}
          >
            {formatPrice(gift.price)}
          </p>
          <p className="text-xs mt-2 font-semibold text-[var(--color-cyan)] group-hover:underline">
            Ver producto →
          </p>
        </div>
      </div>
    </a>
  );
}
