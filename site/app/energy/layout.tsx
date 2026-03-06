import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Can You Actually Afford to Heat Your Home?',
  description: 'UK data and statistics on can you actually afford to heat your home?. What is actually happening?',
  openGraph: {
    title: 'Can You Actually Afford to Heat Your Home?',
    description: 'UK data and statistics on can you actually afford to heat your home?. What is actually happening?',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/energy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can You Actually Afford to Heat Your Home?',
    description: 'UK data and statistics on can you actually afford to heat your home?. What is actually happening?',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/energy',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
