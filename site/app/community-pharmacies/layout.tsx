import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Community Pharmacies',
  description: 'England has lost over 1,100 community pharmacies since 2015 around 10% of the total network. Remaining pharmacies are under intense financial pressure: NHS disp',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
