import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why Do 7 Million People Not Know Their Blood Pressure Is High?',
  description: 'An estimated 15 million people in England have high blood pressure, but only 7.8 million are diagnosed. Of those diagnosed, just 60% have their blood pressure controlled to target. Hypertension is the single largest preventable cause of death in the UK.',
  openGraph: {
    title: 'Why Do 7 Million People Not Know Their Blood Pressure Is High?',
    description: 'An estimated 15 million people in England have high blood pressure, but only 7.8 million are diagnosed. Of those diagnosed, just 60% have their blood pressure controlled to target. Hypertension is the single largest preventable cause of death in the UK.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/blood-pressure',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Do 7 Million People Not Know Their Blood Pressure Is High?',
    description: 'An estimated 15 million people in England have high blood pressure, but only 7.8 million are diagnosed. Of those diagnosed, just 60% have their blood pressure controlled to target. Hypertension is the single largest preventable cause of death in the UK.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/blood-pressure',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
