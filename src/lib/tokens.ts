export const colors = {
  white: "#FFFFFF",
  rosa: "#D94F8A",
  rosaLight: "#F0A4C4",
  azul: "#6B8CCE",
  azulLight: "#A8C4F0",
  negro: "#1A1A1A",
  gris: "#8A7E72",
  border: "#F0ECE6",
  gradient: {
    bar: "linear-gradient(90deg, #6B8CCE, #D94F8A, #F0A4C4)",
    glass: "linear-gradient(135deg, #D94F8A, #9B6CB8, #6B8CCE)",
  },
} as const;

export const typography = {
  serif: "var(--font-playfair), Georgia, serif",
  script: "var(--font-dancing), cursive",
  sans: "var(--font-dm-sans), system-ui, sans-serif",
  sizes: {
    heroScript: "56px",
    heroSerif: "62px",
    h2: "24px",
    body: "15px",
    label: "13px",
    metadata: "11px",
  },
  tracking: {
    label: "3px",
    metadata: "2px",
  },
} as const;

export const radius = {
  glass: "24px",
  card: "14px",
  cardLg: "18px",
  pill: "50px",
  input: "12px",
  full: "9999px",
} as const;

export const spacing = {
  sectionY: "py-12",
  sectionX: "px-6",
  maxContent: "max-w-2xl",
  maxForm: "max-w-lg",
} as const;

export const glass = {
  background: "rgba(255, 255, 255, 0.45)",
  blur: "blur(16px)",
  borderWidth: "1.5px",
} as const;

export const nebulosa = {
  opacity: { min: 0.1, max: 0.16 },
  blur: "60px",
  colors: {
    rosa: ["#D94F8A", "#F0A4C4"],
    azul: ["#6B8CCE", "#A8C4F0"],
  },
} as const;
