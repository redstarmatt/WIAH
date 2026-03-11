import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Are Britain's Beaches and Rivers Safe to Swim In?`,
  description: '60% of England's bathing waters achieved Excellent status in 2024, down from 72% in 2013. Sewage overflows — 3.6 million hours in 2023 — are the primary cause of declining water quality.',
  openGraph: {
    title: `Are Britain's Beaches and Rivers Safe to Swim In?`,
    description: '60% of England's bathing waters achieved Excellent status in 2024, down from 72% in 2013. Sewage overflows — 3.6 million hours in 2023 — are the primary cause of declining water quality.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/bathing-water',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Are Britain's Beaches and Rivers Safe to Swim In?`,
    description: '60% of England's bathing waters achieved Excellent status in 2024, down from 72% in 2013. Sewage overflows — 3.6 million hours in 2023 — are the primary cause of declining water quality.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/bathing-water',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
