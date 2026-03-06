import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Many Jobs Are Being Cut?',
  description: `Redundancy notifications hit 175,000 in 2024, rising sharply after April's National Insurance change, with retail and hospitality leading losses.`,
  openGraph: {
    title: 'How Many Jobs Are Being Cut?',
    description: `Redundancy notifications hit 175,000 in 2024, rising sharply after April's National Insurance change, with retail and hospitality leading losses.`,
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/redundancy-rates',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Many Jobs Are Being Cut?',
    description: `Redundancy notifications hit 175,000 in 2024, rising sharply after April's National Insurance change, with retail and hospitality leading losses.`,
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/redundancy-rates',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
