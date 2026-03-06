import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How many people die from extreme heat in Britain?',
  description: 'The 2022 heatwaves caused at least 2,985 excess deaths in England — on days when 40°C was recorded for the first time. Climate projections suggest annual heat deaths could reach 7,000 by 2050 under moderate warming scenarios.',
  openGraph: {
    title: 'How many people die from extreme heat in Britain?',
    description: 'The 2022 heatwaves caused at least 2,985 excess deaths in England — on days when 40°C was recorded for the first time. Climate projections suggest annual heat deaths could reach 7,000 by 2050 under moderate warming scenarios.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/heat-mortality',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How many people die from extreme heat in Britain?',
    description: 'The 2022 heatwaves caused at least 2,985 excess deaths in England — on days when 40°C was recorded for the first time. Climate projections suggest annual heat deaths could reach 7,000 by 2050 under moderate warming scenarios.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/heat-mortality',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
