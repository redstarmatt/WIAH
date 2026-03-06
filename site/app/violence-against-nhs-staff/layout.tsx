import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Safe Are NHS Workers?',
  description: 'Over 200 assaults on NHS staff are reported every day, with the trend worsening post-pandemic.',
  openGraph: {
    title: 'How Safe Are NHS Workers?',
    description: 'Over 200 assaults on NHS staff are reported every day, with the trend worsening post-pandemic.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/violence-against-nhs-staff',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Safe Are NHS Workers?',
    description: 'Over 200 assaults on NHS staff are reported every day, with the trend worsening post-pandemic.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/violence-against-nhs-staff',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
