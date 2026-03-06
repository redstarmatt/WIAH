import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What Happens When You Report Sexual Violence?',
  description: 'Just 3.2% of reported rapes result in a charge — and the average time from offence to court has stretched to almost two years.',
  openGraph: {
    title: 'What Happens When You Report Sexual Violence?',
    description: 'Just 3.2% of reported rapes result in a charge — and the average time from offence to court has stretched to almost two years.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/violence-against-women',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Happens When You Report Sexual Violence?',
    description: 'Just 3.2% of reported rapes result in a charge — and the average time from offence to court has stretched to almost two years.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/violence-against-women',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
