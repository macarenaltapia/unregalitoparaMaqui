"use client";

import { ContributionPublic } from "@/types";
import { Card, SectionTitle, Section } from "@/components/ui";

interface MessageWallProps {
  messages: ContributionPublic[];
}

export default function MessageWall({ messages }: MessageWallProps) {
  if (messages.length === 0) return null;

  return (
    <Section>
      <SectionTitle>Mensajitos de cumpleaños</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {messages.map((msg, i) => (
          <Card
            key={`${msg.name}-${msg.created_at}`}
            className={`opacity-0 animate-fade-in-up stagger-${(i % 5) + 1}`}
          >
            <p className="text-sm leading-relaxed mb-3 text-[var(--color-negro)]">
              &ldquo;{msg.message}&rdquo;
            </p>
            <p
              className="text-xs italic text-[var(--color-rosa)]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              — {msg.name}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
