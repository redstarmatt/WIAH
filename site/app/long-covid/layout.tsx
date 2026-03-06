import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Many People Are Still Ill from COVID?',
  description: 'An estimated 1.5 million people in the UK have long COVID, down from a peak of 2.1 million in 2022. 800,000 report limitations on daily activities. 50,000 are unable to work. The estimated economic cost is &pound;5 billion a year.',
  openGraph: {
    title: 'How Many People Are Still Ill from COVID?',
    description: 'An estimated 1.5 million people in the UK have long COVID, down from a peak of 2.1 million in 2022. 800,000 report limitations on daily activities. 50,000 are unable to work. The estimated economic cost is &pound;5 billion a year.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/long-covid',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Many People Are Still Ill from COVID?',
    description: 'An estimated 1.5 million people in the UK have long COVID, down from a peak of 2.1 million in 2022. 800,000 report limitations on daily activities. 50,000 are unable to work. The estimated economic cost is &pound;5 billion a year.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/long-covid',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
