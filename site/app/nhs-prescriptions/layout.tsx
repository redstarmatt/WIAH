import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Who Can Actually Afford Their NHS Prescriptions?',
  description: '1.1 billion prescriptions are dispensed in England each year. The prescription charge is &pound;9.90 per item &mdash; up 60% in real terms since 2000. 90% of prescriptions are dispensed free of charge due to exemptions. An estimated 750,000 people skip medication each year due to cost. Scotland, Wales and Northern Ireland abolished prescription charges entirely.',
  openGraph: {
    title: 'Who Can Actually Afford Their NHS Prescriptions?',
    description: '1.1 billion prescriptions are dispensed in England each year. The prescription charge is &pound;9.90 per item &mdash; up 60% in real terms since 2000. 90% of prescriptions are dispensed free of charge due to exemptions. An estimated 750,000 people skip medication each year due to cost. Scotland, Wales and Northern Ireland abolished prescription charges entirely.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/nhs-prescriptions',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Who Can Actually Afford Their NHS Prescriptions?',
    description: '1.1 billion prescriptions are dispensed in England each year. The prescription charge is &pound;9.90 per item &mdash; up 60% in real terms since 2000. 90% of prescriptions are dispensed free of charge due to exemptions. An estimated 750,000 people skip medication each year due to cost. Scotland, Wales and Northern Ireland abolished prescription charges entirely.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/nhs-prescriptions',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
