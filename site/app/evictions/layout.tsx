import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Evictions',
  description: 'Section 21 no-fault eviction notices have risen sharply since 2021 landlords served 25,000 notices in 2023 and court-ordered evictions are at their highest sinc',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
