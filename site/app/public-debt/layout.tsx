import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Can Britain Actually Afford Its National Debt?',
  description: 'UK public sector net debt reached £2.65 trillion — 97.1% of GDP — in 2023/24, the highest since the early 1960s. Annual interest payments hit £111 billion — more than the defence budget. Debt has trebled since 2008. The OBR projects debt will still be above 90% of GDP in 2028/29.',
  openGraph: {
    title: 'Can Britain Actually Afford Its National Debt?',
    description: 'UK public sector net debt reached £2.65 trillion — 97.1% of GDP — in 2023/24, the highest since the early 1960s. Annual interest payments hit £111 billion — more than the defence budget. Debt has trebled since 2008. The OBR projects debt will still be above 90% of GDP in 2028/29.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/public-debt',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can Britain Actually Afford Its National Debt?',
    description: 'UK public sector net debt reached £2.65 trillion — 97.1% of GDP — in 2023/24, the highest since the early 1960s. Annual interest payments hit £111 billion — more than the defence budget. Debt has trebled since 2008. The OBR projects debt will still be above 90% of GDP in 2028/29.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/public-debt',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
