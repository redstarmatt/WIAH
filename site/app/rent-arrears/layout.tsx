import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rent Arrears',
  description: 'One in seven renters in England is now behind on their rent, the highest rate on record. Landlord possession claims in county courts hit 164,200 in 2024 surpass',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
