import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Public Debt',
  description: 'UK public sector net debt reached 2.65 trillion 97.1% of GDP in 2023/24, the highest since the early 1960s. Annual interest payments hit 111 billion more than t',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
