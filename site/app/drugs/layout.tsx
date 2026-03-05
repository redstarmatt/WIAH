import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Drugs & Alcohol',
  description: 'Drug poisoning deaths reached 4,907 in 2023—a record high. Alcohol deaths surged to 10,048. But treatment access, starved of funding for years, is finally recov',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
