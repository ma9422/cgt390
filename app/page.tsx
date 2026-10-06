import Link from 'next/link';
import { StoreHeader } from '@/components/store-header';

export default function HomePage() {
  return (
    <main>
      <StoreHeader />
      <section className="hero" aria-labelledby="hero-title">
        <p className="eyebrow">The new SLAY foundation</p>
        <h1 id="hero-title">
          Dress like
          <span>you mean it.</span>
        </h1>
        <p className="hero-copy">
          The storefront is now running on Next.js and TypeScript. The full catalog and Supabase connection come next.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link className="hero-link" href="/new-in">
            Explore the drop <span aria-hidden="true">-&gt;</span>
          </Link>
        </div>
      </section>
    </main>
  );
}