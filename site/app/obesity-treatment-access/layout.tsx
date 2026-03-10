import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Can Everyone Who Needs Weight-Loss Treatment Get It?",
  description: "3.4 million adults in England are now eligible for GLP-1 weight-loss drugs under expanded NICE criteria. But NHS tier 3 obesity services have a 24-month wait, and capacity has not been expanded to meet demand.",
  openGraph: {
    title: "Can Everyone Who Needs Weight-Loss Treatment Get It?",
    description: "3.4 million adults in England are now eligible for GLP-1 weight-loss drugs under expanded NICE criteria. But NHS tier 3 obesity services have a 24-month wait, and capacity has not been expanded to meet demand.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/obesity-treatment-access',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Can Everyone Who Needs Weight-Loss Treatment Get It?",
    description: "3.4 million adults in England are now eligible for GLP-1 weight-loss drugs under expanded NICE criteria. But NHS tier 3 obesity services have a 24-month wait, and capacity has not been expanded to meet demand.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/obesity-treatment-access',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
