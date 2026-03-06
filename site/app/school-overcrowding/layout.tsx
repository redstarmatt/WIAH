import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Education',
  description: '400,000 children are in schools operating above capacity, with secondary school overcrowding set to peak around 2026–27.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
