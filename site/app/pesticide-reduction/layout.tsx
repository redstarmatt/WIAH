import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pesticide Reduction',
  description: 'Total pesticide applications have fallen 17% since 2012, but three neonicotinoids linked to bee deaths remain in emergency use.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
