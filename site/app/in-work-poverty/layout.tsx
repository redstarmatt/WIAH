import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Can You Work Full-Time and Still Be Poor?',
  description: '8.1 million people live in working households below the poverty line — 60&percnt; of all people in poverty live in households where someone works, up from 45&percnt; in 1997.',
  openGraph: {
    title: 'How Can You Work Full-Time and Still Be Poor?',
    description: '8.1 million people live in working households below the poverty line — 60&percnt; of all people in poverty live in households where someone works, up from 45&percnt; in 1997.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/in-work-poverty',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Can You Work Full-Time and Still Be Poor?',
    description: '8.1 million people live in working households below the poverty line — 60&percnt; of all people in poverty live in households where someone works, up from 45&percnt; in 1997.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/in-work-poverty',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
