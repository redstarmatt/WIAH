import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disability Pay Gap',
  description: 'Disabled workers earn 17% less than non-disabled workers — and face a 28-percentage-point employment gap that has barely improved since 2010.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
