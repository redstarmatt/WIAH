import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Respite Care Shortage',
  description: 'Just 41% of unpaid carers say they can access respite care when they need it, down from 56% in 2015.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
