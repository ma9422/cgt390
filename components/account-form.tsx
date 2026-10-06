'use client';

import { useState, type FormEvent } from 'react';

type AccountMode = 'login' | 'signup';

export function AccountForm() {
  const [mode, setMode] = useState<AccountMode>('login');
  const [message, setMessage] = useState('');
  const [messageIsError, setMessageIsError] = useState(false);
  const isSignup = mode === 'signup';

  function changeMode(nextMode: AccountMode) {
    setMode(nextMode);
    setMessage('');
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (isSignup && formData.get('password') !== formData.get('confirm-password')) {
      setMessageIsError(true);
      setMessage('Those passwords do not match. Please try again.');
      return;
    }

    setMessageIsError(false);
    setMessage("Account services aren't connected yet. Your details were not sent or saved.");
  }

  return (
    <section className="account-panel" aria-labelledby="account-heading">
      <p className="eyebrow">Welcome to Styled</p>
      <h2 id="account-heading">{isSignup ? 'Create your account' : 'Welcome back'}</h2>
      <p className="account-description">
        {isSignup ? 'Join us for first dibs on new drops and more.' : 'Sign in to pick up right where you left off.'}
      </p>

      <div className="account-tabs" role="group" aria-label="Choose an account action">
        <button
          type="button"
          aria-pressed={!isSignup}
          onClick={() => changeMode('login')}
        >
          Sign in
        </button>
        <button
          type="button"
          aria-pressed={isSignup}
          onClick={() => changeMode('signup')}
        >
          Create account
        </button>
      </div>

      <div>
        <form className="account-form" onSubmit={handleSubmit}>
          {isSignup && (
            <label>
              Name
              <input
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Your name"
                required
              />
            </label>
          )}
          <label>
            Email address
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              autoComplete={isSignup ? 'new-password' : 'current-password'}
              placeholder="At least 8 characters"
              minLength={isSignup ? 8 : undefined}
              required
            />
          </label>
          {isSignup && (
            <label>
              Confirm password
              <input
                type="password"
                name="confirm-password"
                autoComplete="new-password"
                placeholder="Enter your password again"
                minLength={8}
                required
              />
            </label>
          )}
          <p className="account-prototype-note">
            This is a preview form. Account sign-in is not available yet, and details entered here are not stored.
          </p>
          <button className="primary-button account-submit" type="submit">
            {isSignup ? 'Create account' : 'Sign in'}
          </button>
          {message && (
            <p className={messageIsError ? 'account-message account-message-error' : 'account-message'} role={messageIsError ? 'alert' : 'status'}>
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
