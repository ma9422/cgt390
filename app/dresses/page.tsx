import { ProductCard } from '@/components/product-card';
import { StoreHeader } from '@/components/store-header';
import { dressProducts } from '@/data/products';

export default function DressesPage() {
  return (
    <>
      <StoreHeader />
      <main className="catalog-page">
        <div className="catalog-intro">
          <div>
            <p className="eyebrow">The dress edit</p>
            <h1>Dresses</h1>
          </div>
          <p className="catalog-description">Find statement silhouettes, soft textures, and easy dresses for every plan.</p>
        </div>
        <section className="product-grid" aria-label="Dresses products">
          {dressProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </section>
      </main>
    </>
  );
}