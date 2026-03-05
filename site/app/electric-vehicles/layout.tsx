import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Electric Vehicles',
  description: 'EVs took 16.5% of new car sales in 2023, but public charging infrastructure is insufficient just 1 charger per 54 EVs, against a target of 1 per 10. The 2030 pe',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
