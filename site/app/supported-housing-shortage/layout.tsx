import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Housing',
  description: 'There is a shortfall of 45,000 supported housing units, leaving tens of thousands of vulnerable adults in inappropriate settings.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
