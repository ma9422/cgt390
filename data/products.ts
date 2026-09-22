import type { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: '01',
    name: 'Ribbed Off-Shoulder Top',
    slug: 'ribbed-off-shoulder-top',
    category: 'Tops',
    price: 18,
    originalPrice: 36,
    description: 'A soft ribbed top with an easy off-shoulder neckline.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    flag: 'Just In',
    palette: ['#f7d9df', '#e08aa1'],
  },
  {
    id: '02',
    name: 'Low Rise Wide Leg Jeans',
    slug: 'low-rise-wide-leg-jeans',
    category: 'Denim',
    price: 49,
    originalPrice: 98,
    description: 'Relaxed low-rise denim with a wide leg and soft blue wash.',
    sizes: ['XS', 'S', 'M', 'L'],
    flag: 'Trending',
    palette: ['#dfe6ea', '#8fa6b8'],
  },
  {
    id: '03',
    name: 'Satin Cowl Midi Dress',
    slug: 'satin-cowl-midi-dress',
    category: 'Dresses',
    price: 54,
    originalPrice: 108,
    description: 'A fluid satin midi dress with a softly draped cowl neck.',
    sizes: ['XS', 'S', 'M', 'L'],
    palette: ['#e3d6ea', '#a985c2'],
  },
  {
    id: '04',
    name: 'Boxy Varsity Sweatshirt',
    slug: 'boxy-varsity-sweatshirt',
    category: 'Tops',
    price: 39,
    originalPrice: 78,
    description: 'An oversized cotton sweatshirt with a bold varsity graphic.',
    sizes: ['S', 'M', 'L', 'XL'],
    flag: 'Back In Stock',
    palette: ['#e5e0c9', '#b7ab72'],
  },
  {
    id: '05',
    name: 'Tie Front Mini Dress',
    slug: 'tie-front-mini-dress',
    category: 'Dresses',
    price: 42,
    originalPrice: 84,
    description: 'A playful mini dress finished with a front tie detail.',
    sizes: ['XS', 'S', 'M', 'L'],
    flag: 'Just In',
    palette: ['#f3d8c4', '#d69a6a'],
  },
  {
    id: '06',
    name: 'Sheer Lace V-Neck Top',
    slug: 'sheer-lace-v-neck-top',
    category: 'Tops',
    price: 22,
    originalPrice: 44,
    description: 'A sheer lace layer designed for styling over your favorite basics.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    palette: ['#d8e3dc', '#7fa38f'],
  },
];

export const newInProducts = products.filter((product) => product.flag === 'Just In' || product.flag === 'Back In Stock');
export const dressProducts = products.filter((product) => product.category === 'Dresses');

export type ProductSort = 'featured' | 'price-low' | 'price-high' | 'name';

export function getNewInProducts(sort: ProductSort = 'featured') {
  const sortedProducts = [...newInProducts];

  if (sort === 'price-low') {
    return sortedProducts.sort((first, second) => first.price - second.price);
  }

  if (sort === 'price-high') {
    return sortedProducts.sort((first, second) => second.price - first.price);
  }

  if (sort === 'name') {
    return sortedProducts.sort((first, second) => first.name.localeCompare(second.name));
  }

  return sortedProducts;
}