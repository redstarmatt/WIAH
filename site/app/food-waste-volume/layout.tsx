import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `How Much Food Are We Throwing Away?`,
  description: 'UK households discard 6.4 million tonnes of food per year worth £17bn. 73% is avoidable. Despite declining slowly, household food waste remains among the highest in Europe per capita.',
  openGraph: {
    title: `How Much Food Are We Throwing Away?`,
    description: 'UK households discard 6.4 million tonnes of food per year worth £17bn. 73% is avoidable. Despite declining slowly, household food waste remains among the highest in Europe per capita.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/food-waste-volume',
  },
  twitter: {
    card: 'summary_large_image',
    title: `How Much Food Are We Throwing Away?`,
    description: 'UK households discard 6.4 million tonnes of food per year worth £17bn. 73% is avoidable. Despite declining slowly, household food waste remains among the highest in Europe per capita.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/food-waste-volume',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
