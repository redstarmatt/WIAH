import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Long Are People Waiting for Eating Disorder Treatment?',
  description: 'More than 40% of urgent eating disorder referrals miss the one-week target, and inpatient beds have declined despite rising demand.',
  openGraph: {
    title: 'How Long Are People Waiting for Eating Disorder Treatment?',
    description: 'More than 40% of urgent eating disorder referrals miss the one-week target, and inpatient beds have declined despite rising demand.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/eating-disorder-waiting',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Long Are People Waiting for Eating Disorder Treatment?',
    description: 'More than 40% of urgent eating disorder referrals miss the one-week target, and inpatient beds have declined despite rising demand.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/eating-disorder-waiting',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
