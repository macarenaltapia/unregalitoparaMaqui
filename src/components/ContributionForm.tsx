"use client";

import { useState } from "react";
import { Button, Input, Textarea, SectionTitle, Section } from "@/components/ui";
import PaymentInfo from "./PaymentInfo";
import { PERSON_NAME } from "@/data/config";

interface ContributionFormProps {
  onSuccess: () => void;
}

export default function ContributionForm({
  onSuccess,
}: ContributionFormProps) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !amount) return;

    setStatus("submitting");

    try {
      const res = await fetch("/api/contributions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          amount: Number(amount),
          message: message.trim(),
        }),
      });

      if (!res.ok) throw new Error("Error al enviar");

      setStatus("success");
      setName("");
      setAmount("");
      setMessage("");
      onSuccess();

      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const buttonLabel =
    status === "submitting"
      ? "Enviando..."
      : status === "success"
        ? "¡Gracias por tu aporte!"
        : status === "error"
          ? "Hubo un error, intentá de nuevo"
          : "Confirmar aporte";

  return (
    <Section maxWidth="form" id="contribuir">
      <SectionTitle>¿Cómo participo?</SectionTitle>

      <div className="mb-8 space-y-2 text-sm text-[var(--color-gris)]">
        <p>1. Transferí el monto que quieras al alias de abajo</p>
        <p>2. Completá tu nombre y cuánto mandaste</p>
        <p>3. Dejale un mensajito a {PERSON_NAME} (¡los va a leer todos!)</p>
        <p className="pt-1">A medida que juntemos, vamos desbloqueando regalos 🎁</p>
      </div>

      <PaymentInfo />

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <Input
          label="Tu nombre"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Ej: María"
        />

        <Input
          label="Monto que transferiste"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          min={1}
          placeholder="10000"
          prefix="$"
        />

        <Textarea
          label="Mensaje"
          hint="(opcional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`Un mensajito para ${PERSON_NAME}...`}
          rows={3}
        />

        <Button
          type="submit"
          fullWidth
          disabled={status === "submitting"}
        >
          {buttonLabel}
        </Button>

        {status === "success" && (
          <p className="text-center text-sm animate-fade-in-up text-[var(--color-rosa)]">
            Tu mensaje va a aparecer en el muro
          </p>
        )}
      </form>
    </Section>
  );
}
