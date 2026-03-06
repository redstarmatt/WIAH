import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Long Are People Actually Waiting for NHS Treatment?',
  description: '7.54 million people are waiting for elective treatment &mdash; the highest on record. Over 300,000 have been waiting more than a year. The 18-week standard &mdash; the legal maximum from referral to treatment &mdash; is met for only 58% of patients. The government target is 92%.',
  openGraph: {
    title: 'How Long Are People Actually Waiting for NHS Treatment?',
    description: '7.54 million people are waiting for elective treatment &mdash; the highest on record. Over 300,000 have been waiting more than a year. The 18-week standard &mdash; the legal maximum from referral to treatment &mdash; is met for only 58% of patients. The government target is 92%.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/nhs-waiting-times',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Long Are People Actually Waiting for NHS Treatment?',
    description: '7.54 million people are waiting for elective treatment &mdash; the highest on record. Over 300,000 have been waiting more than a year. The 18-week standard &mdash; the legal maximum from referral to treatment &mdash; is met for only 58% of patients. The government target is 92%.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/nhs-waiting-times',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
