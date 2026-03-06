import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Local News Disappearing?',
  description: 'Over 320 local newspapers have closed since 2008, leaving more than 200 communities with no local press coverage at all.',
  openGraph: {
    title: 'Is Local News Disappearing?',
    description: 'Over 320 local newspapers have closed since 2008, leaving more than 200 communities with no local press coverage at all.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/local-press-closures',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Local News Disappearing?',
    description: 'Over 320 local newspapers have closed since 2008, leaving more than 200 communities with no local press coverage at all.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/local-press-closures',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
