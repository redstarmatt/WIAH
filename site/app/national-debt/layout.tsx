import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "How Big Is Britain's Debt and Does It Matter?",
  description: 'UK public debt reached 98.8&percnt; of GDP in 2024 — the highest since the 1960s — with interest payments of £112bn annually, consuming more than £1 in every £9 of tax revenue.',
  openGraph: {
    title: "How Big Is Britain's Debt and Does It Matter?",
    description: 'UK public debt reached 98.8&percnt; of GDP in 2024 — the highest since the 1960s — with interest payments of £112bn annually, consuming more than £1 in every £9 of tax revenue.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/national-debt',
  },
  twitter: {
    card: 'summary_large_image',
    title: "How Big Is Britain's Debt and Does It Matter?",
    description: 'UK public debt reached 98.8&percnt; of GDP in 2024 — the highest since the 1960s — with interest payments of £112bn annually, consuming more than £1 in every £9 of tax revenue.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/national-debt',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
