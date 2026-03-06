import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are More Families Living Together?',
  description: 'Multigenerational households have grown by 33% since 2001 — driven primarily by housing costs forcing adult children to stay at home.',
  openGraph: {
    title: 'Are More Families Living Together?',
    description: 'Multigenerational households have grown by 33% since 2001 — driven primarily by housing costs forcing adult children to stay at home.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/multigenerational-living',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are More Families Living Together?',
    description: 'Multigenerational households have grown by 33% since 2001 — driven primarily by housing costs forcing adult children to stay at home.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/multigenerational-living',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
