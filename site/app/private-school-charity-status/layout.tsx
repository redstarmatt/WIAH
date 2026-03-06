import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What Have Private Schools' Tax Exemptions Cost the Public?',
  description: 'Independent schools claimed £522 million in charitable tax relief annually while educating 7% of pupils — relief removed alongside VAT on fees in January 2025.',
  openGraph: {
    title: 'What Have Private Schools' Tax Exemptions Cost the Public?',
    description: 'Independent schools claimed £522 million in charitable tax relief annually while educating 7% of pupils — relief removed alongside VAT on fees in January 2025.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/private-school-charity-status',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Have Private Schools' Tax Exemptions Cost the Public?',
    description: 'Independent schools claimed £522 million in charitable tax relief annually while educating 7% of pupils — relief removed alongside VAT on fees in January 2025.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/private-school-charity-status',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
