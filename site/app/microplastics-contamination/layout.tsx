import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Microplastics in Everything?',
  description: 'Microplastics have been found in human blood (77%), lung tissue, and drinking water — but the health impacts remain poorly understood.',
  openGraph: {
    title: 'Are Microplastics in Everything?',
    description: 'Microplastics have been found in human blood (77%), lung tissue, and drinking water — but the health impacts remain poorly understood.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/microplastics-contamination',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Microplastics in Everything?',
    description: 'Microplastics have been found in human blood (77%), lung tissue, and drinking water — but the health impacts remain poorly understood.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/microplastics-contamination',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
