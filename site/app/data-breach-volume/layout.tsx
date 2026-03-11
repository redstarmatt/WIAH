import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `How Often Is Your Personal Data Exposed?`,
  description: 'The ICO received over 3,500 data breach reports in 2024, up 63% since 2019. Cyber attacks account for 39% of breaches, with health and financial data the most common targets.',
  openGraph: {
    title: `How Often Is Your Personal Data Exposed?`,
    description: 'The ICO received over 3,500 data breach reports in 2024, up 63% since 2019. Cyber attacks account for 39% of breaches, with health and financial data the most common targets.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/data-breach-volume',
  },
  twitter: {
    card: 'summary_large_image',
    title: `How Often Is Your Personal Data Exposed?`,
    description: 'The ICO received over 3,500 data breach reports in 2024, up 63% since 2019. Cyber attacks account for 39% of breaches, with health and financial data the most common targets.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/data-breach-volume',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
