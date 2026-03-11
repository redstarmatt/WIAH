import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `How Much Money Is Made from Illegal Waste?`,
  description: 'Waste crime costs £924m per year. The EA has identified over 1,000 active illegal sites but prosecuted only 214 cases in 2024 due to resource constraints. Illegal dumping is highly organised.',
  openGraph: {
    title: `How Much Money Is Made from Illegal Waste?`,
    description: 'Waste crime costs £924m per year. The EA has identified over 1,000 active illegal sites but prosecuted only 214 cases in 2024 due to resource constraints. Illegal dumping is highly organised.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/waste-crime',
  },
  twitter: {
    card: 'summary_large_image',
    title: `How Much Money Is Made from Illegal Waste?`,
    description: 'Waste crime costs £924m per year. The EA has identified over 1,000 active illegal sites but prosecuted only 214 cases in 2024 due to resource constraints. Illegal dumping is highly organised.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/waste-crime',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
