import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Many Households Are Being Disconnected From Energy?',
  description: 'Self-disconnections — where prepayment customers run out of credit — reached 3.2 million in 2023, even as forced disconnections fell under regulatory pressure.',
  openGraph: {
    title: 'How Many Households Are Being Disconnected From Energy?',
    description: 'Self-disconnections — where prepayment customers run out of credit — reached 3.2 million in 2023, even as forced disconnections fell under regulatory pressure.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/energy-disconnections',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Many Households Are Being Disconnected From Energy?',
    description: 'Self-disconnections — where prepayment customers run out of credit — reached 3.2 million in 2023, even as forced disconnections fell under regulatory pressure.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/energy-disconnections',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
