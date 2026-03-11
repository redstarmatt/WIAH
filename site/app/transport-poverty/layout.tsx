import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Can Low-Income Households Afford to Get Around?`,
  description: '2.3 million UK households are in transport poverty, spending 10%+ of income on transport. Rural areas and those reliant on public transport are most affected by rising costs and bus cuts.',
  openGraph: {
    title: `Can Low-Income Households Afford to Get Around?`,
    description: '2.3 million UK households are in transport poverty, spending 10%+ of income on transport. Rural areas and those reliant on public transport are most affected by rising costs and bus cuts.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/transport-poverty',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Can Low-Income Households Afford to Get Around?`,
    description: '2.3 million UK households are in transport poverty, spending 10%+ of income on transport. Rural areas and those reliant on public transport are most affected by rising costs and bus cuts.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/transport-poverty',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
