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
      className={`group block rounded-[var(--radius-card)] transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] opacity-0 animate-fade-in-up stagger-${index + 1} bg-white border`}
      style={{
        borderColor: isUnlocked ? "var(--color-rosa)" : "var(--color-border)",
        borderWidth: isUnlocked ? "2px" : "1px",
      }}
    >
      <div className="relative aspect-square overflow-hidden rounded-t-[var(--radius-card)]">
        <img
          src={gift.image}
          alt={gift.name}
          className="w-full h-full object-cover grayscale"
        />
        {isUnlocked && (
          <div className="absolute top-3 right-3">
            <Badge>✓</Badge>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3
          className="text-lg mb-1 text-[var(--color-negro)]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {gift.name}
        </h3>
        <p className="text-lg font-medium text-[var(--color-rosa)]">
          {formatPrice(gift.price)}
        </p>
        <p className="text-xs mt-2 text-[var(--color-gris)] group-hover:underline">
          Ver producto →
        </p>
      </div>
    </a>
  );
}
