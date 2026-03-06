import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Can People Get Help for Problem Gambling?',
  description: 'Problem gambling affects around 300,000 people but NHS treatment capacity remains severely limited, with waits of up to 8 weeks.',
  openGraph: {
    title: 'Can People Get Help for Problem Gambling?',
    description: 'Problem gambling affects around 300,000 people but NHS treatment capacity remains severely limited, with waits of up to 8 weeks.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/gambling-harm-treatment',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can People Get Help for Problem Gambling?',
    description: 'Problem gambling affects around 300,000 people but NHS treatment capacity remains severely limited, with waits of up to 8 weeks.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/gambling-harm-treatment',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
