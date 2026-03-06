import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Can People Afford Basic Medicines?',
  description: 'Common over-the-counter medicines have risen 40-70% in price since 2021, with ibuprofen now costing more than an NHS prescription charge for many — pushing low-income households to go untreated.',
  openGraph: {
    title: 'Can People Afford Basic Medicines?',
    description: 'Common over-the-counter medicines have risen 40-70% in price since 2021, with ibuprofen now costing more than an NHS prescription charge for many — pushing low-income households to go untreated.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/over-the-counter-medicine-costs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can People Afford Basic Medicines?',
    description: 'Common over-the-counter medicines have risen 40-70% in price since 2021, with ibuprofen now costing more than an NHS prescription charge for many — pushing low-income households to go untreated.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/over-the-counter-medicine-costs',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
