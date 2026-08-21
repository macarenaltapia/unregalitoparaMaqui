import { Gift } from "@/types";

// Regalos de ejemplo — reemplazalos por los de verdad.
// El orden importa: se van desbloqueando de arriba hacia abajo a medida que
// la recaudación acumulada supera la suma de los precios anteriores.
// Las imágenes van en public/gifts/ (cuadradas, se recortan a aspect-square).
export const gifts: Gift[] = [
  {
    id: "regalo-1",
    name: "Primer regalo",
    price: 50000,
    image: "/gifts/placeholder.svg",
    link: "https://example.com",
    emoji: "🎁",
  },
  {
    id: "regalo-2",
    name: "Segundo regalo",
    price: 80000,
    image: "/gifts/placeholder.svg",
    link: "https://example.com",
    emoji: "✨",
  },
  {
    id: "regalo-3",
    name: "Tercer regalo",
    price: 120000,
    image: "/gifts/placeholder.svg",
    link: "https://example.com",
    emoji: "💝",
  },
];

export function getTotalGoal(): number {
  return gifts.reduce((sum, gift) => sum + gift.price, 0);
}

export function getUnlockedGifts(total: number): string[] {
  const unlocked: string[] = [];
  let accumulated = 0;

  for (const gift of gifts) {
    accumulated += gift.price;
    if (total >= accumulated) {
      unlocked.push(gift.id);
    }
  }

  return unlocked;
}
