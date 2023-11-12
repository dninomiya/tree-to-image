import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://dninomiya.github.io/tree-to-image'),
  title: 'Tree to Image',
  description: 'Tree to Image',
  openGraph: {
    title: 'Tree to Image',
    description: 'Tree to Image',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
