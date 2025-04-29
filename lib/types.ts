export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  quantity?: number;
  playerId?: string;
}

export interface CartItem extends Product {
  quantity: number;
}