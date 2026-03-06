import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Rural Areas Becoming Unaffordable?',
  description: 'Remote working has driven rural house prices up 8% above pre-pandemic trend — and 38% of rural areas now have price-to-earnings ratios above 10.',
  openGraph: {
    title: 'Are Rural Areas Becoming Unaffordable?',
    description: 'Remote working has driven rural house prices up 8% above pre-pandemic trend — and 38% of rural areas now have price-to-earnings ratios above 10.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/urban-rural-price-gap',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Rural Areas Becoming Unaffordable?',
    description: 'Remote working has driven rural house prices up 8% above pre-pandemic trend — and 38% of rural areas now have price-to-earnings ratios above 10.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/urban-rural-price-gap',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
