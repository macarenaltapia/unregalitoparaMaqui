"use client";

import { useState, useEffect, useCallback } from "react";
import Marquee from "@/components/Marquee";
import Hero from "@/components/Hero";
import ProgressBar from "@/components/ProgressBar";
import GiftList from "@/components/GiftList";
import ContributionForm from "@/components/ContributionForm";
import MessageWall from "@/components/MessageWall";
import RevealPage from "@/components/RevealPage";

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
    fetchData();
  }, [fetchData]);

  if (isReveal) return <RevealPage />;

  return (
    <main className="min-h-screen bg-[#FBF8F5]">
      <Hero />

      <Marquee />

      {loading ? (
        <div className="text-center py-10">
          <div className="inline-block w-6 h-6 rounded-full border-2 animate-spin border-[#D94F8A] border-t-transparent" />
        </div>
      ) : (
        <>
          <ProgressBar total={data.total} />
          <GiftList total={data.total} />
        </>
      )}

      <MessageWall messages={data.messages} />

      <ContributionForm onSuccess={fetchData} />

      <footer className="text-center py-10 text-xs text-[#8A7E72]">
        {EVENT_DATE_SHORT}
      </footer>
    </main>
  );
}
