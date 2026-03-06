import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is the Green Belt Being Eroded?',
  description: 'Planning applications on green belt land have risen 40% since 2018, reigniting debate between housing need and environmental protection.',
  openGraph: {
    title: 'Is the Green Belt Being Eroded?',
    description: 'Planning applications on green belt land have risen 40% since 2018, reigniting debate between housing need and environmental protection.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/green-belt-pressure',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is the Green Belt Being Eroded?',
    description: 'Planning applications on green belt land have risen 40% since 2018, reigniting debate between housing need and environmental protection.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/green-belt-pressure',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
