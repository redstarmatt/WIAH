import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Baby Loss Support',
  description: '1 in 4 pregnancies ends in loss, yet bereavement midwife provision remains inconsistent across NHS trusts.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
