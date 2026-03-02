import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'What is actually happening',
  description: 'A curated national data platform that makes the real state of the UK visible, understandable, and shareable.',
  openGraph: {
    title: 'What is actually happening',
    description: 'The real state of the UK — visible, understandable, shareable.',
    siteName: 'What is actually happening',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-wiah-black">
        {children}
      </body>
    </html>
  );
}
