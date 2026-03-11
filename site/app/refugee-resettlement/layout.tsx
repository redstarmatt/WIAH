import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `How Many Refugees Is Britain Resettling?`,
  description: 'The UK resettled 39,000 refugees via formal schemes since 2015, with Ukraine (219,000) and Afghanistan (24,000) arrivals under separate emergency schemes that stretched local authority capacity.',
  openGraph: {
    title: `How Many Refugees Is Britain Resettling?`,
    description: 'The UK resettled 39,000 refugees via formal schemes since 2015, with Ukraine (219,000) and Afghanistan (24,000) arrivals under separate emergency schemes that stretched local authority capacity.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/refugee-resettlement',
  },
  twitter: {
    card: 'summary_large_image',
    title: `How Many Refugees Is Britain Resettling?`,
    description: 'The UK resettled 39,000 refugees via formal schemes since 2015, with Ukraine (219,000) and Afghanistan (24,000) arrivals under separate emergency schemes that stretched local authority capacity.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/refugee-resettlement',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
