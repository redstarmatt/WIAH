import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "How Widespread Is Wage Theft in Britain?",
  description: "An estimated 400,000 workers are paid below the National Minimum Wage each year. HMRC enforcement identifies only a fraction of violations. Named employers repaid £16.8 million in 2023 — a small fraction of estimated underpayments.",
  openGraph: {
    title: "How Widespread Is Wage Theft in Britain?",
    description: "An estimated 400,000 workers are paid below the National Minimum Wage each year. HMRC enforcement identifies only a fraction of violations. Named employers repaid £16.8 million in 2023 — a small fraction of estimated underpayments.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/wage-theft',
  },
  twitter: {
    card: 'summary_large_image',
    title: "How Widespread Is Wage Theft in Britain?",
    description: "An estimated 400,000 workers are paid below the National Minimum Wage each year. HMRC enforcement identifies only a fraction of violations. Named employers repaid £16.8 million in 2023 — a small fraction of estimated underpayments.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/wage-theft',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
