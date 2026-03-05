import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Renters Reform',
  description: 'Section 21 no-fault evictions were used 26,000 times in 2022/23, making over 22,000 households homeless annually. The Renters Rights Act 2024 abolishes Section ',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
