import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Did Cutting FOBT Stakes Actually Work?",
  description: "The 2019 reduction of fixed-odds betting terminal stakes from £100 to £2 led to 4,700 betting shop closures within two years. Problem gambling rates have fallen, but online gambling has absorbed much of the displaced demand.",
  openGraph: {
    title: "Did Cutting FOBT Stakes Actually Work?",
    description: "The 2019 reduction of fixed-odds betting terminal stakes from £100 to £2 led to 4,700 betting shop closures within two years. Problem gambling rates have fallen, but online gambling has absorbed much of the displaced demand.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/fixed-odds-betting-reform',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Did Cutting FOBT Stakes Actually Work?",
    description: "The 2019 reduction of fixed-odds betting terminal stakes from £100 to £2 led to 4,700 betting shop closures within two years. Problem gambling rates have fallen, but online gambling has absorbed much of the displaced demand.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/fixed-odds-betting-reform',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
