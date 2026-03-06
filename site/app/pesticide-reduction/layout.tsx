import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Farmers Using Fewer Chemicals?',
  description: 'Total pesticide applications have fallen 17% since 2012, but three neonicotinoids linked to bee deaths remain in emergency use.',
  openGraph: {
    title: 'Are Farmers Using Fewer Chemicals?',
    description: 'Total pesticide applications have fallen 17% since 2012, but three neonicotinoids linked to bee deaths remain in emergency use.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/pesticide-reduction',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Farmers Using Fewer Chemicals?',
    description: 'Total pesticide applications have fallen 17% since 2012, but three neonicotinoids linked to bee deaths remain in emergency use.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/pesticide-reduction',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
