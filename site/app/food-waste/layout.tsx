import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Much Food Does Britain Throw Away?',
  description: 'The UK wastes 9.5 million tonnes of food annually — worth £19bn — with households responsible for around 70&percnt; by weight. Simultaneously, 7 million people struggle to afford adequate food. The waste is declining slowly but is on track to miss the UN Sustainable Development Goal of halving food waste by 2030.',
  openGraph: {
    title: 'How Much Food Does Britain Throw Away?',
    description: 'The UK wastes 9.5 million tonnes of food annually — worth £19bn — with households responsible for around 70&percnt; by weight. Simultaneously, 7 million people struggle to afford adequate food. The waste is declining slowly but is on track to miss the UN Sustainable Development Goal of halving food waste by 2030.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/food-waste',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Much Food Does Britain Throw Away?',
    description: 'The UK wastes 9.5 million tonnes of food annually — worth £19bn — with households responsible for around 70&percnt; by weight. Simultaneously, 7 million people struggle to afford adequate food. The waste is declining slowly but is on track to miss the UN Sustainable Development Goal of halving food waste by 2030.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/food-waste',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
