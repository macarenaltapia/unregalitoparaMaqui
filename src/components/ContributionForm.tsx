"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Textarea,
  SectionTitle,
  Section,
  Plumbob,
} from "@/components/ui";
import { formatPrice } from "@/lib/utils";
import PaymentInfo from "./PaymentInfo";
import { DEADLINE_LONG, PERSON_NAME } from "@/data/config";

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
  // Datos del aporte recien hecho, para el cartelito de confirmacion.
  // Se guardan antes de limpiar el formulario.
  const [hecho, setHecho] = useState<{
    monto: number;
    conMensaje: boolean;
  } | null>(null);

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
      setHecho({ monto: Number(amount), conMensaje: message.trim() !== "" });
      setName("");
      setAmount("");
      setMessage("");
      onSuccess();

      // Lo mandamos arriba a la habitacion y la barra, que es donde se ve
      // el efecto de lo que acaba de aportar.
      document
        .getElementById("progreso")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });

      setTimeout(() => setStatus("idle"), 3000);
      setTimeout(() => setHecho(null), 7000);
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
    <>
      {hecho && (
        <div
          className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
          role="status"
          aria-live="polite"
        >
          <div className="sims-toast flex max-w-sm items-center gap-3 rounded-[var(--radius-card)] border-2 border-[var(--color-border)] bg-white/95 px-5 py-3 text-left shadow-[0_12px_32px_-8px_rgba(11,127,180,0.55)]">
            <Plumbob size={30} animation="float" />
            <div>
              <p
                className="text-sm font-bold text-[var(--color-navy)]"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                ¡Listo! Sumaste {formatPrice(hecho.monto)} a la partida
              </p>
              <p className="text-[var(--size-metadata)] leading-tight text-[var(--color-slate)]">
                Mirá cómo se llena la barra
                {hecho.conMensaje
                  ? ". Tu mensajito ya está en el muro."
                  : "."}
              </p>
            </div>
          </div>
        </div>
      )}

      <Section maxWidth="form" id="contribuir">
        <SectionTitle>Como participo?</SectionTitle>

        {/* La fecha de cierre va antes que los pasos: es lo que apura */}
        <p className="mb-7 flex items-center justify-center gap-2 rounded-[var(--radius-input)] border-2 border-[var(--color-border)] bg-white/70 px-4 py-3 text-center text-sm font-semibold text-[var(--color-navy)]">
          <span aria-hidden="true">⏳</span>
          Tenés tiempo hasta el {DEADLINE_LONG}. Ahí cerramos la partida y
          salimos a comprar.
        </p>

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
        </form>
      </Section>
    </>
  );
}
