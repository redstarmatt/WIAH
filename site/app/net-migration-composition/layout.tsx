import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Who Is Actually Migrating to the UK?`,
  description: 'UK net migration peaked at 906,000 in 2023, driven by international students (40%) and work visa holders (37%). The composition has fundamentally changed since Brexit.',
  openGraph: {
    title: `Who Is Actually Migrating to the UK?`,
    description: 'UK net migration peaked at 906,000 in 2023, driven by international students (40%) and work visa holders (37%). The composition has fundamentally changed since Brexit.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/net-migration-composition',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Who Is Actually Migrating to the UK?`,
    description: 'UK net migration peaked at 906,000 in 2023, driven by international students (40%) and work visa holders (37%). The composition has fundamentally changed since Brexit.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/net-migration-composition',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
