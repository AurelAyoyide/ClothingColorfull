
import { Product } from './types';

export const COLORS = {
  white: { name: 'Blanc', hex: '#FFFFFF' },
  black: { name: 'Noir', hex: '#1C1C1C' },
  navy: { name: 'Marine', hex: '#1B2A4A' },
  burgundy: { name: 'Bordeaux', hex: '#722F37' },
  forest: { name: 'Kaki', hex: '#4A5D45' },
  camel: { name: 'Camel', hex: '#C19A6B' },
  skyblue: { name: 'Ciel', hex: '#7EB6D9' },
  terracotta: { name: 'Terracotta', hex: '#C2654A' },
  lavender: { name: 'Lavande', hex: '#9B8EC0' },
  rose: { name: 'Rose Poudr\u00e9', hex: '#D4869C' },
};

export const PRODUCTS: Product[] = [
  {
    id: 'ts-01',
    name: 'T-Shirt "Essential" Col Rond',
    category: 'T-Shirt',
    price: 85.00,
    image: 'https://static.vecteezy.com/system/resources/previews/060/352/764/large_2x/simple-white-shirt-mockup-free-png.png',
    description: 'Coupe classique en coton peigné 220g. Col rond renforcé, coutures doubles. La base essentielle de toute garde-robe.',
    colors: [COLORS.white, COLORS.black, COLORS.navy, COLORS.burgundy, COLORS.camel, COLORS.forest],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'ts-02',
    name: 'T-Shirt Oversize "Volume"',
    category: 'T-Shirt',
    price: 95.00,
    image: 'https://static.vecteezy.com/system/resources/previews/066/148/424/large_2x/transparent-background-realistic-white-t-shirt-front-view-display-in-stylish-environment-for-fashion-lovers-free-png.png',
    description: 'Coupe ample contemporaine. Épaules tombantes et col montant côtelé. Silhouette décontractée et moderne.',
    colors: [COLORS.white, COLORS.black, COLORS.terracotta, COLORS.lavender, COLORS.skyblue, COLORS.rose],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'pl-01',
    name: 'Polo Classic "Zenith"',
    category: 'Polo',
    price: 125.00,
    image: 'https://static.vecteezy.com/system/resources/previews/055/391/313/large_2x/classic-men-s-short-sleeve-white-polo-shirt-mockup-design-template-free-png.png',
    description: 'Maillage piqué ultra-fin. Col structuré avec finitions premium. L\'élégance décontractée par excellence.',
    colors: [COLORS.white, COLORS.black, COLORS.navy, COLORS.forest, COLORS.camel, COLORS.burgundy],
    sizes: ['M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'pl-02',
    name: 'Polo Sport "Drift"',
    category: 'Polo',
    price: 110.00,
    image: 'https://static.vecteezy.com/system/resources/previews/060/624/614/large_2x/a-gray-polo-shirt-on-a-transparent-background-free-png.png',
    description: 'Coupe ajustée sportive. Tissu technique respirant avec col zippé. Performance et style au quotidien.',
    colors: [COLORS.white, COLORS.black, COLORS.skyblue, COLORS.terracotta, COLORS.rose, COLORS.lavender],
    sizes: ['S', 'M', 'L', 'XL'],
  },
];

export const WHATSAPP_NUMBER = '22996711954';
