import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Clinical Negligence Costs',
  description: 'NHS negligence liability has reached 83 billion more than the NHS s entire annual budget.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
