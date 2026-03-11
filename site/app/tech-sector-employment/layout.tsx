import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Is the UK Tech Sector Creating Jobs That Last?`,
  description: 'The UK tech sector employs 1.84 million people but is heavily concentrated in London. Employment grew 40% faster than the wider economy since 2015 but suffered 50,000+ redundancies in 2023.',
  openGraph: {
    title: `Is the UK Tech Sector Creating Jobs That Last?`,
    description: 'The UK tech sector employs 1.84 million people but is heavily concentrated in London. Employment grew 40% faster than the wider economy since 2015 but suffered 50,000+ redundancies in 2023.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/tech-sector-employment',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Is the UK Tech Sector Creating Jobs That Last?`,
    description: 'The UK tech sector employs 1.84 million people but is heavily concentrated in London. Employment grew 40% faster than the wider economy since 2015 but suffered 50,000+ redundancies in 2023.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/tech-sector-employment',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
