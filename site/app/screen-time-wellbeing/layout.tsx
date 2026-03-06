import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Is Screen Time Harming Children's Wellbeing?`,
  description: 'Average screen time for 5-15 year olds exceeds 4 hours daily, though the relationship with wellbeing is more nuanced than headlines suggest.',
  openGraph: {
    title: `Is Screen Time Harming Children's Wellbeing?`,
    description: 'Average screen time for 5-15 year olds exceeds 4 hours daily, though the relationship with wellbeing is more nuanced than headlines suggest.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/screen-time-wellbeing',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Is Screen Time Harming Children's Wellbeing?`,
    description: 'Average screen time for 5-15 year olds exceeds 4 hours daily, though the relationship with wellbeing is more nuanced than headlines suggest.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/screen-time-wellbeing',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
