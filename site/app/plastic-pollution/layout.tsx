import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Britain Actually Dealing With Its Plastic Problem?',
  description: 'The UK generates 5.6 million tonnes of plastic waste per year &mdash; the second highest per capita in the world after the United States. The domestic recycling rate has stalled at 44&percnt; for a decade, and almost half of &ldquo;recycled&rdquo; plastic is exported.',
  openGraph: {
    title: 'Is Britain Actually Dealing With Its Plastic Problem?',
    description: 'The UK generates 5.6 million tonnes of plastic waste per year &mdash; the second highest per capita in the world after the United States. The domestic recycling rate has stalled at 44&percnt; for a decade, and almost half of &ldquo;recycled&rdquo; plastic is exported.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/plastic-pollution',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Britain Actually Dealing With Its Plastic Problem?',
    description: 'The UK generates 5.6 million tonnes of plastic waste per year &mdash; the second highest per capita in the world after the United States. The domestic recycling rate has stalled at 44&percnt; for a decade, and almost half of &ldquo;recycled&rdquo; plastic is exported.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/plastic-pollution',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
