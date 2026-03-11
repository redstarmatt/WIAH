import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Is Britain Spending Enough on Defence?`,
  description: 'UK defence spending reached 2.3% of GDP in 2024-25, above NATO's 2% target for the first time since 2010. Commitment to 2.5% by 2027 would add £14bn/year to the defence budget.',
  openGraph: {
    title: `Is Britain Spending Enough on Defence?`,
    description: 'UK defence spending reached 2.3% of GDP in 2024-25, above NATO's 2% target for the first time since 2010. Commitment to 2.5% by 2027 would add £14bn/year to the defence budget.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/defence-spending',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Is Britain Spending Enough on Defence?`,
    description: 'UK defence spending reached 2.3% of GDP in 2024-25, above NATO's 2% target for the first time since 2010. Commitment to 2.5% by 2027 would add £14bn/year to the defence budget.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/defence-spending',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
