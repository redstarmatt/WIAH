import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Can Pharmacists Replace GPs for Common Conditions?',
  description: 'The Pharmacy First scheme has freed up over 1.4 million GP appointments in its first year &mdash; but access remains patchy.',
  openGraph: {
    title: 'Can Pharmacists Replace GPs for Common Conditions?',
    description: 'The Pharmacy First scheme has freed up over 1.4 million GP appointments in its first year &mdash; but access remains patchy.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/pharmacy-first-service',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can Pharmacists Replace GPs for Common Conditions?',
    description: 'The Pharmacy First scheme has freed up over 1.4 million GP appointments in its first year &mdash; but access remains patchy.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/pharmacy-first-service',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
