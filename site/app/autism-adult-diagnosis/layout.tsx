import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Autism Adult Diagnosis',
  description: 'The average wait for an adult autism assessment in England is now 3.6 years, with over 116,000 people on the waiting list.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
