import type { Metadata } from 'next';
import { Lora, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import dynamic from 'next/dynamic';
import SearchProvider from '@/components/SearchProvider';
import SearchModal from '@/components/SearchModal';
import CanonicalTag from '@/components/CanonicalTag';

const NextTopicBar = dynamic(() => import('@/components/NextTopicBar'), { ssr: false });

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
  metadataBase: new URL('https://www.wiah.uk'),
  title: {
    default: 'What is actually happening?',
    template: '%s — What is actually happening?',
  },
  description: 'A curated national data platform that makes the real state of the UK visible, understandable, and shareable.',
  openGraph: {
    title: 'What is actually happening?',
    description: 'The real state of the UK — visible, understandable, shareable.',
    siteName: 'What is actually happening?',
    url: 'https://www.wiah.uk',
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
        <SearchProvider>
          <CanonicalTag />
          {children}
          <SearchModal />
          <NextTopicBar />
        </SearchProvider>
      </body>
    </html>
  );
}
