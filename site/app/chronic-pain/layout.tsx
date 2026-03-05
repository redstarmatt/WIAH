import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chronic Pain',
  description: 'Chronic pain affects an estimated 28 million adults in the UK more than 40% of the population. It is the leading cause of disability and costs the economy 37 mi',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
