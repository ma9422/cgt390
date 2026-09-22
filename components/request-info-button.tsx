'use client';

import { sendGAEvent } from '@next/third-parties/google';

export function RequestInfoButton() {
  return (
    <button
      type="button"
      className="hero-link"
      onClick={() =>
        sendGAEvent('event', 'request_information_clicked', {
          cta_location: 'hero',
        })
      }
    >
      Request Information
    </button>
  );
}
