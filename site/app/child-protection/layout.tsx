import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Child Protection',
  description: 'Child protection referrals have reached record levels while the social worker workforce is stretched to breaking point leading to missed warning signs and preve',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
