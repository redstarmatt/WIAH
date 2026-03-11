import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Why Has England's Recycling Rate Stalled?",
  description: "England's recycling rate has been stuck at 43\u201344% for over a decade, far below the 65% target for 2035. The best council recycles 66%; the worst, under 20%.",
  openGraph: {
    title: "Why Has England's Recycling Rate Stalled?",
    description: "England's recycling rate has been stuck at 43\u201344% for over a decade, far below the 65% target for 2035. The best council recycles 66%; the worst, under 20%.",
    type: 'article',
    url: "https://whatisactuallyhappening.uk/recycling-rates",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Why Has England's Recycling Rate Stalled?",
    description: "England's recycling rate has been stuck at 43\u201344% for over a decade, far below the 65% target for 2035. The best council recycles 66%; the worst, under 20%.",
  },
  alternates: {
    canonical: "https://whatisactuallyhappening.uk/recycling-rates",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>({children})</>;
}
