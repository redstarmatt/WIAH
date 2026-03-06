import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How lonely are older people in England?',
  description: '1.4 million people over 65 are chronically lonely, with loneliness linked to a 26% increased risk of premature death.',
  openGraph: {
    title: 'How lonely are older people in England?',
    description: '1.4 million people over 65 are chronically lonely, with loneliness linked to a 26% increased risk of premature death.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/loneliness-elderly',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How lonely are older people in England?',
    description: '1.4 million people over 65 are chronically lonely, with loneliness linked to a 26% increased risk of premature death.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/loneliness-elderly',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
