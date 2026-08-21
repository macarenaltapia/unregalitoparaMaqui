"use client";

import { useState, useEffect, useCallback } from "react";
import { Nebulosa, Section, SectionTitle } from "@/components/ui";
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
    <main className="min-h-screen bg-[#FBF8F5]">
      <section className="relative text-center py-20 md:py-28 px-6 animate-fade-in overflow-hidden">
        <Nebulosa color="rosa" position="top-right" size="lg" />
        <Nebulosa color="azul" position="bottom-left" size="lg" />

        <span
          className="block text-[48px] md:text-[56px] text-[#D94F8A] mb-2"
          style={{ fontFamily: "var(--font-dancing)" }}
        >
          Gracias a todos
        </span>
        <h1
          className="text-[40px] md:text-[56px] font-semibold text-[#1A1A1A] leading-tight"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Llegamos con estos regalos
        </h1>
        <p className="text-lg md:text-xl max-w-md mx-auto leading-relaxed text-[#8A7E72] mt-6">
          {PERSON_NAME} ya tiene sus regalos gracias a cada uno de ustedes{" "}
          {PERSON_EMOJI}
        </p>
      </section>

      <div
        className="overflow-hidden py-3 select-none"
        style={{
          background: "linear-gradient(90deg, #6B8CCE, #9B6CB8, #D94F8A)",
        }}
      >
        <div className="animate-marquee flex w-max">
          {[0, 1].map((i) => (
            <span
              key={i}
              className="text-sm md:text-base font-medium tracking-wide text-white px-2"
              style={{ fontFamily: "var(--font-dm)" }}
            >
              {Array(8).fill("🎁 Misión cumplida").join("  |  ")}
            </span>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <div className="inline-block w-6 h-6 rounded-full border-2 animate-spin border-[#D94F8A] border-t-transparent" />
        </div>
      ) : (
        <ProgressBar total={data.total} />
      )}

      <Section>
        <SectionTitle>La cumpleañera con sus regalos</SectionTitle>
        <div className="rounded-[var(--radius-card)] overflow-hidden border border-[var(--color-border)] shadow-sm">
          {/* Subí la foto a public/gifts/reveal.jpg antes de activar el modo reveal */}
          <img
            src="/gifts/reveal.jpg"
            alt={`${PERSON_NAME} con sus regalos`}
            className="w-full h-auto"
          />
        </div>
      </Section>

      <MessageWall messages={data.messages} />

      <footer className="text-center py-10 text-xs text-[#8A7E72]">
        {EVENT_DATE_SHORT}
      </footer>
    </main>
  );
}
