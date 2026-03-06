import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Geographic Wealth Inequality',
  description: 'Households in South East England are on average three times wealthier than households in the North East a gap that has widened since the financial crisis.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
