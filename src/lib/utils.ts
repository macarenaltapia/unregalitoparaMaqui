/**
 * Caracteres que SimLLHP (la fuente de los titulos) mapea a glifos vacios:
 * no se rompen visiblemente, simplemente desaparecen y dejan un hueco.
 * Verificado leyendo las tablas cmap + loca del .ttf.
 */
const SIMS_FONT_MISSING = /[áéíóúÁÉÍÓÚñÑüÜ¿¡]/;

/**
 * Avisa por consola, solo en desarrollo, si un texto va a perder caracteres
 * al dibujarse con la fuente de los titulos.
 */
export function warnIfUnsupportedInSimsFont(text: string): void {
  if (process.env.NODE_ENV !== "development") return;
  if (!SIMS_FONT_MISSING.test(text)) return;

  const missing = [...new Set(text.match(new RegExp(SIMS_FONT_MISSING, "g")))];

  console.warn(
    `[sims-title] "${text}" usa caracteres que la fuente no dibuja: ${missing.join(" ")}. ` +
      `Van a aparecer como un hueco. Reformulá el texto sin ellos.`,
  );
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(price);
}
