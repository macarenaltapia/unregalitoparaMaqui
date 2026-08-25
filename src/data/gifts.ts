import { AvatarArt, Gift } from "@/types";

// El orden importa: se van desbloqueando de arriba hacia abajo a medida que
// la recaudacion acumulada supera la suma de los precios anteriores.
// Las imagenes van en public/gifts/ (cuadradas, se recortan a aspect-square).
//
// El campo `avatar` conecta el regalo con la habitacion: `wearable` se le pone
// encima al avatar, `prop` aparece sobre la mesa de luz. Un regalo sin `avatar`
// funciona igual, solo que no cambia nada en la escena.
//
// El avatar arranca en remera blanca de manga corta, bermuda de jean y medias,
// justamente para que se note cada prenda que se le suma.
export const gifts: Gift[] = [
  {
    id: "mocasines",
    name: "Mocasines",
    price: 170000,
    image: "/gifts/mocasines.png",
    link: "https://www.cletas.ar/productos/mocasin-emily-unisex/",
    emoji: "👞",
    avatar: { kind: "wearable", art: "mocasines" },
  },
  {
    id: "pantalon-adidas",
    name: "Pantalón Adidas",
    price: 150000,
    image: "/gifts/pantalon-adidas.jpg",
    link: "https://www.moov.com.ar/pantalon-adidas-firebird-holgado-mujer/ADKD7976.html",
    emoji: "👖",
    avatar: { kind: "wearable", art: "pantalon-adidas" },
  },
  {
    id: "campera-cuero",
    name: "Campera de cuero",
    price: 166000,
    image: "/gifts/campera-cuero.jpg",
    link: "https://www.zara.com/ar/es/cazadora-efecto-piel-bolsillos-p04749970.html?v1=557058426&v2=2510426",
    emoji: "🧥",
    avatar: { kind: "wearable", art: "campera-cuero" },
  },
  {
    id: "arqueador",
    name: "Arqueador",
    price: 85000,
    image: "/gifts/arqueador.png",
    link: "https://www.mercadolibre.com.ar/encrespador-de-pestanas-shiseido-eyelash-curler-plateado/p/MLA28278590",
    emoji: "💄",
    avatar: { kind: "prop", art: "arqueador" },
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
