import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Getting Around Too Expensive for Low-Income Families?',
  description: 'Car-free households in rural areas spend 20% or more of their income on transport — while train fares have risen 54% since 2010 versus 28% wage growth.',
  openGraph: {
    title: 'Is Getting Around Too Expensive for Low-Income Families?',
    description: 'Car-free households in rural areas spend 20% or more of their income on transport — while train fares have risen 54% since 2010 versus 28% wage growth.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/transport-cost-poverty',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Getting Around Too Expensive for Low-Income Families?',
    description: 'Car-free households in rural areas spend 20% or more of their income on transport — while train fares have risen 54% since 2010 versus 28% wage growth.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/transport-cost-poverty',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
