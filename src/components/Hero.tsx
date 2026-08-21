"use client";

import { Label, Nebulosa } from "@/components/ui";
import { HERO_LABEL, PERSON_NAME } from "@/data/config";

export default function Hero() {
  return (
    <section className="relative text-center py-20 md:py-28 px-6 animate-fade-in overflow-hidden">
      <Nebulosa color="rosa" position="top-right" size="lg" />
      <Nebulosa color="azul" position="bottom-left" size="lg" />

      <Label className="mb-6">{HERO_LABEL}</Label>

      <h1 className="leading-none mb-8">
        <span
          className="block text-[48px] md:text-[56px] text-[#D94F8A]"
          style={{ fontFamily: "var(--font-dancing)" }}
        >
          {PERSON_NAME} pide,
        </span>
        <span
          className="block text-[56px] md:text-[72px] font-semibold text-[#1A1A1A] mt-1"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          nosotros cumplimos
        </span>
      </h1>

      <p className="text-lg md:text-xl max-w-md mx-auto leading-relaxed text-[#8A7E72]">
        Ella eligió sus regalos, nosotros nos encargamos de juntarlos.
        <br />
        Sumá tu aporte, dejale un mensaje y ayudanos a completar su lista de regalos.
      </p>

      <button
        onClick={() => document.getElementById("contribuir")?.scrollIntoView({ behavior: "smooth" })}
        className="mt-10 inline-block px-8 py-3 rounded-full text-white text-sm font-medium tracking-wide transition-opacity hover:opacity-90"
        style={{ background: "linear-gradient(90deg, #6B8CCE, #9B6CB8, #D94F8A)", fontFamily: "var(--font-dm)" }}
      >
        Quiero participar
      </button>
    </section>
  );
}
