import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `What Happens When You Can't Pay Your Debts?`,
  description: "706,000 County Court Judgments in 2024 and 2.8 million council tax enforcement actions signal Britain's debt crisis. 3.1 million adults use high-cost credit as the only option available.",
  openGraph: {
    title: `What Happens When You Can't Pay Your Debts?`,
    description: "706,000 County Court Judgments in 2024 and 2.8 million council tax enforcement actions signal Britain's debt crisis. 3.1 million adults use high-cost credit as the only option available.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/debt-enforcement',
  },
  twitter: {
    card: 'summary_large_image',
    title: `What Happens When You Can't Pay Your Debts?`,
    description: "706,000 County Court Judgments in 2024 and 2.8 million council tax enforcement actions signal Britain's debt crisis. 3.1 million adults use high-cost credit as the only option available.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/debt-enforcement',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
