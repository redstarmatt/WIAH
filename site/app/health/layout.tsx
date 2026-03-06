import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Can You Actually See a Doctor?',
  description: 'Over 7 million people are on the NHS waiting list — the highest ever recorded. UK data on GP wait times, ambulance response, and NHS capacity.',
  openGraph: {
    title: 'Can You Actually See a Doctor?',
    description: 'Over 7 million people are on the NHS waiting list — the highest ever recorded. UK data on GP wait times, ambulance response, and NHS capacity.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/health',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can You Actually See a Doctor?',
    description: 'Over 7 million people are on the NHS waiting list — the highest ever recorded.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/health',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
