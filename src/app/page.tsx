"use client";

import { useState, useEffect, useCallback } from "react";
import Marquee from "@/components/Marquee";
import Hero from "@/components/Hero";
import ProgressBar from "@/components/ProgressBar";
import GiftList from "@/components/GiftList";
import ContributionForm from "@/components/ContributionForm";
import MessageWall from "@/components/MessageWall";
import RevealPage from "@/components/RevealPage";
import { Plumbob } from "@/components/ui";

import { ContributionsResponse } from "@/types";
import { EVENT_DATE_SHORT } from "@/data/config";

const isReveal = process.env.NEXT_PUBLIC_PAGE_MODE === "reveal";

export default function Home() {
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
    // Modo demo para probar la habitacion sin depender de la base:
    // /?demo=130000 fuerza ese total. Solo corre en desarrollo.
    if (process.env.NODE_ENV === "development") {
      const demo = new URLSearchParams(window.location.search).get("demo");
      if (demo !== null) {
        setData({ total: Number(demo) || 0, messages: [] });
        setLoading(false);
        return;
      }
    }

    fetchData();
  }, [fetchData]);

  if (isReveal) return <RevealPage />;

  return (
    <main className="min-h-screen">
      <Hero />

      <Marquee />

      {loading ? (
        // El plumbob girando hace de spinner, como en la pantalla de carga
        <div className="flex justify-center py-14">
          <Plumbob size={44} animation="spin" />
        </div>
      ) : (
        <>
          <ProgressBar total={data.total} />
          <GiftList total={data.total} />
        </>
      )}

      <MessageWall messages={data.messages} />

      <ContributionForm onSuccess={fetchData} />

      <footer className="flex items-center justify-center gap-2 py-10 text-xs font-semibold text-[var(--color-slate)]">
        <Plumbob size={16} />
        {EVENT_DATE_SHORT}
      </footer>
    </main>
  );
}
