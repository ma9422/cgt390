export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  originalPrice: number;
  description: string;
  sizes: string[];
  flag?: string;
  palette: [string, string];
};