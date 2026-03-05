import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Medicine Costs',
  description: 'Common over-the-counter medicines have risen 40-70% in price since 2021, with ibuprofen now costing more than an NHS prescription charge for many — pushing low-',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
