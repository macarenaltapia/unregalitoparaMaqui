"use client";

import { useState } from "react";
import { PAYMENT_ALIAS, PAYMENT_BANK } from "@/data/config";
import { Button, Card, Label } from "@/components/ui";

export default function PaymentInfo() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(PAYMENT_ALIAS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card variant="glass" padding="lg" className="text-center animate-fade-in-up">
      <Label className="mb-3">Transferí a este alias</Label>
      <p
        className="text-2xl mb-1 text-[var(--color-negro)]"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        {PAYMENT_ALIAS}
      </p>
      <p className="text-sm mb-4 text-[var(--color-gris)]">{PAYMENT_BANK}</p>
      <Button onClick={handleCopy} variant={copied ? "outline" : "filled"}>
        {copied ? "¡Copiado!" : "Copiar alias"}
      </Button>
    </Card>
  );
}
