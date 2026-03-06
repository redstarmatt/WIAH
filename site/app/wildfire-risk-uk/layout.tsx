import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Wildfire Becoming a Risk in Britain?',
  description: 'Wildfires in the UK have increased by 50% in the last decade, with climate change extending fire seasons.',
  openGraph: {
    title: 'Is Wildfire Becoming a Risk in Britain?',
    description: 'Wildfires in the UK have increased by 50% in the last decade, with climate change extending fire seasons.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/wildfire-risk-uk',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Wildfire Becoming a Risk in Britain?',
    description: 'Wildfires in the UK have increased by 50% in the last decade, with climate change extending fire seasons.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/wildfire-risk-uk',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
