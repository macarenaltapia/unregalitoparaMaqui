"use client";

import { Label, Nebulosa, Plumbob } from "@/components/ui";
import { HERO_LABEL, PERSON_NAME } from "@/data/config";

export default function Hero() {
  return (
    <section className="relative text-center py-20 md:py-28 px-6 animate-fade-in overflow-hidden iso-grid">
      <Nebulosa color="cyan" position="top-right" size="lg" />
      <Nebulosa color="plumbob" position="bottom-left" size="lg" />

      {/* El plumbob flotando arriba del wordmark, como en la caja del juego */}
      <div className="relative flex justify-center mb-3">
        <Plumbob size={72} animation="spin" className="animate-plumbob-pulse" />
      </div>

      {/* Titulo tratado como el logo: la linea chica arriba y el nombre grande
          abajo, igual que "The" sobre "SiMs". */}
      <h1 className="mb-6">
        <span className="sims-title sims-title-sm block text-[26px] md:text-[36px]">
          Un regalito para
        </span>
        <span className="sims-title block text-[64px] md:text-[104px] -mt-1">
          {PERSON_NAME}
        </span>
      </h1>

      <Label className="mb-5">{HERO_LABEL}</Label>

      <p
        className="text-xl md:text-2xl font-semibold text-[var(--color-cyan-deep)] mb-5"
        style={{ fontFamily: "var(--font-fredoka)" }}
      >
        {PERSON_NAME} pide, nosotros cumplimos
      </p>

      <p className="text-lg md:text-xl max-w-md mx-auto leading-relaxed text-[var(--color-slate)]">
        Ella eligió sus regalos, nosotros nos encargamos de juntarlos.
        <br />
        Sumá tu aporte, dejale un mensaje y ayudanos a completar su lista de regalos.
      </p>

      <button
        onClick={() =>
          document
            .getElementById("contribuir")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        className="sims-button mt-10 inline-flex items-center gap-2 px-9 py-3.5 text-white text-base font-semibold tracking-wide bg-[image:var(--gradient-cta-green)]"
        style={{ fontFamily: "var(--font-fredoka)" }}
      >
        <span className="relative z-10 flex items-center gap-2">
          <Plumbob size={20} />
          Quiero participar
        </span>
      </button>
    </section>
  );
}
