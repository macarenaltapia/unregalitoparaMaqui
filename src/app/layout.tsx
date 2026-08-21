import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { PERSON_NAME } from "@/data/config";

// SimLLHP: recreacion fan del wordmark de The Sims, gratis para uso personal.
// Tiene juego completo de español (acentos, ñ, ¿, ¡), asi que sirve tambien
// para los titulos de seccion. Baloo 2 queda de fallback por si no carga.
const simsFont = localFont({
  src: "../fonts/SimsLLHP.ttf",
  variable: "--font-sims",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

// Fredoka: geometrica y redondeada, para la interfaz (botones, labels, precios).
const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `Un regalito para ${PERSON_NAME}`,
  description: `Juntamos entre todos para hacerle un regalo especial a ${PERSON_NAME}. Dejá tu aporte y un mensaje.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${simsFont.variable} ${fredoka.variable} ${nunito.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
