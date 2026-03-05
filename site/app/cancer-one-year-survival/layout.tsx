import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cancer One-Year Survival',
  description: 'One-year cancer survival has improved steadily but the UK still lags behind comparable European nations.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
