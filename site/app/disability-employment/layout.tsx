import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disability Employment',
  description: 'The disability employment gap stands at 28.4 percentage points 53.7% of disabled people are in work, vs 82.1% of non-disabled people. 2.5 million people are out',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
