import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Short-Term Holiday Lets',
  description: '257,000 properties in England are listed as short-term lets a near-fourfold increase since 2015. In Cornwall, 36% of housing stock is let short-term. Teachers, ',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
