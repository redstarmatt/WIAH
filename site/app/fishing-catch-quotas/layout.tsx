import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What Has Brexit Actually Done to British Fishing?',
  description: 'UK fishing quota increased modestly after Brexit, but total catches continue a long-term decline &mdash; and 76% of quota is sold to foreign vessels.',
  openGraph: {
    title: 'What Has Brexit Actually Done to British Fishing?',
    description: 'UK fishing quota increased modestly after Brexit, but total catches continue a long-term decline &mdash; and 76% of quota is sold to foreign vessels.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/fishing-catch-quotas',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Has Brexit Actually Done to British Fishing?',
    description: 'UK fishing quota increased modestly after Brexit, but total catches continue a long-term decline &mdash; and 76% of quota is sold to foreign vessels.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/fishing-catch-quotas',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
