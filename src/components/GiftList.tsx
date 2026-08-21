"use client";

import { useRef, useState, useEffect } from "react";
import { gifts, getUnlockedGifts } from "@/data/gifts";
import { SectionTitle, Section } from "@/components/ui";
import GiftCard from "./GiftCard";

interface GiftListProps {
  total: number;
}

const GAP = 20;

function getVisible() {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth < 640) return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
}

export default function GiftList({ total }: GiftListProps) {
  const unlocked = getUnlockedGifts(total);
  const trackRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [visible, setVisible] = useState(3);
  const maxOffset = Math.max(0, gifts.length - visible);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const v = getVisible();
      setVisible(v);
      const containerWidth = track.parentElement?.parentElement?.clientWidth ?? 0;
      setCardWidth((containerWidth - GAP * (v - 1)) / v);
      setOffset((prev) => Math.min(prev, Math.max(0, gifts.length - v)));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const prev = () => setOffset((o) => Math.max(0, o - 1));
  const next = () => setOffset((o) => Math.min(maxOffset, o + 1));

  const translateX = -(offset * (cardWidth + GAP));

  return (
    <Section>
      <SectionTitle>La wishlist</SectionTitle>

      <div className="relative">
        {offset > 0 && (
          <button
            onClick={prev}
            className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-[var(--color-border)] shadow-md flex items-center justify-center text-[var(--color-negro)] hover:border-[var(--color-rosa)] hover:text-[var(--color-rosa)] transition-colors"
            aria-label="Anterior"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}

        <div className="overflow-hidden px-10 -mx-10 pt-4 pb-10">
          <div
            ref={trackRef}
            className="flex transition-transform duration-500 ease-out"
            style={{
              gap: `${GAP}px`,
              transform: `translateX(${translateX}px)`,
            }}
          >
            {gifts.map((gift, i) => (
              <div
                key={gift.id}
                className="flex-shrink-0"
                style={{ width: cardWidth > 0 ? `${cardWidth}px` : `calc((100% - ${GAP * (visible - 1)}px) / ${visible})` }}
              >
                <GiftCard
                  gift={gift}
                  isUnlocked={unlocked.includes(gift.id)}
                  index={i}
                />
              </div>
            ))}
          </div>
        </div>

        {offset < maxOffset && (
          <button
            onClick={next}
            className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-[var(--color-border)] shadow-md flex items-center justify-center text-[var(--color-negro)] hover:border-[var(--color-rosa)] hover:text-[var(--color-rosa)] transition-colors"
            aria-label="Siguiente"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </button>
        )}
      </div>
    </Section>
  );
}
