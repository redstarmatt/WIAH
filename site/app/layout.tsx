import type { Metadata } from 'next';
import { Lora, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import dynamic from 'next/dynamic';
import Script from 'next/script';
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
  metadataBase: new URL('https://whatisactuallyhappening.uk'),
  title: {
    default: 'What is actually happening?',
    template: '%s | What is actually happening?',
  },
  description: 'A curated national data platform that makes the real state of the UK visible, understandable, and shareable. Public data on health, housing, water, justice, and education.',
  keywords: ['UK statistics', 'public data', 'NHS', 'housing crisis', 'water quality', 'crime statistics', 'education data', 'UK government data'],
  openGraph: {
    title: 'What is actually happening?',
    description: 'The real state of the UK — visible, understandable, shareable.',
    siteName: 'What is actually happening?',
    url: 'https://whatisactuallyhappening.uk',
    type: 'website',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What is actually happening?',
    description: 'The real state of the UK — visible, understandable, shareable.',
    site: '@WIAHuk',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en" className={`${lora.variable} ${jakarta.variable}`}>
      <body className="antialiased bg-white text-wiah-black">
        {/* Plausible — privacy-respecting analytics, no cookies */}
        <Script
          defer
          data-domain="whatisactuallyhappening.uk"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
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
