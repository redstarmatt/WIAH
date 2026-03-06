import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Is Britain's Soil Actually Dying?",
  description: 'An estimated 2.9 billion tonnes of topsoil are lost to erosion across the UK each year, costing the economy £1.4 billion annually. Around 17&percnt; of agricultural soils are now classified as degraded, up from 12&percnt; in 2010.',
  openGraph: {
    title: "Is Britain's Soil Actually Dying?",
    description: 'An estimated 2.9 billion tonnes of topsoil are lost to erosion across the UK each year, costing the economy £1.4 billion annually. Around 17&percnt; of agricultural soils are now classified as degraded, up from 12&percnt; in 2010.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/soil-health',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Is Britain's Soil Actually Dying?",
    description: 'An estimated 2.9 billion tonnes of topsoil are lost to erosion across the UK each year, costing the economy £1.4 billion annually. Around 17&percnt; of agricultural soils are now classified as degraded, up from 12&percnt; in 2010.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/soil-health',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
