import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Housing',
  description: 'The build-to-rent sector has grown to 97,000 units with 250,000 in the pipeline but average rents run 7% above comparable market-rate properties.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
