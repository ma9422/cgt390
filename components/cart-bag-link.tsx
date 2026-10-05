'use client';

import Link from 'next/link';
import { useCart } from '@/components/cart-provider';

export function CartBagLink() {
  const { itemCount } = useCart();

  return (
    <Link className="bag-link" href="/checkout" aria-label={`Shopping bag with ${itemCount} items`}>
      Bag ({itemCount})
    </Link>
  );
}
