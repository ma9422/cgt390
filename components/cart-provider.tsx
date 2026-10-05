'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type CartItem = {
  productSlug: string;
  size: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  isReady: boolean;
  storageError: string | null;
  addToCart: (productSlug: string, size: string) => void;
  removeFromCart: (productSlug: string, size: string) => void;
  updateQuantity: (productSlug: string, size: string, quantity: number) => void;
};

const CART_STORAGE_KEY = 'slay-cart';
const CartContext = createContext<CartContextValue | null>(null);

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  return 'productSlug' in value
    && typeof value.productSlug === 'string'
    && value.productSlug.length > 0
    && 'size' in value
    && typeof value.size === 'string'
    && value.size.length > 0
    && 'quantity' in value
    && typeof value.quantity === 'number'
    && Number.isSafeInteger(value.quantity)
    && value.quantity > 0;
}

export function CartProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [storageError, setStorageError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);

      if (storedCart) {
        const parsedCart: unknown = JSON.parse(storedCart);

        if (!Array.isArray(parsedCart) || !parsedCart.every(isCartItem)) {
          setStorageError('Your saved bag could not be read. New changes will replace it.');
        } else {
          setItems(parsedCart);
        }
      }
    } catch {
      setStorageError('Your saved bag could not be read. New changes may not be saved.');
    } finally {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      setStorageError(null);
    } catch {
      setStorageError('Your bag could not be saved in this browser.');
    }
  }, [isReady, items]);

  const value = useMemo<CartContextValue>(() => ({
    items,
    itemCount: items.reduce((total, item) => total + item.quantity, 0),
    isReady,
    storageError,
    addToCart: (productSlug, size) => {
      setItems((currentItems) => {
        const existingItem = currentItems.find((item) =>
          item.productSlug === productSlug && item.size === size);

        if (existingItem) {
          return currentItems.map((item) =>
            item.productSlug === productSlug && item.size === size
              ? { ...item, quantity: item.quantity + 1 }
              : item);
        }

        return [...currentItems, { productSlug, size, quantity: 1 }];
      });
    },
    removeFromCart: (productSlug, size) => {
      setItems((currentItems) => currentItems.filter((item) =>
        item.productSlug !== productSlug || item.size !== size));
    },
    updateQuantity: (productSlug, size, quantity) => {
      if (!Number.isSafeInteger(quantity) || quantity < 1) {
        throw new Error('Cart quantity must be a positive whole number.');
      }

      setItems((currentItems) => currentItems.map((item) =>
        item.productSlug === productSlug && item.size === size
          ? { ...item, quantity }
          : item));
    },
  }), [isReady, items, storageError]);

  return (
    <CartContext.Provider value={value}>
      {storageError && <p className="cart-storage-error" role="alert">{storageError}</p>}
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider.');
  }

  return context;
}
