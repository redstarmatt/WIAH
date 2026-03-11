import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `How Much Plastic Is Getting Into Britain's Rivers?`,
  description: '70,000 tonnes of plastic enters UK rivers annually. 100% of tested rivers contain microplastics. Only 14% of English rivers meet good ecological status — one of the lowest rates in Europe.',
  openGraph: {
    title: `How Much Plastic Is Getting Into Britain's Rivers?`,
    description: '70,000 tonnes of plastic enters UK rivers annually. 100% of tested rivers contain microplastics. Only 14% of English rivers meet good ecological status — one of the lowest rates in Europe.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/plastic-pollution-rivers',
  },
  twitter: {
    card: 'summary_large_image',
    title: `How Much Plastic Is Getting Into Britain's Rivers?`,
    description: '70,000 tonnes of plastic enters UK rivers annually. 100% of tested rivers contain microplastics. Only 14% of English rivers meet good ecological status — one of the lowest rates in Europe.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/plastic-pollution-rivers',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
