"use client";

import { useState } from "react";
import { Button, Input, Textarea, SectionTitle, Section } from "@/components/ui";
import PaymentInfo from "./PaymentInfo";
import { PERSON_NAME } from "@/data/config";

interface ContributionFormProps {
  onSuccess: () => void;
}

const steps = [
  "Transferí el monto que quieras al alias de abajo",
  "Completá tu nombre y cuánto mandaste",
  `Dejale un mensajito a ${PERSON_NAME} (¡los va a leer todos!)`,
];

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
      <SectionTitle>Como participo?</SectionTitle>

      {/* Los pasos, numerados como una lista de tareas del juego */}
      <ol className="mb-8 space-y-3">
        {steps.map((step, i) => (
          <li key={i} className="flex items-start gap-3">
            <span
              className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold bg-[image:var(--gradient-cta)] border-2 border-white shadow-[0_3px_8px_-2px_rgba(11,127,180,0.6)]"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              {i + 1}
            </span>
            <span className="text-sm pt-1 text-[var(--color-slate)]">
              {step}
            </span>
          </li>
        ))}
      </ol>

      <p className="mb-8 text-sm text-center font-semibold text-[var(--color-plumbob-deep)]">
        A medida que juntemos, vamos desbloqueando regalos 🎁
      </p>

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
          variant="green"
          fullWidth
          disabled={status === "submitting"}
        >
          {buttonLabel}
        </Button>

        {status === "success" && (
          <p className="text-center text-sm font-semibold animate-fade-in-up text-[var(--color-plumbob-deep)]">
            Tu mensaje va a aparecer en el muro
          </p>
        )}
      </form>
    </Section>
  );
}
