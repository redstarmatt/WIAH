import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Modern Slavery',
  description: '17,004 potential victims of modern slavery were referred to the National Referral Mechanism in 2023 up 33% in a single year and 10 times the number in 2014. Exp',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
