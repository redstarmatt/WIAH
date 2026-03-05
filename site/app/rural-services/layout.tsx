import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rural Services',
  description: '10 million people live in rural England. 1,000 bus routes have been cut since 2010. Rural GP surgeries are closing at twice the rate of urban practices. Broadba',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
