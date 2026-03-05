import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Probation',
  description: 'The Probation Service supervises 232,000 offenders in the community, but a botched part-privatisation in 2014 widely regarded as one of the worst public service',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
