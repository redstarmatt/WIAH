import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are British Trains Actually Running on Time?',
  description: 'Only 63.3% of UK trains arrived on time in 2024, down from 89% pre-privatisation, making British punctuality among the worst in Western Europe.',
  openGraph: {
    title: 'Are British Trains Actually Running on Time?',
    description: 'Only 63.3% of UK trains arrived on time in 2024, down from 89% pre-privatisation, making British punctuality among the worst in Western Europe.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/train-punctuality',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are British Trains Actually Running on Time?',
    description: 'Only 63.3% of UK trains arrived on time in 2024, down from 89% pre-privatisation, making British punctuality among the worst in Western Europe.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/train-punctuality',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
