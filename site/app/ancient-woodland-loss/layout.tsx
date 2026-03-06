import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Much Ancient Woodland Is Being Destroyed?',
  description: 'Over 1,000 ancient woodland sites are under threat from development, and 700 hectares were lost to HS2 alone — irreplaceable ecosystem lost for good.',
  openGraph: {
    title: 'How Much Ancient Woodland Is Being Destroyed?',
    description: 'Over 1,000 ancient woodland sites are under threat from development, and 700 hectares were lost to HS2 alone — irreplaceable ecosystem lost for good.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/ancient-woodland-loss',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Much Ancient Woodland Is Being Destroyed?',
    description: 'Over 1,000 ancient woodland sites are under threat from development, and 700 hectares were lost to HS2 alone — irreplaceable ecosystem lost for good.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/ancient-woodland-loss',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
