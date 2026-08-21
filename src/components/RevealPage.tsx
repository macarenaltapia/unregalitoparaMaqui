"use client";

import { useState, useEffect, useCallback } from "react";
import { Nebulosa, Section, SectionTitle, Plumbob } from "@/components/ui";
import ProgressBar from "./ProgressBar";
import MessageWall from "./MessageWall";
import { ContributionsResponse } from "@/types";
import { EVENT_DATE_SHORT, PERSON_EMOJI, PERSON_NAME } from "@/data/config";

export default function RevealPage() {
  const [data, setData] = useState<ContributionsResponse>({
    total: 0,
    messages: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/contributions");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <main className="min-h-screen">
      <section className="relative text-center py-20 md:py-28 px-6 animate-fade-in overflow-hidden iso-grid">
        <Nebulosa color="cyan" position="top-right" size="lg" />
        <Nebulosa color="plumbob" position="bottom-left" size="lg" />

        <div className="relative flex justify-center mb-6">
          <Plumbob size={72} animation="spin" className="animate-plumbob-pulse" />
        </div>

        <h1>
          <span className="sims-title sims-title-sm block text-[26px] md:text-[36px]">
            Gracias a todos
          </span>
          <span className="sims-title block text-[42px] md:text-[64px] -mt-1">
            Llegamos con estos regalos
          </span>
        </h1>
        <p className="text-lg md:text-xl max-w-md mx-auto leading-relaxed text-[var(--color-slate)] mt-6">
          {PERSON_NAME} ya tiene sus regalos gracias a cada uno de ustedes{" "}
          {PERSON_EMOJI}
        </p>
      </section>

      <div
        className="overflow-hidden py-3 select-none border-y-2 border-white/60"
        style={{
          background:
            "linear-gradient(90deg, #0B7FB4, #16B6E8, #2FD44A, #16B6E8, #0B7FB4)",
          boxShadow: "0 4px 20px -6px rgba(11, 127, 180, 0.6)",
        }}
      >
        <div className="animate-marquee flex w-max">
          {[0, 1].map((i) => (
            <span
              key={i}
              className="text-sm md:text-base font-semibold tracking-wide text-white px-2"
              style={{
                fontFamily: "var(--font-fredoka)",
                textShadow: "0 1px 3px rgba(10, 42, 64, 0.4)",
              }}
            >
              {Array(8).fill("🎁 Misión cumplida").join("  ◆  ")}
            </span>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-14">
          <Plumbob size={44} animation="spin" />
        </div>
      ) : (
        <ProgressBar total={data.total} />
      )}

      <Section>
        <SectionTitle>La festejada con sus regalos</SectionTitle>
        <div className="sims-panel p-1.5">
          <div className="relative z-10 rounded-[calc(var(--radius-card)-4px)] overflow-hidden">
            {/* Subí la foto a public/gifts/reveal.jpg antes de activar el modo reveal */}
            <img
              src="/gifts/reveal.jpg"
              alt={`${PERSON_NAME} con sus regalos`}
              className="w-full h-auto block"
            />
          </div>
        </div>
      </Section>

      <MessageWall messages={data.messages} />

      <footer className="flex items-center justify-center gap-2 py-10 text-xs font-semibold text-[var(--color-slate)]">
        <Plumbob size={16} />
        {EVENT_DATE_SHORT}
      </footer>
    </main>
  );
}
