import { notFound } from 'next/navigation';
import { StoreHeader } from '@/components/store-header';
import { products } from '@/data/products';

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <StoreHeader />
      <main className="catalog-page product-detail">
        <p className="eyebrow">{product.category}</p>
        <h1>{product.name}</h1>
        <p className="catalog-description">{product.description}</p>
        <p className="product-detail-price">${product.price.toFixed(2)} <s>${product.originalPrice.toFixed(2)}</s></p>
        <p>Available sizes: {product.sizes.join(', ')}</p>
      </main>
    </>
  );
}