import type { Metadata } from 'next';
import { Lora, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-editorial',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://whatisactuallyhappening.uk'),
  title: 'What is actually happening?',
  description: 'A curated national data platform that makes the real state of the UK visible, understandable, and shareable.',
  openGraph: {
    title: 'What is actually happening?',
    description: 'The real state of the UK — visible, understandable, shareable.',
    siteName: 'What is actually happening?',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${lora.variable} ${jakarta.variable}`}>
      <body className="antialiased bg-white text-wiah-black">
        {children}
      </body>
    </html>
  );
}
