import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Youth Diversion Outcomes',
  description: 'Youth reoffending has fallen 50% since 2010, driven by a shift towards community-based diversion over custody.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
