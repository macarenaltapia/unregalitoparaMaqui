"use client";

import { ContributionPublic } from "@/types";
import { SectionTitle, Section, Plumbob } from "@/components/ui";
import { PERSON_NAME } from "@/data/config";

interface MessageWallProps {
  messages: ContributionPublic[];
}

export default function MessageWall({ messages }: MessageWallProps) {
  if (messages.length === 0) return null;

  return (
    <Section>
      <SectionTitle>Mensajitos para {PERSON_NAME}</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {messages.map((msg, i) => (
          <div
            key={`${msg.name}-${msg.created_at}`}
            className={`opacity-0 animate-fade-in-up stagger-${(i % 5) + 1}`}
          >
            {/* Globo de dialogo, como los que le salen a los Sims */}
            <div className="sims-panel p-5 rounded-[var(--radius-card-lg)]">
              <p className="relative z-10 text-sm leading-relaxed text-[var(--color-navy)]">
                &ldquo;{msg.message}&rdquo;
              </p>
            </div>

            {/* Colita del globo */}
            <div
              className="w-4 h-4 ml-7 -mt-[2px] bg-white/72 border-r-2 border-b-2 border-white rotate-45"
              aria-hidden="true"
            />

            <div className="flex items-center gap-1.5 mt-2 ml-6">
              <Plumbob size={14} />
              <p
                className="text-sm font-semibold text-[var(--color-cyan-deep)]"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                {msg.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
