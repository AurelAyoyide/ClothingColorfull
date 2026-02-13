
export type Color = {
  name: string;
  hex: string;
};

export type Size = 'S' | 'M' | 'L' | 'XL' | 'XXL';

export type Product = {
  id: string;
  name: string;
  category: 'T-Shirt' | 'Polo';
  price: number;
  image: string;
  description: string;
  colors: Color[];
  sizes: Size[];
};

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  category: string;
  price: number;
  color: Color;
  size: Size;
  quantity: number;
  image: string;
};
