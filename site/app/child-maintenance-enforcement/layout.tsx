import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Child Maintenance Enforcement',
  description: '975,000 child maintenance cases are managed by the Child Maintenance Service but 394 million in arrears has accumulated, with 31% of paying parents non-complian',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
