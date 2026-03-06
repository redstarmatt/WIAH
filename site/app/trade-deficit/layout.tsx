import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What Is Britain Actually Exporting?',
  description: 'Britain runs a persistent goods deficit of £165 billion, only partially offset by a £125 billion services surplus — making trade balance heavily dependent on financial services.',
  openGraph: {
    title: 'What Is Britain Actually Exporting?',
    description: 'Britain runs a persistent goods deficit of £165 billion, only partially offset by a £125 billion services surplus — making trade balance heavily dependent on financial services.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/trade-deficit',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is Britain Actually Exporting?',
    description: 'Britain runs a persistent goods deficit of £165 billion, only partially offset by a £125 billion services surplus — making trade balance heavily dependent on financial services.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/trade-deficit',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
