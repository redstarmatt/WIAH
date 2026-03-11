import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Does the UK Workforce Have the Digital Skills It Needs?`,
  description: '8 million UK adults lack basic digital skills, costing an estimated £22 billion annually in lost productivity. Demand for advanced skills in data and cybersecurity is growing faster than training supply.',
  openGraph: {
    title: `Does the UK Workforce Have the Digital Skills It Needs?`,
    description: '8 million UK adults lack basic digital skills, costing an estimated £22 billion annually in lost productivity. Demand for advanced skills in data and cybersecurity is growing faster than training supply.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/digital-skills-adults',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Does the UK Workforce Have the Digital Skills It Needs?`,
    description: '8 million UK adults lack basic digital skills, costing an estimated £22 billion annually in lost productivity. Demand for advanced skills in data and cybersecurity is growing faster than training supply.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/digital-skills-adults',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
