import type { Metadata } from 'next';
import Script from 'next/script';
import { CartProvider } from '@/components/cart-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'STYLED | Fashion, on your terms',
  description: 'A fictional fashion retailer prototype.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-4JK3DB02WY" strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-4JK3DB02WY');
        `}
      </Script>
    </html>
  );
}