import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Has Right to Buy Depleted the Social Housing Stock?",
  description: "8,900 homes were sold under Right to Buy last year — but only 0.3 of a new social home is built for each one sold, against a one-for-one replacement pledge. The net depletion of social housing stock continues to drive homelessness waiting lists.",
  openGraph: {
    title: "Has Right to Buy Depleted the Social Housing Stock?",
    description: "8,900 homes were sold under Right to Buy last year — but only 0.3 of a new social home is built for each one sold, against a one-for-one replacement pledge. The net depletion of social housing stock continues to drive homelessness waiting lists.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/right-to-buy',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Has Right to Buy Depleted the Social Housing Stock?",
    description: "8,900 homes were sold under Right to Buy last year — but only 0.3 of a new social home is built for each one sold, against a one-for-one replacement pledge. The net depletion of social housing stock continues to drive homelessness waiting lists.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/right-to-buy',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
