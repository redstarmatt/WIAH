import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Is the Social Care Workforce in Crisis?",
  description: "The social care vacancy rate is 9.9% — five times the economy average. Turnover of 28.3% means providers are in constant recruitment, driving up costs and reducing care quality.",
  openGraph: {
    title: "Is the Social Care Workforce in Crisis?",
    description: "The social care vacancy rate is 9.9% — five times the economy average. Turnover of 28.3% means providers are in constant recruitment, driving up costs and reducing care quality.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/care-home-staffing',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Is the Social Care Workforce in Crisis?",
    description: "The social care vacancy rate is 9.9% — five times the economy average. Turnover of 28.3% means providers are in constant recruitment, driving up costs and reducing care quality.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/care-home-staffing',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
