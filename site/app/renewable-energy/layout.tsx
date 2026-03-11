import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `How Much of Britain's Power Is Now Renewable?`,
  description: 'Renewables hit a record 45.5% of UK electricity in 2024. Wind power (30%) now exceeds gas (36%) for extended periods. The UK became the first G7 nation to eliminate coal power in September 2024.',
  openGraph: {
    title: `How Much of Britain's Power Is Now Renewable?`,
    description: 'Renewables hit a record 45.5% of UK electricity in 2024. Wind power (30%) now exceeds gas (36%) for extended periods. The UK became the first G7 nation to eliminate coal power in September 2024.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/renewable-energy',
  },
  twitter: {
    card: 'summary_large_image',
    title: `How Much of Britain's Power Is Now Renewable?`,
    description: 'Renewables hit a record 45.5% of UK electricity in 2024. Wind power (30%) now exceeds gas (36%) for extended periods. The UK became the first G7 nation to eliminate coal power in September 2024.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/renewable-energy',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
