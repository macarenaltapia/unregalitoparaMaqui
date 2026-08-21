export const colors = {
  white: "#FFFFFF",
  // Plumbob — el verde del diamante que flota sobre los Sims
  plumbob: "#2FD44A",
  plumbobLight: "#9BF7A4",
  plumbobDeep: "#12A33A",
  // Cyan de la interfaz del juego
  cyan: "#16B6E8",
  cyanLight: "#8FE3FB",
  cyanDeep: "#0B7FB4",
  // Azules de fondo y texto
  navy: "#0A2A40",
  slate: "#5E8299",
  sky: "#E4F4FD",
  skyDeep: "#C7E9F8",
  border: "#BFE4F5",
  gradient: {
    bar: "linear-gradient(90deg, #12A33A, #2FD44A, #9BF7A4)",
    panel: "linear-gradient(135deg, #16B6E8, #2FD44A, #8FE3FB)",
    cta: "linear-gradient(180deg, #35C9F2 0%, #16B6E8 50%, #0B7FB4 100%)",
    ctaGreen: "linear-gradient(180deg, #56E86E 0%, #2FD44A 50%, #12A33A 100%)",
    sky: "linear-gradient(180deg, #F4FBFF 0%, #E4F4FD 55%, #D3EDFA 100%)",
  },
} as const;

export const typography = {
  display: "var(--font-fredoka), system-ui, sans-serif",
  sans: "var(--font-nunito), system-ui, sans-serif",
  sizes: {
    heroScript: "52px",
    heroSerif: "64px",
    h2: "28px",
    body: "15px",
    label: "12px",
    metadata: "11px",
  },
  tracking: {
    label: "2.5px",
    metadata: "2px",
  },
} as const;

export const radius = {
  glass: "28px",
  card: "20px",
  cardLg: "24px",
  pill: "50px",
  input: "16px",
  full: "9999px",
} as const;

export const spacing = {
  sectionY: "py-12",
  sectionX: "px-6",
  maxContent: "max-w-2xl",
  maxForm: "max-w-lg",
} as const;

export const panel = {
  background: "rgba(255, 255, 255, 0.72)",
  blur: "blur(14px)",
  borderWidth: "2px",
  shadow: "0 10px 30px -8px rgba(11, 127, 180, 0.35)",
} as const;

export const nebulosa = {
  opacity: { min: 0.18, max: 0.26 },
  blur: "70px",
  colors: {
    plumbob: ["#2FD44A", "#9BF7A4"],
    cyan: ["#16B6E8", "#8FE3FB"],
  },
} as const;
