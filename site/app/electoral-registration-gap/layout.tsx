import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Electoral Registration Gap',
  description: 'An estimated 8 million people are missing from the electoral roll — disproportionately young people, private renters and those from ethnic minority backgrounds.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
