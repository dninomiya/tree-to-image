import type { Metadata } from 'next';
import './globals.css';
import GithubLink from '@/app/components/github-link';
import AuthorLink from '@/app/components/author-link';

export const metadata: Metadata = {
  metadataBase: new URL('https://dninomiya.github.io'),
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
      <body>
        {children}
        <AuthorLink />
        <GithubLink href="https://github.com/dninomiya/tree-to-image/tree/main" />
      </body>
    </html>
  );
}
