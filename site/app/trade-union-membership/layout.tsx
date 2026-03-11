import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Are Trade Unions Coming Back?`,
  description: 'Trade union membership has stabilised at 22.3% after decades of decline from the 1979 peak of 53%. The public-private divide is stark: 50% in public sector vs just 12.8% in private.',
  openGraph: {
    title: `Are Trade Unions Coming Back?`,
    description: 'Trade union membership has stabilised at 22.3% after decades of decline from the 1979 peak of 53%. The public-private divide is stark: 50% in public sector vs just 12.8% in private.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/trade-union-membership',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Are Trade Unions Coming Back?`,
    description: 'Trade union membership has stabilised at 22.3% after decades of decline from the 1979 peak of 53%. The public-private divide is stark: 50% in public sector vs just 12.8% in private.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/trade-union-membership',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
