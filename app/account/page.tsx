import { AccountForm } from '@/components/account-form';
import { StoreHeader } from '@/components/store-header';

export default function AccountPage() {
  return (
    <>
      <StoreHeader />
      <main className="account-page">
        <section className="account-art" aria-label="Styled for your next chapter">
          <p className="eyebrow">Your style, your rules</p>
          <h1>
            Good looks.
            <span>Good to go.</span>
          </h1>
          <p>Sign in or join the club for a little more you.</p>
          <span className="account-art-mark" aria-hidden="true">s.</span>
        </section>
        <AccountForm />
      </main>
    </>
  );
}
