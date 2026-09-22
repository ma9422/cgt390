import type { Metadata } from 'next';
import { ProductCard } from '@/components/product-card';
import { StoreHeader } from '@/components/store-header';
import { dressProducts } from '@/data/products';

export const metadata: Metadata = {
  title: 'Maxi Dresses for Women – styled',
  description: 'Shop Styled’s collection of maxi dresses for women, featuring fitted, backless, ribbed, and statement styles.',
  alternates: {
    canonical: '/maxi-dresses',
  },
};

const breadcrumbStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
    { '@type': 'ListItem', position: 2, name: 'Dresses', item: '/dresses' },
    { '@type': 'ListItem', position: 3, name: 'Maxi Dresses', item: '/maxi-dresses' },
  ],
};

export default function MaxiDressesPage() {
  return (
    <>
      <StoreHeader />
      <main className="catalog-page">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span aria-hidden="true">-&gt;</span>
          <a href="/dresses">Dresses</a>
          <span aria-hidden="true">-&gt;</span>
          <a href="/maxi-dresses" aria-current="page">Maxi Dresses</a>
        </nav>
        <div className="catalog-intro">
          <div>
            <p className="eyebrow">The dress edit</p>
            <h1>Maxi Dresses</h1>
            <p className="catalog-description catalog-description-wide">
              Explore Styled&apos;s collection of maxi dresses for women, featuring a variety of fitted, backless, ribbed, and statement styles for different occasions.
            </p>
          </div>
        </div>
        <div className="catalog-toolbar">
          <span>{dressProducts.length} styles</span>
        </div>
        <section className="product-grid" aria-label="Maxi Dresses products">
          {dressProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </section>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />
    </>
  );
}