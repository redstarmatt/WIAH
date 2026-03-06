import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Many People Are Taking Antidepressants?',
  description: '93 million antidepressant prescriptions in 2023 &mdash; more than one for every adult in England, with prescriptions more than doubling since 2010 and long-term use growing fastest.',
  openGraph: {
    title: 'How Many People Are Taking Antidepressants?',
    description: '93 million antidepressant prescriptions in 2023 &mdash; more than one for every adult in England, with prescriptions more than doubling since 2010 and long-term use growing fastest.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/antidepressant-prescribing',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Many People Are Taking Antidepressants?',
    description: '93 million antidepressant prescriptions in 2023 &mdash; more than one for every adult in England, with prescriptions more than doubling since 2010 and long-term use growing fastest.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/antidepressant-prescribing',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
