import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Private Rented Conditions',
  description: '21% of private rented homes fail the Decent Homes Standard and 1.8 million renters live with damp or mould that landlords are failing to fix.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
