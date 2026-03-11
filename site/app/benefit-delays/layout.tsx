import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Are Benefits Being Paid On Time?`,
  description: 'DWP paid 82% of UC claims on time in 2023-24. Annual errors cost £12.3bn — £9.7bn in overpayments and £2.6bn in underpayments — with claimants bearing the cost of both types.',
  openGraph: {
    title: `Are Benefits Being Paid On Time?`,
    description: 'DWP paid 82% of UC claims on time in 2023-24. Annual errors cost £12.3bn — £9.7bn in overpayments and £2.6bn in underpayments — with claimants bearing the cost of both types.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/benefit-delays',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Are Benefits Being Paid On Time?`,
    description: 'DWP paid 82% of UC claims on time in 2023-24. Annual errors cost £12.3bn — £9.7bn in overpayments and £2.6bn in underpayments — with claimants bearing the cost of both types.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/benefit-delays',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
