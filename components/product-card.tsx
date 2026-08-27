import type { CSSProperties } from 'react';
import type { Product } from '@/types/product';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const cardStyle = {
    '--card-a': product.palette[0],
    '--card-b': product.palette[1],
  } as CSSProperties;

  return (
    <article className="product-card">
      <a href={`/products/${product.slug}`} className="product-media" style={cardStyle}>
        <span className="sale-label">50% OFF</span>
        {product.flag && <span className="product-flag">{product.flag}</span>}
        <span className="media-wordmark">STYLED</span>
      </a>
      <div className="product-info">
        <h2><a href={`/products/${product.slug}`}>{product.name}</a></h2>
        <div className="product-price">
          <span>${product.price.toFixed(2)}</span>
          <s>${product.originalPrice.toFixed(2)}</s>
        </div>
      </div>
    </article>
  );
}