import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Flooding',
  description: '6.3 million properties in England are at risk of flooding roughly 1 in 6 homes. 2.4 million are at significant risk. Winter 2023/24 saw the most flood incidents',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
