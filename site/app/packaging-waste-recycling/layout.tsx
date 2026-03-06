import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Much Packaging Is Actually Being Recycled?',
  description: 'The UK recycles 68% of packaging waste overall, but plastic recycling sits at 51% — well below the 2030 targets — and contamination undermines collection streams.',
  openGraph: {
    title: 'How Much Packaging Is Actually Being Recycled?',
    description: 'The UK recycles 68% of packaging waste overall, but plastic recycling sits at 51% — well below the 2030 targets — and contamination undermines collection streams.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/packaging-waste-recycling',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Much Packaging Is Actually Being Recycled?',
    description: 'The UK recycles 68% of packaging waste overall, but plastic recycling sits at 51% — well below the 2030 targets — and contamination undermines collection streams.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/packaging-waste-recycling',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
