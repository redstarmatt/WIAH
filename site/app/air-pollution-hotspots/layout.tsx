import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Are Britain's Air Quality Laws Actually Working?`,
  description: '44 UK areas exceeded WHO PM2.5 limits in 2024, down from 61 in 2018. Road traffic remains the primary source, and 40,000 premature deaths per year are attributed to outdoor air pollution.',
  openGraph: {
    title: `Are Britain's Air Quality Laws Actually Working?`,
    description: '44 UK areas exceeded WHO PM2.5 limits in 2024, down from 61 in 2018. Road traffic remains the primary source, and 40,000 premature deaths per year are attributed to outdoor air pollution.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/air-pollution-hotspots',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Are Britain's Air Quality Laws Actually Working?`,
    description: '44 UK areas exceeded WHO PM2.5 limits in 2024, down from 61 in 2018. Road traffic remains the primary source, and 40,000 premature deaths per year are attributed to outdoor air pollution.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/air-pollution-hotspots',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
