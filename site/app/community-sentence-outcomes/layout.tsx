import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Community Sentence Outcomes',
  description: 'People given community sentences reoffend at a rate of 32%, compared to 45% for those given short custodial sentences.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
