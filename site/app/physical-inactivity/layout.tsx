import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are We Getting Enough Exercise?',
  description: 'Less than two thirds of adults in England meet the recommended 150 minutes of moderate physical activity per week, and physical inactivity costs the NHS £7.4 billion a year.',
  openGraph: {
    title: 'Are We Getting Enough Exercise?',
    description: 'Less than two thirds of adults in England meet the recommended 150 minutes of moderate physical activity per week, and physical inactivity costs the NHS £7.4 billion a year.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/physical-inactivity',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are We Getting Enough Exercise?',
    description: 'Less than two thirds of adults in England meet the recommended 150 minutes of moderate physical activity per week, and physical inactivity costs the NHS £7.4 billion a year.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/physical-inactivity',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
