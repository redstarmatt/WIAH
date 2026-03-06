import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What share of your salary actually goes on rent?',
  description: 'In London, median rent consumes 71% of median take-home pay. Even in Manchester it's 48%. These ratios have nearly doubled in a generation — squeezing out workers who don't already own property.',
  openGraph: {
    title: 'What share of your salary actually goes on rent?',
    description: 'In London, median rent consumes 71% of median take-home pay. Even in Manchester it's 48%. These ratios have nearly doubled in a generation — squeezing out workers who don't already own property.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/housing-costs-workers',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What share of your salary actually goes on rent?',
    description: 'In London, median rent consumes 71% of median take-home pay. Even in Manchester it's 48%. These ratios have nearly doubled in a generation — squeezing out workers who don't already own property.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/housing-costs-workers',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
