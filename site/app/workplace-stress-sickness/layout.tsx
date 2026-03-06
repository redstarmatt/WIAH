import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Stress Breaking the Workforce?',
  description: 'Work-related stress and mental ill-health now account for over 17 million lost working days a year &mdash; more than any other cause of workplace absence.',
  openGraph: {
    title: 'Is Stress Breaking the Workforce?',
    description: 'Work-related stress and mental ill-health now account for over 17 million lost working days a year &mdash; more than any other cause of workplace absence.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/workplace-stress-sickness',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Stress Breaking the Workforce?',
    description: 'Work-related stress and mental ill-health now account for over 17 million lost working days a year &mdash; more than any other cause of workplace absence.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/workplace-stress-sickness',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
