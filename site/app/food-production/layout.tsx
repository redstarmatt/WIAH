import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Can Britain Feed Itself?',
  description: 'The UK produces just 57.8&percnt; of its own food, down from 78&percnt; in 1984 and the lowest level since records began. Import dependency is rising at the same time as global food supply chains face growing disruption from climate change, geopolitical instability, and trade friction.',
  openGraph: {
    title: 'Can Britain Feed Itself?',
    description: 'The UK produces just 57.8&percnt; of its own food, down from 78&percnt; in 1984 and the lowest level since records began. Import dependency is rising at the same time as global food supply chains face growing disruption from climate change, geopolitical instability, and trade friction.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/food-production',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can Britain Feed Itself?',
    description: 'The UK produces just 57.8&percnt; of its own food, down from 78&percnt; in 1984 and the lowest level since records began. Import dependency is rising at the same time as global food supply chains face growing disruption from climate change, geopolitical instability, and trade friction.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/food-production',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
