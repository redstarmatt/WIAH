import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Housing Disrepair Claims',
  description: 'Housing disrepair legal claims have surged 180% since 2019 as social tenants pursue landlords over damp, mould and structural defects.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
