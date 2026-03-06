import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why Are 13,500 Hospital Patients Stuck in Beds Every Day?',
  description: 'On average, 13,500 patients per day are medically fit for discharge but cannot leave hospital — occupying £1 billion worth of NHS bed days per year. Social care delays account for 42% of all delayed discharges. Delayed discharge is the single biggest driver of A&amp;E waits and ambulance handover times.',
  openGraph: {
    title: 'Why Are 13,500 Hospital Patients Stuck in Beds Every Day?',
    description: 'On average, 13,500 patients per day are medically fit for discharge but cannot leave hospital — occupying £1 billion worth of NHS bed days per year. Social care delays account for 42% of all delayed discharges. Delayed discharge is the single biggest driver of A&amp;E waits and ambulance handover times.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/nhs-discharge',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Are 13,500 Hospital Patients Stuck in Beds Every Day?',
    description: 'On average, 13,500 patients per day are medically fit for discharge but cannot leave hospital — occupying £1 billion worth of NHS bed days per year. Social care delays account for 42% of all delayed discharges. Delayed discharge is the single biggest driver of A&amp;E waits and ambulance handover times.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/nhs-discharge',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
