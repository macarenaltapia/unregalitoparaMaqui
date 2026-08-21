import { AvatarArt, Gift } from "@/types";

// El orden importa: se van desbloqueando de arriba hacia abajo a medida que
// la recaudacion acumulada supera la suma de los precios anteriores.
// Las imagenes van en public/gifts/ (cuadradas, se recortan a aspect-square).
//
// El campo `avatar` conecta el regalo con la habitacion: `wearable` se le pone
// encima al avatar, `prop` aparece sobre la comoda. Un regalo sin `avatar`
// funciona igual, solo que no cambia nada en la escena.
export const gifts: Gift[] = [
  {
    id: "perfume",
    name: "Perfume",
    price: 50000,
    image: "/gifts/placeholder.svg",
    link: "https://example.com",
    emoji: "🌸",
    avatar: { kind: "prop", art: "perfume" },
  },
  {
    id: "campera-cuero",
    name: "Campera de cuero",
    price: 80000,
    image: "/gifts/placeholder.svg",
    link: "https://example.com",
    emoji: "🧥",
    avatar: { kind: "wearable", art: "campera-cuero" },
  },
  {
    id: "regalo-3",
    name: "Tercer regalo",
    price: 120000,
    image: "/gifts/placeholder.svg",
    link: "https://example.com",
    emoji: "🎁",
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

/** Las piezas de la habitacion que corresponden a los regalos ya desbloqueados. */
export function getUnlockedArt(total: number): AvatarArt[] {
  const unlockedIds = getUnlockedGifts(total);

  return gifts
    .filter((gift) => gift.avatar && unlockedIds.includes(gift.id))
    .map((gift) => gift.avatar!.art);
}
