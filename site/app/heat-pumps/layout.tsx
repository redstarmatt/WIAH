import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Heat Pumps',
  description: 'The UK installed just 72,000 heat pumps in 2023 less than a third of its 600,000 per year target for 2028. France installed 1.6 million in the same year. The UK',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
