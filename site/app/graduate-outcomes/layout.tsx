import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What actually happens to people after university?',
  description: '76.9% of graduates are in professional or managerial employment 15 months after graduation. The lifetime graduate earnings premium is around £140,000. But outcomes vary hugely by subject and institution — and 20% of graduates work in non-graduate roles.',
  openGraph: {
    title: 'What actually happens to people after university?',
    description: '76.9% of graduates are in professional or managerial employment 15 months after graduation. The lifetime graduate earnings premium is around £140,000. But outcomes vary hugely by subject and institution — and 20% of graduates work in non-graduate roles.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/graduate-outcomes',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What actually happens to people after university?',
    description: '76.9% of graduates are in professional or managerial employment 15 months after graduation. The lifetime graduate earnings premium is around £140,000. But outcomes vary hugely by subject and institution — and 20% of graduates work in non-graduate roles.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/graduate-outcomes',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
