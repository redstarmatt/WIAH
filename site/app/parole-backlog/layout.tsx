import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Why Are 11,800 Prisoners Waiting for a Parole Hearing?",
  description: "There are 11,800 cases awaiting a Parole Board hearing — nearly double the pre-pandemic figure. The average wait is 18 months. Prisoners are being held beyond their minimum tariff in overcrowded prisons.",
  openGraph: {
    title: "Why Are 11,800 Prisoners Waiting for a Parole Hearing?",
    description: "There are 11,800 cases awaiting a Parole Board hearing — nearly double the pre-pandemic figure. The average wait is 18 months. Prisoners are being held beyond their minimum tariff in overcrowded prisons.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/parole-backlog',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Why Are 11,800 Prisoners Waiting for a Parole Hearing?",
    description: "There are 11,800 cases awaiting a Parole Board hearing — nearly double the pre-pandemic figure. The average wait is 18 months. Prisoners are being held beyond their minimum tariff in overcrowded prisons.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/parole-backlog',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
