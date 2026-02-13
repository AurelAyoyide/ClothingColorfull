
import { Product } from './types';

export const COLORS = {
  white: { name: 'Blanc Cassé', hex: '#F2F2F2' },
  black: { name: 'Noir Profond', hex: '#050505' },
  sand: { name: 'Beige Sable', hex: '#D2B48C' },
  grey: { name: 'Gris Béton', hex: '#7E8082' },
  olive: { name: 'Olive Doux', hex: '#6B705C' },
};

export const PRODUCTS: Product[] = [
  {
    id: 'ts-01',
    name: 'T-Shirt "Quiet" Col Rond',
    category: 'T-Shirt',
    price: 35.00,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800',
    description: 'Coton peigné de 220g. Une structure impeccable qui ne se déforme jamais.',
    colors: [COLORS.white, COLORS.black, COLORS.sand, COLORS.grey, COLORS.olive],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'ts-02',
    name: 'T-Shirt Oversize "Structure"',
    category: 'T-Shirt',
    price: 45.00,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800',
    description: 'Coupe ample contemporaine. Épaules tombantes et col montant côtelé.',
    colors: [COLORS.black, COLORS.grey, COLORS.white],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'pl-01',
    name: 'Polo Minimaliste "Zenith"',
    category: 'Polo',
    price: 65.00,
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=800',
    description: 'Maillage piqué ultra-fin. Col thermocollé pour une tenue parfaite sans boutons apparents.',
    colors: [COLORS.black, COLORS.olive, COLORS.sand, COLORS.white],
    sizes: ['M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'ts-03',
    name: 'T-Shirt "Slate" Texture',
    category: 'T-Shirt',
    price: 40.00,
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&q=80&w=800',
    description: 'Une nuance de gris unique, inspirée du minéral. Coupe ajustée.',
    colors: [COLORS.grey, COLORS.black],
    sizes: ['S', 'M', 'L', 'XL'],
  },
];

export const WHATSAPP_NUMBER = '22996711954';
