// src/types/games.ts

export interface Game {
  id: string;
  name: string;
  slug: string;
  heroImage: string;
  description: string;
  billingCycles?: string[];
  plans: Plan[];
}

export interface Plan {
  name: string;
  logo: string;
  price: number;
  yearlyPrice?: number;
  popular: boolean;
  orderUrl?: string;
  specs: Spec[];
}

export interface Spec {
  label: string;
  icon?: string;
}