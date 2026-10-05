import { StoreHeader } from '@/components/store-header';
import { CheckoutContent } from '@/components/checkout-content';

export default function CheckoutPage() {
  return (
    <>
      <StoreHeader />
      <main className="catalog-page checkout-page">
        <div className="checkout-intro">
          <p className="eyebrow">Almost yours</p>
          <h1>Checkout</h1>
        </div>
        <CheckoutContent />
      </main>
    </>
  );
}
