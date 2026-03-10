import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Does Housing First Work for Rough Sleepers?",
  description: "2,800 Housing First placements were made in England in 2024 — up from 400 in 2018. The approach achieves an 83% 12-month retention rate. Evidence from UK trials confirms the international research: stable housing comes first.",
  openGraph: {
    title: "Does Housing First Work for Rough Sleepers?",
    description: "2,800 Housing First placements were made in England in 2024 — up from 400 in 2018. The approach achieves an 83% 12-month retention rate. Evidence from UK trials confirms the international research: stable housing comes first.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/housing-first-programme',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Does Housing First Work for Rough Sleepers?",
    description: "2,800 Housing First placements were made in England in 2024 — up from 400 in 2018. The approach achieves an 83% 12-month retention rate. Evidence from UK trials confirms the international research: stable housing comes first.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/housing-first-programme',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
