import { NextResponse } from 'next/server';

import { products } from '@/data/products';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get('query') ?? '').toLowerCase();

  const results = products.filter((product) =>
    product.name.toLowerCase().includes(query),
  );

  return NextResponse.json({ products: results });
}
