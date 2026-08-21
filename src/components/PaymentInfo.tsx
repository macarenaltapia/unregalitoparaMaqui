"use client";

import { useState } from "react";
import { PAYMENT_ALIAS, PAYMENT_BANK } from "@/data/config";
import { Button, Card, Label, Plumbob } from "@/components/ui";

export default function PaymentInfo() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(PAYMENT_ALIAS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card variant="glass" padding="lg" className="text-center animate-fade-in-up">
      <div className="flex justify-center mb-3">
        <Plumbob size={34} animation="spin" />
      </div>

      <Label className="mb-3">Transferí a este alias</Label>

      {/* El alias va en una placa tipo display del juego */}
      <div className="inline-block px-6 py-3 mb-3 rounded-[var(--radius-input)] bg-white/80 border-2 border-[var(--color-border)] shadow-[inset_0_2px_6px_rgba(10,42,64,0.08)]">
        <p
          className="text-2xl font-bold tracking-wide text-[var(--color-navy)]"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          {PAYMENT_ALIAS}
        </p>
      </div>

      <p className="text-sm mb-4 font-semibold text-[var(--color-slate)]">
        {PAYMENT_BANK}
      </p>

      <Button onClick={handleCopy} variant={copied ? "green" : "filled"}>
        {copied ? "¡Copiado!" : "Copiar alias"}
      </Button>
    </Card>
  );
}
