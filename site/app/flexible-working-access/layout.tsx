import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Can Workers Actually Get Flexible Hours?',
  description: '78% of flexible working requests are approved — but low-paid workers are half as likely to be offered flexible options in the first place.',
  openGraph: {
    title: 'Can Workers Actually Get Flexible Hours?',
    description: '78% of flexible working requests are approved — but low-paid workers are half as likely to be offered flexible options in the first place.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/flexible-working-access',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can Workers Actually Get Flexible Hours?',
    description: '78% of flexible working requests are approved — but low-paid workers are half as likely to be offered flexible options in the first place.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/flexible-working-access',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
