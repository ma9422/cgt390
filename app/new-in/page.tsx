import { ProductCard } from '@/components/product-card';
import { StoreHeader } from '@/components/store-header';
import { getNewInProducts, type ProductSort } from '@/data/products';

type NewInPageProps = {
  searchParams: Promise<{ sort?: string }>;
};

function getSortOption(value: string | undefined): ProductSort {
  if (value === 'price-low' || value === 'price-high' || value === 'name') {
    return value;
  }

  return 'featured';
}

export default async function NewInPage({ searchParams }: NewInPageProps) {
  const { sort } = await searchParams;
  const selectedSort = getSortOption(sort);
  const newInProducts = getNewInProducts(selectedSort);

  return (
    <>
      <StoreHeader />
      <main className="catalog-page">
        <div className="catalog-intro">
          <div>
            <p className="eyebrow">The latest drop</p>
            <h1>New In</h1>
          </div>
          <p className="catalog-description">Fresh shapes, new textures, and the pieces about to be everywhere.</p>
        </div>
        <div className="catalog-toolbar">
          <span>{newInProducts.length} styles</span>
          <form className="sort-form" method="get">
            <label htmlFor="sort">Sort:</label>
            <select id="sort" name="sort" defaultValue={selectedSort}>
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name</option>
            </select>
            <button type="submit">Apply</button>
          </form>
        </div>
        <section className="product-grid" aria-label="New In products">
          {newInProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </section>
      </main>
    </>
  );
}