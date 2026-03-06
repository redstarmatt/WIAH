import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Do Communities Trust Each Other?',
  description: '59% of people feel their local community belongs together — a figure that has fallen 6 percentage points since the pandemic and varies sharply by deprivation.',
  openGraph: {
    title: 'Do Communities Trust Each Other?',
    description: '59% of people feel their local community belongs together — a figure that has fallen 6 percentage points since the pandemic and varies sharply by deprivation.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/community-cohesion-survey',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Do Communities Trust Each Other?',
    description: '59% of people feel their local community belongs together — a figure that has fallen 6 percentage points since the pandemic and varies sharply by deprivation.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/community-cohesion-survey',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
