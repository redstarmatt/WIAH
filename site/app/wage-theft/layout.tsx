import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Much Wage Theft Goes Unpunished?',
  description: '355,000 workers are paid below the National Living Wage each year, but prosecutions average just 9 per year — leaving billions in stolen wages unrecovered.',
  openGraph: {
    title: 'How Much Wage Theft Goes Unpunished?',
    description: '355,000 workers are paid below the National Living Wage each year, but prosecutions average just 9 per year — leaving billions in stolen wages unrecovered.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/wage-theft',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Much Wage Theft Goes Unpunished?',
    description: '355,000 workers are paid below the National Living Wage each year, but prosecutions average just 9 per year — leaving billions in stolen wages unrecovered.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/wage-theft',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
