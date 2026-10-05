'use client';

import { useState } from 'react';
import Link from 'next/link';
import { products } from '@/data/products';
import { useCart } from '@/components/cart-provider';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function CheckoutContent() {
  const { items, isReady, removeFromCart, updateQuantity } = useCart();
  const [message, setMessage] = useState('');
  const [quantityDrafts, setQuantityDrafts] = useState<Record<string, string>>({});
  const subtotal = items.reduce((total, item) => {
    const product = products.find((entry) => entry.slug === item.productSlug);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);
  const shipping = subtotal === 0 || subtotal > 75 ? 0 : 6.95;
  const total = subtotal + shipping;

  if (!isReady) {
    return <p className="checkout-loading" role="status">Loading your bag…</p>;
  }

  return (
    <div className="checkout-layout">
      <section className="checkout-items" aria-labelledby="bag-heading">
        <div className="checkout-section-heading">
          <div>
            <p className="eyebrow">Your selections</p>
            <h2 id="bag-heading">Your bag ({items.reduce((count, item) => count + item.quantity, 0)})</h2>
          </div>
          <Link href="/new-in">Continue shopping</Link>
        </div>
        {items.length === 0 ? (
          <div className="empty-bag">
            <p>Your bag is waiting for something good.</p>
            <Link className="primary-button" href="/new-in">Shop new in</Link>
          </div>
        ) : (
          <ul className="checkout-item-list">
            {items.map((item) => {
              const product = products.find((entry) => entry.slug === item.productSlug);
              const itemKey = `${item.productSlug}-${item.size}`;

              return (
                <li className="checkout-item" key={itemKey}>
                  <div
                    className="checkout-item-swatch"
                    style={{
                      background: product
                        ? `linear-gradient(150deg, ${product.palette[0]}, ${product.palette[1]})`
                        : 'var(--line)',
                    }}
                    aria-hidden="true"
                  />
                  <div className="checkout-item-details">
                    <h3>{product?.name ?? 'Unavailable product'}</h3>
                    <p>Size: {item.size}</p>
                    {product && <p className="checkout-item-price">{currency.format(product.price)}</p>}
                    <button
                      type="button"
                      className="text-button"
                      onClick={() => removeFromCart(item.productSlug, item.size)}
                    >
                      Remove
                    </button>
                  </div>
                  <label className="quantity-control">
                    <span>Quantity</span>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={quantityDrafts[itemKey] ?? item.quantity}
                      onChange={(event) => {
                        const value = event.target.value;
                        setQuantityDrafts((drafts) => ({ ...drafts, [itemKey]: value }));
                        const quantity = Number(value);
                        if (Number.isSafeInteger(quantity) && quantity > 0) {
                          updateQuantity(item.productSlug, item.size, quantity);
                        }
                      }}
                      onBlur={() => {
                        setQuantityDrafts((drafts) => {
                          const nextDrafts = { ...drafts };
                          delete nextDrafts[itemKey];
                          return nextDrafts;
                        });
                      }}
                    />
                  </label>
                  <strong className="checkout-line-total">
                    {product ? currency.format(product.price * item.quantity) : '—'}
                  </strong>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <aside className="checkout-sidebar">
        <section className="checkout-summary" aria-labelledby="summary-heading">
          <h2 id="summary-heading">Order summary</h2>
          <div><span>Subtotal</span><span>{currency.format(subtotal)}</span></div>
          <div><span>Shipping</span><span>{shipping === 0 ? 'Free' : currency.format(shipping)}</span></div>
          <div className="checkout-total"><strong>Total</strong><strong>{currency.format(total)}</strong></div>
          <p className="shipping-note">Free shipping on orders over $75.</p>
        </section>

        <form
          className="checkout-form"
          onSubmit={(event) => {
            event.preventDefault();
            setMessage('Payments are not enabled in this prototype. Your bag has been saved.');
          }}
        >
          <h2>Delivery details</h2>
          <label>
            Email
            <input type="email" name="email" autoComplete="email" required />
          </label>
          <label>
            Full name
            <input type="text" name="name" autoComplete="name" required />
          </label>
          <label>
            Address
            <input type="text" name="address" autoComplete="street-address" required />
          </label>
          <div className="checkout-address-row">
            <label>
              City
              <input type="text" name="city" autoComplete="address-level2" required />
            </label>
            <label>
              ZIP code
              <input type="text" name="postal-code" autoComplete="postal-code" required />
            </label>
          </div>
          <p className="prototype-note">This demo does not collect or process payment information.</p>
          <button className="primary-button checkout-submit" type="submit" disabled={items.length === 0}>
            Continue to payment
          </button>
          {message && <p className="cart-feedback" role="status">{message}</p>}
        </form>
      </aside>
    </div>
  );
}
