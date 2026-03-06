import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is the NHS Getting Better at Treating Sepsis?',
  description: 'Sepsis kills around 48,000 people a year in the UK, but survival rates are improving with better early recognition.',
  openGraph: {
    title: 'Is the NHS Getting Better at Treating Sepsis?',
    description: 'Sepsis kills around 48,000 people a year in the UK, but survival rates are improving with better early recognition.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/sepsis-outcomes',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is the NHS Getting Better at Treating Sepsis?',
    description: 'Sepsis kills around 48,000 people a year in the UK, but survival rates are improving with better early recognition.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/sepsis-outcomes',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
