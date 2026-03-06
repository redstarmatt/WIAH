import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What Is Actually Happening to UK Migration Numbers?',
  description: 'Net migration to the UK reached a record 906,000 in the year to June 2023 — driven largely by students and workers from non-EU countries filling vacancies in health, social care, and hospitality — before falling sharply to around 350,000 by late 2024 following visa restrictions.',
  openGraph: {
    title: 'What Is Actually Happening to UK Migration Numbers?',
    description: 'Net migration to the UK reached a record 906,000 in the year to June 2023 — driven largely by students and workers from non-EU countries filling vacancies in health, social care, and hospitality — before falling sharply to around 350,000 by late 2024 following visa restrictions.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/net-migration',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is Actually Happening to UK Migration Numbers?',
    description: 'Net migration to the UK reached a record 906,000 in the year to June 2023 — driven largely by students and workers from non-EU countries filling vacancies in health, social care, and hospitality — before falling sharply to around 350,000 by late 2024 following visa restrictions.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/net-migration',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
