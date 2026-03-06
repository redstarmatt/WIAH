import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Ambulances Getting There in Time?',
  description: 'Category 1 response times are 20% above target; Category 2 takes more than twice the target time.',
  openGraph: {
    title: 'Are Ambulances Getting There in Time?',
    description: 'Category 1 response times are 20% above target; Category 2 takes more than twice the target time.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/ambulance-response-times',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Ambulances Getting There in Time?',
    description: 'Category 1 response times are 20% above target; Category 2 takes more than twice the target time.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/ambulance-response-times',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
