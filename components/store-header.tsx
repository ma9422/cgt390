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

export function StoreHeader() {
  return (
    <>
      <div className="ticker">50% OFF SITEWIDE / FREE SHIPPING OVER $75 / NEW DROPS EVERY WEEK</div>
      <header className="site-header">
        <nav aria-label="Main navigation">
          <div className="category-nav">
            {categories.map(([label, href]) => (
              <a href={href} key={label} className={label === 'New In' ? 'active' : undefined}>
                {label}
              </a>
            ))}
          </div>
          <a className="logo" href="/" aria-label="Styled home">
            styl<span>ed.</span>
          </a>
          <div className="utility-nav" aria-label="Store tools">
            <button type="button" aria-label="Search">Search</button>
            <button type="button" aria-label="Shopping bag">Bag (0)</button>
          </div>
        </nav>
      </header>
    </>
  );
}