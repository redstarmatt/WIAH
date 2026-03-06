import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are British Schools Running Out of Space?',
  description: '400,000 children are in schools operating above capacity, with secondary school overcrowding set to peak around 2026–27.',
  openGraph: {
    title: 'Are British Schools Running Out of Space?',
    description: '400,000 children are in schools operating above capacity, with secondary school overcrowding set to peak around 2026–27.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/school-overcrowding',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are British Schools Running Out of Space?',
    description: '400,000 children are in schools operating above capacity, with secondary school overcrowding set to peak around 2026–27.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/school-overcrowding',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
