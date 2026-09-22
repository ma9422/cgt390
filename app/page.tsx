import { StoreHeader } from '@/components/store-header';
import { RequestInfoButton } from '@/components/request-info-button';

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
          <a className="hero-link" href="#catalog">
            Explore the drop <span aria-hidden="true">-&gt;</span>
          </a>
          <RequestInfoButton />
        </div>
      </section>
    </main>
  );
}