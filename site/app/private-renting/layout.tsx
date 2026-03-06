import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Private Renting in Britain Actually Affordable?',
  description: 'UK data and statistics on is private renting in britain actually affordable?. What is actually happening?',
  openGraph: {
    title: 'Is Private Renting in Britain Actually Affordable?',
    description: 'UK data and statistics on is private renting in britain actually affordable?. What is actually happening?',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/private-renting',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Private Renting in Britain Actually Affordable?',
    description: 'UK data and statistics on is private renting in britain actually affordable?. What is actually happening?',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/private-renting',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
