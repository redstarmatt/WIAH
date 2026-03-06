import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Is Britain's Carbon Capture Technology Working?`,
  description: 'The UK has committed to capturing 20–30 MtCO2 per year by 2030, but no commercial carbon capture plant is yet operational — Track-1 projects are delayed until at least 2028.',
  openGraph: {
    title: `Is Britain's Carbon Capture Technology Working?`,
    description: 'The UK has committed to capturing 20–30 MtCO2 per year by 2030, but no commercial carbon capture plant is yet operational — Track-1 projects are delayed until at least 2028.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/carbon-capture-progress',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Is Britain's Carbon Capture Technology Working?`,
    description: 'The UK has committed to capturing 20–30 MtCO2 per year by 2030, but no commercial carbon capture plant is yet operational — Track-1 projects are delayed until at least 2028.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/carbon-capture-progress',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
