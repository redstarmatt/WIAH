import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Can you actually learn to drive?',
  description: 'The average wait for a practical driving test is 17 weeks — nearly double the DVSA\'s 9-week target. Around 1.5 million people are in the queue at any time, and pass rates have fallen from 47% to 43% since 2019.',
  openGraph: {
    title: 'Can you actually learn to drive?',
    description: 'The average wait for a practical driving test is 17 weeks — nearly double the DVSA\'s 9-week target. Around 1.5 million people are in the queue at any time, and pass rates have fallen from 47% to 43% since 2019.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/driving-test-backlog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can you actually learn to drive?',
    description: 'The average wait for a practical driving test is 17 weeks — nearly double the DVSA\'s 9-week target. Around 1.5 million people are in the queue at any time, and pass rates have fallen from 47% to 43% since 2019.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/driving-test-backlog',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
