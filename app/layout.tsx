import type { Metadata } from 'next';
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
      <body>{children}</body>
    </html>
  );
}