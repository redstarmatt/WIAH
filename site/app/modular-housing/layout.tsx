import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Modular Housing',
  description: 'Modular housing completions remain below 10,000 a year despite government targets, though quality outcomes are improving.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
