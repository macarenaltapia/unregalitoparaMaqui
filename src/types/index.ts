export interface Gift {
  id: string;
  name: string;
  price: number;
  image: string;
  link: string;
  emoji: string;
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
