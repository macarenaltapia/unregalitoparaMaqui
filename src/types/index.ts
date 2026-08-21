/**
 * Piezas que sabe dibujar la habitacion. Para sumar un regalo nuevo al avatar
 * hay que agregar el id aca y su dibujo en src/components/room/art.tsx.
 */
export type AvatarArt = "campera-cuero" | "perfume";

export interface GiftAvatar {
  /** wearable = se le pone al avatar | prop = aparece en la comoda */
  kind: "wearable" | "prop";
  art: AvatarArt;
}

export interface Gift {
  id: string;
  name: string;
  price: number;
  image: string;
  link: string;
  emoji: string;
  /**
   * Que pasa en la habitacion cuando se desbloquea este regalo.
   * Es opcional: un regalo sin esto simplemente no toca el avatar.
   */
  avatar?: GiftAvatar;
}

export interface Contribution {
  id: string;
  name: string;
  amount: number;
  message: string;
  transferred: boolean;
  created_at: string;
}

export interface ContributionPublic {
  name: string;
  message: string;
  created_at: string;
}

export interface ContributionsResponse {
  total: number;
  messages: ContributionPublic[];
}
