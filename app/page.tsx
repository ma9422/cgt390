const categories = [
  ['New In', '/new-in'],
  ['Best Sellers', '#'],
  ['Tops', '#'],
  ['Bottoms', '#'],
  ['Sets', '#'],
  ['Swim', '#'],
  ['Accessories', '#'],
  ['Outerwear', '#'],
  ['Trending', '#'],
  ['Sale', '#'],
];

export default function HomePage() {
  return (
    <main>
      <div className="ticker">50% OFF SITEWIDE / FREE SHIPPING OVER $75 / NEW DROPS EVERY WEEK</div>
      <header className="site-header">
        <nav aria-label="Main navigation">
          <div className="category-nav">
            {categories.map(([label, href]) => (
              <a href={href} key={label}>
                {label}
              </a>
            ))}
          </div>
          <a className="logo" href="/" aria-label="Styled home">
            styl<span>ed.</span>
          </a>
          <div className="utility-nav" aria-label="Store tools">
            <button type="button" aria-label="Search">
              Search
            </button>
            <button type="button" aria-label="Shopping bag">
              Bag (0)
            </button>
          </div>
        </nav>
      </header>
      <section className="hero" aria-labelledby="hero-title">
        <p className="eyebrow">The new SLAY foundation</p>
        <h1 id="hero-title">
          Dress like
          <span>you mean it.</span>
        </h1>
        <p className="hero-copy">
          The storefront is now running on Next.js and TypeScript. The full catalog and Supabase connection come next.
        </p>
        <a className="hero-link" href="#catalog">
          Explore the drop <span aria-hidden="true">-&gt;</span>
        </a>
      </section>
    </main>
  );
}