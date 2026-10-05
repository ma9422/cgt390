'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { Product } from '@/types/product';
import { useCart } from '@/components/cart-provider';

declare global {
  interface Window {
    gtag?: (
      command: 'event',
      eventName: string,
      eventParams:
        | {
          item_id: string;
          item_name: string;
          item_category: string;
          item_variant: string;
        }
        | {
          currency: string;
          value: number;
          items: {
            item_id: string;
            item_name: string;
            item_category: string;
            item_variant: string;
            price: number;
            quantity: number;
          }[];
        },
    ) => void;
  }
}

export function AddToCartButton({ product }: { product: Product }) {
  const { addToCart, isReady } = useCart();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [size, setSize] = useState(product.sizes[0] ?? '');
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (showConfirmation && dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, [showConfirmation]);

  function handleAddToCart() {
    if (!size) {
      return;
    }

    addToCart(product.slug, size);
    window.gtag?.('event', 'add_to_cart', {
      currency: 'USD',
      value: product.price,
      items: [{
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        item_variant: size,
        price: product.price,
        quantity: 1,
      }],
    });
    setShowConfirmation(true);
  }

  function handleSizeChange(selectedSize: string) {
    setSize(selectedSize);
    window.gtag?.('event', 'size_selected', {
      item_id: product.id,
      item_name: product.name,
      item_category: product.category,
      item_variant: selectedSize,
    });
  }

  return (
    <>
      <div className="add-to-cart">
        <label htmlFor="product-size">Size</label>
        <select
          id="product-size"
          value={size}
          onChange={(event) => handleSizeChange(event.target.value)}
          disabled={!isReady || product.sizes.length === 0}
        >
          {product.sizes.map((productSize) => (
            <option value={productSize} key={productSize}>{productSize}</option>
          ))}
        </select>
        <button
          type="button"
          className="primary-button"
          onClick={handleAddToCart}
          disabled={!isReady || !size}
        >
          Add to bag
        </button>
      </div>
      <dialog
        ref={dialogRef}
        className="added-to-bag-dialog"
        aria-labelledby="added-to-bag-title"
        onClose={() => setShowConfirmation(false)}
        onClick={(event) => {
          if (event.target === dialogRef.current) {
            dialogRef.current?.close();
          }
        }}
      >
        <div className="added-to-bag-content">
          <button
            type="button"
            className="added-to-bag-close"
            aria-label="Close confirmation"
            onClick={() => dialogRef.current?.close()}
          >
            ×
          </button>
          <p className="eyebrow">Added to your bag</p>
          <div
            className="added-to-bag-swatch"
            style={{ background: `linear-gradient(150deg, ${product.palette[0]}, ${product.palette[1]})` }}
            aria-hidden="true"
          />
          <h2 id="added-to-bag-title">{product.name}</h2>
          <p>Size: {size}</p>
          <p className="product-detail-price">${product.price.toFixed(2)}</p>
          <div className="added-to-bag-actions">
            <button type="button" className="secondary-button" onClick={() => dialogRef.current?.close()}>
              Keep shopping
            </button>
            <Link className="primary-button" href="/checkout" onClick={() => dialogRef.current?.close()}>
              View bag
            </Link>
          </div>
        </div>
      </dialog>
    </>
  );
}
