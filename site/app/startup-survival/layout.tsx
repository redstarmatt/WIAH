import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Why Are Fewer New Businesses Making It?`,
  description: 'UK business survival rates have declined across all sectors since 2019. Hospitality survival at five years has fallen to 32%, while online businesses significantly outperform physical retail.',
  openGraph: {
    title: `Why Are Fewer New Businesses Making It?`,
    description: 'UK business survival rates have declined across all sectors since 2019. Hospitality survival at five years has fallen to 32%, while online businesses significantly outperform physical retail.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/startup-survival',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Why Are Fewer New Businesses Making It?`,
    description: 'UK business survival rates have declined across all sectors since 2019. Hospitality survival at five years has fallen to 32%, while online businesses significantly outperform physical retail.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/startup-survival',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
