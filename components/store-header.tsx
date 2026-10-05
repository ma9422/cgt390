import Link from 'next/link';
import { CartBagLink } from '@/components/cart-bag-link';

type MenuEntry = string | { label: string; items: string[] };

const categories: [string, string, MenuEntry[]][] = [
  ['New In', '/new-in', ['All New In', 'New This Week', 'New in Tops', 'New in Pants', 'New in Dresses', 'New in Sets']],
  ['Best Sellers', '/collections/best-sellers', ['Best Sellers', 'Best selling tops', 'Best selling pants', 'Best selling dresses', 'Best selling skirts', 'Best selling outerwear', 'Back in stock']],
  ['Jeans', '/collections/jeans', ['All Jeans', 'Baggy Jeans', 'Flared Jeans', 'Bootcut Jeans', 'Straight Jeans', 'Wide Jeans', 'Barrell Jeans']],
  ['Tops', '#', ['All tops', 'Crop tops', 'Tank tops', 'Halter tops', 'T-shirts', 'Corsets', 'Strapless & tube tops', 'Long sleeve tops', 'Denim tops', 'Graphic tops', 'Bodysuits', 'Knitted tops']],
  ['Bottoms', '#', ['All Bottoms', 'Pants', 'Skirts & Skorts', 'Shorts', 'Sweatpants', 'Leggings', 'Cargo Pants', { label: 'Shop By Fit', items: ['Swimwear', 'Petite', 'Tall', 'Intimates', 'Loungewear', 'Sleepwear'] }]],
  ['Dresses', '/dresses', ['All Dresses', 'Mini dresses', 'Maxi dresses', 'Cut out dresses', 'Long sleeve dresses', 'LBD', 'Romper dresses', 'Graduation dresses', 'Homecoming dresses']],
  ['Sets', '#', []],
  ['Outerwear', '#', ['All outerwear', 'Hoodies', 'Sweaters', 'Cardigans', 'Jackets & coats']],
  ['Accessories', '#', ['All accessories', 'Barbie™ By Styled', 'Styled Pets', 'Socks & tights', 'Hats & scarves', 'Sunglasses', 'Necklaces', 'Belly chains', 'Bracelets', 'Rings', 'Earrings', 'Belts', 'Bags', 'Hair accessories', 'Fun stuff']],
  ['Trending', '#', ['Star Treatment', 'Denim', 'Off Duty', 'Back to School', 'Summer society', 'Soccer club', 'IG shop', 'Homecoming', 'Party Looks', 'Going Out']],
  ['SALE', '#', ['All sale', 'Sale tops', 'Sale pants', 'Sale dresses', 'Sale skirts', 'Sale outerwear', 'Sale accessories', '70-80% off items', 'Online warehouse sale']],
];

const canonicalUrls: Record<string, string> = {
  'Best Sellers': '/collections/best-sellers',
  Jeans: '/collections/jeans',
  Pants: '/collections/pants',
  'Barbie™ By Styled': '/collections/barbie-by-styled',
};

function getSubcategoryHref(label: string) {
  if (label === 'Maxi dresses') {
    return '/maxi-dresses';
  }

  if (canonicalUrls[label]) {
    return canonicalUrls[label];
  }

  return `#${label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
}

export function StoreHeader() {
  return (
    <>
      <div className="ticker">50% OFF SITEWIDE / FREE SHIPPING OVER $75 / NEW DROPS EVERY WEEK</div>
      <header className="site-header">
        <nav aria-label="Main navigation">
          <div className="category-nav">
            {categories.map(([label, href, subcategories]) => (
              <details className="category-menu" key={label}>
                <summary className={label === 'New In' ? 'active' : undefined}>{label}</summary>
                <div className="subcategory-menu">
                  <a href={href}>{label}</a>
                  {subcategories.map((subcategory) => typeof subcategory === 'string' ? (
                    <a href={getSubcategoryHref(subcategory)} key={subcategory}>{subcategory}</a>
                  ) : (
                    <div className="subcategory-group" key={subcategory.label}>
                      <span>{subcategory.label}</span>
                      {subcategory.items.map((item) => (
                        <a href={getSubcategoryHref(item)} key={item}>{item}</a>
                      ))}
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>
          <Link className="logo" href="/" aria-label="Styled home">
            styl<span>ed.</span>
          </Link>
          <div className="utility-nav" aria-label="Store tools">
            <button type="button" aria-label="Search">Search</button>
            <CartBagLink />
          </div>
        </nav>
      </header>
    </>
  );
}