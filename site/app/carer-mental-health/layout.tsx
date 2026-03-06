import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Carer Mental Health',
  description: '72% of unpaid carers report mental health problems, yet just 1 in 4 receives any professional support.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
