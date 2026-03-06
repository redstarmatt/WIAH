import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "What's happening to farm payments after Brexit?",
  description: 'The Basic Payment Scheme — which paid UK farmers £1.9bn annually based on land area — is being phased out in favour of ELMs, which pays for environmental outcomes. By 2024, only 8% of farms had joined ELMs. Real farm incomes have fallen 29% since 2010.',
  openGraph: {
    title: "What's happening to farm payments after Brexit?",
    description: 'The Basic Payment Scheme — which paid UK farmers £1.9bn annually based on land area — is being phased out in favour of ELMs, which pays for environmental outcomes. By 2024, only 8% of farms had joined ELMs. Real farm incomes have fallen 29% since 2010.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/farming-subsidies',
  },
  twitter: {
    card: 'summary_large_image',
    title: "What's happening to farm payments after Brexit?",
    description: 'The Basic Payment Scheme — which paid UK farmers £1.9bn annually based on land area — is being phased out in favour of ELMs, which pays for environmental outcomes. By 2024, only 8% of farms had joined ELMs. Real farm incomes have fallen 29% since 2010.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/farming-subsidies',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
